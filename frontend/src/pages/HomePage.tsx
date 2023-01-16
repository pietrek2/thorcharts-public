import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import { AiFillSignal } from 'react-icons/ai'
import { Row } from 'react-bootstrap'
import ChartContent from '../components/Chart/ChartContent'
import ChartDescription from '../components/ChartDescription/ChartDescription'
import { getBackendData } from '../api/api'
import { IAssetPrice } from '../api/interfaces'
import { IChart } from '../components/Chart/interface'
const pointsArray = []
for (let i = 0; i < 5; i++) {
	const points: any = []
	let lastValue = Math.random() * 200000 - 100000
	for (let i = 120; i < 1200; i++) {
		lastValue += (Math.random() - 0.499) * 10000
		lastValue = Math.max(Math.min(100000000 - Math.random() * 100, lastValue), Math.random() * 100 - 500000)
		points.push({ x: Date.now() / 1000 + i * 15, y: lastValue })
	}
	pointsArray.push(points)
}
const dataSeries = [
	// {
	// 	data: pointsArray[0],
	// 	strokeWidth: 2,
	// 	name: 'test',
	// 	type: 'line' as 'line' | 'bars',
	// 	seriesGroup: '[USD]',
	// 	color: 'orange',
	// 	unitSymbol: '$'
	// },
	// {
	// 	data: pointsArray[1],
	// 	strokeWidth: 2,
	// 	name: 'test',
	// 	type: 'line' as 'line' | 'bars',
	// 	seriesGroup: '[USD]',
	// 	color: 'blue',
	// 	unitSymbol: '$'
	// },
	// {
	// 	data: [{x: 20, y: 2}, {x: 30, y: 3}, {x: 40, y: 4}, {x: 50, y: 5}, {x: 60, y: 6}],
	// 	strokeWidth: 2,
	// 	name: 'test',
	// 	type: 'bars' as 'line' | 'bars',
	// 	seriesGroup: '[USERS]',
	// 	color: 'green',
	// 	unitSymbol: "$",
	// 	barGroup: "2"
	// },
	// {
	// 	data: [{x: 20, y: 3}, {x: 30, y: 4}, {x: 40, y: 5}, {x: 50, y: 6}, {x: 60, y: 6}],
	// 	strokeWidth: 2,
	// 	name: 'test1',
	// 	type: 'bars' as 'line' | 'bars',
	// 	seriesGroup: '[USERS]',
	// 	color: 'purple',
	// 	unitSymbol: "$",
	// 	barGroup: "2"
	// },
	{
		data: pointsArray[2],
		strokeWidth: 2,
		name: 'test',
		type: 'bars' as 'line' | 'bars',
		seriesGroup: '[USERS]',
		color: 'green',
		unitSymbol: '$'
	},
	{
		data: pointsArray[3],
		strokeWidth: 2,
		name: 'test',
		type: 'bars' as 'line' | 'bars',
		seriesGroup: '[USERS]',
		color: 'purple',
		unitSymbol: '$'
	}
	// {
	// 	data: pointsArray[4],
	// 	strokeWidth: 2,
	// 	name: 'test',
	// 	type: 'bars' as 'line' | 'bars',
	// 	seriesGroup: '[USD]',
	// 	color: 'red',
	// 	unitSymbol: "$",
	// }
]
const HomePage = () => {
	const [dataSeries2, setDataSeries2] = useState<IChart | any>(undefined)
	const InitializeData = async () => {
		try {
			const chartData = (await getBackendData('thorchain', 'tc_rune_price')) as IAssetPrice[]
			const runePrice = chartData.map((element: IAssetPrice) => {
				return { x: new Date(element.DATE).getTime() / 1000, y: element.ASSET_PRICE_USD }
			})
			setDataSeries2([
				{
					data: runePrice,
					strokeWidth: 2,
					name: 'rune price',
					type: 'line' as 'line' | 'bars',
					seriesGroup: 'value',
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
	return (
		<>
			<Row>
				{dataSeries && <ChartContent dataSeries={dataSeries} chartHeight="30vh" chartWidth="100%" chartTitle="Rune: Price [USD]" />}
				<ChartDescription
					title="Description"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				/>
				<ChartDescription
					title="Description"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				/>
				<ChartDescription
					title="Description"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				/>
			</Row>
		</>
	)
}

export default HomePage
