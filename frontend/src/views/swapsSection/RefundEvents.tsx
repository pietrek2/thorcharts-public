import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IRefundEvents } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const RefundEvents = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_refund_event_count')) as IRefundEvents[]
			const series1 = chartData.map((element: IRefundEvents) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REFUND_COUNT }
			})
			const series2 = chartData.map((element: IRefundEvents) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.REFUND_COUNT_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'refund event count',
					type: 'bars',
					seriesGroup: '',
					color: 'green'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'refund event count cumulative',
					type: 'line',
					seriesGroup: ' ',
					color: 'orange'
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
				chartTitle="[TC]: Refund Events Count"
				chartDesc="Swap refund events usually occur when the swap output is less than the minimum limit set by the swapper."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="12a94956-cd79-4e31-b38b-daef72b01c38"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default RefundEvents
