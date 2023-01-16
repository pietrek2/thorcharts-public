import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISaverAsset } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const BTCSaverDepth = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_savers_btc')) as ISaverAsset[]
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
					name: 'depth change [btc]',
					type: 'bars',
					seriesGroup: '[BTC]',
					color: 'green',
					unitSymbol: '₿'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'depth [btc]',
					type: 'line',
					seriesGroup: ' ',
					color: 'orange',
					unitSymbol: '₿'
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
				chartTitle="[TC]: BTC Saver Depth Change"
				chartDesc="Change of the depth in the Bitcoin saver pool."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="fb17c30f-73a8-4388-8027-ee04edaf7f69"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default BTCSaverDepth
