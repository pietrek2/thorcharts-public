import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { v } from '../../styles/variables'
export const SCard = styled.div`
	position: relative;
	width: 17%;
	min-width: 270px;
	height: 130px;
	background: ${({ theme }) => theme.bgf};
	padding: ${v.mdSpacing};
	margin: ${v.smSpacing};
	display: flex;
	box-shadow: 0 0 4px ${({ theme }) => theme.bg3}, 0 0 7px ${({ theme }) => theme.bg3};
	border: 1px solid ${({ theme }) => theme.bg3};
`
export const SIcon = styled.div`
	padding: ${v.smSpacing} ${v.mdSpacing};
	display: flex;
	margin-left: -5px;
	svg {
		font-size: 50px;
	}
`

export const SLinkIcon = styled.div`
	padding: ${v.smSpacing} 0;
	display: flex;
	cursor: pointer;
	height: 17px;
	p {
		font-size: 10px;
	}
	svg {
		font-size: 15px;
	}
	&:hover {
		color: ${({ theme }) => theme.highlight};
	}
`
export const SInfoIcon = styled.div`
	margin: 10px;
	padding: 0 ${v.smSpacing};
	display: flex;
	cursor: pointer;
	height: 22px;
	svg {
		font-size: 22px;
	}
	&:hover {
		color: ${({ theme }) => theme.highlight};
	}
`
export const SLinkContainer = styled.div`
	display: grid;
`
export const SCardLastUpdated = styled.span`
	color: inherit;

	position: absolute;
	top: 0;
	right: 5px;
	font-size: 9px;
	text-align: end;
`
export const SCardTitle = styled.span`
	text-align: start;
	color: inherit;
	font-size: 16px;
`
export const SCardValue = styled.span`
	color: inherit;
	font-size: 18px;
	position: absolute;
	right: 10px;
	width: 170px;
	text-align: end;
	overflow-wrap: break-word;
`
export const SCardContent = styled.div`
	display: grid;
	width: 100%;
`
export const SLink = styled(Link)`
	text-decoration: none;
	color: inherit;
	font-size: 10px;
	&:hover {
		color: ${({ theme }) => theme.highlight};
	}
`
