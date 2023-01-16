import React, { useEffect, useRef, useState, useContext, useCallback } from 'react'
import ChartDateAxis from './ChartDateAxis'
import ChartValueAxis from './ChartValueAxis'
import ChartSeries from './ChartSeries'
import ChartBackground from './ChartBackground'
import { SChartContainer, SChartTitle, SChartUnitContainerRight, SChartUnitContainerLeft, SChartUnitSpan, SMainGridContainer, SxAxis, SyAxis, SyRightAxis, SChartTools } from './styles'
import { ThemeContext } from '../../App'
import ChartForeground from './ChartForeground'
import ChartBarSeries from './ChartBarSeries'
import ChartLegend from './ChartLegend'
import ChartToolTip from './ChartToolTip'
import ChartScale from './ChartScale'
import { DAY } from './const'
import { ResizeSensor } from './utils'
import ChartScaleSwitch from './ChartScaleSwitch'

interface ChartContentProps {
	dataSeries: DataSeries[] | DataSeries
	chartHeight?: string
	chartWidth?: string
	chartTitle?: string
}

export interface DataSeries {
	data: ChartPoint[]
	strokeWidth: number
	name: string
	type: 'line' | 'bars'
	seriesGroup: string
	color: string
	unitSymbol?: string
	unitName?: string
	barGroup?: string
}

export interface MultiBar {
	data: ChartMultiPoint[]
	meta: SeriesMetaData
	colors: string[]
	seriesGroup: string
	type: string
	combined: ChartPoint[]
}

export interface ChartPoint {
	x: number
	y: number
}
export interface ChartMultiPoint {
	x: number
	ys: number[]
}
export interface Axis {
	beg: number | undefined
	end: number | undefined
}

export interface SeriesMetaData {
	extremumList: ChartPoint[]
	beg: number
	end: number
	max: number
	min: number
	count: number
	minInterval: number
}

interface DragState {
	target: any
	touchIndex: number
	startX: number
	currentX: number
}

const prepareBarSeries = (pointList: ChartPoint[][]) => {
	const formPoints: ChartMultiPoint[] = []
	const indexes = pointList.map(() => 0)
	while (true) {
		const dates = pointList.map((l, index) => l[indexes[index]]?.x || Number.MAX_SAFE_INTEGER)
		const minDate = Math.min(...dates)
		if (minDate === Number.MAX_SAFE_INTEGER) break
		const values = pointList.map(() => 0)
		pointList.forEach((l, index) => {
			const pnt = l[indexes[index]]
			if (pnt === undefined) {
				values[index] = 0
				return
			}
			if (pnt.x === minDate) {
				values[index] = pnt.y
				indexes[index] += 1
			} else {
				values[index] = 0
			}
		})
		formPoints.push({ x: minDate, ys: values })
	}
	return formPoints
}

const getSeriesMetadata = (data: ChartPoint[]) => {
	let minValue: number | undefined = undefined
	let maxValue: number | undefined = undefined
	let minInterval: number | undefined = undefined
	let lastValue: ChartPoint | undefined = undefined
	let trend: number | undefined = undefined
	const extremumList = []
	for (let dp of data) {
		if (minValue === undefined || dp.y < minValue) {
			minValue = dp.y
		}
		if (maxValue === undefined || dp.y > maxValue) {
			maxValue = dp.y
		}
		if (lastValue === undefined) {
			lastValue = dp
			continue
		}
		const diff = dp.y - lastValue.y
		const interval = dp.x - lastValue.x
		if (interval !== 0 && (minInterval === undefined || interval < minInterval)) {
			minInterval = interval
		}
		if (trend === undefined || diff * trend < 0) {
			extremumList.push(lastValue)
			trend = diff >= 0 ? 1 : -1
		}
		lastValue = dp
	}
	return {
		extremumList: extremumList,
		beg: data[0].x,
		end: data[data.length - 1].x,
		max: maxValue,
		min: minValue,
		count: data.length,
		minInterval: minInterval
	} as SeriesMetaData
}

