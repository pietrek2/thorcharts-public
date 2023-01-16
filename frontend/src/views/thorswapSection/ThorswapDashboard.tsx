import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import { AiFillSignal, AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import { MdOutlinePriceChange, MdOutlineAccountBalance } from 'react-icons/md'
import { RiContactsLine } from 'react-icons/ri'
import { BsCoin } from 'react-icons/bs'
import { GiReceiveMoney } from 'react-icons/gi'

import { Row, Col } from 'react-bootstrap'
import ChartContent from '../../components/Chart/ChartContent'
import { STable, SDashboard } from '../sharedSectionStyles'
import { getBackendData } from '../../api/api'
import { IAssetPrice, ITHORSWAPDashboard, ITokenHolder } from '../../api/interfaces'
import { nFormatter } from '../../utils/numbers'
import { minimizeAddress, getEtherscanAddressLink } from '../../utils/address'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'

const ThorswapDashboard = () => {
	const [dashboardData, setDashboardData] = useState<ITHORSWAPDashboard>()
	const [isShowingThorHolders, setShowingThorHolders] = useState(true)
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)

	const InitializeData = async () => {
		try {
			setDashboardData(await getBackendData('thorswap', 'dashboard'))

			const chartData = (await getBackendData('thorswap', 'thor_price')) as IAssetPrice[]
			const thorPrice = chartData.map((element: IAssetPrice) => {
				return { x: new Date(element.DATE.replace(' ', 'T') + 'Z').getTime() / 1000, y: element.ASSET_PRICE_USD }
			})
			setDataSeries([
				{
					data: thorPrice,
					strokeWidth: 2,
					name: 'thor price',
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
								cardTitle="THOR PRICE"
								cardValue1={`${nFormatter(dashboardData.THOR_PRICE_USD)} USD`}
								cardValue2={`(${nFormatter(dashboardData.THOR_PRICE_USD_PCHANGE_1d, '+')}%)`}
								hasChart={false}
								dataTipTxt="Current price of the THOR token"
							/>
							<Card
								icon={RiContactsLine}
								cardTitle="Unique THOR Holders"
								cardValue1={dashboardData.UNIQUE_THOR_HOLDERS.toFixed(0)}
								hasChart={false}
								dataTipTxt="Number of unique addresses holding the THOR token"
							/>
							<Card
								icon={RiContactsLine}
								cardTitle="Unique vTHOR Holders"
								cardValue1={dashboardData.UNIQUE_VTHOR_HOLDERS.toFixed(0)}
								hasChart={false}
								dataTipTxt="Number of unique addresses holding the vTHOR token"
							/>
						</Row>
						<ChartContent dataSeries={dataSeries} chartHeight="30vh" chartWidth="100%" chartTitle="THOR: Price [USD]" />
					</Col>
					<STable className="table">
						<caption>
							Top 10 holders of {isShowingThorHolders ? 'THOR' : 'vTHOR'} <span onClick={() => setShowingThorHolders((p) => !p)}>Change to {isShowingThorHolders ? 'vTHOR' : 'THOR'}</span>
						</caption>
						<thead>
							<tr>
								<th>#</th>
								<th>Address</th>
								<th>{isShowingThorHolders ? 'THOR' : 'vTHOR'} Holdings</th>
							</tr>
						</thead>
						<tbody>
							{isShowingThorHolders &&
								dashboardData.TOP10_THOR_HOLDERS.map((holder: ITokenHolder) => (
									<tr key={holder.USER_ADDRESS}>
										<th>{dashboardData.TOP10_THOR_HOLDERS.findIndex((item) => item.USER_ADDRESS === holder.USER_ADDRESS) + 1}</th>
										<td>
											<a href={getEtherscanAddressLink(holder.USER_ADDRESS)} target="_blank" rel="noreferrer">
												{minimizeAddress(holder.USER_ADDRESS)}
											</a>
										</td>
										<td>{nFormatter(holder.BALANCE)}</td>
									</tr>
								))}
							{!isShowingThorHolders &&
								dashboardData.TOP10_vTHOR_HOLDERS.map((holder: ITokenHolder) => (
									<tr key={holder.USER_ADDRESS}>
										<th>{dashboardData.TOP10_vTHOR_HOLDERS.findIndex((item) => item.USER_ADDRESS === holder.USER_ADDRESS) + 1}</th>
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
						icon={MdOutlineAccountBalance}
						cardTitle="Staking TVL"
						cardValue1={`${nFormatter(dashboardData.THOR_STAKING_TVL)} THOR`}
						cardValue2={`${nFormatter(dashboardData.THOR_STAKING_TVL_USD)} USD`}
						hasChart={true}
						link="/thorswap_staking_tvl"
					/>
					<Card
						icon={AiOutlineLock}
						cardTitle="Staking Deposits"
						cardValue1={`${nFormatter(dashboardData.THOR_STAKING_DEPOSIT)} THOR`}
						cardValue2={`${nFormatter(dashboardData.THOR_STAKING_DEPOSIT_USD)} USD`}
						hasChart={true}
						link="/thorswap_staking_deposits"
					/>
					<Card
						icon={AiOutlineUnlock}
						cardTitle="Staking Withdrawals"
						cardValue1={`${nFormatter(dashboardData.THOR_STAKING_WITHDRAWAL)} THOR`}
						cardValue2={`$${nFormatter(dashboardData.THOR_STAKING_WITHDRAWAL_USD)} USD`}
						hasChart={true}
						link="/thorswap_staking_withdrawals"
					/>
					<Card
						icon={GiReceiveMoney}
						cardTitle="Protocol Emission Rewards"
						cardValue1={`${nFormatter(dashboardData.THOR_REWARDS_FROM_PROTOCOL_EMISSION)} THOR`}
						cardValue2={`${nFormatter(dashboardData.THOR_REWARDS_FROM_PROTOCOL_EMISSION_USD)} USD`}
						hasChart={true}
						link="/thorswap_protocol_emissions"
					/>
					<Card
						icon={GiReceiveMoney}
						cardTitle="Fee Sharing Rewards"
						cardValue1={`${nFormatter(dashboardData.THOR_REWARDS_FROM_EXCHANGE_FEE_SHARING)} THOR`}
						cardValue2={`${nFormatter(dashboardData.THOR_REWARDS_FROM_EXCHANGE_FEE_SHARING_USD)} USD`}
						hasChart={true}
						link="/thorswap_fee_sharing"
					/>
					<Card
						icon={BsCoin}
						cardTitle="Affiliate Fees Earned"
						cardValue1={`${nFormatter(dashboardData.TS_AFF_FEES_EARNED)} ᚱ`}
						cardValue2={`${nFormatter(dashboardData.TS_AFF_FEES_EARNED_USD)} USD`}
						hasChart={true}
						link="/thorswap_affiliate_fees"
					/>
				</Row>
			</SDashboard>
		)
	} else {
		return <LoadingChart />
	}
}

export default ThorswapDashboard
