import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStaking } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TWStakingDeposits = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorwallet', 'tgt_staking_deposits')) as IStaking[]
			const series1 = chartData.map((element: IStaking) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT }
			})
			const series2 = chartData.map((element: IStaking) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_USD }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'deposits [tgt]',
					type: 'bars',
					seriesGroup: '[tgt]',
					color: 'green',
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'deposits [usd]',
					type: 'bars',
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
				chartTitle="[TW]: Staking Deposits"
				chartDesc="The number of TGT tokens sent to the THORWallet staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="4a0b17d7-393f-4249-899b-040d39094fc1"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TWStakingDeposits
