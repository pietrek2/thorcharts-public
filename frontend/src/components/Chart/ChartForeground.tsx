import React, { useCallback, useEffect, useRef, useState } from 'react'
import { nFormatter } from '../../utils/numbers'
import { Axis, ChartPoint, DataSeries, SeriesMetaData } from './ChartContent'
import ChartToolTip, { LegendItem } from './ChartToolTip'
import { FullScaleDiv, SChartCrossHair, SChartRect, SsvgChartForeground } from './styles'

interface ChartForegroundProps {
	dataSeries: DataSeries[]
	metaDatas: Map<DataSeries, SeriesMetaData>
	chartSize: { width: number; height: number }
	xAxis: Axis
}

const findNearestValue = (value: number, series: ChartPoint[], meta: SeriesMetaData) => {
	const predictedIndex = Math.min(series.length - 1, Math.max(0, Math.ceil((series.length * (value - meta.beg)) / (meta.end - meta.beg))))
	let currentIndex = predictedIndex
	let minDist = Math.abs(value - series[currentIndex].x)
	if (series[currentIndex].x === value) {
		return series[currentIndex]
	} else if (series[currentIndex].x > value) {
		while (series[currentIndex] !== undefined) {
			const previousValue = series[currentIndex - 1]
			if (previousValue === undefined || Math.abs(value - previousValue.x) >= minDist) {
				return series[currentIndex]
			}
			minDist = Math.abs(value - previousValue.x)
			currentIndex -= 1
		}
	} else {
		while (series[currentIndex].x < value) {
			const nextValue = series[currentIndex + 1]
			if (nextValue === undefined || Math.abs(value - nextValue.x) >= minDist) {
				return series[currentIndex]
			}
			minDist = Math.abs(value - nextValue.x)
			currentIndex -= 1
		}
	}
	return series[currentIndex]
}

