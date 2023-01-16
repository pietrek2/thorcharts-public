import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStaking } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const XDefiStakingWithdrawals = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('xdefi', 'xdefi_staking_withdrawals')) as IStaking[]
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
					name: 'withdrawals [xdefi]',
					type: 'bars',
					seriesGroup: '[xdefi]',
					color: 'green'
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
				chartTitle="[XDEFI]: Staking Withdrawals"
				chartDesc="The number of XDEFI token withdrawals from the XDEFI staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="8479158b-73cd-4dbe-8356-bbf22196d73b"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default XDefiStakingWithdrawals
