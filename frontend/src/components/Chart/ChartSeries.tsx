import React, { useEffect, useState } from 'react'
import { SeriesMetaData } from './ChartContent'
import { SsvgChartContent } from './styles'

interface ChartSeriesProps {
	points: ChartPoint[]
	meta: SeriesMetaData | undefined
	xRange: { beg: number | undefined; end: number | undefined }
	yRange: { beg: number | undefined; end: number | undefined }
	color: string
}

interface ChartPoint {
	x: number
	y: number
}
const svgDim = 1000
const ChartSeries: React.FC<ChartSeriesProps> = ({ points, meta, xRange, yRange, color }) => {
	const [pathState, setPathState] = useState('')
	const [viewBox, setViewBox] = useState<[number, number, number, number]>([0, 0, svgDim, svgDim])
	useEffect(() => {
		if (!meta) return
		const xRangeLength = meta.end - meta.beg
		const yRangeLength = meta.max - meta.min
		const pointStrings = points.map((point) => {
			const scaledPoint = {
				x: ((point.x - meta.beg!) / xRangeLength) * svgDim,
				y: (1 - (point.y - meta.min!) / yRangeLength) * svgDim
			}
			return `${scaledPoint.x},${scaledPoint.y}`
		})
		setPathState(pointStrings.join(' '))
	}, [points, meta])

	useEffect(() => {
		if (yRange?.beg === undefined || yRange?.end === undefined) {
			return
		}
		if (xRange?.beg === undefined || xRange?.end === undefined) {
			return
		}
		if (!meta) {
			return
		}
		const viewBox: [number, number, number, number] = [0, 0, svgDim, svgDim]
		const xRangeLength = xRange.end - xRange.beg
		const yRangeLength = yRange.end - yRange.beg
		const xMetaRange = meta.end - meta.beg
		const yMetaRange = meta.max - meta.min
		viewBox[0] = ((xRange.beg - meta.beg) / xMetaRange) * svgDim
		viewBox[1] = ((meta.max - yRange.end) / yMetaRange) * svgDim
		viewBox[2] = (xRangeLength / xMetaRange) * svgDim
		viewBox[3] = (yRangeLength / yMetaRange) * svgDim
		setViewBox(viewBox)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [xRange, yRange])

	return (
		<SsvgChartContent height={svgDim} width={svgDim} viewBox={`${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`} preserveAspectRatio="none">
			<polyline points={pathState} preserveAspectRatio="none" style={{ fill: 'none', vectorEffect: 'non-scaling-stroke', stroke: color, strokeWidth: 1 }} />
		</SsvgChartContent>
	)
}

export default ChartSeries
