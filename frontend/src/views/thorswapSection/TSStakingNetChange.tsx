import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStakingChange } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSStakingChange = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorswap', 'thor_staking_change')) as IStakingChange[]
			const series1 = chartData.map((element: IStakingChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT }
			})
			const series2 = chartData.map((element: IStakingChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'staking change [thor]',
					type: 'bars',
					seriesGroup: '[thor]',
					color: 'green',
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'staking change cumulative [thor]',
					type: 'line',
					seriesGroup: '',
					color: 'orange',
					unitSymbol: ''
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
				chartTitle="[TS]: Staking Net Change"
				chartDesc="The difference between Thor token additions and withdrawals from the THORSwap staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSStakingChange
