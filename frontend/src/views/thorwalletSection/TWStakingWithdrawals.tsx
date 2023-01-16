import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStaking } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TWStakingWithdrawals = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorwallet', 'tgt_staking_withdrawals')) as IStaking[]
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
					name: 'withdrawals [tgt]',
					type: 'bars',
					seriesGroup: '[tgt]',
					color: 'green',
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'withdrawals [usd]',
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
				chartTitle="[TW]: Staking Withdrawals"
				chartDesc="The number of TGT token withdrawals from the THORWallet staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="020376b4-73e1-460f-9778-59e7307c0fbd"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TWStakingWithdrawals
