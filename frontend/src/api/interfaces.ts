// SHARED
export interface Collection {
	name: string
	createEndpoint: boolean
	fillMethod: 'zero' | 'forward' | undefined
}
export interface ITokenHolder {
	USER_ADDRESS: string
	BALANCE: number
}
export interface IStaking {
	DAY: string
	AMOUNT: number
	AMOUNT_USD: number
}
export interface IStakingChange {
	DAY: string
	AMOUNT: number
	AMOUNT_USD: number
	AMOUNT_CUMULATIVE: number
	AMOUNT_USD_CUMULATIVE: number
}
export interface IStakingTVL {
	DAY: string
	TVL: number
	TVL_USD: number
}
export interface IAffilateFeesSpecified {
	DAY: string
	FEE_RUNE: number
	FEE_RUNE_CUMULATIVE: number
	FEE_USD: number
	FEE_USD_CUMULATIVE: number
}
export interface IAssetPrice {
	DATE: string
	ASSET_PRICE: number
	ASSET_PRICE_USD: number
}
// THORSWAP
export interface ITHORSWAPDashboard {
	TOP10_THOR_HOLDERS: ITokenHolder[]
	TOP10_vTHOR_HOLDERS: ITokenHolder[]
	UNIQUE_THOR_HOLDERS: number
	UNIQUE_VTHOR_HOLDERS: number

	THOR_PRICE_USD: number
	THOR_PRICE_USD_PCHANGE_1d: number

	TS_AFF_FEES_EARNED: number
	TS_AFF_FEES_EARNED_USD: number

	THOR_STAKING_DEPOSIT: number
	THOR_STAKING_DEPOSIT_USD: number

	THOR_STAKING_WITHDRAWAL: number
	THOR_STAKING_WITHDRAWAL_USD: number

	THOR_REWARDS_FROM_PROTOCOL_EMISSION: number
	THOR_REWARDS_FROM_PROTOCOL_EMISSION_USD: number

	THOR_REWARDS_FROM_EXCHANGE_FEE_SHARING: number
	THOR_REWARDS_FROM_EXCHANGE_FEE_SHARING_USD: number

	THOR_TOTAL_REWARDS: number
	THOR_TOTAL_REWARDS_USD: number

	THOR_STAKING_TVL: number
	THOR_STAKING_TVL_USD: number
}
export interface ITHORReward {
	DAY: string
	THOR_AMOUNT: number
	THOR_AMOUNT_USD: number
	THOR_AMOUNT_CUMULATIVE: number
	THOR_AMOUNT_USD_CUMULATIVE: number
}
export interface ITHORDistribution {
	DAY: string
	RICH_COUNT_50K: number
	RICH_COUNT_10K: number
	RICH_COUNT_1K: number
}
export interface ITHORAggFees {
	DAY: string
	ETH_AGG_FEES_USD: number
	AVAX_AGG_FEES_USD: number
	AGG_FEES_USD_CUMULATIVE: number
}
// XDEFI
export interface IXDefiDashboard {
	TOP10_XDEFI_HOLDERS: ITokenHolder[]
	UNIQUE_XDEFI_HOLDERS: number

	XDEFI_PRICE_USD: number
	XDEFI_PRICE_USD_PCHANGE_1d: number

	XDEFI_STAKING_DEPOSIT: number
	XDEFI_STAKING_DEPOSIT_USD: number

	XDEFI_STAKING_WITHDRAWAL: number
	XDEFI_STAKING_WITHDRAWAL_USD: number

	XDEFI_STAKING_TVL: number
	XDEFI_STAKING_TVL_USD: number
}
export interface IXDEFIDistribution {
	DAY: string
	RICH_COUNT_100K: number
	RICH_COUNT_50K: number
	RICH_COUNT_10K: number
}
// THORWALLET
export interface ITHORWALLETDashboard {
	TOP10_TGT_HOLDERS: ITokenHolder[]
	UNIQUE_TGT_HOLDERS: number

	TGT_PRICE_USD: number
	TGT_PRICE_USD_PCHANGE_1d: number

	TW_AFF_FEES_EARNED: number
	TW_AFF_FEES_EARNED_USD: number

