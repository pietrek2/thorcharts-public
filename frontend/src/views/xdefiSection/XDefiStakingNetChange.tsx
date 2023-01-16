import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStakingChange } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const XDefiStakingChange = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('xdefi', 'xdefi_staking_change')) as IStakingChange[]
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
					name: 'staking change [xdefi]',
					type: 'bars',
					seriesGroup: '[xdefi]',
					color: 'green'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'staking change cumulaitve [xdefi]',
					type: 'line',
					seriesGroup: '',
					color: 'orange'
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
				chartTitle="[XDEFI]: Staking Change"
				chartDesc="The difference between XDEFI token additions and withdrawals from the XDEFI staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default XDefiStakingChange