const toolTipOffset = 10
const dataFormat = (timestamp: number): string => {
	const format = { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', day: 'numeric', month: 'short', year: 'numeric' } as any
	return new Intl.DateTimeFormat('en-us', format).format(timestamp)
}

const ChartForeground: React.FC<ChartForegroundProps> = ({ dataSeries, metaDatas, chartSize, xAxis }) => {
	const sizeChanged = useRef(true)
	const cachedBoundingRect = useRef<any>({ left: 0, top: 0, width: 0, height: 0 })
	const [toolTipRef, setToolTipRef] = useState<HTMLDivElement | null>(null)
	const [cursorLocation, setCursorLocation] = useState<{ x: number; y: number } | undefined>(undefined)
	const [crossLocation, setCrossLocation] = useState<{x: number, y: number} | undefined>(undefined)
	const [toolTipHidden, setToolTipHidden] = useState(true)
	const [toolTipLocation, setToolTipLocation] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
	const [toolTipDate, setToolTipDate] = useState<string>('')
	const [toolTipItems, setToolTipItems] = useState<LegendItem[]>([])
	const handleLeave = useCallback(
		(e: any) => {
			setCursorLocation(undefined)
			if (!toolTipHidden) setToolTipHidden(true)
		},
		[toolTipHidden]
	)
	const handleHover = useCallback(
		(e: any) => {
			if (sizeChanged.current) {
				cachedBoundingRect.current = e.target.getBoundingClientRect()
				if ((cachedBoundingRect.current?.width || 0) > 100 && (cachedBoundingRect.current?.height || 0) > 100) sizeChanged.current = false
			}
			setCursorLocation({ x: e.clientX - cachedBoundingRect.current.left, y: e.clientY - cachedBoundingRect.current.top })
			if (toolTipRef) {
				const width = toolTipRef.clientWidth
				const height = toolTipRef.clientHeight
				const x = e.clientX - cachedBoundingRect.current.left + toolTipOffset
				const y = e.clientY - cachedBoundingRect.current.top + toolTipOffset
				const trueX = x + Math.max(0, width - cachedBoundingRect.current.width) - Math.max(0, x + toolTipOffset + width - cachedBoundingRect.current.width)
				const trueY = y + Math.max(0, height - cachedBoundingRect.current.height) - Math.max(0, y + toolTipOffset + height - cachedBoundingRect.current.height)
				setToolTipLocation({ x: trueX, y: trueY })
			} else {
				setToolTipLocation({ x: e.clientX - cachedBoundingRect.current.left + toolTipOffset, y: e.clientY - cachedBoundingRect.current.top + toolTipOffset })
			}
			if (toolTipHidden) setToolTipHidden(false)
		},
		[toolTipHidden, toolTipRef]
	)
	useEffect(() => {
		sizeChanged.current = true
	}, [chartSize])
	useEffect(() => {
		if (cursorLocation && xAxis.beg && xAxis.end && (xAxis.end - xAxis.beg) > 0 && chartSize.width > 0) {
			const timestamp = cursorLocation.x/chartSize.width*(xAxis.end - xAxis.beg) + xAxis.beg
			const toolTipInfo = dataSeries.map((ds) => {
				const meta = metaDatas.get(ds)
				if (!meta) return undefined
				const nearestValue = findNearestValue(timestamp, ds.data, meta)
				if (nearestValue === undefined) {
					return undefined
				}
				return {
					color: ds.color,
					value: `${nFormatter(nearestValue.y, ds.unitSymbol)}`,
					name: ds.name,
					dist: Math.abs(nearestValue.x - timestamp),
					item: nearestValue,
				}
			})
			let toolTipFiltered = toolTipInfo.filter((item) => item !== undefined)
			const toolTipFilteredCopy = [...toolTipFiltered]
			toolTipFilteredCopy.sort((a, b) => a!.dist - b!.dist)
			const chosenTimestamp = toolTipFilteredCopy.length > 0? toolTipFilteredCopy[0]!.item.x: timestamp
			const tolerance = 60
			toolTipFiltered = toolTipFiltered.filter((item) => Math.abs(item!.item.x - chosenTimestamp) <= tolerance)
			const dateString = dataFormat(chosenTimestamp * 1000)
			const xCoord = (chosenTimestamp - xAxis.beg) / (xAxis.end - xAxis.beg) * cachedBoundingRect.current.width
			setToolTipDate(dateString)
			setCrossLocation({x: xCoord, y: cursorLocation.y})
			if (toolTipFiltered) {
				setToolTipItems(toolTipFiltered as LegendItem[])
			}
		}
	}, [cursorLocation])
	useEffect(() => {
		const listener = () => {
			sizeChanged.current = true
		}
		const element = document.getElementById('main-content')
		if (element) element.addEventListener('scroll', listener, false)
		return () => {
			if (element) element.removeEventListener('scroll', listener, false)
		}
	}, [])
	return (
		<FullScaleDiv onClick={(e) => e.preventDefault()} onMouseLeave={handleLeave} onMouseMove={handleHover}>
			<ChartToolTip setRef={setToolTipRef} legendItems={toolTipItems} formattedDate={toolTipDate} position={toolTipLocation} hidden={toolTipHidden}></ChartToolTip>
			<SsvgChartForeground preserveAspectRatio="none">
				<SChartRect x="0%" width="100%" y="0%" height="100%" vectorEffect="non-scaling-stroke"></SChartRect>
			</SsvgChartForeground>
			{cursorLocation && (
				<SsvgChartForeground preserveAspectRatio="none">
					<SChartCrossHair x1={crossLocation ? crossLocation.x : 0} x2={crossLocation ? crossLocation.x : 0} y1="0%" y2="100%" vectorEffect="non-scaling-stroke" />
					<SChartCrossHair x1="0%" x2="100%" y1={crossLocation ? crossLocation.y : 0} y2={crossLocation ? crossLocation.y : 0} vectorEffect="non-scaling-stroke" />
				</SsvgChartForeground>
			)}
		</FullScaleDiv>
	)
}

export default ChartForeground
