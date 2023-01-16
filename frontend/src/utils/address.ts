const knownAddresses: any = {
	//THORCHAIN
	thor1dheycdevq39qlkxs2a6wuuzyn4aqxhve4qxtxt: 'Reserve Module',
	thor17gw75axcnr8747pkanye45pnrwk7p9c3cqncsv: 'Bond Module',
	thor1lj62pg6ryxv2htekqx04nv7wd3g98qf9gfvamy: 'Standby Reserve',
	thor1cqg8pyxnq03d88cl3xfn5wzjkguw5kh9enwte4: 'Binance Cold 2',
	thor1g98cy3n9mmjrpn0sxmn63lztelera37n8n67c0: 'Pool Module',
	thor1lrnrawjlfp6jyrzf39r740ymnuk9qgdgp29rqv: 'Vested Wallet 1',
	thor1505gp5h48zd24uexrfgka70fg8ccedafsnj0e3: 'Treasury 1',
	thor1t60f02r8jvzjrhtnjgfj4ne6rs5wjnejwmj7fh: 'Binance Cold',
	thor16qnm285eez48r4u9whedq4qunydu2ucmzchz7p: 'Vested Wallet 2',
	thor1egxvam70a86jafa8gcg3kqfmfax3s0m2g3m754: 'Treasury LP',
	thor14n2q7tpemxcha8zc26j0g5pksx4x3a9xw9ryq9: 'Treasury 2',
	// THORSWAP
	'0x426c0d1dcf6b6facd5618577f6c3eafe4e5c3373': 'Ecosystem Funds',
	'0x0c3c9e5d9b08131dbd82a8648a23592b4dda2223': 'Investor & Team Vesting',
	'0x815c23eca83261b6ec689b60cc4a58b54bc24d8d': 'vTHOR contract',
	'0x7d8911eb1c72f0ba29302be30301b75cec81f622': 'THORSwap Treasury',
	'0xd37bbe5744d730a1d98d8dc97c42f0ca46ad7146': 'THORChain Router',
	'0x8f631816043c8e8cad0c4c602bfe7bff1b22b182': 'vTHOR Rewarder',
	'0x3d3f13f2529ec3c84b2940155effbf9b39a8f3ec': 'SushiSwap Pool',
	'0x6755630c583f12ffbd10568eb633c0319db34922': 'THOR Staking v1',
	'0x16d48dd0b0f4b824ba92c057452eb2a9c54adbb1': 'Legacy THOR SushiSwap'
}

export function minimizeAddress(address: string) {
	if (knownAddresses[`${address}`] !== undefined) {
		return knownAddresses[`${address}`]
	}
	const chars = 10
	const start = address.substring(0, chars)
	const end = address.substring(address.length - chars, address.length)
	return `${start}...${end}`
}
export function getEtherscanAddressLink(address: string) {
	return `https://etherscan.io/address/${address}`
}
export function getViewblockAddressLink(address: string) {
	return `https://viewblock.io/thorchain/address/${address}`
}