const getOccurences = (list: Array<string>) => {
	const occDict: { [id: string]: number } = {}
	for (let item of list) {
		occDict[item] = occDict[item] ? occDict[item] + 1 : 1
	}
	return occDict
}

const findFirstValueInRange = (range: number, series: ChartPoint[], meta: SeriesMetaData) => {
	const predictedIndex = Math.min(series.length - 1, Math.max(0, Math.floor((series.length * (range - meta.beg)) / (meta.end - meta.beg))))
	let currentIndex = predictedIndex
	if (series[currentIndex] === undefined) {
		currentIndex = 0
		if (series[currentIndex] === undefined) {
			return undefined
		}
	}
	if (series[currentIndex].x === range) {
		return series[currentIndex].y
	} else if (series[currentIndex].x > range) {
		while (series[currentIndex].x > range) {
			const previousValue = series[currentIndex - 1]
			if (previousValue === undefined || previousValue.x <= range) {
				return series[currentIndex]?.y
			}
			if (previousValue.x >= range) {
				currentIndex -= 1
			}
		}
	} else {
		while (series[currentIndex].x < range) {
			const nextValue = series[currentIndex + 1]
			if (nextValue === undefined || nextValue.x >= range) {
				return series[currentIndex + 1]?.y
			}
			if (nextValue.x <= range) {
				currentIndex += 1
			}
		}
	}
	return undefined
}

const findLastValueInRange = (range: number, series: ChartPoint[], meta: SeriesMetaData) => {
	const predictedIndex = Math.min(series.length - 1, Math.max(0, Math.ceil((series.length * (range - meta.beg)) / (meta.end - meta.beg))))
	let currentIndex = predictedIndex
	if (series[currentIndex] === undefined) {
		currentIndex = 0
		if (series[currentIndex] === undefined) {
			return undefined
		}
	}
	if (series[currentIndex].x === range) {
		return series[currentIndex].y
	} else if (series[currentIndex].x > range) {
		while (series[currentIndex].x > range) {
			const previousValue = series[currentIndex - 1]
			if (previousValue === undefined || previousValue.x <= range) {
				return series[currentIndex - 1]?.y
			}
			if (previousValue.x >= range) {
				currentIndex -= 1
			}
		}
	} else {
		while (series[currentIndex].x < range) {
			const nextValue = series[currentIndex + 1]
			if (nextValue === undefined || nextValue.x >= range) {
				return series[currentIndex]?.y
			}
			if (nextValue.x <= range) {
				currentIndex += 1
			}
		}
	}
	return undefined
}

