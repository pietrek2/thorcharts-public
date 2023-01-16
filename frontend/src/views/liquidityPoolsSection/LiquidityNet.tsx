import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ILiquidityNet } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const LiquidityNet = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_liquidity_net')) as ILiquidityNet[]
			const series1 = chartData.map((element: ILiquidityNet) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.LIQUIDITY_CHANGE_USD }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'liquidity change (add - withdraw)',
					type: 'bars',
					seriesGroup: '[rune]',
					color: 'green',
					unitSymbol: 'ᚱ'
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
				chartTitle="[TC]: Liquidity Net"
				chartDesc="The difference between liquidity additions and withdrawals to THORChains liquidity pools."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="e4664a3a-5115-4b93-8171-abf179218161"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default LiquidityNet
