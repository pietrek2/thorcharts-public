import React, { useEffect, useState } from 'react'
import { DAY, HOUR, MINUTE, MONTH, SECOND } from './const'
import { SChartLightStroke, SHeavy, SSmall } from './styles'
import { findBreakpoints, incrementDate, roundToNearestInterval, shrinkDate, TimeFormats, TimeIntervalString } from './utils';

interface ChartDateAxisProps {
	range: { beg: number | undefined; end: number | undefined }
	chartSize: { width: number; height: number }
	setTicks: React.Dispatch<React.SetStateAction<number[]>>
}

const optimalAxisSpace = 60
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
const ChartDateAxis: React.FC<ChartDateAxisProps> = ({ range, chartSize, setTicks }) => {
	const [optIntCount, setOptIntCount] = useState(2)
	const [dateMode, setDateMode] = useState('y')
	const [axisDesc, setAxisDesc] = useState<{ coord: number; val: string; bold: boolean }[]>([])
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		if (range.beg === undefined || range.end === undefined) {
			return
		}
		if (chartSize.height === 0 || chartSize.width === 0) {
			return
		}
		const rangeLength = range.end - range.beg
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
	}, [chartSize, range])

	useEffect(() => {
		if (!isInitialized) {
			return
		}
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
		const descs: { coord: number; val: string; bold: boolean }[] = []
		for (let point of breakpoints) {
			const timestamp = point.getTime() / 1000
			const coord = ((timestamp - range.beg) / rangeLength) * 100
			const timeFormat = timeFormats[modeDetails.timeFormat].breakpointOptions
			descs.push({ coord: coord, val: new Intl.DateTimeFormat('en-us', timeFormat).format(point), bold: true })
		}
		for (let point of axisDates) {
			const timestamp = point.getTime() / 1000
			const coord = ((timestamp - range.beg) / rangeLength) * 100
			const timeFormat = timeFormats[modeDetails.timeFormat].normalOptions
			descs.push({ coord: coord, val: new Intl.DateTimeFormat('en-us', timeFormat).format(point), bold: false })
		}
		setAxisDesc(descs)
		setTicks(descs.map((desc) => desc.coord))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateMode, optIntCount, range, isInitialized])

	return (
		<svg height="100%" width="100%" overflow="visible">
			{axisDesc.map((ax, index) => {
				if (ax.bold) {
					return (
						<SHeavy key={index} x={`${ax.coord}%`} y="50%" vectorEffect="non-scaling-stroke" textAnchor="middle">
							{ax.val}
						</SHeavy>
					)
				} else {
					return (
						<SSmall key={index} x={`${ax.coord}%`} y="50%" vectorEffect="non-scaling-stroke" textAnchor="middle">
							{ax.val}
						</SSmall>
					)
				}
			})}
			{axisDesc.map((ax, index) => {
				return <SChartLightStroke key={`${index}-line`} x1={`${ax.coord}%`} x2={`${ax.coord}%`} y1="20%" y2="0%" vectorEffect="non-scaling-stroke" />
			})}
		</svg>
	)
}

export default ChartDateAxis
