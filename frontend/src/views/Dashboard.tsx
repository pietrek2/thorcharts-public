import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import { AiFillSignal, AiOutlineNodeIndex, AiOutlineFileProtect } from 'react-icons/ai'
import { MdPriceCheck, MdOutlinePriceChange, MdOutlineAccountBalance, MdOutlineSwapHoriz } from 'react-icons/md'
import { FaRegAddressBook, FaBalanceScale, FaBalanceScaleLeft, FaBalanceScaleRight } from 'react-icons/fa'
import { RiExchangeDollarLine, RiSecurePaymentLine } from 'react-icons/ri'
import { SiHiveBlockchain } from 'react-icons/si'
import { TbPool } from 'react-icons/tb'
import { BsShieldLock, BsPiggyBank } from 'react-icons/bs'

import { Row, Col } from 'react-bootstrap'
import ChartContent from '../components/Chart/ChartContent'
import { STable, SDashboard } from './sharedSectionStyles'
import { getBackendData } from '../api/api'
import { nFormatter } from '../utils/numbers'
import { minimizeAddress, getViewblockAddressLink } from '../utils/address'
import { IAssetPrice, ITHORCHAINDashboard, ITokenHolder } from '../api/interfaces'
import { IChart } from '../components/Chart/interface'
import LoadingChart from '../components/LoadingIcon/Loading'

