import fsThorswapService from './flipsideClients/fsThorswap'
import fsThorchainService from './flipsideClients/fsThorchain'
import fsXdefiService from './flipsideClients/fsXdefi'
import fsThorwalletService from './flipsideClients/fsThorwallet'

import { addCumulativeColumnToAffFeeSeries, deleteAffFeesLabels, subtractSeries } from './utils/flipside'
import { forwardFill, labelFill, noFill, zeroFill } from './utils/formatData'
import express from 'express'
import cors from 'cors'
import { sleep } from './utils/logs'
import { config } from './config/config'
import path from 'path'

async function main() {
	const fsThorswap = new fsThorswapService()
	const fsThorchain = new fsThorchainService()
	const fsXdefi = new fsXdefiService()
	const fsThorwallet = new fsThorwalletService()
	await sleep(5000)
	const server = express()
	server.use(cors())
	server.use(express.urlencoded())
	server.use(express.json())
	///////////////////////////////////////////////////
	// THORCHAIN RELATED ENDPOINTS
	///////////////////////////////////////////////////
	fsThorchain.collections.forEach((collection) => {
		if (collection.createEndpoint) {
			server.get(`/thorchain/${collection.name}`, async (req, res) => {
				const resp = await fsThorchain.getData(`${collection.name}`)
				if (collection.fillMethod == 'forward') {
					res.json(forwardFill(resp))
				} else if (collection.fillMethod == 'zero') {
					res.json(zeroFill(resp))
				} else if (collection.fillMethod == 'none') {
					res.json(noFill(resp))
				} else if (collection.fillMethod == 'forwardLabels' || collection.fillMethod == 'zeroLabels') {
					res.json(labelFill(resp, collection.fillMethod, collection.labels, collection.labelColumnName))
				} else {
					res.status(500)
					res.json({ msg: 'Bad endpoint' })
					return
				}
			})
		}
	})
	// server.get('/thorchain/affiliate_fees', async (req, res) => {
	// 	const affFeeData = await fsThorchain.getData('tc_aff_fees')
	// 	const resp = deleteAffFeesLabels(affFeeData, ['THORWallet', 'THORSwap', 'Trustwallet'])
	// 	res.json(resp)
	// })
	// server.get('/thorchain/swap_volume_by_dex', async (req, res) => {
	// 	const affFeeData = await fsThorchain.getData('tc_dex_swap_volume')
	// 	const resp = deleteAffFeesLabels(affFeeData, ['THORWallet', 'THORSwap', 'Trustwallet', 'ShapeShift', 'EdgeWallet', 'Asgardex'])
	// 	res.json(resp)
	// })
	server.get('/thorchain/dashboard', async (req, res) => {
		const resp = await fsThorchain.getData('thorchain_dashboard')
		res.json(resp[0])
	})
	///////////////////////////////////////////////////
	// THORSWAP RELATED ENDPOINTS
	///////////////////////////////////////////////////
	fsThorswap.collections.forEach((collection) => {
		if (collection.createEndpoint) {
			server.get(`/thorswap/${collection.name}`, async (req, res) => {
				const resp = await fsThorswap.getData(`${collection.name}`)
				if (collection.fillMethod == 'forward') {
					res.json(forwardFill(resp))
				} else if (collection.fillMethod == 'zero') {
					res.json(zeroFill(resp))
				} else {
					res.status(500)
					res.json({ msg: 'Bad endpoint' })
					return
				}
			})
		}
	})
	server.get('/thorswap/thor_staking_change', async (req, res) => {
		const deposits = await fsThorswap.getData('thor_staking_deposits')
		const withdrawals = await fsThorswap.getData('thor_staking_withdrawals')
		const resp = subtractSeries(deposits, withdrawals, true)
		res.json(resp)
	})
	server.get('/thorswap/ts_affiliate_fees', async (req, res) => {
		const affFeeData = await fsThorchain.getData('tc_aff_fees')
		const affFeeDataFiltered = deleteAffFeesLabels(affFeeData, ['THORSwap'])
		const resp = addCumulativeColumnToAffFeeSeries(affFeeDataFiltered)
		res.json(resp)
	})
	server.get('/thorswap/dashboard', async (req, res) => {
		const resp = await fsThorswap.getData('thorswap_dashboard')
		const affFeeData = await fsThorchain.getData('tc_aff_fees')
		const affFeeDataFiltered = deleteAffFeesLabels(affFeeData, ['THORSwap'])
		resp[0].TS_AFF_FEES_EARNED = affFeeDataFiltered[affFeeDataFiltered.length - 2].FEE_RUNE
		resp[0].TS_AFF_FEES_EARNED_USD = affFeeDataFiltered[affFeeDataFiltered.length - 2].FEE_USD
		res.json(resp[0])
	})
	///////////////////////////////////////////////////
	// THORWALLET RELATED ENDPOINTS
	///////////////////////////////////////////////////
	fsThorwallet.collections.forEach((collection) => {
		if (collection.createEndpoint) {
			server.get(`/thorwallet/${collection.name}`, async (req, res) => {
				const resp = await fsThorwallet.getData(`${collection.name}`)
				if (collection.fillMethod == 'forward') {
					res.json(forwardFill(resp))
				} else if (collection.fillMethod == 'zero') {
					res.json(zeroFill(resp))
				} else {
					res.status(500)
					res.json({ msg: 'Bad endpoint' })
					return
				}
			})
		}
	})

	server.get('/thorwallet/tgt_staking_change', async (req, res) => {
		const deposits = await fsThorwallet.getData('tgt_staking_deposits')
		const withdrawals = await fsThorwallet.getData('tgt_staking_withdrawals')
		const resp = subtractSeries(deposits, withdrawals, true)
		res.json(resp)
	})
	server.get('/thorwallet/tw_affiliate_fees', async (req, res) => {
		const affFeeData = await fsThorchain.getData('tc_aff_fees')
		const affFeeDataFiltered = deleteAffFeesLabels(affFeeData, ['THORWallet'])
		const resp = addCumulativeColumnToAffFeeSeries(affFeeDataFiltered)
		res.json(resp)
	})
	server.get('/thorwallet/dashboard', async (req, res) => {
		const resp = await fsThorwallet.getData('thorwallet_dashboard')
		const affFeeData = await fsThorchain.getData('tc_aff_fees')
		const affFeeDataFiltered = deleteAffFeesLabels(affFeeData, ['THORWallet'])
		resp[0].TW_AFF_FEES_EARNED = affFeeDataFiltered[affFeeDataFiltered.length - 2].FEE_RUNE
		resp[0].TW_AFF_FEES_EARNED_USD = affFeeDataFiltered[affFeeDataFiltered.length - 2].FEE_USD
		res.json(resp[0])
	})

	// ///////////////////////////////////////////////////
	// // XDEFI RELATED ENDPOINTS
	// ///////////////////////////////////////////////////
	fsXdefi.collections.forEach((collection) => {
		if (collection.createEndpoint) {
			server.get(`/xdefi/${collection.name}`, async (req, res) => {
				const resp = await fsXdefi.getData(`${collection.name}`)
				if (collection.fillMethod == 'forward') {
					res.json(forwardFill(resp))
				} else if (collection.fillMethod == 'zero') {
					res.json(zeroFill(resp))
				} else {
					res.status(500)
					res.json({ msg: 'Bad endpoint' })
					return
				}
			})
		}
	})

	server.get('/xdefi/xdefi_staking_change', async (req, res) => {
		const deposits = await fsXdefi.getData('xdefi_staking_deposits')
		const withdrawals = await fsXdefi.getData('xdefi_staking_withdrawals')
		const resp = subtractSeries(deposits, withdrawals, true)
		res.json(resp)
	})
	server.get('/xdefi/dashboard', async (req, res) => {
		const resp = await fsXdefi.getData('xdefi_dashboard')
		res.json(resp[0])
	})
	server.use(express.static(path.join(__dirname, '..', 'public/app')))

	server.use((req, res, next) => {
		res.sendFile(path.join(__dirname, '..', 'public/app', 'index.html'))
	})

	server.listen(config.port, () => {
		console.log(`Now listening on port ${config.port}`)
	})
}

main()
