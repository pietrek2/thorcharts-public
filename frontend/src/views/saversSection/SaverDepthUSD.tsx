import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISaversDepth } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const SaverDepthsUSD = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string, inverseColor: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_savers_liquidity_usd')) as ISaversDepth[]
			const btcData = chartData.filter((row) => row.ASSET === 'BTC/BTC')
			const ethData = chartData.filter((row) => row.ASSET === 'ETH/ETH')
			const bchData = chartData.filter((row) => row.ASSET === 'BCH/BCH')
			const avaxData = chartData.filter((row) => row.ASSET === 'AVAX/AVAX')
			const bnbData = chartData.filter((row) => row.ASSET === 'BNB/BNB')
			const dogeData = chartData.filter((row) => row.ASSET === 'DOGE/DOGE')
			const ltcData = chartData.filter((row) => row.ASSET === 'LTC/LTC')
			const atomData = chartData.filter((row) => row.ASSET === 'GAIA/ATOM')

			const series1 = btcData.map((element: ISaversDepth) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_DEPTH_USD }
			})
			const series2 = ethData.map((element: ISaversDepth) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_DEPTH_USD }
			})
			const series3 = bchData.map((element: ISaversDepth) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_DEPTH_USD }
			})
			const series4 = avaxData.map((element: ISaversDepth) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_DEPTH_USD }
			})
			const series5 = bnbData.map((element: ISaversDepth) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_DEPTH_USD }
			})
			const series6 = dogeData.map((element: ISaversDepth) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_DEPTH_USD }
			})
			const series7 = ltcData.map((element: ISaversDepth) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_DEPTH_USD }
			})
			const series8 = atomData.map((element: ISaversDepth) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_DEPTH_USD }
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
					name: 'Total depth',
					type: 'line',
					seriesGroup: '[usd]',
					color: `${inverseColor}`,
					unitSymbol: '$'
				},
				{
					data: series1,
					strokeWidth: 2,
					name: 'BTC pool depth',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#fc9d03',
					unitSymbol: '$',
					barGroup: 'usd'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'ETH pool depth',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#036ffc',
					unitSymbol: '$',
					barGroup: 'usd'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'BCH pool depth',
					type: 'bars',
					seriesGroup: '[usd]',
					color: `#0ffc03`,
					unitSymbol: '$',
					barGroup: 'usd'
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'AVAX pool depth',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#fc1c03',
					unitSymbol: '$',
					barGroup: 'usd'
				},
				{
					data: series5,
					strokeWidth: 2,
					name: 'BNB pool depth',
					type: 'bars',
					seriesGroup: '[usd]',
					color: `${color}`,
					unitSymbol: '$',
					barGroup: 'usd'
				},
				{
					data: series6,
					strokeWidth: 2,
					name: 'DOGE pool depth',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#fcf003',
					unitSymbol: '$',
					barGroup: 'usd'
				},
				{
					data: series7,
					strokeWidth: 2,
					name: 'LTC pool depth',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#03f4fc',
					unitSymbol: '$',
					barGroup: 'usd'
				},
				{
					data: series8,
					strokeWidth: 2,
					name: 'ATOM pool depth',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#8403fc',
					unitSymbol: '$',
					barGroup: 'usd'
				}
			])
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		let mainColor = theme === 'dark' ? 'white' : 'black'
		let inverseMainColor = theme === 'dark' ? 'black' : 'white'
		InitializeData(mainColor, inverseMainColor)
	}, [theme])
	if (dataSeries !== undefined) {
		return (
			<ChartPage
				chartTitle="[TC]: Saver Depths"
				chartDesc="Cumulative depth of the Saver pools denominated in USD."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="18545cbf-0d11-47f8-8062-59bae612b709"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default SaverDepthsUSD
