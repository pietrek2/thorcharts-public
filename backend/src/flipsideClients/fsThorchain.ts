import { HOUR } from '../const'
import { Collection } from './interfaces'
import fsScrapperService from '../service/fsScrapperService'

class fsThorchainService {
	collections: Collection[] = [
		{
			name: 'tc_swap_count',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_swap_volume',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_refund_event_count',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_ilp_paid',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_swap_fees',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_non_rune_tvl',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'tc_liquidity_net',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_tvl',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'tc_rune_price',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'tc_rune_earnings_distribution',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_deterministic_rune_price',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'tc_reserves_breakdown',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_rune_upgrades',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_exchange_balance',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'tc_rune_holders',
			createEndpoint: false,
			fillMethod: undefined
		},
		{
			name: 'tc_rune_distribution',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'tc_module_balances',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'tc_active_adds',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_new_adds',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tc_aff_fees',
			createEndpoint: true,
			fillMethod: 'zeroLabels',
			labels: ['THORWallet', 'THORSwap', 'Trustwallet', 'EdgeWallet', 'XDEFI'],
			labelColumnName: 'LABEL'
		},
		{
			name: 'thorchain_dashboard',
			createEndpoint: false,
			fillMethod: undefined
		},
		{
			name: 'tc_dex_swap_volume',
			createEndpoint: true,
			fillMethod: 'zeroLabels',
			labels: ['THORWallet', 'THORSwap', 'Trustwallet', 'ShapeShift', 'EdgeWallet', 'Asgardex', 'DecentralFi'],
			labelColumnName: 'LABEL'
		},
		{
			name: 'tc_savers_liquidity_usd',
			createEndpoint: true,
			fillMethod: 'forwardLabels',
			labels: ['ETH/ETH', 'BTC/BTC', 'DOGE/DOGE', 'LTC/LTC', 'BCH/BCH', 'AVAX/AVAX', 'GAIA/ATOM', 'BNB/BNB'],
			labelColumnName: 'ASSET'
		},
		{
			name: 'tc_savers_liquidity_withdrawals',
			createEndpoint: true,
			fillMethod: 'zeroLabels',
			labels: ['ETH/ETH', 'BTC/BTC', 'DOGE/DOGE', 'LTC/LTC', 'BCH/BCH', 'AVAX/AVAX', 'GAIA/ATOM', 'BNB/BNB'],
			labelColumnName: 'ASSET'
		},
		{
			name: 'tc_savers_liquidity_adds',
			createEndpoint: true,
			fillMethod: 'zeroLabels',
			labels: ['ETH/ETH', 'BTC/BTC', 'DOGE/DOGE', 'LTC/LTC', 'BCH/BCH', 'AVAX/AVAX', 'GAIA/ATOM', 'BNB/BNB'],
			labelColumnName: 'ASSET'
		},
		{
			name: 'tc_savers_btc',
			createEndpoint: true,
			fillMethod: 'none'
		},
		{
			name: 'tc_savers_eth',
			createEndpoint: true,
			fillMethod: 'none'
		},
		{
			name: 'tc_savers_addresses',
			createEndpoint: true,
			fillMethod: 'forwardLabels',
			labels: ['ETH', 'BTC', 'DOGE', 'LTC', 'BCH', 'AVAX', 'GAIA', 'BNB'],
			labelColumnName: 'BLOCKCHAIN'
		},
		{
			name: 'tc_savers_yield',
			createEndpoint: true,
			fillMethod: 'zeroLabels',
			labels: ['ETH/ETH', 'BTC/BTC', 'DOGE/DOGE', 'LTC/LTC', 'BCH/BCH', 'AVAX/AVAX', 'GAIA/ATOM', 'BNB/BNB'],
			labelColumnName: 'SAVER_POOL'
		},
		{
			name: 'tc_savers_realized_pl',
			createEndpoint: true,
			fillMethod: 'zeroLabels',
			labels: ['ETH.ETH', 'BTC.BTC', 'DOGE.DOGE', 'LTC.LTC', 'BCH.BCH', 'AVAX.AVAX', 'GAIA.ATOM', 'BNB.BNB'],
			labelColumnName: 'ASSET'
		},
		{
			name: 'tc_savers_unrealized_pl',
			createEndpoint: true,
			fillMethod: 'forwardLabels',
			labels: ['ETH/ETH', 'BTC/BTC', 'DOGE/DOGE', 'LTC/LTC', 'BCH/BCH', 'AVAX/AVAX', 'GAIA/ATOM', 'BNB/BNB'],
			labelColumnName: 'POOL_NAME'
		}
	]
	fsScrapperServices: fsScrapperService[] = []

	constructor() {
		this.collections.forEach((collection) => {
			const newFsScrapperService = new fsScrapperService(HOUR * 6, collection.name)
			this.fsScrapperServices.push(newFsScrapperService)
		})
	}

	getData(scraperServiceName: string) {
		const index = this.fsScrapperServices.findIndex((service) => service.collectionName == scraperServiceName)
		if (index !== -1) {
			return this.fsScrapperServices[index].getData()
		} else {
			throw new Error(`Bad scrapper service name -> ${scraperServiceName}`)
		}
	}
}

export default fsThorchainService
