import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ITHORReward } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSTotalRewards = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorswap', 'thor_total_rewards')) as ITHORReward[]
			const series1 = chartData.map((element: ITHORReward) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.THOR_AMOUNT_USD }
			})
			const series2 = chartData.map((element: ITHORReward) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.THOR_AMOUNT_USD_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'total rewards',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'green',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'total rewards cumulative',
					type: 'line',
					seriesGroup: '',
					color: 'orange',
					unitSymbol: '$'
				}
			])
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		InitializeData()
	}, [])
	if (dataSeries !== undefined) {
		return (
			<ChartPage
				chartTitle="[TS]: Total Rewards"
				chartDesc="THORSwap rewards from exchange fee sharing and emissions."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="3e1d499f-fc7a-4946-b4a0-cb8e6c3a7ee6"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSTotalRewards
