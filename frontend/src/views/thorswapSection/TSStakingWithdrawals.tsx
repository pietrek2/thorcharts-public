import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStaking } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSStakingWithdrawals = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorswap', 'thor_staking_withdrawals')) as IStaking[]
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
					name: 'withdrawals [thor]',
					type: 'bars',
					seriesGroup: '[thor]',
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
				chartTitle="[TS]: Staking Withdrawals"
				chartDesc="The number of Thor tokens withdrawals from the THORSwap staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="dc8c5020-f4a9-4e18-9bca-8bbce35650b0"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSStakingWithdrawals
