import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISaverAsset } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const ETHSaverDepth = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_savers_eth')) as ISaverAsset[]
			const series1 = chartData.map((element: ISaverAsset) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.ASSET_CHANGE }
			})
			const series2 = chartData.map((element: ISaverAsset) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.ASSET_DEPTH }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'depth change [eth]',
					type: 'bars',
					seriesGroup: '[ETH]',
					color: 'green',
					unitSymbol: 'Ξ'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'depth [eth]',
					type: 'line',
					seriesGroup: '',
					color: 'orange',
					unitSymbol: 'Ξ'
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
				chartTitle="[TC]: ETH Saver Depth Change"
				chartDesc="Change of the depth in the Ethereum Saver pool."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="655faa72-6943-4777-b38a-888beebd645b"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default ETHSaverDepth
