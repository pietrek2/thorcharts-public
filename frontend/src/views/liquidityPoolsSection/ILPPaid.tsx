import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IILPPaid, ISwapFees } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const ILPPaid = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_ilp_paid')) as IILPPaid[]
			const series1 = chartData.map((element: IILPPaid) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.ILP_PAID_USD }
			})
			const series2 = chartData.map((element: IILPPaid) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.ILP_PAID_USD_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'ilp paid',
					type: 'bars',
					seriesGroup: '[usd]',
					color: 'green',
					unitSymbol: '$'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'ilp paid cumulative',
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
				chartTitle="[TC]: ILP Paid"
				chartDesc="Impermanent loss protection paid by the THORChain network to liquidity providers."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="81903a47-6a49-4104-8f4e-ea370257729e"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default ILPPaid
