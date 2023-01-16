import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Axis, SeriesMetaData } from './ChartContent'
import { DAY, HOUR, MINUTE, MONTH, SECOND } from './const'
import { ChartLineLabel, ChartScaleAdjustableRectangle, ChartScaleHandleLine, ChartScaleLine, ChartScaleRectangleHandle, ChartScaleSvg, SChartRect } from './styles'
import { findBreakpoints, incrementDate, roundToNearestInterval, shrinkDate, TimeFormats, TimeIntervalString } from './utils'

interface ChartScaleProps {
	chartSize: { width: number, height: number }
	maxRange: Axis,
	xRange: Axis,
	setXRange: React.Dispatch<React.SetStateAction<Axis>>
}
type DragType = "rect" | "leftHandle" | "rightHandle"
interface LineDesc {
	x: number,
	value: string,
	bold: boolean
}

interface DragState {
	target: any,
	type: DragType,
	touchIndex: number,
	startX: number,
	currentX: number,
}
interface ScalePos {
	from: number,
	to: number
}
const tolerance = 0.0001
const checkTolerance = (val: number, setVal: number) => {
	return Math.abs(val - setVal) < tolerance
} 
const optimalAxisSpace = 100
const modes: {
	[key: string]: {
		bins: number[]
		interval: number
		constantInterval: boolean
		intervalMlp: number
		breakpoints: TimeIntervalString | undefined
		shrinkName: undefined | TimeIntervalString
		timeFormat: TimeFormats
	}
} = {
	'1s': { bins: [0, SECOND], interval: SECOND, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: 'seconds', timeFormat: 'seconds' },
	'5s': { bins: [SECOND, 5 * SECOND], interval: 5 * SECOND, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'seconds' },
	'15s': { bins: [5 * SECOND, 15 * SECOND], interval: 15 * SECOND, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'seconds' },
	'30s': { bins: [15 * SECOND, 30 * SECOND], interval: 30 * SECOND, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'seconds' },
	'1m': { bins: [30 * SECOND, MINUTE], interval: MINUTE, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: 'minutes', timeFormat: 'minutes' },
	'5m': { bins: [MINUTE, 5 * MINUTE], interval: 5 * MINUTE, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'minutes' },
	'15m': { bins: [5 * MINUTE, 15 * MINUTE], interval: 15 * MINUTE, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'minutes' },
	'30m': { bins: [15 * MINUTE, 30 * MINUTE], interval: 30 * MINUTE, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'minutes' },
	'1h': { bins: [30 * MINUTE, HOUR], interval: HOUR, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: 'hours', timeFormat: 'minutes' },
	'2h': { bins: [HOUR, 2 * HOUR], interval: 2 * HOUR, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'minutes' },
	'3h': { bins: [2 * HOUR, 3 * HOUR], interval: 3 * HOUR, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'minutes' },
	'4h': { bins: [3 * HOUR, 4 * HOUR], interval: 4 * HOUR, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'minutes' },
	'6h': { bins: [4 * HOUR, 6 * HOUR], interval: 6 * HOUR, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'minutes' },
	'12h': { bins: [6 * HOUR, 12 * HOUR], interval: 12 * HOUR, constantInterval: true, intervalMlp: 1, breakpoints: 'day', shrinkName: undefined, timeFormat: 'minutes' },
	'md': { bins: [12 * HOUR, 25 * DAY], interval: DAY, constantInterval: false, intervalMlp: 1, breakpoints: 'year', shrinkName: 'day', timeFormat: 'dayMonths' },
	'1mh': { bins: [25 * DAY, MONTH], interval: MONTH, constantInterval: true, intervalMlp: 1, breakpoints: 'year', shrinkName: 'month', timeFormat: 'months' },
	'2mh': { bins: [MONTH, 2 * MONTH], interval: 2 * MONTH, constantInterval: true, intervalMlp: 2, breakpoints: 'year', shrinkName: 'month', timeFormat: 'months' },
	'3mh': { bins: [2 * MONTH, 3 * MONTH], interval: 4 * MONTH, constantInterval: true, intervalMlp: 3, breakpoints: 'year', shrinkName: 'month', timeFormat: 'months' },
	'4mh': { bins: [3 * MONTH, 4 * MONTH], interval: 4 * MONTH, constantInterval: true, intervalMlp: 4, breakpoints: 'year', shrinkName: 'month', timeFormat: 'months' },
	'6mh': { bins: [4 * MONTH, 6 * MONTH], interval: 6 * MONTH, constantInterval: true, intervalMlp: 6, breakpoints: 'year', shrinkName: 'month', timeFormat: 'months' },
	'y': { bins: [6 * MONTH, Number.MAX_VALUE], interval: 12 * MONTH, constantInterval: false, intervalMlp: 1, breakpoints: undefined, shrinkName: 'year', timeFormat: 'years' }
}
const timeFormats: { [key in TimeFormats]: any } = {
	seconds: { normalOptions: { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }, breakpointOptions: { day: 'numeric' } },
	minutes: { normalOptions: { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }, breakpointOptions: { day: 'numeric' } },
	dayMonths: { normalOptions: { day: 'numeric', month: 'short' }, breakpointOptions: { year: 'numeric' } },
	months: { normalOptions: { month: 'short' }, breakpointOptions: { year: 'numeric' } },
	years: { normalOptions: { year: 'numeric' }, breakpointOptions: { year: 'numeric' } }
}
const chooseOptimalInterval = (averageTickLength: number) => {
	const key = Object.keys(modes).find((mode) => {
		const bins = modes[mode].bins
		return averageTickLength > bins[0] && averageTickLength <= bins[1]
	})
	if (!key) {
		throw new Error('wat')
	}
	return key
}
const ChartScale: React.FC<ChartScaleProps> = ({chartSize, maxRange, xRange, setXRange}) => {
	// Adjustable Rectangle Starting Points
	const [lineDescs, setLineDescs] = useState<LineDesc[]>([{x: 40, value: "11:25", bold: false}, {x: 60, value: "12:25", bold: false}])
	const [from, setFrom] = useState<number>(20)
	const [to, setTo] = useState<number>(80)
	// const [isViewChanging, setIsViewChanging] = useState<boolean>(false)
	const dragStates = useRef<DragState[]>([])
	const scalePos = useRef<ScalePos>({from: -1, to: -1})
	const ref = useRef<SVGSVGElement>(null)
	const init = useRef<boolean>(false)
	const updateThrottle = useRef<{timeoutId: number, throttle: boolean}>({timeoutId: -1, throttle: false})
	const [optIntCount, setOptIntCount] = useState(2)
	const [dateMode, setDateMode] = useState('y')
	const [isInitialized, setIsInitialized] = useState(false)
	const axisChanging = useRef<boolean>(false)

	useEffect(() => {
		const chartRef = ref.current
		const preventDefault = (e: any) => {
			e.preventDefault()
		}
		chartRef?.addEventListener('wheel', preventDefault)
		chartRef?.addEventListener('touchmove', preventDefault)

		return () => {
			chartRef?.removeEventListener('wheel', preventDefault)
			chartRef?.addEventListener('touchmove', preventDefault)
		}
	}, [ref])

	const handleStartDrag = useCallback((e: any, type: DragType) => {
        if (e._reactName === 'onTouchStart') {
			const indentifiers = dragStates.current.map((state) => state.touchIndex)
			const newTouches = [...e.changedTouches].filter((touch: any) => !indentifiers.includes(touch.identifier))
			// console.log(`${newTouches.map(t => t.identifier)} - ${indentifiers}`)
			for (let newTouch of newTouches) {
				dragStates.current.push({target: e.target, type: type, touchIndex: newTouch.identifier, startX: newTouch.clientX, currentX: newTouch.clientX})
			}
        }
        else {
			dragStates.current.push({target: e.target, type: type, touchIndex: -1, startX: e.clientX, currentX: e.clientX})
        }
	}, [])

	const handleEndDrag = useCallback((e: any) => {
		if (e._reactName === 'onTouchEnd') {
			for (let touch of [...e.changedTouches]) {
				const id = touch.identifier
				const index = dragStates.current.findIndex((item) => id === item.touchIndex)
				if (index !== -1)
					dragStates.current.splice(index, 1)
			}
		}
		else {
			dragStates.current.splice(0, dragStates.current.length)
		}
		axisChanging.current = false
	}, [])

	const handleDrag = useCallback((e: any) => {
		if (dragStates.current.length === 0 || (chartSize.width || 0) === 0) {
			return
		}
		let leftChange = 0;
		let rightChange = 0;
		const margin = 15
		const marginPercent = margin / chartSize.width * 100
		const dist = (scalePos.current.to - scalePos.current.from) / 100 * chartSize.width - margin
		const rightLeeway = (100 - scalePos.current.to) / 100 * chartSize.width
		const leftLeeway = scalePos.current.from / 100 * chartSize.width
		if (e._reactName === 'onTouchMove') {
			const changedTouchesList = [...e.changedTouches]
			const leftDragExist = dragStates.current.findIndex((item) => item.type === "leftHandle") !== -1
			const rightDragExist = dragStates.current.findIndex((item) => item.type === "rightHandle") !== -1
			for (let type of ["rect", "leftHandle", "rightHandle"] as DragType[]) {
				const validTouches = dragStates.current.filter((drag) => drag.type === type)
				const changes = validTouches.map(touch => {
					const t = changedTouchesList.find((changedTouch) => changedTouch.identifier === touch.touchIndex)
					// console.log(touch.currentX)
					return t? t.clientX - touch.currentX: 0
				})
				const minIndex = changes.findIndex((item) => item === Math.min(...changes))
				const maxIndex = changes.findIndex((item) => item === Math.max(...changes))
				let sum = changes.length === 0? 0: changes.reduce((a, b) => a + b, 0) / changes.length
				// if (changes.length > 0)
					// console.log(`${changes}`)
				const zoom = changes.length === 0? 0: (changes[maxIndex] - changes[minIndex]) / 2
				const zoomDirection = (minIndex === -1 || maxIndex === -1)? 0: validTouches[maxIndex].currentX > validTouches[minIndex].currentX? -1: 1 
				// console.log(sum)
				// console.log(zoom * zoomDirection)
				if (type === "rect") {
					sum = Math.min(rightLeeway, Math.max(-leftLeeway, sum))
					if (!leftDragExist) {
						leftChange += sum
						leftChange += zoom * zoomDirection
					}
					if (!rightDragExist) {
						rightChange += sum
						rightChange -= zoom * zoomDirection
					}
				}
				else if (type === "leftHandle") {
				 	leftChange += sum - Math.max(0, sum - dist)
					// console.log(`${sum} ${Math.max(0, sum - dist)} ${leftChange}`)
				}
				else if (type === "rightHandle") {
					rightChange += sum + Math.max(0, -sum - dist)
				}
			}
			for (let newTouch of e.changedTouches) {
				const index = dragStates.current.findIndex((drag) => drag.touchIndex === newTouch.identifier)
				// console.log(dragStates.current.map(ds => ds.touchIndex))
				if (index !== -1){
					dragStates.current[index].currentX = newTouch.clientX
				}
			}
		}
		else {
			const dragState = dragStates.current[0]
			let change = e.clientX - dragState.currentX
			dragState.currentX = e.clientX
			const type = dragState.type
			if (type === "rect") {
				change = Math.min(rightLeeway, Math.max(-leftLeeway, change))
				leftChange += change
				rightChange += change
			}
			else if (type === "leftHandle") {
				leftChange += change - Math.max(0, change - dist)
			}
			else if (type === "rightHandle") {
				rightChange += change + Math.max(0, -change - dist)
			}
		}
		if (!init.current) {
			init.current = true
			scalePos.current.from = from
			scalePos.current.to = to
		}
		const setStateFrom = scalePos.current.from === from
		const setStateTo = scalePos.current.to === to
		scalePos.current.from += leftChange / chartSize.width * 100
		scalePos.current.to += rightChange / chartSize.width * 100
		const correctedFrom = Math.max(0, Math.min(100 - marginPercent, scalePos.current.from))
		const correctedTo = Math.max(0 + marginPercent, Math.min(100, scalePos.current.to))
		scalePos.current.from = correctedFrom
		scalePos.current.to = correctedTo
		// if (!(scalePos.current.from !== from || scalePos.current.to !== to))
		// {
		// 	console.log('sad')
		// }
		if (!axisChanging.current && (scalePos.current.from !== from || scalePos.current.to !== to)) {
			axisChanging.current = true
			// console.log("set true")
			// updateScaleView()
			setFrom(scalePos.current.from)
			setTo(scalePos.current.to)
		}
		// console.log(`${leftChange}, ${rightChange}`)
	}, [chartSize, from, to])

	// useEffect(() => {

	// }, [from])

	// useEffect(() => {
	// 	if (scalePos.current.to !== -1 && scalePos.current.to !== to && axisChanging.current === true) {
	// 		setTo(scalePos.current.to)
	// 	}
	// }, [to])

	// const updateScaleView = useCallback(() => {
	// 	if (maxRange?.beg === undefined || maxRange?.end === undefined || (maxRange?.beg || 0) === 0 || (maxRange?.end || 0) === 0 || xRange?.beg === undefined || xRange?.end === undefined)
	// 	return
	// 	if (axisChanging.current === false) {
	// 		scalePos.current.to = to
	// 		scalePos.current.from = from
	// 		return
	// 	}
	// 	let changedState = false
	// 	let toChange: {to: number | undefined, from: number | undefined} = {to: undefined, from: undefined}
	// 	if (scalePos.current.to !== -1 && scalePos.current.to !== to && axisChanging.current === true) {
	// 		toChange.to = scalePos.current.to
	// 		changedState = true
	// 	}
	// 	if (scalePos.current.from !== -1 && scalePos.current.from !== from && axisChanging.current === true) {
	// 		toChange.from = scalePos.current.from
	// 		changedState = true
	// 	}
	// 	setTimeout(() => {
	// 		if (toChange.from) {
	// 			setFrom(toChange.from)
	// 		}
	// 		if (toChange.to) {
	// 			setTo(toChange.to)
	// 		}
	// 	}, 15)
	// 	if (!changedState) {
	// 		axisChanging.current = false
	// 		console.log("set false")
	// 	}
	// 	const maxRangeLength = maxRange.end - maxRange.beg
	// 	const newRange = {beg: scalePos.current.from / 100 * maxRangeLength + maxRange.beg, end: to / 100 * maxRangeLength + maxRange.beg}
	// 	setXRange(newRange)
	// }, [from ,to, maxRange, scalePos, axisChanging])

	useEffect(() => {
		if (maxRange?.beg === undefined || maxRange?.end === undefined || (maxRange?.beg || 0) === 0 || (maxRange?.end || 0) === 0 || xRange?.beg === undefined || xRange?.end === undefined)
			return
		if (axisChanging.current === false) {
			scalePos.current.to = to
			scalePos.current.from = from
			return
		}
		let changedState = false
		let toChange: {to: number | undefined, from: number | undefined} = {to: undefined, from: undefined}
		if (scalePos.current.to !== -1 && scalePos.current.to !== to && axisChanging.current === true) {
			toChange.to = scalePos.current.to
			changedState = true
		}
		if (scalePos.current.from !== -1 && scalePos.current.from !== from && axisChanging.current === true) {
			toChange.from = scalePos.current.from
			changedState = true
		}
		setTimeout(() => {
			if (toChange.from !== undefined) {
				setFrom(toChange.from)
				// console.log(`from ${toChange.from}`)
			}
			if (toChange.to !== undefined) {
				setTo(toChange.to)
				// console.log(`to ${toChange.to}`)
			}
		}, 15)
		if (!changedState) {
			axisChanging.current = false
			// console.log("set false")
		}
		const maxRangeLength = maxRange.end - maxRange.beg
		const newRange = {beg: scalePos.current.from / 100 * maxRangeLength + maxRange.beg, end: to / 100 * maxRangeLength + maxRange.beg}
		setXRange(newRange)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [from, to])

	useEffect(() => {
		if (maxRange?.beg === undefined || maxRange?.end === undefined || xRange?.beg === undefined || xRange?.end === undefined || (xRange?.beg || 0) === 0 || (xRange?.end || 0) === 0)
			return
		const newFrom = (xRange.beg - maxRange.beg) / (maxRange.end - maxRange.beg) * 100
		const newTo = (xRange.end - maxRange.beg) / (maxRange.end - maxRange.beg) * 100
		if (!checkTolerance(from, newFrom) && axisChanging.current === false)
		{
			setFrom(newFrom)
		}
		if (!checkTolerance(to, newTo) && axisChanging.current === false)
		{
			setTo(newTo)
		}
		if (maxRange?.beg === undefined || maxRange?.end === undefined || xRange?.beg === undefined || xRange?.end === undefined || (xRange?.beg || 0) === 0 || (xRange?.end || 0) === 0)
			return
		if (init.current !== true || axisChanging.current !== true) {
			const newFrom = (xRange.beg - maxRange.beg) / (maxRange.end - maxRange.beg) * 100
			const newTo = (xRange.end - maxRange.beg) / (maxRange.end - maxRange.beg) * 100
			scalePos.current = {from: newFrom, to: newTo}
			init.current = true
			return
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [xRange, maxRange])

	useEffect(() => {
		if (maxRange.beg === undefined || maxRange.end === undefined) {
			return
		}
		if (chartSize.height === 0 || chartSize.width === 0) {
			return
		}
		const rangeLength = maxRange.end - maxRange.beg
		const optimalTickCount = Math.max(chartSize.width / optimalAxisSpace, 2)
		const averageTickLength = rangeLength / optimalTickCount
		const mode = chooseOptimalInterval(averageTickLength)
		if (mode !== dateMode) {
			setDateMode(mode)
		}
		const tickRounded = Math.round(optimalTickCount)
		if (tickRounded !== optIntCount) {
			setOptIntCount(tickRounded)
		}
		if (!isInitialized) {
			setIsInitialized(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chartSize, maxRange])

	useEffect(() => {
		if (!isInitialized) {
			return
		}
		const range = maxRange
		if (range.beg === undefined || range.end === undefined) {
			return
		}
		const rangeLength = range.end - range.beg
		const modeDetails = modes[dateMode]
		const breakpoints = modeDetails.breakpoints ? findBreakpoints(modeDetails.breakpoints, { beg: range.beg, end: range.end }) : []
		const anchor =
			breakpoints.length > 0
				? breakpoints[0]
				: modeDetails.shrinkName
				? shrinkDate(new Date(range.beg * 1000), modeDetails.shrinkName)
				: new Date(roundToNearestInterval(range.beg * 1000, modeDetails.interval))
		const intervalIncrement = modeDetails.constantInterval
			? modeDetails.intervalMlp
			: (() => {
					let interval = 1
					while (true) {
						const nextInterval = interval + 1
						const tickCount = rangeLength / (modeDetails.interval * interval)
						const nextIntervalTickCount = rangeLength / (modeDetails.interval * nextInterval)
						const optimalError = Math.abs(tickCount - optIntCount)
						const nextOptimalError = Math.abs(nextIntervalTickCount - optIntCount)
						if (nextOptimalError > optimalError) {
							return interval
						}
						interval = nextInterval
					}
			  })()
		const axisDates: Date[] = []
		let currentDate = anchor
		while (currentDate.getTime() / 1000 < range.end) {
			const timestamp = currentDate.getTime() / 1000
			if (timestamp > range.beg && timestamp < range.end && currentDate.getTime()) {
				const minBreakpointsDistance = Math.min(...breakpoints.map((breakpoint) => Math.abs(breakpoint.getTime() / 1000 - timestamp)), Number.MAX_VALUE)
				if (minBreakpointsDistance > modeDetails.interval / 4) {
					axisDates.push(currentDate)
				}
			}
			currentDate = modeDetails.shrinkName ? incrementDate(currentDate, modeDetails.shrinkName, intervalIncrement) : new Date(currentDate.getTime() + modeDetails.interval * 1000)
		}
		currentDate = anchor
		while (currentDate.getTime() / 1000 > range.beg) {
			const timestamp = currentDate.getTime() / 1000
			if (timestamp > range.beg && timestamp < range.end && currentDate.getTime() !== anchor.getTime()) {
				const minBreakpointsDistance = Math.min(...breakpoints.map((breakpoint) => Math.abs(breakpoint.getTime() / 1000 - timestamp)), Number.MAX_VALUE)
				if (minBreakpointsDistance > modeDetails.interval / 4) {
					axisDates.push(currentDate)
				}
			}
			currentDate = modeDetails.shrinkName ? incrementDate(currentDate, modeDetails.shrinkName, -intervalIncrement) : new Date(currentDate.getTime() - modeDetails.interval * 1000)
		}
		const descs: LineDesc[] = []
		for (let point of breakpoints) {
			const timestamp = point.getTime() / 1000
			const coord = ((timestamp - range.beg) / rangeLength) * 100
			const timeFormat = timeFormats[modeDetails.timeFormat].breakpointOptions
			descs.push({ x: coord, value: new Intl.DateTimeFormat('en-us', timeFormat).format(point), bold: true })
		}
		for (let point of axisDates) {
			const timestamp = point.getTime() / 1000
			const coord = ((timestamp - range.beg) / rangeLength) * 100
			const timeFormat = timeFormats[modeDetails.timeFormat].normalOptions
			descs.push({ x: coord, value: new Intl.DateTimeFormat('en-us', timeFormat).format(point), bold: false })
		}
		setLineDescs(descs)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateMode, optIntCount, maxRange, isInitialized])

	return (
		<ChartScaleSvg ref={ref} preserveAspectRatio="none"
			onTouchMove={handleDrag}
			onTouchEnd={handleEndDrag}
			onMouseMove={handleDrag}
			onMouseUp={handleEndDrag}
			onMouseLeave={handleEndDrag}>
			<SChartRect x="0" y="0" width="100%" height="100%" style={{ vectorEffect: 'non-scaling-stroke' }} />

			{lineDescs.map((item, index) => (
				<g key={index} style={{transform: `translate(${item.x}%, 0%)`}}>
					<ChartScaleLine x1="0" x2="0" y1="0" y2="100%" />
					{(
						item.x <= 95? <ChartLineLabel x="5px" y="50%" dominantBaseline="middle">
							{item.value}
						</ChartLineLabel>:
						<div/> 
					)}
					
				</g>
			))}
			<ChartScaleAdjustableRectangle x={`${from}%`} y="0" width={`${to - from}%`} height="100%"
				onTouchStart={(e) => handleStartDrag(e, "rect")}
				onMouseDown={(e) => handleStartDrag(e, "rect")}/>

			<g style={{transform: `translate(${from}%, 20%)`}}
				onTouchStart={(e) => handleStartDrag(e, "leftHandle")}
				onMouseDown={(e) => handleStartDrag(e, "leftHandle")}>
				<ChartScaleRectangleHandle x="-8px" y="0" width="16px" height="60%"/>
				<ChartScaleHandleLine x1="-3px" y1="10%" x2="-3px" y2="50%"/>
				<ChartScaleHandleLine x1="3px" y1="10%" x2="3px" y2="50%"/>
			</g>

			<g style={{transform: `translate(${to}%, 20%)`}}
				onTouchStart={(e) => handleStartDrag(e, "rightHandle")}
				onMouseDown={(e) => handleStartDrag(e, "rightHandle")}>
				<ChartScaleRectangleHandle x="-8px" y="0" width="16px" height="60%"/>
				<ChartScaleHandleLine x1="-3px" y1="10%" x2="-3px" y2="50%"/>
				<ChartScaleHandleLine x1="3px" y1="10%" x2="3px" y2="50%"/>
			</g>
		</ChartScaleSvg>
	)
}

export default ChartScale
