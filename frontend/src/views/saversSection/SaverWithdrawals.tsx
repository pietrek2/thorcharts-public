import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISaversLiqChange } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const SaverWithdrawals = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_savers_liquidity_withdrawals')) as ISaversLiqChange[]
			const btcData = chartData.filter((row) => row.ASSET === 'BTC/BTC')
			const ethData = chartData.filter((row) => row.ASSET === 'ETH/ETH')
			const bchData = chartData.filter((row) => row.ASSET === 'BCH/BCH')
			const avaxData = chartData.filter((row) => row.ASSET === 'AVAX/AVAX')
			const bnbData = chartData.filter((row) => row.ASSET === 'BNB/BNB')
			const dogeData = chartData.filter((row) => row.ASSET === 'DOGE/DOGE')
			const ltcData = chartData.filter((row) => row.ASSET === 'LTC/LTC')
			const atomData = chartData.filter((row) => row.ASSET === 'GAIA/ATOM')

			const series1 = btcData.map((element: ISaversLiqChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_USD }
			})
			const series2 = ethData.map((element: ISaversLiqChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_USD }
			})
			const series3 = bchData.map((element: ISaversLiqChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_USD }
			})
			const series4 = avaxData.map((element: ISaversLiqChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_USD }
			})
			const series5 = bnbData.map((element: ISaversLiqChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_USD }
			})
			const series6 = dogeData.map((element: ISaversLiqChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_USD }
			})
			const series7 = ltcData.map((element: ISaversLiqChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_USD }
			})
			const series8 = atomData.map((element: ISaversLiqChange) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.AMOUNT_USD }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'BTC',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#fcf003',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'ETH',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#036ffc',
					unitSymbol: '$'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'BCH',
					type: 'bars',
					seriesGroup: '[usd]',
					color: `#0ffc03`,
					unitSymbol: '$'
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'AVAX',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#fc1c03',
					unitSymbol: '$'
				},
				{
					data: series5,
					strokeWidth: 2,
					name: 'BNB',
					type: 'bars',
					seriesGroup: '[usd]',
					color: `${color}`,
					unitSymbol: '$'
				},
				{
					data: series6,
					strokeWidth: 2,
					name: 'DOGE',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#fc9d03',
					unitSymbol: '$'
				},
				{
					data: series7,
					strokeWidth: 2,
					name: 'LTC',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#03f4fc',
					unitSymbol: '$'
				},
				{
					data: series8,
					strokeWidth: 2,
					name: 'ATOM',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#8403fc',
					unitSymbol: '$'
				}
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
				chartTitle="[TC]: Savers Liquidity Withdrawals"
				chartDesc="Liquidity withdrawn from the Saver pools."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="1545be8a-e64b-453e-b473-c66dfaf306b7"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default SaverWithdrawals