	TGT_STAKING_DEPOSIT: number
	TGT_STAKING_DEPOSIT_USD: number

	TGT_STAKING_WITHDRAWAL: number
	TGT_STAKING_WITHDRAWAL_USD: number

	TGT_STAKING_TVL: number
	TGT_STAKING_TVL_USD: number
}
export interface ITGTDistribution {
	DAY: string
	RICH_COUNT_1M: number
	RICH_COUNT_100K: number
	RICH_COUNT_10K: number
}
// TC DASHBOARD
export interface ITHORCHAINDashboard {
	TOP10_RUNE_HOLDERS: ITokenHolder[]

	RUNE_PRICE: number
	RUNE_PRICE_PCHANGE_1d: number
	DETERMINISTIC_RUNE_PRICE: number

	UNIQUE_RUNE_HOLDERS: number
	NEW_ADDRESSES: number

	RESERVE_MODULE_BALANCE: number
	RESERVE_MODULE_BALANCE_USD: number

	BOND_MODULE_BALANCE: number
	BOND_MODULE_BALANCE_USD: number

	TOTAL_CEX_BALANCE: number
	TOTAL_CEX_BALANCE_USD: number

	RESERVE_INCOME: number
	RESERVE_INCOME_USD: number

	RESERVE_EXPENSE: number
	RESERVE_EXPENSE_USD: number

	LIQUIDITY_FEES: number
	LIQUIDITY_FEES_USD: number

	BLOCK_REWARDS: number
	BLOCK_REWARDS_USD: number

	EARNINGS_TO_NODES: number
	EARNINGS_TO_NODES_USD: number

	EARNINGS_TO_POOLS: number
	EARNINGS_TO_POOLS_USD: number

	TOTAL_VALUE_POOLED: number
	TOTAL_VALUE_POOLED_USD: number

	TOTAL_VALUE_BONDED: number
	TOTAL_VALUE_BONDED_USD: number

	TOTAL_VALUE_LOCKED: number
	TOTAL_VALUE_LOCKED_USD: number

	ILP_PAID: number
	ILP_PAID_USD: number

	SWAP_COUNT: number
	UNIQUE_SWAPPER_COUNT: number
	SWAP_COUNT_CUMULATIVE: number

	SWAP_VOLUME_USD: number
	SWAP_VOLUME_USD_CUMULATIVE: number
}
// TC SAVERS
export interface ISaverAddresses {
	DAY: string
	BLOCKCHAIN: string
	CUMULATIVE_COUNT: number
}
export interface ISaverAsset {
	DAY: string
	BLOCKCHAIN: string
	ASSET_CHANGE: number
	ASSET_DEPTH: number
}
export interface ISaversDepth {
	DAY: string
	ASSET: string
	ASSET_CHANGE: number
	ASSET_CHANGE_USD: number
	CUMULATIVE_DEPTH: number
	CUMULATIVE_DEPTH_USD: number
}
export interface ISaversLiqChange {
	DAY: string
	AMOUNT: number
	AMOUNT_USD: number
	ASSET: string
}
export interface ISaversRealizedPL {
	DAY: string
	ASSET: string
	REALIZED_PL: number
	REALIZED_PL_USD: number
	CUMULATIVE_REALIZED_PL_USD: number
}
export interface ISaversUnrealizedPL {
	DATE: string
	POOL_NAME: string
	UNREALIZED_PL_NO_FEE: number
	UNREALIZED_PL_NO_FEE_USD: number
	UNREALIZED_PL_FULL_FEE_USD: number
}
export interface ISaversYield {
	DAY: string
	SAVER_POOL: string
	YIELD: number
	YIELD_USD: number
	CUMULATIVE_YIELD: number
	CUMULATIVE_YIELD_USD: number
	TOTAL_CUMULATIVE_YIELD_USD: number
}
// TC SWAPS
export interface ISwapCount {
	DAY: string
	SWAP_COUNT: number
	UNIQUE_SWAPPER_COUNT: number
	SWAP_COUNT_CUMULATIVE: number
}
export interface ISwapVolume {
	DAY: string
	SWAP_SYNTH_VOLUME_USD: number
	SWAP_NON_SYNTH_VOLUME_USD: number
	SWAP_VOLUME_USD: number
	SWAP_VOLUME_USD_CUMULATIVE: number
}
export interface IRefundEvents {
	DAY: string
	REFUND_COUNT: number
	REFUND_COUNT_CUMULATIVE: number
}
export interface ISwapFees {
	DAY: string
	SWAP_FEES: number
	SWAP_FEES_USD: number
	SWAP_FEES_USD_CUMULATIVE: number
}
// TC LIQUIDITY POOLS
export interface IILPPaid {
	DAY: string
	ILP_PAID: number
	ILP_PAID_USD: number
	ILP_PAID_USD_CUMULATIVE: number
}
export interface INonRuneTVL {
	DAY: string
	NON_RUNE_TVL: number
	AVG_SLIP_BP: number
}
export interface ILiquidityNet {
	DAY: string
	ADD_LIQUIDITY_USD: number
	WITHDRAW_LIQUIDITY_USD: number
	LIQUIDITY_CHANGE_USD: number
}
// TC NETWORK
export interface ITVL {
	DAY: string
	TOTAL_VALUE_POOLED: number
	TOTAL_VALUE_POOLED_USD: number
	TOTAL_VALUE_BONDED: number
	TOTAL_VALUE_BONDED_USD: number
	TOTAL_VALUE_LOCKED: number
	TOTAL_VALUE_LOCKED_USD: number
}
export interface ITCEarningsDistribution {
	DAY: string
	LIQUIDITY_FEES: number
	LIQUIDITY_FEES_USD: number
	LIQUIDITY_FEES_USD_CUMULATIVE: number

