import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ISwapVolumeByDex } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const DexSwapVolume = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_dex_swap_volume')) as ISwapVolumeByDex[]

			const thorswapData = chartData.filter((row) => row.LABEL === 'THORSwap')
			const thorwalletData = chartData.filter((row) => row.LABEL === 'THORWallet')
			const trustwalletData = chartData.filter((row) => row.LABEL === 'Trustwallet')
			const asgardexData = chartData.filter((row) => row.LABEL === 'Asgardex')
			const shapeshiftData = chartData.filter((row) => row.LABEL === 'ShapeShift')
			const edgewalletData = chartData.filter((row) => row.LABEL === 'EdgeWallet')

			const series1 = thorswapData.map((element: ISwapVolumeByDex) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_VOLUME_USD }
			})
			const series2 = thorwalletData.map((element: ISwapVolumeByDex) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_VOLUME_USD }
			})
			const series3 = trustwalletData.map((element: ISwapVolumeByDex) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_VOLUME_USD }
			})
			const series4 = asgardexData.map((element: ISwapVolumeByDex) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_VOLUME_USD }
			})
			const series5 = shapeshiftData.map((element: ISwapVolumeByDex) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_VOLUME_USD }
			})
			const series6 = edgewalletData.map((element: ISwapVolumeByDex) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SWAP_VOLUME_USD }
			})

			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'THORSwap',
					type: 'bars',
					seriesGroup: '[usd]',
					color: `${color}`,
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'THORWallet',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'orange',
					unitSymbol: '$'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'TrustWallet',
					type: 'bars',
					seriesGroup: '[usd]',
					color: `#036ffc`,
					unitSymbol: '$'
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'Asgardex',
					type: 'bars',
					seriesGroup: '[usd]',
					color: '#0ffc03',
					unitSymbol: '$'
				},
				{
					data: series5,
					strokeWidth: 2,
					name: 'ShapeShift',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'red',
					unitSymbol: '$'
				},
				{
					data: series6,
					strokeWidth: 2,
					name: 'EdgeWallet',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'yellow',
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
				chartTitle="[TC]: Swap Volume by Dex"
				chartDesc="Swap volume on THORChain routed through presented DEXes."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="7f7629d7-28e9-4d53-8ea8-9135104e48e8"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default DexSwapVolume
