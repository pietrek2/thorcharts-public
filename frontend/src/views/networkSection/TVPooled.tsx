import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ITVL } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TotalValuePooled = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_tvl')) as ITVL[]
			const series1 = chartData.map((element: ITVL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.TOTAL_VALUE_POOLED }
			})
			const series2 = chartData.map((element: ITVL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.TOTAL_VALUE_POOLED_USD }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'total value pooled',
					type: 'line',
					seriesGroup: '[rune]',
					color: 'green',
					unitSymbol: 'ᚱ'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'total value pooled',
					type: 'line',
					seriesGroup: 'usd',
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
				chartTitle="[TC]: Total Value Pooled"
				chartDesc="Total value locked in THORChain liquidity pools."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="56576ba9-906f-4e73-83ef-bc0e4024d752"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TotalValuePooled
