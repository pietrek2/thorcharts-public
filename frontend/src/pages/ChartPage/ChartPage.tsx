import React from 'react'
import { Row } from 'react-bootstrap'
import ChartContent from '../../components/Chart/ChartContent'
import ChartDescription from '../../components/ChartDescription/ChartDescription'
import { IChart } from '../../components/Chart/interface'
interface IChartPageProps {
	chartTitle: string
	chartData: IChart[]
	chartDescTitle: string
	chartDesc: string
	dataTipTxt?: string
	queryId?: string
}

const ChartPage: React.FunctionComponent<IChartPageProps> = (props) => {
	return (
		<>
			<Row>
				<ChartContent dataSeries={props.chartData} chartHeight="60vh" chartWidth="100%" chartTitle={props.chartTitle} />
				<ChartDescription title={props.chartDescTitle} text={props.chartDesc} queryId={props.queryId} />
			</Row>
		</>
	)
}

export default ChartPage
