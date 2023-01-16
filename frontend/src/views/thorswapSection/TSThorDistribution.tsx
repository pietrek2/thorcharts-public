import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ITHORDistribution } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSThorDistribution = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorswap', 'thor_distribution')) as ITHORDistribution[]
			const series1 = chartData.map((element: ITHORDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_50K }
			})
			const series2 = chartData.map((element: ITHORDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_10K }
			})
			const series3 = chartData.map((element: ITHORDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_1K }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'wallets with >= 50k [thor]',
					type: 'line',
					seriesGroup: '',
					color: 'green',
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'wallets with >= 10k [thor]',
					type: 'line',
					seriesGroup: '',
					color: 'orange',
					unitSymbol: ''
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'wallets with >= 1k [thor]',
					type: 'line',
					seriesGroup: '',
					color: `${color}`,
					unitSymbol: ''
				}
			])
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		let mainColor = theme === 'dark' ? 'white' : 'black'
		InitializeData(mainColor)
	}, [theme])
	if (dataSeries !== undefined) {
		return (
			<ChartPage
				chartTitle="[TS]: THOR Distribution"
				chartDesc="THOR distribution among holders."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="b1a144ba-bd3b-493a-9b3f-42ebdfc9c2a5"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSThorDistribution
