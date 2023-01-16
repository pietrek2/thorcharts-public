import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { ITGTDistribution } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TWTGTDistribution = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorwallet', 'tgt_distribution')) as ITGTDistribution[]
			const series1 = chartData.map((element: ITGTDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_1M }
			})
			const series2 = chartData.map((element: ITGTDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_100K }
			})
			const series3 = chartData.map((element: ITGTDistribution) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RICH_COUNT_10K }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'wallets with >= 1M [tgt]',
					type: 'line',
					seriesGroup: '',
					color: 'green',
					unitSymbol: ''
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'wallets with >= 100k [tgt]',
					type: 'line',
					seriesGroup: '',
					color: 'orange',
					unitSymbol: ''
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'wallets with >= 10k [tgt]',
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
				chartTitle="[TW]: TGT Distribution"
				chartDesc="TGT distribution among holders."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="9135a722-3ddc-4c70-b28c-ea1c18b893e5"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TWTGTDistribution
