import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ToolsPage from './pages/ToolsPage/ToolsPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import DiscordBotsPage from './pages/DiscordBotsPage/DiscordBotsPage'
import ThorswapDashboard from './views/thorswapSection/ThorswapDashboard'
import XdefiDashboard from './views/xdefiSection/XDefiDashboard'
import ThorwalletDashboard from './views/thorwalletSection/ThorwalletDashboard'
import ThorchainDashboard from './views/Dashboard'
import NewAddresses from './views/addressesSection/NewAddresses'
import ActiveAddresses from './views/addressesSection/ActiveAddresses'
import DeterministicRune from './views/networkSection/DeterministicRune'
import TotalValueLocked from './views/networkSection/TVLocked'
import TotalValueBonded from './views/networkSection/TVBonded'
import TotalValuePooled from './views/networkSection/TVPooled'
import EarningsDistribution from './views/networkSection/EarningsDistribution'
import EarningsBreakdown from './views/networkSection/EarningsBreakdown'
import SwapFees from './views/swapsSection/SwapFees'
import LiquidityNet from './views/liquidityPoolsSection/LiquidityNet'
import NonRuneTVL from './views/liquidityPoolsSection/NonRuneTVL'
import ILPPaid from './views/liquidityPoolsSection/ILPPaid'
import SwapVolume from './views/swapsSection/SwapVolume'
import SwapCount from './views/swapsSection/SwapCount'
import RefundEvents from './views/swapsSection/RefundEvents'
import AffiliateFees from './views/exchangesSection/AffiliateFees'
import CexBalances from './views/exchangesSection/CexBalances'
import RuneDistribution from './views/balancesSection/RuneDistribution'
import ModuleBalances from './views/balancesSection/ModuleBalances'
import TSStakingDeposits from './views/thorswapSection/TSStakingDeposits'
import TSStakingWithdrawals from './views/thorswapSection/TSStakingWithdrawals'
import TSStakingChange from './views/thorswapSection/TSStakingNetChange'
import TSExchangeFeeSharing from './views/thorswapSection/TSExchangeFeeSharing'
import TSProtocolEmissions from './views/thorswapSection/TSProtocolEmissions'
import TSStakingTVL from './views/thorswapSection/TSStakingTVL'
import TSAffiliateFees from './views/thorswapSection/TSAffiliateFees'
import TWAffiliateFees from './views/thorwalletSection/TWAffiliateFees'
import TWStakingDeposits from './views/thorwalletSection/TWStakingDeposits'
import TWStakingWithdrawals from './views/thorwalletSection/TWStakingWithdrawals'
import TWStakingChange from './views/thorwalletSection/TWStakingNetChange'
import TWStakingTVL from './views/thorwalletSection/TWStakingTVL'
import XDefiStakingDeposits from './views/xdefiSection/XDefiStakingDeposits'
import XDefiStakingWithdrawals from './views/xdefiSection/XDefiStakingWithdrawals'
import XDefiStakingChange from './views/xdefiSection/XDefiStakingNetChange'
import XDefiStakingTVL from './views/xdefiSection/XDefiStakingTVL'
import UniqueSwapCount from './views/swapsSection/UniqueSwapperCount'
import UserEarnings from './views/networkSection/Earnings'
import TSTotalRewards from './views/thorswapSection/TSTotalRewards'
import TSThorDistribution from './views/thorswapSection/TSThorDistribution'
import TSVThorDistribution from './views/thorswapSection/TSVThorDistribution'
import TWTGTDistribution from './views/thorwalletSection/TWTGTDistribution'
import XDefiDistribution from './views/xdefiSection/XDefiDistribution'
import DexSwapVolume from './views/exchangesSection/DexSwapVolume'
import TSAggregatorFees from './views/thorswapSection/TSAggregatorFees'
import SaverAddresses from './views/saversSection/SaverAddresses'
import BTCSaverDepth from './views/saversSection/BtcSaverDepth'
import ETHSaverDepth from './views/saversSection/EthSaverDepth'
import SaverDepthsUSD from './views/saversSection/SaverDepthUSD'
import SaverAdds from './views/saversSection/SaverAdds'
import SaverWithdrawals from './views/saversSection/SaverWithdrawals'
import SaverYieldCumulative from './views/saversSection/SaverYieldCumulative'
import SaverRealizedPL from './views/saversSection/SaverRealizedPL'
import SaverNetRealizedPL from './views/saversSection/SaverNetRealizedPL'
import SaverUnrealizedPL from './views/saversSection/SaverUnrealizedPL'

