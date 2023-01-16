import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStaking } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const XDefiStakingDeposits = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('xdefi', 'xdefi_staking_deposits')) as IStaking[]
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
					name: 'deposits [xdefi]',
					type: 'bars',
					seriesGroup: '[xdefi]',
					color: 'green'
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
				chartTitle="[XDEFI]: Staking Deposits"
				chartDesc="The number of XDEFI tokens sent to the XDEFI staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="8c1540b4-53cb-46eb-8ac2-699f1e8b4b24"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default XDefiStakingDeposits
