import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISwapCount } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const SwapCount = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_swap_count')) as ISwapCount[]
			const series1 = chartData.map((element: ISwapCount) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_COUNT }
			})
			const series2 = chartData.map((element: ISwapCount) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_COUNT_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'swap count',
					type: 'bars',
					seriesGroup: '',
					color: 'green'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'swap count cumulative',
					type: 'line',
					seriesGroup: ' ',
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
			<ChartPage chartTitle="[TC]: Swap Count" chartDesc="Swap count on the THORChain DEX." chartDescTitle="Metric Description" chartData={dataSeries} queryId="498df68f-821b-41ce-b3c1-fe1a3ef2bf46" />
		)
	} else {
		return <LoadingChart />
	}
}

export default SwapCount
