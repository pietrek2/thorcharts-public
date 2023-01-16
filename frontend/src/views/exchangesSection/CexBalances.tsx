import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IExchangeBalance } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const CexBalances = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_exchange_balance')) as IExchangeBalance[]
			const series1 = chartData.map((element: IExchangeBalance) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.BINANCE_BALANCE }
			})
			const series2 = chartData.map((element: IExchangeBalance) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CRYPTOCOM_BALANCE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'Binance balance',
					type: 'line',
					seriesGroup: '[rune]',
					color: 'green',
					unitSymbol: 'ᚱ'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'Crypto.com balance',
					type: 'line',
					seriesGroup: '[rune]',
					color: 'orange',
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
				chartTitle="[TC]: CEX Balances"
				chartDesc="Centralized exchange rune balances. Crypto.com addresses: thor1ty6h2ll07fqfzumphp6kq3hm4ps28xlm2l6kd6. Binance Addresses: thor1cqg8pyxnq03d88cl3xfn5wzjkguw5kh9enwte4, thor1t60f02r8jvzjrhtnjgfj4ne6rs5wjnejwmj7fh, thor1uz4fpyd5f5d6p9pzk8lxyj4qxnwq6f9utg0e7k."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="80fc0008-8615-4117-8a8a-4d965d322376"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default CexBalances
