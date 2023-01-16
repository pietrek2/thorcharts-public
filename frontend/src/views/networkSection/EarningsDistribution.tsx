import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ITCEarningsDistribution } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const EarningsDistribution = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_rune_earnings_distribution')) as ITCEarningsDistribution[]
			const series1 = chartData.map((element: ITCEarningsDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.EARNINGS_TO_NODES_USD }
			})
			const series2 = chartData.map((element: ITCEarningsDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.EARNINGS_TO_POOLS_USD }
			})
			const series3 = chartData.map((element: ITCEarningsDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.TOTAL_EARNINGS_USD_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'earnings to nodes',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'green',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'earnings to pools',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'orange',
					unitSymbol: '$'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'earnings cumulative',
					type: 'line',
					seriesGroup: '',
					color: `${color}`,
					unitSymbol: '$'
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
				chartTitle="[TC]: Earnings Distribution"
				chartDesc="Amount rewarded to liquity providers and nodes with block rewards and swap fees."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="9bda51b5-c3ad-4ab6-abd8-17a004ace38d"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default EarningsDistribution
