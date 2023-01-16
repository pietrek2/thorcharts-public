import React, { useEffect, useState } from 'react'
import { DataSeries, SeriesMetaData } from './ChartContent'
import { Circle, LegendCircleContainer, LegendContainer, LegendItemContainer, LegendSpan, LegendSubItemContainer } from './styles'

interface ChartLegendProps {
	dataSeries: DataSeries[]
	visibilityList: Map<DataSeries, boolean>
	setVisibilityList: React.Dispatch<React.SetStateAction<Map<DataSeries, boolean>>>
}

interface LegendItem {
	dataSeries: DataSeries
	visibility: boolean
}

const svgDim = 1000
const ChartLegend: React.FC<ChartLegendProps> = ({ dataSeries, visibilityList, setVisibilityList }) => {
	const [legendItems, setLegendItems] = useState<LegendItem[]>([])
	useEffect(() => {
		const newLegendItems: LegendItem[] = []
		for (let ds of dataSeries) {
			const visibility = visibilityList.get(ds)
			if (visibility === undefined) continue
			newLegendItems.push({ dataSeries: ds, visibility: visibility })
		}
		setLegendItems(newLegendItems)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSeries, visibilityList, setVisibilityList])

	return (
		<LegendContainer>
			{legendItems.map((item, index) => {
				return (
					<LegendItemContainer key={index}>
						<LegendCircleContainer>
							<Circle key={`${index} cirle`} style={{ backgroundColor: item.dataSeries.color }} />
						</LegendCircleContainer>
						<LegendSubItemContainer>
							<LegendSpan key={`${index} span`}>{item.dataSeries.name}</LegendSpan>
						</LegendSubItemContainer>
					</LegendItemContainer>
				)
			})}
		</LegendContainer>
	)
}

export default ChartLegend
