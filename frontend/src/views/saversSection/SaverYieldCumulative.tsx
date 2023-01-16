import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISaversYield } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const SaverYieldCumulative = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_savers_yield')) as ISaversYield[]
			const btcData = chartData.filter((row) => row.SAVER_POOL === 'BTC/BTC')
			const ethData = chartData.filter((row) => row.SAVER_POOL === 'ETH/ETH')
			const bchData = chartData.filter((row) => row.SAVER_POOL === 'BCH/BCH')
			const avaxData = chartData.filter((row) => row.SAVER_POOL === 'AVAX/AVAX')
			const bnbData = chartData.filter((row) => row.SAVER_POOL === 'BNB/BNB')
			const dogeData = chartData.filter((row) => row.SAVER_POOL === 'DOGE/DOGE')
			const ltcData = chartData.filter((row) => row.SAVER_POOL === 'LTC/LTC')
			const atomData = chartData.filter((row) => row.SAVER_POOL === 'GAIA/ATOM')

			const series1 = btcData.map((element: ISaversYield) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_YIELD_USD }
			})
			const series2 = ethData.map((element: ISaversYield) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_YIELD_USD }
			})
			const series3 = bchData.map((element: ISaversYield) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_YIELD_USD }
			})
			const series4 = avaxData.map((element: ISaversYield) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_YIELD_USD }
			})
			const series5 = bnbData.map((element: ISaversYield) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_YIELD_USD }
			})
			const series6 = dogeData.map((element: ISaversYield) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_YIELD_USD }
			})
			const series7 = ltcData.map((element: ISaversYield) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_YIELD_USD }
			})
			const series8 = atomData.map((element: ISaversYield) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_YIELD_USD }
			})
			const series9 = []
			for (let i = 0; i < series1.length; i++) {
				let point = {
					x: series1[i].x,
					y: series1[i].y + series2[i].y + series3[i].y + series4[i].y + series5[i].y + series6[i].y + series7[i].y + series8[i].y
				}
				series9.push(point)
			}

			setDataSeries([
				{
					data: series9,
					strokeWidth: 2,
					name: 'TOTAL yield',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#e505f5',
					unitSymbol: '$'
				},
				{
					data: series1,
					strokeWidth: 2,
					name: 'BTC yield',
					type: 'line',
					seriesGroup: '[usd]',
					color: `${color}`,
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'ETH yield',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#036ffc',
					unitSymbol: '$'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'BCH yield',
					type: 'line',
					seriesGroup: '[usd]',
					color: `#0ffc03`,
					unitSymbol: '$'
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'AVAX yield',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#fc1c03',
					unitSymbol: '$'
				},
				{
					data: series5,
					strokeWidth: 2,
					name: 'BNB yield',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#fcf003',
					unitSymbol: '$'
				},
				{
					data: series6,
					strokeWidth: 2,
					name: 'DOGE yield',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#fc9d03',
					unitSymbol: '$'
				},
				{
					data: series7,
					strokeWidth: 2,
					name: 'LTC yield',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#03f4fc',
					unitSymbol: '$'
				},
				{
					data: series8,
					strokeWidth: 2,
					name: 'ATOM yield',
					type: 'line',
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
				chartTitle="[TC]: Savers Cumulative Yield"
				chartDesc="Cumulative yield for each of the Saver pools denominated in USD."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="da4eb63b-373f-42ff-a9b9-c3a57b149d31"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default SaverYieldCumulative