const ThorchainDashboard = () => {
	const [dashboardData, setDashboardData] = useState<ITHORCHAINDashboard>()
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)
	const InitializeData = async () => {
		try {
			setDashboardData(await getBackendData('thorchain', 'dashboard'))

			const chartData = (await getBackendData('thorchain', 'tc_rune_price')) as IAssetPrice[]
			const runePrice = chartData.map((element: IAssetPrice) => {
				return { x: new Date(element.DATE.replace(" ", "T") + "Z").getTime() / 1000, y: element.ASSET_PRICE_USD }
			})
			setDataSeries([
				{
					data: runePrice,
					strokeWidth: 2,
					name: 'rune price',
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
								cardTitle="RUNE Price"
								cardValue1={`${nFormatter(dashboardData.RUNE_PRICE)} $ `}
								cardValue2={`(${nFormatter(dashboardData.RUNE_PRICE_PCHANGE_1d, '+')}%)`}
								hasChart={true}
								link="/thorchain_deterministic_rune_price"
							/>
							<Card
								icon={MdPriceCheck}
								cardTitle="Deterministic price"
								cardValue1={`${nFormatter(dashboardData.DETERMINISTIC_RUNE_PRICE)} $`}
								hasChart={true}
								link="/thorchain_deterministic_rune_price"
							/>

							<Card
								icon={FaRegAddressBook}
								cardTitle="New Addresses"
								cardValue1={`[1d]: ${dashboardData.NEW_ADDRESSES.toFixed(0)}`}
								cardValue2={`[Total]: ${nFormatter(dashboardData.UNIQUE_RUNE_HOLDERS)}`}
								hasChart={true}
								link="/thorchain_new_addresses"
							/>
						</Row>
						<ChartContent dataSeries={dataSeries} chartHeight="30vh" chartWidth="100%" chartTitle="Rune: Price [USD]" />
					</Col>
					<STable className="table">
						<caption>Top 10 holders of RUNE</caption>
						<thead>
							<tr>
								<th>#</th>
								<th>Address</th>
								<th>Balance [ᚱ]</th>
							</tr>
						</thead>
						<tbody>
							{dashboardData.TOP10_RUNE_HOLDERS.map((holder: ITokenHolder) => (
								<tr key={holder.USER_ADDRESS}>
									<th>{dashboardData.TOP10_RUNE_HOLDERS.findIndex((item) => item.USER_ADDRESS === holder.USER_ADDRESS) + 1}</th>
									<td>
										<a href={getViewblockAddressLink(holder.USER_ADDRESS)} target="_blank" rel="noreferrer">
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
						icon={FaBalanceScale}
						cardTitle="Reserve Module Balance"
						cardValue1={`${nFormatter(dashboardData.RESERVE_MODULE_BALANCE)} ᚱ`}
						cardValue2={`${nFormatter(dashboardData.RESERVE_MODULE_BALANCE_USD)} $`}
						hasChart={true}
						link="/thorchain_module_balances"
					/>
					<Card
						icon={MdOutlineAccountBalance}
						cardTitle="Exchange Balance"
						cardValue1={`${nFormatter(dashboardData.TOTAL_CEX_BALANCE)} ᚱ `}
						cardValue2={`${nFormatter(dashboardData.TOTAL_CEX_BALANCE_USD)} $`}
						hasChart={true}
						link="/thorchain_cex_balance"
					/>
					<Card
						icon={FaBalanceScaleLeft}
						cardTitle="Reserve Income"
						cardValue1={`${nFormatter(dashboardData.RESERVE_INCOME)} ᚱ`}
						cardValue2={`${nFormatter(dashboardData.RESERVE_INCOME_USD)} $`}
						hasChart={true}
						link="/thorchain_reserve_breakdown"
					/>
					<Card
						icon={FaBalanceScaleRight}
						cardTitle="Reserve Expense"
						cardValue1={`${nFormatter(dashboardData.RESERVE_EXPENSE)} ᚱ `}
						cardValue2={`${nFormatter(dashboardData.RESERVE_EXPENSE_USD)} $`}
						hasChart={true}
						link="/thorchain_reserve_breakdown"
					/>
					<Card
						icon={RiExchangeDollarLine}
						cardTitle="Swap Fees"
						cardValue1={`${nFormatter(dashboardData.LIQUIDITY_FEES)} ᚱ `}
						cardValue2={`${nFormatter(dashboardData.LIQUIDITY_FEES_USD)} $`}
						hasChart={true}
						link="/thorchain_swap_fees"
					/>
					<Card
						icon={SiHiveBlockchain}
						cardTitle="Block Rewards"
						cardValue1={`${nFormatter(dashboardData.BLOCK_REWARDS)} ᚱ`}
						cardValue2={`${nFormatter(dashboardData.BLOCK_REWARDS_USD)} $`}
						hasChart={true}
						link="/thorchain_network_earnings"
					/>
					<Card
						icon={AiOutlineNodeIndex}
						cardTitle="Earnings to Nodes"
						cardValue1={`${nFormatter(dashboardData.EARNINGS_TO_NODES)} ᚱ `}
						cardValue2={`${nFormatter(dashboardData.EARNINGS_TO_NODES_USD)} $`}
						hasChart={true}
						link="/thorchain_earnings_distribution"
					/>
					<Card
						icon={TbPool}
						cardTitle="Earnings to Pools"
						cardValue1={`${nFormatter(dashboardData.EARNINGS_TO_POOLS)} ᚱ `}
						cardValue2={`${nFormatter(dashboardData.EARNINGS_TO_POOLS_USD)} $`}
						hasChart={true}
						link="/thorchain_earnings_distribution"
					/>
					<Card
						icon={BsPiggyBank}
						cardTitle="Total Value Pooled"
						cardValue1={`${nFormatter(dashboardData.TOTAL_VALUE_POOLED)} ᚱ`}
						cardValue2={`${nFormatter(dashboardData.TOTAL_VALUE_POOLED_USD)} $`}
						hasChart={true}
						link="/thorchain_tv_pooled"
					/>
					<Card
						icon={RiSecurePaymentLine}
						cardTitle="Total Value Bonded"
						cardValue1={`${nFormatter(dashboardData.TOTAL_VALUE_BONDED)} ᚱ `}
						cardValue2={`${nFormatter(dashboardData.TOTAL_VALUE_BONDED_USD)} $`}
						hasChart={true}
						link="/thorchain_tv_bonded"
					/>
					<Card
						icon={BsShieldLock}
						cardTitle="Total Value Locked"
						cardValue1={`${nFormatter(dashboardData.TOTAL_VALUE_LOCKED)} ᚱ `}
						cardValue2={`${nFormatter(dashboardData.TOTAL_VALUE_LOCKED_USD)} $`}
						hasChart={true}
						link="/thorchain_tv_locked"
					/>
					<Card
						icon={AiOutlineFileProtect}
						cardTitle="ILP Paid"
						cardValue1={`${nFormatter(dashboardData.ILP_PAID)} ᚱ `}
						cardValue2={`${nFormatter(dashboardData.ILP_PAID_USD)} $`}
						hasChart={true}
						link="/thorchain_ilp_paid"
					/>
					<Card
						icon={MdOutlineSwapHoriz}
						cardTitle="Swap Count"
						cardValue1={`[1d]: ${nFormatter(dashboardData.SWAP_COUNT)} `}
						cardValue2={`[Total]: ${nFormatter(dashboardData.SWAP_COUNT_CUMULATIVE)}`}
						hasChart={true}
						link="/thorchain_swap_count"
					/>
					<Card icon={MdOutlineSwapHoriz} cardTitle="Unique Swapper Count" cardValue1={`[1d]: ${nFormatter(dashboardData.UNIQUE_SWAPPER_COUNT)}`} hasChart={true} link="/thorchain_unique_swap_count" />
					<Card
						icon={AiFillSignal}
						cardTitle="Swap Volume"
						cardValue1={`[1d]: ${nFormatter(dashboardData.SWAP_VOLUME_USD)} $`}
						cardValue2={`[Total]: ${nFormatter(dashboardData.SWAP_VOLUME_USD_CUMULATIVE)} $`}
						hasChart={true}
						link="/thorchain_swap_volume"
					/>
				</Row>
			</SDashboard>
		)
	} else {
		return <LoadingChart />
	}
}

export default ThorchainDashboard
