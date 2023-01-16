export function nFormatter(num: number, prefix = '') {
	let isNegativeNum = false
	if (num < 0) {
		isNegativeNum = true
	}
	num = Math.abs(num)
	const digits = 2
	const lookup = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'k' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'B' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' }
	]
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
	const item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return num >= item.value
		})

	if (isNegativeNum) {
		if (prefix !== '+') {
			return item ? prefix + '-' + (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '-' + num.toFixed(digits)
		}
		return item ? '-' + (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '-' + num.toFixed(digits)
	} else {
		return item ? prefix + (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : prefix + num.toFixed(digits)
	}
}
