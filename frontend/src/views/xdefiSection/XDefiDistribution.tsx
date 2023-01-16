import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IXDEFIDistribution } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const XDefiDistribution = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('xdefi', 'xdefi_distribution')) as IXDEFIDistribution[]
			const series1 = chartData.map((element: IXDEFIDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_100K }
			})
			const series2 = chartData.map((element: IXDEFIDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_50K }
			})
			const series3 = chartData.map((element: IXDEFIDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_10K }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'wallets with >= 100k [xdefi]',
					type: 'line',
					seriesGroup: '',
					color: 'green',
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'wallets with >= 50k [xdefi]',
					type: 'line',
					seriesGroup: '',
					color: 'orange',
					unitSymbol: ''
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'wallets with >= 10k [xdefi]',
					type: 'line',
					seriesGroup: '',
					color: `${color}`,
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
				chartTitle="[XDEFI]: XDEFI Distribution"
				chartDesc="XDEFI distribution among holders."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="c73ea98e-b568-4bd4-bca5-bb4c9feb6014"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default XDefiDistribution
