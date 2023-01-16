import React from 'react'
import { useLocation } from 'react-router-dom'
import { SDropDownDivider, SLink, SLinkContainer, SLinkDropDownContainer, SLinkIcon, SLinkLabel, SLinkNotification, SLinkLogo } from './styles'
import THORSwapLogo from '../../assets/logos/thorswap/thorswapLogo.jpg'
import THORWalletLogo from '../../assets/logos/thorwallet/thorwalletLogo.jpg'
import XDEFILogo from '../../assets/logos/xdefi/xdefiLogo.jpg'
import { AiOutlineSwap, AiOutlineLeft, AiOutlineDown } from 'react-icons/ai'
import { TbAddressBook, TbWallet } from 'react-icons/tb'
import { FaNetworkWired, FaSwimmingPool } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { BsPiggyBank } from 'react-icons/bs'
import { BsBank } from 'react-icons/bs'

function SidebarList(props) {
	const filteredLinksArray = []

	const { pathname } = useLocation()
	for (let i = 0; i < linksArray.length; i++) {
		const element = Object.create(linksArray[i])
		if (props.searchText === '') {
			filteredLinksArray.push(element)
		} else {
			if (element.dropDownLinksArray) {
				const tempList = []
				for (let i = 0; i < element.dropDownLinksArray.length; i++) {
					if (element.dropDownLinksArray[i].label.toLowerCase().includes(props.searchText)) {
						tempList.push(element.dropDownLinksArray[i])
					}
				}
				if (tempList.length > 0) {
					element.dropDownLinksArray = tempList
					filteredLinksArray.push(element)
				}
			} else {
				if (element.label.toLowerCase().includes(props.searchText)) {
					filteredLinksArray.push(element)
				}
			}
		}
	}
	if (props.searchText !== '' && filteredLinksArray.length > 0) {
		filteredLinksArray.forEach((element) => {
			props.dropdownOpen[element.label] = true
		})
	}

	return (
		<>
			{filteredLinksArray.map(({ icon, label, dropDown, to, dropDownLinksArray }) => (
				<div key={label}>
					<SLinkContainer
						isActive={props.pathname === to}
						onClick={() => {
							if (dropDownLinksArray) {
								props.setSidebarOpen(true)
							}
							props.setDropdownOpen((prevState) => ({
								...prevState,
								[label]: !props.dropdownOpen[label]
							}))
						}}
					>
						<SLink to={to ? to : pathname} style={!props.sidebarOpen ? { width: `fit-content` } : {}}>
							<SLinkIcon>{icon}</SLinkIcon>
							{props.sidebarOpen && (
								<>
									<SLinkLabel>{label}</SLinkLabel>
									{/* if dropDown are at 0 or null, do not display */}
									{!!dropDown && (
										<SLinkNotification>
											{props.dropdownOpen[label] && <AiOutlineDown />}
											{!props.dropdownOpen[label] && <AiOutlineLeft />}
										</SLinkNotification>
									)}
								</>
							)}
						</SLink>
					</SLinkContainer>

					{props.dropdownOpen[label] &&
						props.sidebarOpen &&
						dropDownLinksArray &&
						dropDownLinksArray.map(({ label, to }) => (
							<SLinkDropDownContainer key={label} isActive={props.pathname === to}>
								<SLink to={to} style={!props.sidebarOpen ? { width: `fit-content` } : {}}>
									<SDropDownDivider />
									<SLinkLabel style={{ fontSize: '14px' }}>{label}</SLinkLabel>
								</SLink>
							</SLinkDropDownContainer>
						))}
				</div>
			))}
		</>
	)
}
const linksArray = [
	{
		label: 'Dashboard',
		icon: <MdDashboard />,
		to: '/',
		dropDown: 0
	},
	{
		label: 'Savers',
		icon: <BsPiggyBank />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'BTC Saver Depth',
				to: '/thorchain_btc_saver'
			},
			{
				label: 'ETH Saver Depth',
				to: '/thorchain_eth_saver'
			},
			{
				label: 'Realized P/L',
				to: '/thorchain_savers_realized_pl'
			},
			{
				label: 'Net Realized P/L',
				to: '/thorchain_savers_net_realized_pl'
			},
			{
				label: 'Net Unrealized P/L',
				to: '/thorchain_savers_unrealized_pl'
			},
			{
				label: 'Unique Addresses',
				to: '/thorchain_savers_addresses'
			},
			{
				label: 'Saver Depths',
				to: '/thorchain_savers_depth'
			},
			{
				label: 'Liq Deposits',
				to: '/thorchain_savers_liq_adds'
			},
			{
				label: 'Liq Withdrawals',
				to: '/thorchain_savers_liq_withdrawals'
			},
			{
				label: 'Cumulative Yield',
				to: '/thorchain_savers_yield_cumulative'
			}
		]
	},
	{
		label: 'Addresses',
		icon: <TbAddressBook />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'New Addresses',
				to: '/thorchain_new_addresses'
			},
			{
				label: 'Active Addresses',
				to: '/thorchain_active_addresses'
			}
		]
	},
	{
		label: 'Network',
		icon: <FaNetworkWired />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'Deterministic Price',
				to: '/thorchain_deterministic_rune_price'
			},
			{
				label: 'Total Value Pooled',
				to: '/thorchain_tv_pooled'
			},
			{
				label: 'Total Value Bonded',
				to: '/thorchain_tv_bonded'
			},
			{
				label: 'Total Value Locked',
				to: '/thorchain_tv_locked'
			},
			{
				label: 'User Earnings',
				to: '/thorchain_user_earnings'
			},
			{
				label: 'Earnings Distribution',
				to: '/thorchain_earnings_distribution'
			},
			{
				label: 'Reserve Breakdown',
				to: '/thorchain_reserve_breakdown'
			}
		]
	},
	{
		label: 'LiquidityPools',
		icon: <FaSwimmingPool />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'Liquidity Net (add - withdraw)',
				to: '/thorchain_liqduitiy_net'
			},
			{
				label: 'Non Rune TVL',
				to: '/thorchain_non_rune_tvl'
			},
			{
				label: 'ILP Paid',
				to: '/thorchain_ilp_paid'
			}
		]
	},
	{
		label: 'Swaps',
		icon: <AiOutlineSwap />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'Refund Events Count',
				to: '/thorchain_refund_events'
			},
			{
				label: 'Swap Fees',
				to: '/thorchain_swap_fees'
			},
			{
				label: 'Swap Volume',
				to: '/thorchain_swap_volume'
			},
			{
				label: 'Swap Count',
				to: '/thorchain_swap_count'
			},
			{
				label: 'Unique Swapper Count',
				to: '/thorchain_unique_swap_count'
			}
		]
	},
	{
		label: 'Balances',
		icon: <TbWallet />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'Module Balances',
				to: '/thorchain_module_balances'
			},
			{
				label: 'Rune Distribution',
				to: '/thorchain_rune_distribution'
			}
		]
	},
	{
		label: 'Exchanges',
		icon: <BsBank />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'CEX Balances',
				to: '/thorchain_cex_balance'
			},
			{
				label: 'Affiliate Fees',
				to: '/thorchain_affiliate_fees'
			},
			{
				label: 'Swap Volume',
				to: '/thorchain_swap_volume_by_dex'
			}
		]
	},
	{
		label: 'THORSwap',
		icon: <SLinkLogo src={THORSwapLogo} />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'THOR Dashboard',
				to: '/thorswap_dashboard'
			},
			{
				label: 'THOR Distribution',
				to: '/thorswap_thor_distribution'
			},
			{
				label: 'vTHOR Distribution',
				to: '/thorswap_vthor_distribution'
			},
			{
				label: 'Affiliate Fees Earned',
				to: '/thorswap_affiliate_fees'
			},
			{
				label: 'THOR Staking Deposits',
				to: '/thorswap_staking_deposits'
			},
			{
				label: 'THOR Staking Withdrawals',
				to: '/thorswap_staking_withdrawals'
			},
			{
				label: 'THOR Staking Net Change',
				to: '/thorswap_staking_change'
			},
			{
				label: 'THOR Staking TVL',
				to: '/thorswap_staking_tvl'
			},
			{
				label: 'THOR Exchange Fee Sharing',
				to: '/thorswap_fee_sharing'
			},
			{
				label: 'THOR Protocol Emissions',
				to: '/thorswap_protocol_emissions'
			},
			{
				label: 'Aggregator Fees',
				to: '/thorswap_aggregator_fees'
			},
			{
				label: 'THOR Total Rewards',
				to: '/thorswap_total_rewards'
			}
		]
	},
	{
		label: 'THORWallet',
		icon: <SLinkLogo src={THORWalletLogo} />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'TGT Dashboard',
				to: '/thorwallet_dashboard'
			},
			{
				label: 'TGT Distribution',
				to: '/thorwallet_tgt_distribution'
			},
			{
				label: 'Affiliate Fees Earned',
				to: '/thorwallet_affiliate_fees'
			},
			{
				label: 'TGT Staking Deposits',
				to: '/thorwallet_staking_deposits'
			},
			{
				label: 'TGT Staking Withdrawals',
				to: '/thorwallet_staking_withdrawals'
			},
			{
				label: 'TGT Staking Net Change',
				to: '/thorwallet_staking_change'
			},
			{
				label: 'TGT Staking TVL',
				to: '/thorwallet_staking_tvl'
			}
		]
	},
	{
		label: 'XDEFI',
		icon: <SLinkLogo src={XDEFILogo} />,
		to: undefined,
		dropDown: 1,
		dropDownLinksArray: [
			{
				label: 'XDEFI Dashboard',
				to: '/xdefi_dashboard'
			},
			{
				label: 'XDEFI Distribution',
				to: '/xdefi_distribution'
			},
			{
				label: 'XDEFI Staking Deposits',
				to: '/xdefi_staking_deposits'
			},
			{
				label: 'XDEFI Staking Withdrawals',
				to: '/xdefi_staking_withdrawals'
			},
			{
				label: 'XDEFI Staking Net Change',
				to: '/xdefi_staking_change'
			},
			{
				label: 'XDEFI Staking TVL',
				to: '/xdefi_staking_tvl'
			}
		]
	}
]
export default SidebarList
