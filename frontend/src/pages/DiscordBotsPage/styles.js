import styled from 'styled-components'
import { v } from '../../styles/variables'

export const SContainer = styled.div`
	background: ${({ theme }) => theme.bgf};
	box-shadow: 0 0 4px ${({ theme }) => theme.bg3}, 0 0 7px ${({ theme }) => theme.bg3};
	border: 1px solid ${({ theme }) => theme.bg3};
	width: 480px;
	padding: ${v.mdSpacing};
	margin: ${v.smSpacing};
`
export const SContentHeader = styled.h1`
	margin: ${v.smSpacing};
	font-size: 30px;
	a {
		color: ${({ theme }) => theme.text};
	}
`
export const SDecription = styled.div`
	display: flex;
`
export const SAd = styled.h1`
	font-size: 24px;
	text-align: center;
	a {
		:hover {
			color: ${({ theme }) => theme.highlight};
		}
		color: ${({ theme }) => theme.text};
		text-decoration: none;
		svg {
			font-size: 30px;
		}
	}
`
export const SLogo = styled.img`
	height: 70px;
	margin: ${v.smSpacing};
	border-radius: 100%;
	box-shadow: inset 0 0 0 1px ${({ theme }) => theme.highlight};
`
export const SButton = styled.a`
	float: right;
	text-decoration: none;
	font-size: 22px;
	color: ${({ theme }) => theme.text};
	margin-right: ${v.mdSpacing};
	padding: ${v.smSpacing};
	:hover {
		box-shadow: inset 0 0 0 1px ${({ theme }) => theme.bg3};
		border: 1px solid ${({ theme }) => theme.bg3};
		color: ${({ theme }) => theme.highlight};
		border-radius: ${v.borderRadius};
	}
`
export const SText = styled.p`
	font-size: 15px;
	margin: ${v.smSpacing};
`
export const SDivider = styled.div`
	height: 1px;
	width: 100%;
	background: ${({ theme }) => theme.bg3};
	margin: ${v.lgSpacing} 0;
`
