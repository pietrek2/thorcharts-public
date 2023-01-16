import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IRuneDistribution } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const RuneDistribution = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_rune_distribution')) as IRuneDistribution[]
			const series1 = chartData.map((element: IRuneDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_100K }
			})
			const series2 = chartData.map((element: IRuneDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_10K }
			})
			const series3 = chartData.map((element: IRuneDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_1K }
			})
			const series4 = chartData.map((element: IRuneDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_100 }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'Wallets with >= 100k ᚱ',
					type: 'line',
					seriesGroup: '',
					color: 'green'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'Wallets with >= 10k ᚱ',
					type: 'line',
					seriesGroup: '',
					color: 'orange'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'Wallets with >= 1k ᚱ',
					type: 'line',
					seriesGroup: '',
					color: `${color}`
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'Wallets with >= 100 ᚱ',
					type: 'line',
					seriesGroup: '',
					color: 'red'
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
				chartTitle="[TC]: RUNE Distribution"
				chartDesc="The distribution of RUNE among holders."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="a5d0b143-2423-46e3-9394-f31e68de5454"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default RuneDistribution
