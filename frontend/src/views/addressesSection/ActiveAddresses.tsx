import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { IActiveAddresses } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const ActiveAddresses = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_active_adds')) as IActiveAddresses[]
			const series1 = chartData.map((element: IActiveAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.SENDING_ADDRESSES }
			})
			const series2 = chartData.map((element: IActiveAddresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.RECEIVING_ADDRESSES }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'sending addresses',
					type: 'bars',
					seriesGroup: '',
					color: 'green'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'receiving addresses',
					type: 'bars',
					seriesGroup: '',
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
				chartTitle="[TC]: Active Addresses"
				chartDesc="The number of unique addresses that were active as a sender or receiver of funds."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="55d6d2a0-ec2e-4fef-96ab-ca16c6c34053"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default ActiveAddresses