const ChartContent: React.FC<ChartContentProps> = ({ dataSeries, chartHeight = '70vh', chartWidth = '100%', chartTitle = 'Chart Title' }) => {
	const { setTheme, theme } = useContext(ThemeContext)
	const ref = useRef<HTMLDivElement>(null)
	const [chartSizeState, setChartSizeState] = useState({ width: 0, height: 0 })
	const [yAxis, setYAxis] = useState<{ [name: string]: Axis }>({})
	const [xAxis, setXAxis] = useState<Axis>({ beg: undefined, end: undefined })
	const [maxXAxis, setMaxXAxis] = useState<Axis>({ beg: undefined, end: undefined })
	const [visibilityList, setVisibilityList] = useState<Map<DataSeries, boolean>>(new Map<DataSeries, boolean>())
	const [xTicks, setXTicks] = useState<number[]>([])
	const [yTicks, setYTicks] = useState<{ [name: string]: number[] }>({})
	const [leftAxis, setLeftAxis] = useState<string[]>([])
	const [rightAxis, setRightAxis] = useState<string[]>([])
	const [seriesMetadata, setSeriesMetadata] = useState<Map<DataSeries, SeriesMetaData>>(new Map<DataSeries, SeriesMetaData>())
	const [barSeriesIndexes, setBarSeriesIndexes] = useState<Map<DataSeries | string, number>>(new Map<DataSeries | string, number>())
	const [dataSeriesFormatted, setDataSeriesFormatted] = useState<DataSeries[]>([])
	const [barGroups, setBarGroups] = useState<Map<string, MultiBar>>(new Map<string, MultiBar>())
	const [zoomedOut, setZoomedOut] = useState(true)
	const [dataInterval, setDataInterval] = useState(DAY)
	const actualAxis = useRef<Axis>({ beg: -1, end: -1 })
	const dragStates = useRef<DragState[]>([])
	const cachedBoundingRect = useRef<any>({ left: 0, top: 0, width: 0, height: 0 })
	const sizeChanged = useRef<boolean>(true)
	const init = useRef<boolean>(false)
	const xAxisChanging = useRef<boolean>(false)
	let timeoutId: number | null = null
	// const observer = useRef(
	// 	new ResizeObserver((entries) => {
	// 		if (timeoutId !== null) clearTimeout(timeoutId)
	// 		timeoutId = setTimeout(() => {
	// 			const firstEntry = entries[0]
	// 			setChartSizeState({ width: firstEntry.contentRect.width, height: firstEntry.contentRect.height })
	// 		}, 200) as unknown as number
	// 	})
	// )
	const handleTickChange = useCallback((ticks: number[], axisName: string) => {
		yTicks[axisName] = ticks
		setYTicks(Object.assign({}, yTicks))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleStartDrag = useCallback((e: any) => {
		if (e._reactName === 'onTouchStart') {
			const indentifiers = dragStates.current.map((state) => state.touchIndex)
			const newTouches = [...e.changedTouches].filter((touch: any) => !indentifiers.includes(touch.indentifier))
			for (let newTouch of newTouches) {
				dragStates.current.push({ target: e.target, touchIndex: newTouch.identifier, startX: newTouch.clientX, currentX: newTouch.clientX })
			}
		} else {
			dragStates.current.push({ target: e.target, touchIndex: -1, startX: e.clientX, currentX: e.clientX })
		}
	}, [])

	const handleEndDrag = useCallback((e: any) => {
		if (e._reactName === 'onTouchEnd') {
			for (let touch of [...e.changedTouches]) {
				const id = touch.identifier
				const index = dragStates.current.findIndex((item) => id === item.touchIndex)
				if (index !== -1) dragStates.current.splice(index, 1)
			}
		} else {
			dragStates.current.splice(0, dragStates.current.length)
		}
	}, [])

	const handleDrag = useCallback(
		(e: any) => {
			if (
				dragStates.current.length === 0 ||
				(chartSizeState.width || 0) === 0 ||
				actualAxis.current?.end === undefined ||
				actualAxis.current?.beg === undefined ||
				maxXAxis.end === undefined ||
				maxXAxis.beg === undefined
			) {
				return
			}
			let leftChange = 0
			let rightChange = 0
			const currentRange = actualAxis.current.end! - actualAxis.current.beg!
			const rightLeeway = ((maxXAxis.end - actualAxis.current.end) / currentRange) * chartSizeState.width
			const leftLeeway = ((actualAxis.current.beg - maxXAxis.beg) / currentRange) * chartSizeState.width
			if (e._reactName === 'onTouchMove') {
				const changedTouchesList = [...e.changedTouches]
				const validTouches = dragStates.current
				const changes = validTouches.map((touch) => {
					const t = changedTouchesList.find((changedTouch) => changedTouch.identifier === touch.touchIndex)
					return t ? t.clientX - touch.currentX : 0
				})
				const minIndex = changes.findIndex((item) => item === Math.min(...changes))
				const maxIndex = changes.findIndex((item) => item === Math.max(...changes))
				let sum = changes.length === 0 ? 0 : changes.reduce((a, b) => a + b, 0) / changes.length
				// sum = Math.min(rightLeeway, Math.max(-leftLeeway, sum))
				const zoom = changes.length === 0 ? 0 : (changes[maxIndex] - changes[minIndex]) / 2
				const zoomDirection = minIndex === -1 || maxIndex === -1 ? 0 : validTouches[maxIndex].currentX > validTouches[minIndex].currentX ? 1 : -1
				// console.log(sum)
				// console.log(zoom * zoomDirection)
				sum = Math.min(rightLeeway, Math.max(-leftLeeway, -sum))
				leftChange += sum
				leftChange += zoom * zoomDirection
				rightChange += sum
				rightChange -= zoom * zoomDirection
				for (let newTouch of e.changedTouches) {
					const index = dragStates.current.findIndex((drag) => drag.touchIndex === newTouch.identifier)
					if (index !== -1) {
						dragStates.current[index].currentX = newTouch.clientX
					}
				}
			} else {
				const dragState = dragStates.current[0]
				const change = e.clientX - dragState.currentX
				const correctedChange = Math.min(rightLeeway, Math.max(-leftLeeway, -change))
				// console.log(`${-change - correctedChange}`)
				dragState.currentX = e.clientX
				leftChange += correctedChange
				rightChange += correctedChange
			}
			if (!init.current) {
				init.current = true
				actualAxis.current.beg = xAxis.beg
				actualAxis.current.end = xAxis.end
			}
			if (leftChange === 0 && rightChange === 0) {
				return
			}
			actualAxis.current.beg! += (Math.max(-leftLeeway, leftChange) / chartSizeState.width) * currentRange
			actualAxis.current.end! += (Math.min(rightLeeway, rightChange) / chartSizeState.width) * currentRange
			// console.log(leftChange)
			if (xAxisChanging.current === false) {
				xAxisChanging.current = true
				setXAxis({ beg: actualAxis.current.beg, end: actualAxis.current.end })
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[chartSizeState, xAxis]
	)

	const handleScroll = useCallback(
		(e: any) => {
			if (xAxis.beg === undefined || xAxis.end === undefined || maxXAxis.beg === undefined || maxXAxis.end === undefined) {
				return
			}
			if (chartSizeState.width === 0 || chartSizeState.height === 0) {
				return
			}
			if (sizeChanged.current) {
				cachedBoundingRect.current = e.target.getBoundingClientRect()
				if ((cachedBoundingRect.current?.width || 0) > 100 && (cachedBoundingRect.current?.height || 0) > 100) sizeChanged.current = false
			}
			const axis = actualAxis.current!
			const rect = cachedBoundingRect.current
			const trueX = e.clientX - rect.left
			const xRatio = trueX / chartSizeState.width
			const xRangeLength = xAxis.end - xAxis.beg
			const mlp = e.deltaY < 0 ? 1 : e.deltaY === 0 ? 0 : -1
			const newSize = xRangeLength * (mlp >= 0 ? 1.07 ** mlp : 1.2 ** mlp)
			const diff = newSize - xRangeLength
			const newXAxis = { beg: Math.max(maxXAxis.beg, axis.beg! + diff * xRatio), end: Math.min(maxXAxis.end, axis.end! - diff * (1 - xRatio)) }
			actualAxis.current = newXAxis
			if (xAxisChanging.current === false) {
				xAxisChanging.current = true
				setXAxis(actualAxis.current)
			}
		},
		[sizeChanged, actualAxis, cachedBoundingRect, chartSizeState, xAxis, maxXAxis]
	)
	//block scrolling when pointer is on the chart
	useEffect(() => {
		const chartRef = ref.current
		const preventDefault = (e: any) => {
			// if (!zoomedOut || e.type === 'touchmove') e.preventDefault()
			e.preventDefault()
		}
		chartRef?.addEventListener('wheel', preventDefault)
		chartRef?.addEventListener('touchmove', preventDefault)

		return () => {
			chartRef?.removeEventListener('wheel', preventDefault)
			chartRef?.addEventListener('touchmove', preventDefault)
		}
	}, [ref, zoomedOut])
	//preprocess user data series
	useEffect(() => {
		let ds: DataSeries[] = []
		if (!(dataSeries as any).length) {
			ds.push(dataSeries as DataSeries)
		} else {
			ds = dataSeries as DataSeries[]
		}
		setDataSeriesFormatted(ds)
	}, [dataSeries])
	//create visibilityMap and group series
	useEffect(() => {
		if (dataSeriesFormatted.length === 0) return
		const visibilityMap = new Map<DataSeries, boolean>()
		for (let d of dataSeriesFormatted) {
			visibilityMap.set(d, true)
		}
		setVisibilityList(visibilityMap)
		const metadataMap = new Map<DataSeries, SeriesMetaData>()
		const barSeriesIndexesMap = new Map<DataSeries | string, number>()
		const seriesWithBarGroups = dataSeriesFormatted.filter((d) => d.barGroup !== undefined)
		const uniqueBarGroupsOccurences = getOccurences(seriesWithBarGroups.map((d) => d.barGroup!))
		const uniqueBarGroups = Object.keys(uniqueBarGroupsOccurences)
		const newBarGroupState = new Map<string, MultiBar>()
		let currentBarIndex = 0
		for (let group of uniqueBarGroups) {
			const ds = dataSeriesFormatted.filter((d) => d.barGroup === group)
			const pointList = prepareBarSeries(ds.map((d) => d.data))
			const colors = ds.map((d) => d.color)
			const combined = pointList.map((pt) => ({ x: pt.x, y: pt.ys.reduce((acc, cr) => acc + cr) } as ChartPoint))
			const meta = getSeriesMetadata(combined)
			const type = 'multi'
			const seriesGroup = ds[0].seriesGroup
			newBarGroupState.set(group, { data: pointList, colors, meta, type, seriesGroup, combined } as MultiBar)
			ds.forEach((d) => metadataMap.set(d, meta))
			barSeriesIndexesMap.set(group, currentBarIndex)
			currentBarIndex += 1
		}
		setBarGroups(newBarGroupState)
		for (let series of dataSeriesFormatted) {
			const metadata = getSeriesMetadata(series.data)
			metadataMap.set(series, metadata)
			if (series.type === 'bars' && !uniqueBarGroups.includes(series.barGroup || '')) {
				barSeriesIndexesMap.set(series, currentBarIndex)
				currentBarIndex += 1
			}
		}
		setBarSeriesIndexes(barSeriesIndexesMap)
		setSeriesMetadata(metadataMap)
		setDataInterval(Math.min(...Array.from(metadataMap.values()).map((val) => val.minInterval)))
		const metaDataList: SeriesMetaData[] = []
		metadataMap.forEach((meta) => metaDataList.push(meta))
		const beg = Math.min(...metaDataList.map((data) => data.beg))
		const end = Math.max(...metaDataList.map((data) => data.end))
		const maxCount = Math.max(...metaDataList.map((data) => data.count))
		const averageSampleInterval = (end - beg) / maxCount
		// currentXAxis = newXAxis
		setXAxis({ beg: beg - averageSampleInterval, end: end + averageSampleInterval })
		setMaxXAxis({ beg: beg - averageSampleInterval, end: end + averageSampleInterval })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSeriesFormatted])
	// series' axis assingment
	useEffect(() => {
		if (dataSeriesFormatted.length === 0) return
		const uniqueAxis = getOccurences(dataSeriesFormatted.map((d) => d.seriesGroup))
		const uniqueAxisList = Object.keys(uniqueAxis).map((key) => [key, uniqueAxis[key]])
		uniqueAxisList.sort((a: any, b: any) => b[1] - a[1])
		const leftAxis: string[] = []
		const rightAxis: string[] = []
		uniqueAxisList.forEach((val, index) => {
			if (index === 0) {
				leftAxis.push(val[0] as string)
			} else {
				rightAxis.push(val[0] as string)
			}
		})
		setLeftAxis(leftAxis)
		setRightAxis(rightAxis)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSeriesFormatted, seriesMetadata])
	// create metadatas for series
	useEffect(() => {
		if (xAxis.beg === undefined || xAxis.end === undefined) return
		if (xAxis.beg === maxXAxis.beg && xAxis.end === maxXAxis.end) {
			setTimeout(() => setZoomedOut(true), 1000)
		} else {
			setZoomedOut(false)
		}
		const yState: { [id: string]: { beg: number; end: number } } = {}
		for (let axisName of [...leftAxis, ...rightAxis]) {
			const dss = dataSeriesFormatted.filter((d) => d.seriesGroup === axisName)
			let max: number | undefined = undefined
			let min: number | undefined = undefined
			for (let d of dss) {
				const meta = seriesMetadata.get(d)
				let data = d.data
				if (d.type === 'bars') {
					if (max === undefined || 0 > max) max = 0
					if (min === undefined || 0 < min) min = 0
				}
				if (d.barGroup !== undefined) {
					data = barGroups.get(d.barGroup)!.combined
				}
				if (!meta) continue
				const firstValue = findFirstValueInRange(xAxis.beg, data, meta)
				const lastValue = findLastValueInRange(xAxis.end, data, meta)
				if (firstValue !== undefined) {
					if (max === undefined || firstValue > max) max = firstValue
					if (min === undefined || firstValue < min) min = firstValue
				}
				if (lastValue !== undefined) {
					if (max === undefined || lastValue > max) max = lastValue
					if (min === undefined || lastValue < min) min = lastValue
				}

				for (let dp of meta.extremumList) {
					if (dp.x >= xAxis.beg && dp.x <= xAxis.end) {
						if (max === undefined || dp.y > max) max = dp.y
						if (min === undefined || dp.y < min) min = dp.y
					}
				}
			}
			if (min === undefined || max === undefined) {
				continue
			}
			const exactAxis = { beg: Math.min(min, max), end: Math.max(min, max) }
			const axisLength = Math.max(
				exactAxis.end - exactAxis.beg,
				0.01 *
					Math.min(
						...dss.map((dd) => {
							const meta = seriesMetadata.get(dd)
							if (meta) return meta.max - meta.min
							else return Number.MAX_SAFE_INTEGER
						})
					)
			)
			const average = (exactAxis.beg + exactAxis.end) / 2
			const newAxis = { beg: average - (axisLength / 2) * 1.1, end: average + (axisLength / 2) * 1.1 }
			yState[axisName] = newAxis
		}
		setYAxis(yState)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [xAxis, maxXAxis, leftAxis, rightAxis])
	// set up chart size observer
	useEffect(() => {
		const currentEl = ref.current
		ResizeSensor(currentEl, () => {
			if (currentEl?.clientHeight === undefined || currentEl?.clientWidth === undefined) {
				return
			}
			setChartSizeState({ width: currentEl?.clientWidth, height: currentEl?.clientHeight })
		})
		// const currentObserver = observer.current
		// if (currentEl) currentObserver.observe(currentEl)
		// return () => {
		// 	if (currentEl) currentObserver.unobserve(currentEl)
		// }
	}, [ref])
	// update xAxis
	useEffect(() => {
		if (init.current !== true || xAxisChanging.current !== true) {
			actualAxis.current = xAxis
			init.current = true
			return
		}
		if (actualAxis.current.beg !== xAxis.beg || actualAxis.current.end !== xAxis.end) {
			setTimeout(() => setXAxis(actualAxis.current), 15)
		} else {
			xAxisChanging.current = false
		}
	}, [xAxis])
	// update sizeChanged flag
	useEffect(() => {
		if (chartSizeState.height <= 0 || chartSizeState.width <= 0) {
			sizeChanged.current = true
		}
	}, [chartSizeState])

	return (
		<SMainGridContainer>
			<SChartTitle>{chartTitle}</SChartTitle>
			{/* <SChartTools>
				<ChartScaleSwitch />
			</SChartTools> */}
			<ChartLegend dataSeries={dataSeriesFormatted} visibilityList={visibilityList} setVisibilityList={setVisibilityList} />

			{leftAxis.map((axis, index) => {
				return (
					<SyAxis key={index} style={{ marginLeft: 'auto', marginRight: '0' }}>
						<ChartValueAxis range={yAxis[axis]} axisName={axis} chartSize={chartSizeState} setTicks={handleTickChange} unitDesc={axis} alignment="vertical" />
					</SyAxis>
				)
			})}
			<SxAxis>
				<ChartDateAxis range={xAxis} chartSize={chartSizeState} setTicks={setXTicks} />
			</SxAxis>
			{rightAxis.map((axis, index) => {
				return (
					<SyRightAxis key={index}>
						<ChartValueAxis range={yAxis[axis]} axisName={axis} chartSize={chartSizeState} setTicks={handleTickChange} unitDesc={axis} leftSide={false} alignment="vertical" />
					</SyRightAxis>
				)
			})}
			<SChartContainer
				ref={ref}
				style={{
					height: `${chartHeight}`
				}}
				onWheel={handleScroll}
				onTouchStart={handleStartDrag}
				onTouchMove={handleDrag}
				onTouchEnd={handleEndDrag}
				onMouseDown={handleStartDrag}
				onMouseMove={handleDrag}
				onMouseUp={handleEndDrag}
				onMouseLeave={handleEndDrag}
			>
				{dataSeriesFormatted.map((ds, index) => {
					if (ds.type === 'line') {
						return <ChartSeries key={index} meta={seriesMetadata.get(ds)} points={ds.data} xRange={xAxis} yRange={yAxis[ds.seriesGroup]} color={ds.color} />
					} else if (!ds.barGroup) {
						// return <ChartBarSeries key={index} meta={seriesMetadata.get(ds)} points={ds.data} xRange={xAxis} yRange={yAxis[ds.seriesGroup]} barSpace={0} color={ds.color} barIndex={barSeriesIndexes.get(ds)} indexesCount={2} />
						return (
							<ChartBarSeries
								key={index}
								meta={seriesMetadata.get(ds)}
								points={ds.data}
								xRange={xAxis}
								yRange={yAxis[ds.seriesGroup]}
								barSpace={0.2}
								color={[ds.color]}
								barIndex={barSeriesIndexes.get(ds)}
								indexesCount={barSeriesIndexes.size}
								interval={dataInterval}
							/>
						)
					} else {
						return undefined
					}
				})}
				{Array.from(barGroups).map((group, index) => {
					return (
						<ChartBarSeries
							key={index}
							meta={group[1].meta}
							points={group[1].data}
							xRange={xAxis}
							yRange={yAxis[group[1].seriesGroup]}
							barSpace={0.2}
							color={group[1].colors}
							barIndex={barSeriesIndexes.get(group[0])}
							indexesCount={barSeriesIndexes.size}
							interval={dataInterval}
						/>
					)
				})}
				<ChartForeground dataSeries={dataSeriesFormatted} metaDatas={seriesMetadata} chartSize={chartSizeState} xAxis={xAxis} />
				<ChartBackground xTicks={xTicks} yTicks={yTicks} />
			</SChartContainer>
			<ChartScale chartSize={chartSizeState} maxRange={maxXAxis} xRange={xAxis} setXRange={setXAxis}></ChartScale>
		</SMainGridContainer>
	)
}

export default ChartContent
