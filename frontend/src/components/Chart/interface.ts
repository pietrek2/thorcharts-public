export interface IChart {
	data: any
	strokeWidth: number
	name: string
	type: 'line' | 'bars'
	seriesGroup: string
	color: string,
	unitSymbol?: string,
	unitName?: string,
	barGroup?: string
}
