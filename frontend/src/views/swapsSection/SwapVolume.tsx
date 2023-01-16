import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISwapVolume } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const SwapVolume = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string, inverseColor: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_swap_volume')) as ISwapVolume[]
			const series1 = chartData.map((element: ISwapVolume) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_SYNTH_VOLUME_USD }
			})
			const series2 = chartData.map((element: ISwapVolume) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_NON_SYNTH_VOLUME_USD }
			})
			const series3 = chartData.map((element: ISwapVolume) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_VOLUME_USD }
			})
			const series4 = chartData.map((element: ISwapVolume) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_VOLUME_USD_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'synth swap volume',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'green', //'#03fc6b',
					unitSymbol: '$',
					barGroup: 'stacked'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'non-synth swap volume',
					type: 'bars',
					seriesGroup: '[usd]',
					color: `orange`, //'#03a1fc',
					unitSymbol: '$',
					barGroup: 'stacked'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'swap volume',
					type: 'line',
					seriesGroup: '[usd]',
					color: `${inverseColor}`, //'green',
					unitSymbol: '$'
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'swap volume cumulative',
					type: 'line',
					seriesGroup: '',
					color: `${color}`, //'orange',
					unitSymbol: '$'
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
		return <ChartPage chartTitle="[TC]: Swap Volume" chartDesc="Swap volume on THORChain." chartDescTitle="Metric Description" chartData={dataSeries} queryId="37de904e-a86d-4880-93bf-1affba6af82c" />
	} else {
		return <LoadingChart />
	}
}

export default SwapVolume
