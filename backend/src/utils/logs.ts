export function getTime() {
	const timestamp = Date.now()
	let date = new Date(timestamp)
	// Hours part from the timestamp
	var hours = date.getHours()
	// Minutes part from the timestamp
	var minutes = '0' + date.getMinutes()
	// Seconds part from the timestamp
	var seconds = '0' + date.getSeconds()

	var ms = '000' + date.getMilliseconds()

	// Will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '.' + ms.substr(-3)
	return formattedTime
}
export function log(message: string) {
	const msg = `[${getTime()}]: ${message}`
	console.log(msg)
	return msg
}
export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
