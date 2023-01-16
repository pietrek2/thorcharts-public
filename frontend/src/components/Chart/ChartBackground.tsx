import React, { useEffect, useState } from 'react'
import { SChartLightStroke, SChartRect, SsvgChartBackground } from './styles'

interface ChartBackgroundProps {
	xTicks: number[]
	yTicks: {[name: string]: number[]}
}

const ChartBackground: React.FC<ChartBackgroundProps> = ({ xTicks, yTicks}) => {
	const [yTicksFormatted, setYTicksFormatted] = useState<number[]>([])
	useEffect(() => {
		const ticks: number[] = []
		Object.keys(yTicks).forEach(key => {
			const tickGroup = yTicks[key]
			tickGroup.forEach(tick => {
				ticks.push(tick)
			})
		})
		setYTicksFormatted(ticks)
	}, [yTicks])
	return (
		<SsvgChartBackground preserveAspectRatio="none">
			{xTicks.map((tick, index) => {
				return <SChartLightStroke key={`${index}-x`} x1={`${tick}%`} x2={`${tick}%`} y1="0%" y2="100%" vectorEffect="non-scaling-stroke" />
			})}
			{yTicksFormatted.map((tick, index) => {
				return <SChartLightStroke key={`${index}-y1`} x1="0%" x2="100%" y1={`${tick}%`} y2={`${tick}%`} vectorEffect="non-scaling-stroke" />
			})}
		</SsvgChartBackground>
	)
}

export default ChartBackground
