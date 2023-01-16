import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IDeterministicRunePrice } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const DeterministicRune = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_deterministic_rune_price')) as IDeterministicRunePrice[]
			const series1 = chartData.map((element: IDeterministicRunePrice) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RUNE_PRICE }
			})
			const series2 = chartData.map((element: IDeterministicRunePrice) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.DETERMINISTIC_RUNE_PRICE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'rune price',
					type: 'line',
					seriesGroup: '[usd]',
					color: 'green',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'deterministic rune price',
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
				chartTitle="[TC]: Deterministic Rune Price"
				chartDesc="The fundamental or 'fair' value of RUNE as a crypto could be seen as 3x the value of non-native assets in the pools (non-native referring to assets that aren't RUNE). Many refer to this as 'deterministic value'."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="88fdb846-eb56-4576-bcf0-af576c4443e0"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default DeterministicRune
