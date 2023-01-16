import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ITHORDistribution } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSVThorDistribution = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorswap', 'vthor_distribution')) as ITHORDistribution[]
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
					name: 'wallets with >= 50k [vthor]',
					type: 'line',
					seriesGroup: '',
					color: 'green',
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'wallets with >= 10k [vthor]',
					type: 'line',
					seriesGroup: '',
					color: 'orange',
					unitSymbol: ''
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'wallets with >= 1k [vthor]',
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
				chartTitle="[TS]: vTHOR Distribution"
				chartDesc="vTHOR distribution among holders."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="334c0e26-3089-4698-ab67-1498402d42e6"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSVThorDistribution
