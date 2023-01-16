import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStakingTVL } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TWStakingTVL = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorwallet', 'tgt_staking_tvl')) as IStakingTVL[]
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
					name: 'staking tvl [tgt]',
					type: 'line',
					seriesGroup: '[tgt]',
					color: 'green',
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'staking tvl [usd]',
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
				chartTitle="[TW]: Staking TVL"
				chartDesc="The number of TGT tokens held in the THORWallet staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="a3e29799-dc2d-40ec-bd8a-312e3da7979e"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TWStakingTVL
