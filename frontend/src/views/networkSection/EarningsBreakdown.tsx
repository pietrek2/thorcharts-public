import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IProtocolEarningsBreakdown } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const EarningsBreakdown = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_reserves_breakdown')) as IProtocolEarningsBreakdown[]
			const series1 = chartData.map((element: IProtocolEarningsBreakdown) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.BLOCK_REWARDS }
			})
			const series2 = chartData.map((element: IProtocolEarningsBreakdown) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.GAS_REIMBURSEMENT }
			})
			const series3 = chartData.map((element: IProtocolEarningsBreakdown) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.IL_PROTECTION }
			})
			const series4 = chartData.map((element: IProtocolEarningsBreakdown) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.NETWORK_FEE }
			})
			const series5 = chartData.map((element: IProtocolEarningsBreakdown) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.OUTBOUND_FEE }
			})
			const series6 = chartData.map((element: IProtocolEarningsBreakdown) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RESERVE_EXPENSE }
			})
			const series7 = chartData.map((element: IProtocolEarningsBreakdown) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RESERVE_INCOME }
			})
			const series8 = chartData.map((element: IProtocolEarningsBreakdown) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SLASHING_INCOME }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'block rewards',
					type: 'bars',
					seriesGroup: '[rune]',
					color: '#ebd034',
					unitSymbol: 'ᚱ',
					barGroup: 'negative'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'gas reimbursement',
					type: 'bars',
					seriesGroup: '[rune]',
					color: '#eb8634',
					unitSymbol: 'ᚱ',
					barGroup: 'negative'
				},
				{
					data: series3,
					strokeWidth: 2,
					name: 'IL protection',
					type: 'bars',
					seriesGroup: '[rune]',
					color: '#eb5334',
					unitSymbol: 'ᚱ',
					barGroup: 'negative'
				},
				{
					data: series6,
					strokeWidth: 2,
					name: 'reserve expense',
					type: 'line',
					seriesGroup: '[rune]',
					color: 'red',
					unitSymbol: 'ᚱ'
				},
				{
					data: series4,
					strokeWidth: 2,
					name: 'network fee',
					type: 'bars',
					seriesGroup: '[rune]',
					color: '#34ebdc',
					unitSymbol: 'ᚱ',
					barGroup: 'positive'
				},
				{
					data: series5,
					strokeWidth: 2,
					name: 'outbound fee',
					type: 'bars',
					seriesGroup: '[rune]',
					color: '#34c6eb',
					unitSymbol: 'ᚱ',
					barGroup: 'positive'
				},
				{
					data: series8,
					strokeWidth: 2,
					name: 'slashing income',
					type: 'bars',
					seriesGroup: '[rune]',
					color: '#348feb',
					unitSymbol: 'ᚱ',
					barGroup: 'positive'
				},
				{
					data: series7,
					strokeWidth: 2,
					name: 'reserve income',
					type: 'line',
					seriesGroup: '[rune]',
					color: 'blue',
					unitSymbol: 'ᚱ'
				}
			])
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		InitializeData()
	}, [])
	if (dataSeries !== undefined) {
		return (
			<ChartPage
				chartTitle="[TC]: Reserve Breakdown"
				chartDesc="Breakdown of the THORChain network expenses and income. 
				Income sources: network fees (currently 0.02 RUNE per transaction), node slashing (network earns RUNE when a node misbehaves), outbound fee (network transaction fee when sending swap outputs to different blockchains). 
				Expense sources: impermanent protection (liquidity provider insurance), block rewards (liquidity provider and node incentives)."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="b169abba-2dea-439c-9715-e0a0a4ae0319"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default EarningsBreakdown
