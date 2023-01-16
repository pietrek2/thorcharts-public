import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import { AiFillSignal, AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import { MdOutlinePriceChange, MdOutlineAccountBalance } from 'react-icons/md'
import { RiContactsLine } from 'react-icons/ri'
import { BsCoin } from 'react-icons/bs'

import { Row, Col } from 'react-bootstrap'
import ChartContent from '../../components/Chart/ChartContent'
import { STable, SDashboard } from '../sharedSectionStyles'
import { getBackendData } from '../../api/api'
import { IAssetPrice, ITHORWALLETDashboard, ITokenHolder } from '../../api/interfaces'
import { nFormatter } from '../../utils/numbers'
import { minimizeAddress, getEtherscanAddressLink } from '../../utils/address'
import { IChart } from '../../components/Chart/interface'
import LoadingChart from '../../components/LoadingIcon/Loading'

const ThorwalletDashboard = () => {
	const [dashboardData, setDashboardData] = useState<ITHORWALLETDashboard>()
	const [dataSeries, setDataSeries] = useState<IChart[] | undefined>(undefined)

	const InitializeData = async () => {
		try {
			setDashboardData(await getBackendData('thorwallet', 'dashboard'))
			const chartData = (await getBackendData('thorwallet', 'tgt_price')) as IAssetPrice[]

			const thorPrice = chartData.map((element: IAssetPrice) => {
				return { x: new Date(element.DATE.replace(' ', 'T') + 'Z').getTime() / 1000, y: element.ASSET_PRICE_USD }
			})
			setDataSeries([
				{
					data: thorPrice,
					strokeWidth: 2,
					name: 'tgt price',
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
								cardTitle="TGT PRICE"
								cardValue1={`${nFormatter(dashboardData.TGT_PRICE_USD)} USD`}
								cardValue2={`(${nFormatter(dashboardData.TGT_PRICE_USD_PCHANGE_1d, '+')}%)`}
								hasChart={false}
								dataTipTxt="Current price of the TGT token"
							/>
							<Card
								icon={MdOutlineAccountBalance}
								cardTitle="TGT Staking TVL"
								cardValue1={`${nFormatter(dashboardData.TGT_STAKING_TVL)} TGT `}
								cardValue2={`${nFormatter(dashboardData.TGT_STAKING_TVL_USD)} USD`}
								hasChart={true}
								link="/thorwallet_staking_tvl"
							/>
							<Card
								icon={RiContactsLine}
								cardTitle="Unique TGT Holders"
								cardValue1={dashboardData.UNIQUE_TGT_HOLDERS.toFixed(0)}
								hasChart={false}
								dataTipTxt="Number of unique addresses holding the TGT token"
							/>
						</Row>
						<ChartContent dataSeries={dataSeries} chartHeight="30vh" chartWidth="100%" chartTitle="TGT: Price [USD]" />
					</Col>
					<STable className="table">
						<caption>Top 10 holders of TGT</caption>
						<thead>
							<tr>
								<th>#</th>
								<th>Address</th>
								<th>TGT Holdings</th>
							</tr>
						</thead>
						<tbody>
							{dashboardData.TOP10_TGT_HOLDERS.map((holder: ITokenHolder) => (
								<tr key={holder.USER_ADDRESS}>
									<th>{dashboardData.TOP10_TGT_HOLDERS.findIndex((item) => item.USER_ADDRESS === holder.USER_ADDRESS) + 1}</th>
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
						cardValue1={`${nFormatter(dashboardData.TGT_STAKING_DEPOSIT)} TGT`}
						cardValue2={`${nFormatter(dashboardData.TGT_STAKING_DEPOSIT_USD)} USD`}
						hasChart={true}
						link="/thorwallet_staking_deposits"
					/>
					<Card
						icon={AiOutlineUnlock}
						cardTitle="Staking Withdrawals"
						cardValue1={`${nFormatter(dashboardData.TGT_STAKING_WITHDRAWAL)} TGT`}
						cardValue2={`${nFormatter(dashboardData.TGT_STAKING_WITHDRAWAL_USD)} USD`}
						hasChart={true}
						link="/thorwallet_staking_withdrawals"
					/>
					<Card
						icon={BsCoin}
						cardTitle="Affiliate Fees Earned"
						cardValue1={`${nFormatter(dashboardData.TW_AFF_FEES_EARNED)} ᚱ`}
						cardValue2={`${nFormatter(dashboardData.TW_AFF_FEES_EARNED_USD)} USD`}
						hasChart={true}
						link="/thorwallet_affiliate_fees"
					/>
				</Row>
			</SDashboard>
		)
	} else {
		return <LoadingChart />
	}
}

export default ThorwalletDashboard
