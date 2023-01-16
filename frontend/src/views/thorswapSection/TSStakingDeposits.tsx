import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStaking } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSStakingDeposits = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorswap', 'thor_staking_deposits')) as IStaking[]
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
					name: 'deposits [thor]',
					type: 'bars',
					seriesGroup: '[thor]',
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
				chartTitle="[TS]: Staking Deposits"
				chartDesc="The number of Thor tokens sent to the THORSwap staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="bd246400-98fc-4e76-b8f6-949bebd1b43e"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSStakingDeposits
