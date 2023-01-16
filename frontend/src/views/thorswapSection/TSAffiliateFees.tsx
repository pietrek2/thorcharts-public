import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IAffilateFeesSpecified } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const TSAffiliateFees = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorswap', 'ts_affiliate_fees')) as IAffilateFeesSpecified[]
			const series1 = chartData.map((element: IAffilateFeesSpecified) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.FEE_USD }
			})
			const series2 = chartData.map((element: IAffilateFeesSpecified) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.FEE_USD_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'affiliate fee',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'green',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'affiliate fee cumulative',
					type: 'line',
					seriesGroup: '',
					color: 'orange',
					unitSymbol: '$'
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
				chartTitle="[TS]: Affiliate Fees Earned"
				chartDesc="Affiliate fees earned by THORSwap."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="36b3b6b9-9e9c-4eef-a42f-a31fe7af0775"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default TSAffiliateFees
