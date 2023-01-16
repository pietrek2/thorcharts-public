import React, { useEffect, useState } from 'react'
import { ChartMultiPoint, ChartPoint, MultiBar, SeriesMetaData } from './ChartContent'
import { SsvgChartContent } from './styles'

interface ChartBarSeriesProps {
	points: ChartPoint[] | ChartMultiPoint[]
	meta: SeriesMetaData | undefined
	xRange: { beg: number | undefined; end: number | undefined }
	yRange: { beg: number | undefined; end: number | undefined }
	color: string[]
    barSpace: number
    barIndex?: number
    indexesCount?: number
    interval?: number
}

interface Bar {
    x: number,
    ys: number[],
    width: number,
}
const svgDim = 1000
const ChartBarSeries: React.FC<ChartBarSeriesProps> = ({ points, meta, xRange, yRange, color, barSpace, barIndex, indexesCount, interval}) => {
    const [pathStates, setPathStates] = useState<{points: string[], color: string}[] | undefined>(undefined)
	const [viewBox, setViewBox] = useState<[number, number, number, number]>([0, 0, svgDim, svgDim])
    const [pointsFormatted, setPointsFormatted] = useState<ChartMultiPoint[] | undefined>(undefined)
    const [single, setSingle] = useState(true)
	useEffect(() => {
        if (!meta || pointsFormatted === undefined)
        return
        const output: Bar[] = []
        const min = Math.min(0, meta.min)
        const max = Math.max(0, meta.max)
        const xRangeLength = meta.end - meta.beg
        const yRangeLength = max - min
        const zeroPoint = max / yRangeLength * svgDim
        // const zeroPoint = Math.min(svgDim, Math.max(0, trueZeroPoint))
        const xScale = svgDim / xRangeLength
        let prevBar: Bar | undefined = undefined
        for(let i=0;i<points.length;i++) {
            const nextPoint = pointsFormatted[i + 1]
            const point = pointsFormatted[i]
            const bar: Bar = {x: 0, ys: [], width: 0}
            bar.x = (point.x - meta.beg!) * xScale
            bar.ys = point.ys.map((y) => y / yRangeLength * svgDim)
            if (interval !== undefined) {
                bar.width = interval * xScale
            }
            else {
                if (prevBar === undefined) {
                    if (!nextPoint) {
                        bar.width = Math.min(bar.x, svgDim - bar.x)
                    }
                    else {
                        bar.width = (nextPoint.x - point.x) * xScale
                    }
                }
                else {
                    if (!nextPoint) {
                        const dist = bar.x - (prevBar.x + prevBar.width / 2)
                        bar.width = dist * 2
                    }
                    else {
                        bar.width = Math.min((bar.x - prevBar.x + prevBar.width) * 2, (nextPoint.x - point.x) * xScale)
                    }
                }
            }
            output.push(bar)
            prevBar = bar
        }
        const forwardPoints: ChartPoint[][] = []
        const backwardPoints: ChartPoint[][] = []
        const allPoints: string[][] = []
        if (barIndex !== undefined && indexesCount !== undefined) {
            for(let bar of output) {
                const relWidth = bar.width * (1 - barSpace)
                const xBeg = bar.x - relWidth / 2 + (barIndex / indexesCount) * relWidth
                const xEnd = xBeg + relWidth / indexesCount
                if (bar.ys.length > forwardPoints.length) {
                    forwardPoints.push(...bar.ys.map(() => []))
                }
                if (bar.ys.length > backwardPoints.length) {
                    backwardPoints.push(...bar.ys.map(() => []))
                }
                let prevPoint = zeroPoint
                bar.ys.forEach((y, index) => {
                    const trueY = prevPoint - y
                    const pointF = forwardPoints[index]
                    const pointB = backwardPoints[index]
                    pointF.push({x: xBeg, y: prevPoint})
                    pointF.push({x: xBeg, y: trueY})
                    pointF.push({x: xEnd, y: trueY})
                    pointF.push({x: xEnd, y: prevPoint})
                    pointB.push({x: xBeg, y: prevPoint})
                    pointB.push({x: xEnd, y: prevPoint})
                    // pointF.push(`${xBeg},${prevPoint}`)
                    // pointF.push(`${xBeg},${trueY}`)
                    // pointF.push(`${xEnd},${trueY}`)
                    // pointF.push(`${xEnd},${prevPoint}`)
                    // pointB.push(`${xBeg},${prevPoint}`)
                    // pointB.push(`${xEnd},${prevPoint}`)
                    prevPoint = trueY
                })
            }
        }
        const backwardPointsProcessed = backwardPoints.map((l) => {
            l.reverse()
            let lastY: number | undefined = undefined
            return l.filter((pnt, index) => {
                const lY = lastY
                lastY = pnt.y
                if (lY === undefined) {
                    return true
                }
                const nextPoint = l[index + 1]
                if (!nextPoint)
                    return true
                return nextPoint.y !== pnt.y || pnt.y !== lY
            })
        })
        forwardPoints.forEach((l, i) => allPoints.push([...forwardPoints[i].map((i => `${i.x},${i.y}`)), ...backwardPointsProcessed[i].map((i => `${i.x},${i.y}`))]))
        const newState = allPoints.map((item, index) => ({points: item, color: color[index]}))
        setPathStates(newState)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pointsFormatted, meta])

    useEffect(() => {
        if (points === undefined) {
            return
        }
        if (points.length === 0 || (points as ChartPoint[])[0].y !== undefined) {
            setPointsFormatted(points.map((pt: any) => {return {x: pt.x, ys: [pt.y]}}))
        }
        else {
            setPointsFormatted(points as ChartMultiPoint[])
            setSingle(false)
        }
    }, [points])

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
        const min = Math.min(0, meta.min)
        const max = Math.max(0, meta.max)
		const xRangeLength = xRange.end - xRange.beg
		const yRangeLength = yRange.end - yRange.beg
		const xMetaRange = meta.end - meta.beg
		const yMetaRange = max - min
		viewBox[0] = (xRange.beg - meta.beg) / xMetaRange * svgDim
		viewBox[1] = (max - yRange.end) / yMetaRange * svgDim
		viewBox[2] = xRangeLength / xMetaRange * svgDim
		viewBox[3] = yRangeLength / yMetaRange * svgDim
		setViewBox(viewBox)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [xRange, yRange])

	return (
		<SsvgChartContent height={svgDim} width={svgDim} viewBox={`${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`} preserveAspectRatio="none">
            {
                // barState.map((bar, index) => {
                //     return <rect key={index} x={`${bar.x - bar.width/2}`} width={`${bar.width}`} y={`${bar.y}`} height={`${svgDim - bar.y}`} style={{fill: `green`, stroke: "none"}} color={color}></rect>
                // })
                pathStates && pathStates.map((item, index) => {
                    return <polyline key={index} points={item.points.join(" ")} preserveAspectRatio="none" style={{ fill: item.color, stroke: "none" }} />
                })
            }
		</SsvgChartContent>
	)
}

export default ChartBarSeries
