import { HOUR } from '../const'
import { Collection } from './interfaces'
import fsScrapperService from '../service/fsScrapperService'

class fsThorwalletService {
	collections: Collection[] = [
		{
			name: 'tgt_holders',
			createEndpoint: false,
			fillMethod: undefined
		},
		{
			name: 'tgt_staking_deposits',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tgt_staking_withdrawals',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'tgt_staking_tvl',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'tgt_price',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'thorwallet_dashboard',
			createEndpoint: false,
			fillMethod: undefined
		},
		{
			name: 'tgt_distribution',
			createEndpoint: true,
			fillMethod: 'forward'
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

export default fsThorwalletService
