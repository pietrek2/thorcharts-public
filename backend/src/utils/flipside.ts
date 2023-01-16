import { IAffiliateFees, IAffiliateFeesDEX } from '../flipsideClients/interfaces'
import { zeroFill } from './formatData'

type GroupBy = 'sum' | 'avg'
type TimeFrame = '1h' | '1d' | '1w'

export function convertTimeframe(series: any, group: GroupBy[], timeframe: TimeFrame) {
	const hasDate = series[0].DATE ? true : false
	if (!hasDate || timeframe == '1h') {
		console.log('Series does not have dates or requested timeframe is 1h!')
		return series
	}
	const newSeries = []
	let tempPoint: any = {}
	let dayCount = 1
	let comapreTimeFunction = isSameDay
	if (timeframe == '1w') {
		comapreTimeFunction = isSameWeek
	}
	for (let i = 0; i < series.length; i++) {
		let j = 0
		for (const [key, value] of Object.entries(series[i])) {
			if (tempPoint[`${key}`] == undefined) {
				tempPoint[`${key}`] = key == 'DATE' ? series[i].DATE.split(' ')[0] : value
			} else {
				if (comapreTimeFunction(new Date(tempPoint.DATE), new Date(series[i].DATE))) {
					if (key == 'DATE') {
						dayCount++
						continue
					}
					if (key == '_id') {
						continue
					}
					if (group[j] == 'sum' || group[j] == 'avg') {
						tempPoint[`${key}`] += value
					}

					if (series.length == i + 1 && group[j] == 'avg') {
						tempPoint[`${key}`] /= dayCount
					} else if (group[j] == 'avg' && !comapreTimeFunction(new Date(tempPoint.DATE), new Date(series[i + 1].DATE))) {
						tempPoint[`${key}`] /= dayCount
					}

					if (group.length == j + 1 && series.length == i + 1) {
						newSeries.push(tempPoint)
					}
				} else {
					newSeries.push(tempPoint)
					tempPoint = series[i]
					tempPoint.DATE = tempPoint.DATE.split(' ')[0]
					dayCount = 1
					break
				}
			}
			j++
		}
	}
	return newSeries
}
export function getPctChange(series: any, group: GroupBy, colName: string, timeframe: TimeFrame) {
	const hasDate = series[0].DATE ? true : false
	if (!hasDate) {
		const hasDay = series[0].DAY ? true : false
		if (!hasDay) {
			console.log('Series does not have dates!')
			return -1
		} else {
			return series[0][`${colName}`] / series[1][`${colName}`] - 1
		}
	}
	let pchange = -1
	const startDate = new Date(series[0].DATE)
	let firstPoint = 0
	let firstDatePointCount = 0
	let endDate = new Date(series[0].DATE)
	let secondPoint = 0
	let secondDatePointCount = 0
	if (timeframe == '1h') {
		firstPoint = series[0][`${colName}`]
		secondPoint = series[1][`${colName}`]
		pchange = (firstPoint / secondPoint) * 100 - 100
		return pchange
	} else if (timeframe == '1w') {
		endDate.setDate(endDate.getDate() - 7)
	} else if (timeframe == '1d') {
		endDate.setDate(endDate.getDate() - 1)
	}
	for (let i = 0; i < series.length; i++) {
		const obj = series[i]
		if (isSameDay(startDate, new Date(obj.DATE))) {
			firstPoint += obj[`${colName}`]
			firstDatePointCount++
		} else if (isSameDay(endDate, new Date(obj.DATE))) {
			secondPoint += obj[`${colName}`]
			secondDatePointCount++
		} else {
			if (group == 'avg') {
				firstPoint /= firstDatePointCount
				secondPoint /= secondDatePointCount
			}
			pchange = (firstPoint / secondPoint) * 100 - 100
			break
		}
	}
	return pchange
}
export function subtractSeries(series1: any, series2: any, addCumulative: boolean) {
	const keys1 = Object.keys(series1[0])
	const keys2 = Object.keys(series2[0])
	if (keys1.toString() != keys2.toString()) {
		throw new Error('Series 1 keys are diffrent than series 2 keys!')
	}
	let timeCoulmnName = 'DATE'
	if (series1[0].DAY) {
		timeCoulmnName = 'DAY'
	}

	const firstDateS1 = series1[series1.length - 1][timeCoulmnName]
	const firstDateS2 = series2[series2.length - 1][timeCoulmnName]
	const lastDateS1 = series1[0][timeCoulmnName]
	const lastDateS2 = series2[0][timeCoulmnName]
	if (new Date(firstDateS1) > new Date(firstDateS2)) {
		const obj: any = {}
		keys1.forEach((key) => {
			if (key == timeCoulmnName) {
				obj[key] = firstDateS2
			} else {
				obj[key] = 0
			}
		})
		series1.push(obj)
	} else {
		if (firstDateS1 !== firstDateS2) {
			const obj: any = {}
			keys1.forEach((key) => {
				if (key == timeCoulmnName) {
					obj[key] = firstDateS1
				} else {
					obj[key] = 0
				}
			})
			series2.push(obj)
		}
	}
	if (new Date(lastDateS1) > new Date(lastDateS2)) {
		const obj: any = {}
		keys1.forEach((key) => {
			if (key == timeCoulmnName) {
				obj[key] = lastDateS1
			} else {
				obj[key] = 0
			}
		})
		series2.splice(0, 0, obj)
	} else {
		if (lastDateS1 !== lastDateS2) {
			const obj: any = {}
			keys1.forEach((key) => {
				if (key == timeCoulmnName) {
					obj[key] = lastDateS2
				} else {
					obj[key] = 0
				}
			})
			series1.splice(0, 0, obj)
		}
	}
	const newSeries: any[] = []
	series1 = zeroFill(series1)
	series2 = zeroFill(series2)
	if (series1.length !== series2.length) {
		throw new Error('nn..nnanii!?!?')
	}
	for (let i = 0; i < series1.length; i++) {
		const obj1 = series1[i]
		const obj2 = series2[i]
		const newObj: any = {}
		keys1.forEach((key) => {
			if (key != '_id') {
				if (key == timeCoulmnName) {
					newObj[key] = obj1[key]
				} else {
					newObj[key] = obj1[key] - obj2[key]
				}
				if (addCumulative && key != timeCoulmnName) {
					if (i == 0) {
						newObj[`${key}_CUMULATIVE`] = newObj[key]
					} else {
						newObj[`${key}_CUMULATIVE`] = newObj[key] + newSeries[i - 1][`${key}_CUMULATIVE`]
					}
				}
			}
		})
		newSeries.push(newObj)
	}
	return newSeries
}
export function addCumulativeColumnToAffFeeSeries(series: IAffiliateFees[]) {
	const newSeries: IAffiliateFeesDEX[] = []
	if (new Date(series[0].DAY) > new Date(series[series.length - 1].DAY)) {
		series = series.reverse()
	}
	for (let i = 0; i < series.length; i++) {
		const row = series[i]
		if (i == 0) {
			newSeries.push({
				DAY: row.DAY,
				FEE_RUNE: row.FEE_RUNE,
				FEE_USD: row.FEE_USD,
				FEE_RUNE_CUMULATIVE: row.FEE_RUNE,
				FEE_USD_CUMULATIVE: row.FEE_USD
			})
		} else {
			newSeries.push({
				DAY: row.DAY,
				FEE_RUNE: row.FEE_RUNE,
				FEE_USD: row.FEE_USD,
				FEE_RUNE_CUMULATIVE: row.FEE_RUNE + newSeries[i - 1].FEE_RUNE_CUMULATIVE,
				FEE_USD_CUMULATIVE: row.FEE_USD + newSeries[i - 1].FEE_USD_CUMULATIVE
			})
		}
	}

	return newSeries
}
export function deleteAffFeesLabels(series: IAffiliateFees[], labelsToKeep: string[]) {
	let newSeries = series.filter((row) => labelsToKeep.includes(row.LABEL))
	newSeries = newSeries.filter((row) => row.DAY !== null && row.LABEL !== null && row.FEE_RUNE !== null)
	if (new Date(newSeries[0].DAY) > new Date(newSeries[newSeries.length - 1].DAY)) {
		newSeries = newSeries.reverse()
	}
	return newSeries
}
function isSameDay(date1: Date, date2: Date) {
	if (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()) {
		return true
	} else {
		return false
	}
}
function isSameHour(date1: Date, date2: Date) {
	if (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() && date1.getHours() === date2.getHours()) {
		return true
	} else {
		return false
	}
}
const getWeek = (date: Date) => {
	const janFirst = new Date(date.getFullYear(), 0, 1)
	return Math.ceil(((date.getTime() - janFirst.getTime()) / 86400000 + janFirst.getDay() + 1) / 7)
}
const isSameWeek = (date1: Date, date2: Date) => {
	return getWeek(date1) === getWeek(date2)
}
