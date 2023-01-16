import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISwapCount } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const UniqueSwapCount = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_swap_count')) as ISwapCount[]
			const series1 = chartData.map((element: ISwapCount) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.UNIQUE_SWAPPER_COUNT }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'unique swap count',
					type: 'bars',
					seriesGroup: '',
					color: 'green'
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
				chartTitle="[TC]: Unique Swapper Count"
				chartDesc="The number of unique addresses which performed a swap on THORChain."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="498df68f-821b-41ce-b3c1-fe1a3ef2bf46"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default UniqueSwapCount
