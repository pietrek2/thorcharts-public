import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.db_username || ''
const MONGO_PASSWORD = process.env.db_password || ''
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ref5xqf.mongodb.net/thorchartsdb`

export const config = {
	mongo: {
		url: MONGO_URL
	},
	port: 8080
}
