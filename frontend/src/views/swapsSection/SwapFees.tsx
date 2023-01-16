import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISwapFees } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const SwapFees = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_swap_fees')) as ISwapFees[]
			const series1 = chartData.map((element: ISwapFees) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_FEES_USD }
			})
			const series2 = chartData.map((element: ISwapFees) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_FEES_USD_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'swap fees',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'green',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'swap fees cumulative',
					type: 'line',
					seriesGroup: '',
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
				chartTitle="[TC]: Swap Fees"
				chartDesc="Swap fees paid by swappers on the THORChain DEX."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="1fc0287e-e54a-49a1-8684-343c4f27f13b"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default SwapFees
