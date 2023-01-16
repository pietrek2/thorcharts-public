import styled from 'styled-components'
import { keyframes } from 'styled-components'
import { v } from '../../styles/variables'

export const SModalContainer = styled.div`
	width: 500px;
	height: 27vh;
	background: ${({ theme }) => theme.bgf};
	padding: ${v.lgSpacing};
	border: 1px solid ${({ theme }) => theme.bg3};
	display: grid;
`
export const SModalAddress = styled.div`
	display: flex;
`

export const SCopyIcon = styled.div`
	width: 60px;
	height: 30px;
	margin-top: 10px;
	font-size: 25px;
	&:hover {
		color: ${({ theme }) => theme.highlight};
	}
	cursor: pointer;
`
export const SDivider = styled.div`
	height: 1px;
	width: 90%;
	background: ${({ theme }) => theme.bg3};
	margin: ${v.smSpacing} 0;
`
