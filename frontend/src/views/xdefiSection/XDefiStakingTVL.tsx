import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IStakingTVL } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const XDefiStakingTVL = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('xdefi', 'xdefi_staking_tvl')) as IStakingTVL[]
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
					name: 'staking tvl [xdefi]',
					type: 'line',
					seriesGroup: '[xdefi]',
					color: 'green'
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
				chartTitle="[XDEFI]: Staking TVL"
				chartDesc="The number of XDEFI tokens held in the XDEFI staking contract."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="d3a05114-836e-4b28-93dd-4d1e7dd3e99d"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default XDefiStakingTVL
