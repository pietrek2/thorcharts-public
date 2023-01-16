import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISaversUnrealizedPL } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const SaverUnrealizedPL = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_savers_unrealized_pl')) as ISaversUnrealizedPL[]

			const btcData = chartData.filter((row) => row.POOL_NAME === 'BTC/BTC')
			const ethData = chartData.filter((row) => row.POOL_NAME === 'ETH/ETH')
			const bchData = chartData.filter((row) => row.POOL_NAME === 'BCH/BCH')
			const avaxData = chartData.filter((row) => row.POOL_NAME === 'AVAX/AVAX')
			const bnbData = chartData.filter((row) => row.POOL_NAME === 'BNB/BNB')
			const dogeData = chartData.filter((row) => row.POOL_NAME === 'DOGE/DOGE')
			const ltcData = chartData.filter((row) => row.POOL_NAME === 'LTC/LTC')
			const atomData = chartData.filter((row) => row.POOL_NAME === 'GAIA/ATOM')

			const series1 = btcData.map((element: ISaversUnrealizedPL) => {
				return { x: new Date(element.DATE).getTime() / 1000, y: element.UNREALIZED_PL_NO_FEE_USD }
			})
			const series2 = ethData.map((element: ISaversUnrealizedPL) => {
				return { x: new Date(element.DATE).getTime() / 1000, y: element.UNREALIZED_PL_NO_FEE_USD }
			})
			const series3 = bchData.map((element: ISaversUnrealizedPL) => {
				return { x: new Date(element.DATE).getTime() / 1000, y: element.UNREALIZED_PL_NO_FEE_USD }
			})
			const series4 = avaxData.map((element: ISaversUnrealizedPL) => {
				return { x: new Date(element.DATE).getTime() / 1000, y: element.UNREALIZED_PL_NO_FEE_USD }
			})
			const series5 = bnbData.map((element: ISaversUnrealizedPL) => {
				return { x: new Date(element.DATE).getTime() / 1000, y: element.UNREALIZED_PL_NO_FEE_USD }
			})
			const series6 = dogeData.map((element: ISaversUnrealizedPL) => {
				return { x: new Date(element.DATE).getTime() / 1000, y: element.UNREALIZED_PL_NO_FEE_USD }
			})
			const series7 = ltcData.map((element: ISaversUnrealizedPL) => {
				return { x: new Date(element.DATE).getTime() / 1000, y: element.UNREALIZED_PL_NO_FEE_USD }
			})
			const series8 = atomData.map((element: ISaversUnrealizedPL) => {
				return { x: new Date(element.DATE).getTime() / 1000, y: element.UNREALIZED_PL_NO_FEE_USD }
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
					name: 'TOTAL',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#e505f5',
					unitSymbol: '$'
				},
				{
					data: series1,
					strokeWidth: 2,
					name: 'BTC',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#fcf003',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'ETH',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#036ffc',
					unitSymbol: '$'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'BCH',
					type: 'line',
					seriesGroup: '[usd]',
					color: `#0ffc03`,
					unitSymbol: '$'
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'AVAX',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#fc1c03',
					unitSymbol: '$'
				},
				{
					data: series5,
					strokeWidth: 2,
					name: 'BNB',
					type: 'line',
					seriesGroup: '[usd]',
					color: `${color}`,
					unitSymbol: '$'
				},
				{
					data: series6,
					strokeWidth: 2,
					name: 'DOGE',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#fc9d03',
					unitSymbol: '$'
				},
				{
					data: series7,
					strokeWidth: 2,
					name: 'LTC',
					type: 'line',
					seriesGroup: '[usd]',
					color: '#03f4fc',
					unitSymbol: '$'
				},
				{
					data: series8,
					strokeWidth: 2,
					name: 'ATOM',
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
				chartTitle="[TC]: Savers Net Unrealized P/L"
				chartDesc="For every first block of each hour all current savers are taken and their possible redeem value is calculated.
				This chart does not take into accound slip and outbound fees users have to pay when withdrawing from Savers!"
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="c5e4afa4-9d6d-484f-81dd-c11b1cf18d7f"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default SaverUnrealizedPL
