import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISaversRealizedPL } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const SaverRealizedPL = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_savers_realized_pl')) as ISaversRealizedPL[]
			const btcData = chartData.filter((row) => row.ASSET === 'BTC.BTC')
			const ethData = chartData.filter((row) => row.ASSET === 'ETH.ETH')
			const bchData = chartData.filter((row) => row.ASSET === 'BCH.BCH')
			const avaxData = chartData.filter((row) => row.ASSET === 'AVAX.AVAX')
			const bnbData = chartData.filter((row) => row.ASSET === 'BNB.BNB')
			const dogeData = chartData.filter((row) => row.ASSET === 'DOGE.DOGE')
			const ltcData = chartData.filter((row) => row.ASSET === 'LTC.LTC')
			const atomData = chartData.filter((row) => row.ASSET === 'GAIA.ATOM')

			const series1 = btcData.map((element: ISaversRealizedPL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REALIZED_PL_USD }
			})
			const series2 = ethData.map((element: ISaversRealizedPL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REALIZED_PL_USD }
			})
			const series3 = bchData.map((element: ISaversRealizedPL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REALIZED_PL_USD }
			})
			const series4 = avaxData.map((element: ISaversRealizedPL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REALIZED_PL_USD }
			})
			const series5 = bnbData.map((element: ISaversRealizedPL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REALIZED_PL_USD }
			})
			const series6 = dogeData.map((element: ISaversRealizedPL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REALIZED_PL_USD }
			})
			const series7 = ltcData.map((element: ISaversRealizedPL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REALIZED_PL_USD }
			})
			const series8 = atomData.map((element: ISaversRealizedPL) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REALIZED_PL_USD }
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
				chartTitle="[TC]: Savers Realized P/L"
				chartDesc="Upon every withdrawal transaction from the Saver Vaults, Realized Profit/Loss is calculated based on previous deposits from the same address and basis points of the withdrawal transaction.
                Transactions are then aggregated for each asset and day. For example if a user deposited 0.5 BTC twice and then sent a withdrawal transaction with 5000 basis points and 
                withdrew 0.6 BTC then the Realized P/L for this transaction would be 0.1 BTC."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="c28a60e7-a729-42bd-8ea5-aa0fd10421c2"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default SaverRealizedPL
