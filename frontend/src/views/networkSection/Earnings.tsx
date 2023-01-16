import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ITCEarningsDistribution } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const UserEarnings = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_rune_earnings_distribution')) as ITCEarningsDistribution[]
			const series1 = chartData.map((element: ITCEarningsDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.BLOCK_REWARDS }
			})
			const series2 = chartData.map((element: ITCEarningsDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.BLOCK_REWARDS_USD }
			})
			const series3 = chartData.map((element: ITCEarningsDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.LIQUIDITY_FEES }
			})
			const series4 = chartData.map((element: ITCEarningsDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.LIQUIDITY_FEES_USD }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'block rewards',
					type: 'bars',
					seriesGroup: '[rune]',
					barGroup: 'rune',
					color: 'orange',
					unitSymbol: 'ᚱ'
				},
				// {
				// 	data: series2,
				// 	strokeWidth: 2,
				// 	name: 'block rewards',
				// 	type: 'bars',
				// 	seriesGroup: '[usd]',
				// 	barGroup: 'usd',
				// 	color: 'red',
				// 	unitSymbol: '$'
				// },
				{
					data: series3,
					strokeWidth: 2,
					name: 'liquidity fees',
					type: 'bars',
					seriesGroup: '[rune]',
					barGroup: 'rune',
					color: 'green',
					unitSymbol: 'ᚱ'
				}
				// {
				// 	data: series4,
				// 	strokeWidth: 2,
				// 	name: 'liquidity fees',
				// 	type: 'bars',
				// 	seriesGroup: '[usd]',
				// 	barGroup: 'usd',
				// 	color: `${color}`,
				// 	unitSymbol: '$'
				// }
			])
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		let mainColor = theme === 'dark' ? 'white' : 'black'
		InitializeData(mainColor)
	}, [theme])
	if (dataSeries !== undefined) {
		return (
			<ChartPage
				chartTitle="[TC]: User Earnings"
				chartDesc="Users (liquidity providers and nodes) are rewarded with block rewards and liquidity (swap) fees."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="9bda51b5-c3ad-4ab6-abd8-17a004ace38d"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default UserEarnings
