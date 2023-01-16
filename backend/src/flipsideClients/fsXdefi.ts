import { HOUR } from '../const'
import { Collection } from './interfaces'
import fsScrapperService from '../service/fsScrapperService'

class fsXdefiService {
	collections: Collection[] = [
		{
			name: 'xdefi_holders',
			createEndpoint: false,
			fillMethod: undefined
		},
		{
			name: 'xdefi_staking_deposits',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'xdefi_staking_withdrawals',
			createEndpoint: true,
			fillMethod: 'zero'
		},
		{
			name: 'xdefi_staking_tvl',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'xdefi_price',
			createEndpoint: true,
			fillMethod: 'forward'
		},
		{
			name: 'xdefi_dashboard',
			createEndpoint: false,
			fillMethod: undefined
		},
		{
			name: 'xdefi_distribution',
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

export default fsXdefiService
