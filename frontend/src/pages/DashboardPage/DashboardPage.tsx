import React from 'react'
import Card from '../../components/Card/Card'
import { AiFillSignal } from 'react-icons/ai'
import { Row, Col } from 'react-bootstrap'
import ChartContent from '../../components/Chart/ChartContent'
import { STable, SDashboard } from './styles'
const pointsArray = []
for (let i = 0; i < 3; i++) {
	const points: any = []
	let lastValue = Math.random() * 500000
	for (let i = 120; i < 12000; i++) {
		lastValue += (Math.random() - 0.499) * 10000
		lastValue = Math.max(Math.min(100000000 - Math.random() * 100, lastValue), Math.random() * 100)
		points.push({ x: Date.now() / 1000 + i * 15, y: lastValue })
	}
	pointsArray.push(points)
}
const dataSeries = [
	{
		data: pointsArray[0],
		strokeWidth: 2,
		name: 'test',
		type: 'line' as 'line' | 'bars',
		seriesGroup: 'value',
		color: 'orange'
	}
]
const DashboardPage = () => {
	return (
		<SDashboard>
			<Row>
				<Col>
					<Row>
						<Card icon={AiFillSignal} cardTitle="Card Example" cardValue1="$5.12 M" hasChart={true} />
						<Card icon={AiFillSignal} cardTitle="Card Example" cardValue1="$5.12 M" hasChart={true} />
						<Card icon={AiFillSignal} cardTitle="Token Centralization" cardValue1="~60%" hasChart={false} dataTipTxt="Text explaining card info if there is no chart for it" />
					</Row>
					<ChartContent dataSeries={dataSeries} chartHeight="30vh" chartWidth="100%" />
				</Col>
				<STable className="table">
					<caption>Top 10 holders of [token]</caption>
					<thead>
						<tr>
							<th>#</th>
							<th>Address</th>
							<th>[Token] Holdings</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>1</th>
							<td>0xAFE78...E53249</td>
							<td>12,432,215.43</td>
						</tr>
						<tr>
							<th>2</th>
							<td>0xAFE78...E53249</td>
							<td>11,432,215.43</td>
						</tr>
						<tr>
							<th>3</th>
							<td>0xAFE78...E53249</td>
							<td>10,432,215.43</td>
						</tr>
						<tr>
							<th>4</th>
							<td>0xAFE78...E53249</td>
							<td>9,432,215.43</td>
						</tr>
						<tr>
							<th>5</th>
							<td>0xAFE78...E53249</td>
							<td>6,432,215.43</td>
						</tr>
						<tr>
							<th>6</th>
							<td>0xAFE78...E53249</td>
							<td>5,432,215.43</td>
						</tr>
						<tr>
							<th>7</th>
							<td>0xAFE78...E53249</td>
							<td>4,732,215.43</td>
						</tr>
						<tr>
							<th>8</th>
							<td>0xAFE78...E53249</td>
							<td>4,432,215.43</td>
						</tr>
						<tr>
							<th>9</th>
							<td>0xAFE78...E53249</td>
							<td>2,432,215.43</td>
						</tr>
						<tr>
							<th>10</th>
							<td>0xAFE78...E53249</td>
							<td>1,432,215.43</td>
						</tr>
					</tbody>
				</STable>
			</Row>

			<Row>
				<Card icon={AiFillSignal} cardTitle="Staking Deposits" cardValue1="2.67k THOR $406.98 (-98%)" hasChart={true} />
				<Card icon={AiFillSignal} cardTitle="Card Example" cardValue1="$5.12 M" hasChart={true} />
				<Card icon={AiFillSignal} cardTitle="Card Example" cardValue1="$5.12 M" hasChart={true} />
				<Card icon={AiFillSignal} cardTitle="Card Example" cardValue1="$5.12 M" hasChart={true} />

				<Card icon={AiFillSignal} cardTitle="Card Example" cardValue1="$5.12 M" hasChart={true} />
				<Card icon={AiFillSignal} cardTitle="Card Example" cardValue1="$5.12 M" hasChart={true} />
				<Card icon={AiFillSignal} cardTitle="Card Example" cardValue1="$5.12 M" hasChart={true} />
				<Card icon={AiFillSignal} cardTitle="Card Example" cardValue1="$5.12 M" hasChart={true} />
			</Row>
		</SDashboard>
	)
}

export default DashboardPage
