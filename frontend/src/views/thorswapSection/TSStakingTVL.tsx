import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStakingTVL } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSStakingTVL = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorswap', 'thor_staking_tvl')) as IStakingTVL[]
			const series1 = chartData.map((element: IStakingTVL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.TVL }
			})
			const series2 = chartData.map((element: IStakingTVL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.TVL_USD }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'tvl [thor]',
					type: 'line',
					seriesGroup: '[thor]',
					color: 'green',
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'tvl [usd]',
					type: 'line',
					seriesGroup: '[usd]',
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
				chartTitle="[TS]: Staking TVL"
				chartDesc="The number of Thor tokens held in the THORSwap staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="7ebb6c79-d4d7-496a-9933-54205ab129e5"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSStakingTVL
