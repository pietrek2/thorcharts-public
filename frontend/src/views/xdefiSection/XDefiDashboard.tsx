import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import { AiFillSignal, AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import { MdOutlinePriceChange, MdOutlineAccountBalance } from 'react-icons/md'
import { RiContactsLine } from 'react-icons/ri'

import { Row, Col } from 'react-bootstrap'
import ChartContent from '../../components/Chart/ChartContent'
import { STable, SDashboard } from '../sharedSectionStyles'
import { getBackendData } from '../../api/api'
import { IAssetPrice, ITokenHolder, IXDefiDashboard } from '../../api/interfaces'
import { nFormatter } from '../../utils/numbers'
import { minimizeAddress, getEtherscanAddressLink } from '../../utils/address'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'

const XdefiDashboard = () => {
	const [dashboardData, setDashboardData] = useState<IXDefiDashboard>()
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)

	const InitializeData = async () => {
		try {
			setDashboardData(await getBackendData('xdefi', 'dashboard'))
			const chartData = (await getBackendData('xdefi', 'xdefi_price')) as IAssetPrice[]

			const xdefiPrice = chartData.map((element: IAssetPrice) => {
				return { x: new Date(element.DATE.replace(' ', 'T') + 'Z').getTime() / 1000, y: element.ASSET_PRICE_USD }
			})
			setDataSeries([
				{
					data: xdefiPrice,
					strokeWidth: 2,
					name: 'xdefi price',
					type: 'line' as 'line' | 'bars',
					seriesGroup: '[usd]',
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
	if (dashboardData !== undefined && dataSeries !== undefined) {
		return (
			<SDashboard>
				<Row>
					<Col>
						<Row>
							<Card
								icon={MdOutlinePriceChange}
								cardTitle="XDEFI PRICE"
								cardValue1={`${nFormatter(dashboardData.XDEFI_PRICE_USD)} USD`}
								cardValue2={`(${nFormatter(dashboardData.XDEFI_PRICE_USD_PCHANGE_1d, '+')}%)`}
								hasChart={false}
								dataTipTxt="Current price of the XDEFI token"
							/>
							<Card
								icon={MdOutlineAccountBalance}
								cardTitle="XDEFI Staking TVL"
								cardValue1={`${nFormatter(dashboardData.XDEFI_STAKING_TVL)} xDEFI`}
								cardValue2={` ${nFormatter(dashboardData.XDEFI_STAKING_TVL_USD)} USD`}
								hasChart={true}
								link="/xdefi_staking_tvl"
							/>
							<Card
								icon={RiContactsLine}
								cardTitle="Unique XDEFI Holders"
								cardValue1={dashboardData.UNIQUE_XDEFI_HOLDERS.toFixed(0)}
								hasChart={false}
								dataTipTxt="Number of unique addresses holding the xDefi token"
							/>
						</Row>
						<ChartContent dataSeries={dataSeries} chartHeight="30vh" chartWidth="100%" chartTitle="XDEFI: Price [USD]" />
					</Col>
					<STable className="table">
						<caption>Top 10 holders of XDEFI</caption>
						<thead>
							<tr>
								<th>#</th>
								<th>Address</th>
								<th>XDEFI Holdings</th>
							</tr>
						</thead>
						<tbody>
							{dashboardData.TOP10_XDEFI_HOLDERS.map((holder: ITokenHolder) => (
								<tr key={holder.USER_ADDRESS}>
									<th>{dashboardData.TOP10_XDEFI_HOLDERS.findIndex((item) => item.USER_ADDRESS === holder.USER_ADDRESS) + 1}</th>
									<td>
										<a href={getEtherscanAddressLink(holder.USER_ADDRESS)} target="_blank" rel="noreferrer">
											{minimizeAddress(holder.USER_ADDRESS)}
										</a>
									</td>
									<td>{nFormatter(holder.BALANCE)}</td>
								</tr>
							))}
						</tbody>
					</STable>
				</Row>

				<Row>
					<Card
						icon={AiOutlineLock}
						cardTitle="Staking Deposits"
						cardValue1={`${nFormatter(dashboardData.XDEFI_STAKING_DEPOSIT)} XDEFI `}
						cardValue2={` ${nFormatter(dashboardData.XDEFI_STAKING_DEPOSIT_USD)} USD`}
						hasChart={true}
						link="/xdefi_staking_deposits"
					/>
					<Card
						icon={AiOutlineUnlock}
						cardTitle="Staking Withdrawals"
						cardValue1={`${nFormatter(dashboardData.XDEFI_STAKING_WITHDRAWAL)} XDEFI `}
						cardValue2={`${nFormatter(dashboardData.XDEFI_STAKING_WITHDRAWAL_USD)} USD`}
						hasChart={true}
						link="/xdefi_staking_withdrawals"
					/>
				</Row>
			</SDashboard>
		)
	} else {
		return <LoadingChart />
	}
}

export default XdefiDashboard
