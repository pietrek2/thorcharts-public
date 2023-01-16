import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IAffiliateFees } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const AffiliateFees = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_aff_fees')) as IAffiliateFees[]
			const thorswapData = chartData.filter((row) => row.LABEL === 'THORSwap')
			const thorwalletData = chartData.filter((row) => row.LABEL === 'THORWallet')
			const edgewalletData = chartData.filter((row) => row.LABEL === 'EdgeWallet')
			const xdefiData = chartData.filter((row) => row.LABEL === 'XDEFI')

			const series1 = thorswapData.map((element: IAffiliateFees) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.FEE_USD }
			})
			const series2 = thorwalletData.map((element: IAffiliateFees) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.FEE_USD }
			})
			const series4 = edgewalletData.map((element: IAffiliateFees) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.FEE_USD }
			})
			const series5 = xdefiData.map((element: IAffiliateFees) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.FEE_USD }
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
					color: 'green',
					unitSymbol: '$'
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'EdgeWallet',
					type: 'bars',
					seriesGroup: '[usd]',
					color: `orange`,
					unitSymbol: '$'
				},
				{
					data: series5,
					strokeWidth: 2,
					name: 'XDEFI',
					type: 'bars',
					seriesGroup: '[usd]',
					color: `red`,
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
				chartTitle="[TC]: Affiliate Fees"
				chartDesc="Affiliate fees can be taken for either swaps or liquidity adds. The fee is set in basis points from 0 to 1000 (10%). The goal is to provide a way for DEXes to earn revenue."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="36b3b6b9-9e9c-4eef-a42f-a31fe7af0775"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default AffiliateFees
