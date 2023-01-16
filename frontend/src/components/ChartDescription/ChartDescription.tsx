import React from 'react'
import { SChartDescription, SDescriptionTitle, SDecriptionText, SDivider } from './styles'
import { FiExternalLink } from 'react-icons/fi'

interface IChartDescriptionProps {
	title: string
	text: string
	queryId?: string
}

const ChartDescription: React.FunctionComponent<IChartDescriptionProps> = (props) => {
	return (
		<>
			<SChartDescription>
				<SDescriptionTitle>{props.title}</SDescriptionTitle>
				<SDivider />
				<SDecriptionText>
					{props.text}
					<p>
						Query link:{' '}
						{props.queryId && (
							<a href={`https://app.flipsidecrypto.com/velocity/queries/${props.queryId}`} target="_blank" rel="noreferrer">
								FlipSide <FiExternalLink />
							</a>
						)}
						{!props.queryId && <span> not available.</span>}
					</p>
				</SDecriptionText>
			</SChartDescription>
		</>
	)
}

export default ChartDescription
