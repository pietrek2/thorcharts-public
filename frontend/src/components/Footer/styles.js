import styled from 'styled-components'
import { v } from '../../styles/variables'
export const SFooter = styled.div`
	position: absolute;
	bottom: 0%;
	height: 5%;
	min-height: 40px;
	z-index: 1;
	width: 100%;
	background: ${({ theme }) => theme.bgf};
	border-top: 1px solid ${({ theme }) => theme.bg3};
	display: flex;
	justify-content: center;
`
export const SFooterIcons = styled.div`
	font-size: 30px;
`
export const SCopyRight = styled.p`
	position: fixed;
	text-decoration: none;
	right: 0px;
	color: inherit;
	font-size: 10px;
	padding: 12px ${v.xlSpacing};
`
