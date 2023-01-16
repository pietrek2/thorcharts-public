import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISaverAddresses } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const SaverAddresses = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_savers_addresses')) as ISaverAddresses[]
			const btcData = chartData.filter((row) => row.BLOCKCHAIN === 'BTC')
			const ethData = chartData.filter((row) => row.BLOCKCHAIN === 'ETH')
			const bchData = chartData.filter((row) => row.BLOCKCHAIN === 'BCH')
			const avaxData = chartData.filter((row) => row.BLOCKCHAIN === 'AVAX')
			const bnbData = chartData.filter((row) => row.BLOCKCHAIN === 'BNB')
			const dogeData = chartData.filter((row) => row.BLOCKCHAIN === 'DOGE')
			const ltcData = chartData.filter((row) => row.BLOCKCHAIN === 'LTC')
			const atomData = chartData.filter((row) => row.BLOCKCHAIN === 'GAIA')

			const series1 = btcData.map((element: ISaverAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_COUNT }
			})
			const series2 = ethData.map((element: ISaverAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_COUNT }
			})
			const series3 = bchData.map((element: ISaverAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_COUNT }
			})
			const series4 = avaxData.map((element: ISaverAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_COUNT }
			})
			const series5 = bnbData.map((element: ISaverAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_COUNT }
			})
			const series6 = dogeData.map((element: ISaverAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_COUNT }
			})
			const series7 = ltcData.map((element: ISaverAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_COUNT }
			})
			const series8 = atomData.map((element: ISaverAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.CUMULATIVE_COUNT }
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
					seriesGroup: '[address #]',
					color: '#e505f5',
					unitSymbol: ''
				},
				{
					data: series1,
					strokeWidth: 2,
					name: 'BTC',
					type: 'line',
					seriesGroup: '[address #]',
					color: `${color}`,
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'ETH',
					type: 'line',
					seriesGroup: '[address #]',
					color: '#036ffc',
					unitSymbol: ''
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'BCH',
					type: 'line',
					seriesGroup: '[address #]',
					color: `#0ffc03`,
					unitSymbol: ''
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'AVAX',
					type: 'line',
					seriesGroup: '[address #]',
					color: '#fc1c03',
					unitSymbol: ''
				},
				{
					data: series5,
					strokeWidth: 2,
					name: 'BNB',
					type: 'line',
					seriesGroup: '[address #]',
					color: '#fcf003',
					unitSymbol: ''
				},
				{
					data: series6,
					strokeWidth: 2,
					name: 'DOGE',
					type: 'line',
					seriesGroup: '[address #]',
					color: '#fc9d03',
					unitSymbol: ''
				},
				{
					data: series7,
					strokeWidth: 2,
					name: 'LTC',
					type: 'line',
					seriesGroup: '[address #]',
					color: '#03f4fc',
					unitSymbol: ''
				},
				{
					data: series8,
					strokeWidth: 2,
					name: 'ATOM',
					type: 'line',
					seriesGroup: '[address #]',
					color: '#8403fc',
					unitSymbol: ''
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
				chartTitle="[TC]: Savers Unique Addresses"
				chartDesc="The number of unique addresses in each of the Saver pools."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="b8d78c72-f674-4f51-94f7-94a1bf2eb949"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default SaverAddresses
