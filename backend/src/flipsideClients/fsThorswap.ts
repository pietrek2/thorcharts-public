import { HOUR } from '../const'
import { Collection } from './interfaces'
import fsScrapperService from '../service/fsScrapperService'

class fsThorswapService {
	collections: Collection[] = [
		{
			name: 'thor_holders',
			createEndpoint: false,
			fillMethod: undefined
		},
		{
			name: 'vthor_holders',
			createEndpoint: false,
			fillMethod: undefined
		},
		{
			name: 'thor_staking_deposits',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'thor_staking_withdrawals',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'thor_rewards_from_protocol_emission',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'thor_rewards_from_exchange_feesharing',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'thor_total_rewards',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'thor_staking_tvl',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'thor_price',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'thorswap_dashboard',
			createEndpoint: false,
			fillMethod: undefined
		},
		{
			name: 'thor_distribution',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'vthor_distribution',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'aggregator_fees',
			createEndpoint: true,
			fillMethod: 'zero'
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

export default fsThorswapService