	BLOCK_REWARDS: number
	BLOCK_REWARDS_USD: number
	BLOCK_REWARDS_USD_CUMULATIVE: number

	TOTAL_EARNINGS: number
	TOTAL_EARNINGS_USD: number
	TOTAL_EARNINGS_USD_CUMULATIVE: number

	EARNINGS_TO_NODES: number
	EARNINGS_TO_NODES_USD: number
	EARNINGS_TO_NODES_USD_CUMULATIVE: number

	EARNINGS_TO_POOLS: number
	EARNINGS_TO_POOLS_USD: number
	EARNINGS_TO_POOLS_USD_CUMULATIVE: number
}
export interface IDeterministicRunePrice {
	DAY: string
	RUNE_PRICE: number
	DETERMINISTIC_RUNE_PRICE: number
}

export interface IProtocolEarningsBreakdown {
	DAY: string
	NETWORK_FEE: number
	SLASHING_INCOME: number
	OUTBOUND_FEE: number
	GAS_REIMBURSEMENT: number
	IL_PROTECTION: number
	BLOCK_REWARDS: number
	RESERVE_INCOME: number
	RESERVE_EXPENSE: number
}
export interface IRuneUpgrades {
	DAY: string
	BURN_ASSET: string
	UPGRADED_RUNE: number
}
// TC EXCHANGES
export interface IExchangeBalance {
	DAY: string
	CRYPTOCOM_BALANCE: number
	BINANCE_BALANCE: number
	TOTAL_BALANCE: number
}
export interface IAffiliateFees {
	DAY: string
	LABEL: string
	FEE_RUNE: number
	FEE_USD: number
}
export interface ISwapVolumeByDex {
	DAY: string
	LABEL: string
	SWAP_VOLUME_USD: number
}
// TC BALANCES
export interface IAddsWithBalance {
	DAY: string
	RICH_COUNT: number
}
export interface IRuneDistribution {
	DAY: string
	RICH_COUNT_100: number
	RICH_COUNT_1K: number
	RICH_COUNT_10K: number
	RICH_COUNT_100K: number
}
export interface IModuleBalances {
	DAY: string
	RESERVE_MODULE_BALANCE: number
	BOND_MODULE_BALANCE: number
	POOL_MODULE_BALANCE: number
}
// TC ADDRESSES
export interface IActiveAddresses {
	DAY: string
	SENDING_ADDRESSES: number
	RECEIVING_ADDRESSES: number
}
export interface INewAdresses {
	DAY: string
	NEW_ADDRESSES: number
	NEW_ADDRESSES_CUMULATIVE: number
}
