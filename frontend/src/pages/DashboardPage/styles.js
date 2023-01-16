import styled from 'styled-components'
import { v } from '../../styles/variables'

export const SDashboard = styled.div`
	display: grid;
	padding: ${v.mdSpacing};
	margin: ${v.smSpacing};
`

export const STable = styled.table`
	background: ${({ theme }) => theme.bgf};
	box-shadow: 0 0 4px ${({ theme }) => theme.bg3}, 0 0 7px ${({ theme }) => theme.bg3};
	border: 1px solid ${({ theme }) => theme.bg3};
	width: 40%;
	color: ${({ theme }) => theme.text};
	caption-side: top;
	caption {
		color: ${({ theme }) => theme.text};
	}
	tbody {
		tr {
			:hover {
				background: ${({ theme }) => theme.bg};
			}
		}
	}
`
