import React from 'react'
import ReactTooltip from 'react-tooltip'

import { IconType } from 'react-icons/lib'
import { SCard, SCardTitle, SCardValue, SCardContent, SIcon, SLinkContainer, SLinkIcon, SInfoIcon, SCardLastUpdated, SLink } from './styles'
import { AiOutlineAreaChart } from 'react-icons/ai'
import { FiInfo } from 'react-icons/fi'
interface ICardProps {
	icon: IconType
	cardTitle: string
	cardValue1: string
	cardValue2?: string
	hasChart: boolean
	dataTipTxt?: string
	link?: string
}

const Card: React.FunctionComponent<ICardProps> = (props) => {
	let value1Pos = 40
	const value2Pos = 10
	if (props.cardValue2 === undefined) {
		value1Pos = 10
	}
	return (
		<>
			<SCard>
				<SLinkContainer>
					<SIcon>
						<props.icon />
					</SIcon>
					{props.hasChart && (
						<SLinkIcon>
							<AiOutlineAreaChart />
							<SLink to={{ pathname: props.link ? props.link : '/' }}>View Chart </SLink>
						</SLinkIcon>
					)}

					{!props.hasChart && (
						<SInfoIcon>
							<FiInfo data-tip={props.dataTipTxt} />{' '}
						</SInfoIcon>
					)}
				</SLinkContainer>
				<SCardContent>
					{/* <SCardLastUpdated>27.10.2022</SCardLastUpdated> */}
					<SCardTitle>{props.cardTitle}</SCardTitle>
					<SCardValue style={{ bottom: `${value1Pos}px` }}>{props.cardValue1}</SCardValue>
					{props.cardValue2 && <SCardValue style={{ bottom: `${value2Pos}px` }}>{props.cardValue2}</SCardValue>}
				</SCardContent>
				<ReactTooltip />
			</SCard>
		</>
	)
}

export default Card
