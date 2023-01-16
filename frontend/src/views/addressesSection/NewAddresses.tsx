import React, { useEffect, useState } from 'react'

import { getBackendData } from '../../api/api'
import { INewAdresses } from '../../api/interfaces'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'
import ChartPage from '../../pages/ChartPage/ChartPage'

const NewAddresses = () => {
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_new_adds')) as INewAdresses[]
			const series1 = chartData.map((element: INewAdresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.NEW_ADDRESSES }
			})
			const series2 = chartData.map((element: INewAdresses) => {
				return { x: new Date(element.DAY).getTime() / 1000, y: element.NEW_ADDRESSES_CUMULATIVE }
			})
			setDataSeries([
				{
					data: series1,
					strokeWidth: 2,
					name: 'new addresses',
					type: 'bars',
					seriesGroup: '',
					color: 'green'
				},
				{
					data: series2,
					strokeWidth: 2,
					name: 'new addresses cumulative',
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
				chartTitle="[TC]: New Addresses"
				chartDesc="The number of new addresses that were active either as a sender or a receiver of funds."
				chartDescTitle="Metric Description"
				chartData={dataSeries}
				queryId="bb5e8f96-ed45-46b0-aa4d-e5b8006f4699"
			/>
		)
	} else {
		return <LoadingChart />
	}
}

export default NewAddresses