const Routes = () => {
	return (
		<Switch>
			{/* navigation bar routes */}
			<Route exact path="/">
				<ThorchainDashboard />
			</Route>
			<Route exact path="/tools">
				<ToolsPage />
			</Route>
			<Route exact path="/discordbots">
				<DiscordBotsPage />
			</Route>

			{/* sidebar Thorchain Section routes */}
			<Route exact path="/thorchain_dashboard">
				<ThorchainDashboard />
			</Route>
			{/* sidebar Thorchain Savers Section routes */}
			<Route exact path="/thorchain_savers_addresses">
				<SaverAddresses />
			</Route>
			<Route exact path="/thorchain_btc_saver">
				<BTCSaverDepth />
			</Route>
			<Route exact path="/thorchain_eth_saver">
				<ETHSaverDepth />
			</Route>
			<Route exact path="/thorchain_savers_depth">
				<SaverDepthsUSD />
			</Route>
			<Route exact path="/thorchain_savers_liq_adds">
				<SaverAdds />
			</Route>
			<Route exact path="/thorchain_savers_liq_withdrawals">
				<SaverWithdrawals />
			</Route>
			<Route exact path="/thorchain_savers_yield_cumulative">
				<SaverYieldCumulative />
			</Route>
			<Route exact path="/thorchain_savers_realized_pl">
				<SaverRealizedPL />
			</Route>
			<Route exact path="/thorchain_savers_net_realized_pl">
				<SaverNetRealizedPL />
			</Route>
			<Route exact path="/thorchain_savers_unrealized_pl">
				<SaverUnrealizedPL />
			</Route>
			{/* sidebar Thorchain Addresses Section routes */}
			<Route exact path="/thorchain_new_addresses">
				<NewAddresses />
			</Route>
			<Route exact path="/thorchain_active_addresses">
				<ActiveAddresses />
			</Route>

			{/* sidebar Thorchain Network Section routes */}
			<Route exact path="/thorchain_deterministic_rune_price">
				<DeterministicRune />
			</Route>
			<Route exact path="/thorchain_tv_locked">
				<TotalValueLocked />
			</Route>
			<Route exact path="/thorchain_tv_bonded">
				<TotalValueBonded />
			</Route>
			<Route exact path="/thorchain_tv_pooled">
				<TotalValuePooled />
			</Route>
			<Route exact path="/thorchain_earnings_distribution">
				<EarningsDistribution />
			</Route>
			<Route exact path="/thorchain_reserve_breakdown">
				<EarningsBreakdown />
			</Route>
			<Route exact path="/thorchain_user_earnings">
				<UserEarnings />
			</Route>

			{/* sidebar Thorchain LiquidityPools Section routes */}

			<Route exact path="/thorchain_liqduitiy_net">
				<LiquidityNet />
			</Route>
			<Route exact path="/thorchain_non_rune_tvl">
				<NonRuneTVL />
			</Route>
			<Route exact path="/thorchain_ilp_paid">
				<ILPPaid />
			</Route>

			{/* sidebar Thorchain Swaps Section routes */}
			<Route exact path="/thorchain_refund_events">
				<RefundEvents />
			</Route>
			<Route exact path="/thorchain_swap_fees">
				<SwapFees />
			</Route>
			<Route exact path="/thorchain_swap_volume">
				<SwapVolume />
			</Route>
			<Route exact path="/thorchain_swap_count">
				<SwapCount />
			</Route>
			<Route exact path="/thorchain_unique_swap_count">
				<UniqueSwapCount />
			</Route>
			{/* sidebar Thorchain Exchanges Section routes */}
			<Route exact path="/thorchain_affiliate_fees">
				<AffiliateFees />
			</Route>
			<Route exact path="/thorchain_cex_balance">
				<CexBalances />
			</Route>
			<Route exact path="/thorchain_swap_volume_by_dex">
				<DexSwapVolume />
			</Route>
			{/* sidebar Thorchain Balances Section routes */}
			<Route exact path="/thorchain_rune_distribution">
				<RuneDistribution />
			</Route>
			<Route exact path="/thorchain_module_balances">
				<ModuleBalances />
			</Route>

			{/* sidebar Thorswap Section routes */}
			<Route exact path="/thorswap_dashboard">
				<ThorswapDashboard />
			</Route>
			<Route exact path="/thorswap_staking_deposits">
				<TSStakingDeposits />
			</Route>
			<Route exact path="/thorswap_staking_withdrawals">
				<TSStakingWithdrawals />
			</Route>
			<Route exact path="/thorswap_staking_change">
				<TSStakingChange />
			</Route>
			<Route exact path="/thorswap_fee_sharing">
				<TSExchangeFeeSharing />
			</Route>
			<Route exact path="/thorswap_protocol_emissions">
				<TSProtocolEmissions />
			</Route>
			<Route exact path="/thorswap_total_rewards">
				<TSTotalRewards />
			</Route>
			<Route exact path="/thorswap_staking_tvl">
				<TSStakingTVL />
			</Route>
			<Route exact path="/thorswap_affiliate_fees">
				<TSAffiliateFees />
			</Route>
			<Route exact path="/thorswap_thor_distribution">
				<TSThorDistribution />
			</Route>
			<Route exact path="/thorswap_vthor_distribution">
				<TSVThorDistribution />
			</Route>
			<Route exact path="/thorswap_aggregator_fees">
				<TSAggregatorFees />
			</Route>
			{/* sidebar Xdefi Section routes */}
			<Route exact path="/xdefi_dashboard">
				<XdefiDashboard />
			</Route>
			<Route exact path="/xdefi_staking_deposits">
				<XDefiStakingDeposits />
			</Route>
			<Route exact path="/xdefi_staking_withdrawals">
				<XDefiStakingWithdrawals />
			</Route>
			<Route exact path="/xdefi_staking_change">
				<XDefiStakingChange />
			</Route>
			<Route exact path="/xdefi_staking_tvl">
				<XDefiStakingTVL />
			</Route>
			<Route exact path="/xdefi_distribution">
				<XDefiDistribution />
			</Route>
			{/* sidebar Thorwallet Section routes */}
			<Route exact path="/thorwallet_dashboard">
				<ThorwalletDashboard />
			</Route>
			<Route exact path="/thorwallet_staking_deposits">
				<TWStakingDeposits />
			</Route>
			<Route exact path="/thorwallet_staking_withdrawals">
				<TWStakingWithdrawals />
			</Route>
			<Route exact path="/thorwallet_staking_change">
				<TWStakingChange />
			</Route>
			<Route exact path="/thorwallet_staking_tvl">
				<TWStakingTVL />
			</Route>
			<Route exact path="/thorwallet_affiliate_fees">
				<TWAffiliateFees />
			</Route>
			<Route exact path="/thorwallet_tgt_distribution">
				<TWTGTDistribution />
			</Route>
		</Switch>
	)
}

export default Routes
