import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { INonRuneTVL } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const NonRuneTVL = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_non_rune_tvl')) as INonRuneTVL[]
			const series1 = chartData.map((element: INonRuneTVL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.NON_RUNE_TVL }
			})
			const series2 = chartData.map((element: INonRuneTVL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AVG_SLIP_BP }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'non rune tvl',
					type: 'line',
					seriesGroup: '[usd]',
					color: 'orange',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'avg slip bp',
					type: 'line',
					seriesGroup: '[slip bp]',
					color: 'green',
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
				chartTitle="[TC]: Non Rune TVL"
				chartDesc="Value of non-Rune assets pooled in THORChains liquidity pools."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="ae351595-65dd-4213-98bb-873d3ef5c02a"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default NonRuneTVL
