import { cyrb53 } from '../utils/other'
import { sleep, log } from '../utils/logs'
import { MongoClient } from 'mongodb'
import { config } from '../config/config'

class fsScrapperService {
	data: any
	lastPull = 0
	lastHash: any
	refreshRate: number
	collectionName: string
	constructor(refreshRate: number, collectionName: string) {
		this.refreshRate = refreshRate
		this.collectionName = collectionName
		this.pullData()
	}
	async getData() {
		if (this.lastPull + this.refreshRate < Date.now()) {
			await this.pullData()
		}
		const hasDate = this.data[0].DATE ? true : false
		const hasDay = this.data[0].DAY ? true : false
		if (hasDate || hasDay) {
			let timeCoulmnName = 'DATE'
			if (hasDay) {
				timeCoulmnName = 'DAY'
			}

			if (new Date(this.data[0][timeCoulmnName]) < new Date(this.data[this.data.length - 1][timeCoulmnName])) {
				return this.data.reverse()
			}
			return this.data
		} else {
			return this.data
		}
	}
	async pullData(): Promise<any[] | undefined> {
		try {
			const client = new MongoClient(config.mongo.url, { w: 'majority', retryWrites: true, monitorCommands: true })
			const dbo = client.db('thorcharts')

			const data = await dbo.collection(this.collectionName).find().toArray()
			if (data?.length && data?.length > 0) {
				this.data = data
				this.lastPull = Date.now()
				const hash = cyrb53(JSON.stringify(data))
				if (hash !== this.lastHash) {
					log(`changed ${this.collectionName}`)
				}
				this.lastHash = hash
				log(`refreshed data ${this.collectionName}`)
				await client.close()
				return data
			}
		} catch (e) {
			console.error(e)
		}
		return undefined
	}
}

export default fsScrapperService
