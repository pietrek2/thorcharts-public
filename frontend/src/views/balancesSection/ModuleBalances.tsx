import React, { useContext, useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IModuleBalances } from '../../api/interfaces'
import { ThemeContext } from '../../App'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const ModuleBalances = () => {
	const { setTheme, theme } = useContext(ThemeContext)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async (color: string) => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_module_balances')) as IModuleBalances[]
			const series1 = chartData.map((element: IModuleBalances) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.POOL_MODULE_BALANCE }
			})
			const series2 = chartData.map((element: IModuleBalances) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.BOND_MODULE_BALANCE }
			})
			const series3 = chartData.map((element: IModuleBalances) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RESERVE_MODULE_BALANCE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'Pool Module',
					type: 'line',
					seriesGroup: '[rune]',
					color: 'orange',
					unitSymbol: 'ᚱ'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'Bond Module',
					type: 'line',
					seriesGroup: '[rune]',
					color: 'green',
					unitSymbol: 'ᚱ'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'Reserve Module',
					type: 'line',
					seriesGroup: '[rune]',
					color: `${color}`,
					unitSymbol: 'ᚱ'
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
				chartTitle="[TC]: Module Balances"
				chartDesc="Reserve module: thor1dheycdevq39qlkxs2a6wuuzyn4aqxhve4qxtxt and thor1lj62pg6ryxv2htekqx04nv7wd3g98qf9gfvamy. Pool module: thor1g98cy3n9mmjrpn0sxmn63lztelera37n8n67c0. Bond module: thor17gw75axcnr8747pkanye45pnrwk7p9c3cqncsv."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="b36f1290-e971-4dfc-84b7-792674bf63c4"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default ModuleBalances
