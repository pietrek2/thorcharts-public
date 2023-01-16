import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ITHORReward } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSProtocolEmissions = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorswap', 'thor_rewards_from_protocol_emission')) as ITHORReward[]
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
					name: 'thor emissions',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'green',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'thor emissions cumulative',
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
				chartTitle="[TS]: Protocol Emissions"
				chartDesc="Thor token block rewards distributed among vThor holders through the THORSwap staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="cb329086-8b72-4317-bfcc-44681b1e8119"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSProtocolEmissions
