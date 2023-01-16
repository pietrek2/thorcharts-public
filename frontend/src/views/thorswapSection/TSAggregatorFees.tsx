import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ITHORAggFees } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSAggregatorFees = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorswap', 'aggregator_fees')) as ITHORAggFees[]
			const series1 = chartData.map((element: ITHORAggFees) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.ETH_AGG_FEES_USD }
			})
			const series2 = chartData.map((element: ITHORAggFees) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AVAX_AGG_FEES_USD }
			})
			const series3 = chartData.map((element: ITHORAggFees) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AGG_FEES_USD_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'eth agg fees',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'orange',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'avax agg fees',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'green',
					unitSymbol: '$'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'agg fees cumulative',
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
				chartTitle="[TS]: Aggregator Fees"
				chartDesc="Fees collected from THORSwaps Avalanche and Ethereum aggregators."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="40a4b42d-2afe-4bcc-85f4-36349b42e553"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSAggregatorFees
