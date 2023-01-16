import React, { useEffect, useState } from 'react'
import { nFormatter } from '../../utils/numbers';
import { SChartLightStroke, SHeavy, SSmall, VerticalText, VerticalTextRight } from './styles'

interface ChartValueAxisProps {
	range: { beg: number | undefined; end: number | undefined }
	chartSize: { width: number; height: number }
	alignment: 'horizontal' | 'vertical'
	leftSide?: boolean
	axisName: string
	setTicks: (ticks: number[], axisName: string) => void
	unitDesc: string
}
const optimalAxisSpace = 75
const getMagnitude = (n: number) => {
	var order = Math.floor(Math.log(n) / Math.LN10 + 0.000000001)
	return order
}
const modes: { [key: number]: any } = {
	1: { bins: [0.75, 1.5] },
	2: { bins: [1.5, 3.5] },
	5: { bins: [3.5, 7.5] },
	10: { bins: [7.5, 15] }
}
const magnitudeDescriptors: { [key: number]: any } = {
	3: 'K',
	6: 'M',
	9: 'B',
	12: 'T'
}
const findHighestDescriptor = (mag: number) => {
	let descriptor = ''
	let mg = 0
	for (let key of Object.keys(magnitudeDescriptors).map((key) => parseInt(key))) {
		if (mg < key && mag >= key) {
			descriptor = magnitudeDescriptors[key]
			mg = key
		}
	}
	return { mg, descriptor }
}
const valueToString = (val: number) => {
	// const mag = getMagnitude(val)
	// const desc = findHighestDescriptor(mag)
	// return (val / 10 ** desc.mg).toString() + desc.descriptor
	return nFormatter(val, "")
}
const chooseOptimalIncrement = (averageTickLength: number) => {
	const mag = getMagnitude(averageTickLength)
	const sig = averageTickLength / 10 ** mag
	let bestInterval = 1
	for (let mode of Object.keys(modes).map((mod) => parseInt(mod))) {
		if (sig > modes[mode].bins[0] && sig <= modes[mode].bins[1]) {
			bestInterval = mode
			break
		}
	}
	return 10 ** mag * bestInterval
}

const ChartValueAxis: React.FC<ChartValueAxisProps> = ({ range, chartSize, alignment, axisName, setTicks, unitDesc, leftSide = true }) => {
	const [optIntCount, setOptIntCount] = useState(2)
	const [axisDesc, setAxisDesc] = useState<{ coord: number; val: string; bold: boolean }[]>([])
	const [isInitialized, setIsInitialized] = useState(false)
	const [seriesTicks, setSeriesTicks] = useState<number[]>([])

	useEffect(() => {
		if (chartSize.height === 0 || chartSize.width === 0) {
			return
		}
		const optimalTickCount = Math.max(alignment === 'horizontal' ? chartSize.width : chartSize.height / optimalAxisSpace, 2)
		const tickRounded = Math.round(optimalTickCount)
		if (tickRounded !== optIntCount) {
			setOptIntCount(tickRounded)
		}
		if (!isInitialized) {
			setIsInitialized(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chartSize])

	useEffect(() => {
		if (!isInitialized) {
			return
		}
		if (range?.beg === undefined || range?.end === undefined) {
			return
		}
		const rangeLength = range.end - range.beg
		const averageTickLength = rangeLength / optIntCount
		const optimalIncrement = chooseOptimalIncrement(averageTickLength)
		const descs: { coord: number; val: string; bold: boolean }[] = []
		let currentValue = Math.floor(range.beg / optimalIncrement) * optimalIncrement
		while (currentValue < range.end) {
			if (currentValue > range.beg && currentValue < range.end) {
				descs.push({
					coord: 100 - ((currentValue - range.beg) / rangeLength) * 100,
					val: valueToString(currentValue),
					bold: false
				})
			}
			currentValue += optimalIncrement
		}
		setAxisDesc(descs)
		const newCoords = descs.map((desc) => desc.coord)
		setSeriesTicks(newCoords)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [range, optIntCount, isInitialized])

	useEffect(() => {
		setTicks(seriesTicks, axisName)
	}, [axisName, seriesTicks, setTicks])

	return (
		<div style={{"height": "100%", "display": "flex"}}>
			{leftSide === true && <VerticalText>{unitDesc}</VerticalText>}
			<div style={{"width": "50px", "height": "100%", "display": "flex"}}>
				<svg height="100%" width="100%" style={{"height": "100%", "width": "100%"}} preserveAspectRatio='none' overflow="visible">
					{axisDesc.map((ax, index) => {
						if (ax.bold) {
							return (
								<SHeavy
									key={index}
									dominantBaseline="middle"
									x={alignment === 'horizontal' ? `${ax.coord}%` : '50%'}
									y={alignment === 'horizontal' ? '50%' : `${ax.coord}%`}
									vectorEffect="non-scaling-stroke"
									textAnchor="middle"
								>
									{ax.val}
								</SHeavy>
							)
						} else {
							return (
								<SSmall
									key={index}
									dominantBaseline="middle"
									x={alignment === 'horizontal' ? `${ax.coord}%` : '50%'}
									y={alignment === 'horizontal' ? '50%' : `${ax.coord}%`}
									vectorEffect="non-scaling-stroke"
									textAnchor="middle"
								>
									{ax.val}
								</SSmall>
							)
						}
					})}
					{axisDesc.map((ax, index) => {
						return (
							<SChartLightStroke
								key={`${index}-line`}
								x1={alignment === 'horizontal' ? `${ax.coord}%` : leftSide ? '80%' : '20%'}
								x2={alignment === 'horizontal' ? `${ax.coord}%` : leftSide ? '100%' : '0%'}
								y1={alignment === 'horizontal' ? (leftSide ? '80%' : '20%') : `${ax.coord}%`}
								y2={alignment === 'horizontal' ? (leftSide ? '100%' : '0%') : `${ax.coord}%`}
								vectorEffect="non-scaling-stroke"
							/>
						)
					})}
				</svg>
			</div>
			{leftSide === false && <VerticalTextRight>{unitDesc}</VerticalTextRight>}
		</div>
	)
}

export default ChartValueAxis
