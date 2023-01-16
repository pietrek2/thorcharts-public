export function forwardFill(series: any[]) {
	const keys = Object.keys(series[0])

	const hasDate = keys.includes('DATE') ? true : false
	const hasDay = keys.includes('DAY') ? true : false
	let timeCoulmnName = 'DATE'
	let hoursToAdd = 1
	let compareFunction = getHoursDiff
	if (hasDay) {
		series = series.filter((element) => element.DAY !== null)
		timeCoulmnName = 'DAY'
		hoursToAdd = 24
		compareFunction = getDaysDiff
	} else if (hasDate) {
		series = series.filter((element) => element.DATE !== null)
	} else {
		console.log('Series does not have dates!')
		return series
	}

	series = series.sort((objA, objB) => new Date(objA[timeCoulmnName]).getTime() - new Date(objB[timeCoulmnName]).getTime())
	if (new Date(series[0][timeCoulmnName]) > new Date(series[series.length - 1][timeCoulmnName])) {
		series = series.reverse()
	}
	// fill nulls
	for (let i = 0; i < series.length; i++) {
		keys.forEach((key) => {
			if (key != '_id' && key != 'DAY' && key != 'DATE') {
				if (series[i][`${key}`] == null) {
					if (i > 0) {
						series[i][`${key}`] = series[i - 1][`${key}`]
					} else {
						series[i][`${key}`] = 0
					}
				}
			}
		})
	}
	const newSeries = []
	newSeries.push(series[0])
	let date = newSeries[0][timeCoulmnName]

	for (let i = 1; i < series.length; i++) {
		const nextDate = series[i][timeCoulmnName]
		const hoursDiff = compareFunction(new Date(date), new Date(nextDate)) - 1

		for (let j = 0; j < hoursDiff; j++) {
			const correctDate = addHours(hoursToAdd, new Date(date))
			newSeries.push(Object.assign({}, newSeries[newSeries.length - 1]))
			newSeries[newSeries.length - 1][timeCoulmnName] = correctDate
			date = correctDate
		}
		newSeries.push(series[i])
		date = series[i][timeCoulmnName]
	}
	return newSeries
}
export function labelFill(series: any[], fillMethod: string, labels?: string[], labelColumn?: string) {
	const keys = Object.keys(series[0])

	const hasDate = keys.includes('DATE') ? true : false
	const hasDay = keys.includes('DAY') ? true : false
	let timeCoulmnName = 'DATE'

	if (hasDay) {
		series = series.filter((element) => element.DAY !== null)
		timeCoulmnName = 'DAY'
	} else if (hasDate) {
		series = series.filter((element) => element.DATE !== null)
	} else {
		console.log('Series does not have dates!')
		return series
	}
	series = series.sort((objA, objB) => new Date(objA[timeCoulmnName]).getTime() - new Date(objB[timeCoulmnName]).getTime())
	if (new Date(series[0][timeCoulmnName]) > new Date(series[series.length - 1][timeCoulmnName])) {
		series = series.reverse()
	}
	const newSeries: any[] = []
	const firstDate = new Date(series[0][timeCoulmnName])
	const lastDate = new Date(series[series.length - 1][timeCoulmnName])
	labels?.forEach((label) => {
		let chartData = series.filter((row) => row[labelColumn!] === label)
		if (new Date(chartData[0][timeCoulmnName]) > firstDate) {
			const obj: any = {}
			keys.forEach((key) => {
				if (key == timeCoulmnName) {
					obj[key] = formatDate(firstDate, hasDay)
				} else if (key == labelColumn) {
					obj[key] = label
				} else {
					obj[key] = 0
				}
			})
			chartData.splice(0, 0, obj)
		}
		if (new Date(chartData[chartData.length - 1][timeCoulmnName]) < lastDate) {
			const obj: any = {}
			keys.forEach((key) => {
				if (key == timeCoulmnName) {
					obj[key] = formatDate(lastDate, hasDay)
				} else if (key == labelColumn) {
					obj[key] = label
				} else {
					if (key.includes('CUMULATIVE') || fillMethod == 'forwardLabels') {
						obj[key] = chartData[chartData.length - 1][key]
					} else {
						obj[key] = 0
					}
				}
			})
			chartData.push(obj)
		}
		if (fillMethod == 'forwardLabels') {
			chartData = forwardFill(chartData)
		} else {
			chartData = zeroFill(chartData, labelColumn)
		}
		chartData.forEach((el) => {
			newSeries.push(el)
		})
	})
	const sortedAsc = newSeries.sort((objA, objB) => new Date(objA[timeCoulmnName]).getTime() - new Date(objB[timeCoulmnName]).getTime())
	return sortedAsc
}
export function noFill(series: any[]) {
	const keys = Object.keys(series[0])

	const hasDate = keys.includes('DATE') ? true : false
	const hasDay = keys.includes('DAY') ? true : false
	let timeCoulmnName = 'DATE'

	if (hasDay) {
		series = series.filter((element) => element.DAY !== null)
		timeCoulmnName = 'DAY'
	} else if (hasDate) {
		series = series.filter((element) => element.DATE !== null)
	} else {
		console.log('Series does not have dates!')
		return series
	}
	series = series.sort((objA, objB) => new Date(objA[timeCoulmnName]).getTime() - new Date(objB[timeCoulmnName]).getTime())
	if (new Date(series[0][timeCoulmnName]) > new Date(series[series.length - 1][timeCoulmnName])) {
		series = series.reverse()
	}
	return series
}
export function zeroFill(series: any[], labelColumn?: string) {
	const keys = Object.keys(series[0])

	const hasDate = keys.includes('DATE') ? true : false
	const hasDay = keys.includes('DAY') ? true : false
	let timeCoulmnName = 'DATE'
	let hoursToAdd = 1
	let compareFunction = getHoursDiff
	if (hasDay) {
		series = series.filter((element) => element.DAY !== null)
		timeCoulmnName = 'DAY'
		hoursToAdd = 24
		compareFunction = getDaysDiff
	} else if (hasDate) {
		series = series.filter((element) => element.DATE !== null)
	} else {
		console.log('Series does not have dates!')
		return series
	}

	series = series.sort((objA, objB) => new Date(objA[timeCoulmnName]).getTime() - new Date(objB[timeCoulmnName]).getTime())
	if (new Date(series[0][timeCoulmnName]) > new Date(series[series.length - 1][timeCoulmnName])) {
		series = series.reverse()
	}
	const newSeries = []
	newSeries.push(series[0])
	let date = newSeries[0][timeCoulmnName]
	for (let i = 1; i < series.length; i++) {
		const nextDate = series[i][timeCoulmnName]
		const hoursDiff = compareFunction(new Date(date), new Date(nextDate)) - 1

		for (let j = 0; j < hoursDiff; j++) {
			const correctDate = addHours(hoursToAdd, new Date(date))
			const obj: any = {}
			keys.forEach((key) => {
				if (key == timeCoulmnName) {
					obj[key] = correctDate
				} else if (key.includes('CUMULATIVE')) {
					obj[key] = series[i - 1][key]
				} else if (key == labelColumn) {
					obj[key] = series[i - 1][key]
				} else {
					obj[key] = 0
				}
			})
			newSeries.push(obj)
			date = correctDate
		}
		newSeries.push(series[i])
		date = series[i][timeCoulmnName]
	}
	return newSeries
}
function addHours(numOfHours: number, date: Date) {
	const newDate = new Date(date.setHours(date.getHours() + numOfHours))
	if (numOfHours == 1) {
		return `${formatDate(newDate)}.000`
	} else {
		return formatDate(newDate, true)
	}
}
function padTo2Digits(num: number) {
	return num.toString().padStart(2, '0')
}
function formatDate(date: Date, noHours = false) {
	if (noHours) {
		return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-')
	} else {
		return (
			[date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
			' ' +
			[padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':')
		)
	}
}
function getHoursDiff(startDate: Date, endDate: Date) {
	const msInHour = 1000 * 60 * 60

	return Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / msInHour)
}
function getDaysDiff(startDate: Date, endDate: Date) {
	const msInDay = 1000 * 60 * 60 * 24

	return Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / msInDay)
}
