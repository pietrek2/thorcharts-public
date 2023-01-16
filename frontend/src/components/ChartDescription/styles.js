import styled from 'styled-components'
import { v } from '../../styles/variables'
export const SChartDescription = styled.div`
	background: ${({ theme }) => theme.bgf};
	box-shadow: 0 0 4px ${({ theme }) => theme.bg3}, 0 0 7px ${({ theme }) => theme.bg3};
	border: 1px solid ${({ theme }) => theme.bg3};
	margin-top: ${v.smSpacing};
`

export const SDescriptionTitle = styled.h1`
	margin-top: ${v.lgSpacing};
	font-size: 30px;
`
export const SDecriptionText = styled.span`
	font-size: 17px;
	a {
		color: inherit;
		:hover {
			color: ${({ theme }) => theme.highlight};
		}
		svg {
			font-size: 20px;
		}
	}
`

export const SDivider = styled.div`
	height: 1px;
	width: 100%;
	background: ${({ theme }) => theme.bg3};
	margin: ${v.lgSpacing} 0;
`
