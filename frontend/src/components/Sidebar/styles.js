import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { btnReset, v } from '../../styles/variables'

export const SSidebar = styled.div`
	min-width: ${({ isOpen }) => (!isOpen ? `92px` : v.sidebarWidth)};
	max-width: ${({ isOpen }) => (!isOpen ? `92px` : v.sidebarWidth)};
	background: ${({ theme }) => theme.bgf};
	height: 100%;
	padding: ${v.lgSpacing};
	position: relative;
	border-right: 1px solid ${({ theme }) => theme.bg3};
	overflow-y: scroll;
	/* Hide scrollbar for Chrome, Safari and Opera */
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	@media (max-width: 700px) {
		left: ${({ isOpen }) => (isOpen ? `0px` : `-100px`)};
		margin-right: ${({ isOpen }) => (isOpen ? `0px` : `-100px`)};
		position: absolute;
		z-index: 2;
	}
`

export const SSidebarButton = styled.button`
	${btnReset};
	position: absolute;
	top: ${v.xxlSpacing};
	left: ${({ isOpen }) => (isOpen ? `240px` : `80px`)};
	top: 83px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background: ${({ theme }) => theme.bg3};
	box-shadow: 0 0 4px ${({ theme }) => theme.bg3}, 0 0 7px ${({ theme }) => theme.bg3};
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 5;
	transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
	@media (max-width: 700px) {
		left: ${({ isOpen }) => (isOpen ? `240px` : `20px`)};
	}
`

export const SLogo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		max-width: ${({ isOpen }) => (isOpen ? `250px` : `52px`)};
		height: auto;
	}
	margin-bottom: ${({ isOpen }) => (isOpen ? `0px` : v.lgSpacing)};
`

export const SSearch = styled.div`
	background: ${({ theme }) => theme.bgAlpha};
	border: 1px solid ${({ theme }) => theme.bg3};
	border-radius: ${v.borderRadius};
	input {
		padding: 0 ${v.smSpacing};
		font-family: inherit;
		letter-spacing: inherit;
		font-size: 16px;
		width: 100%;
		outline: none;
		border: none;
		color: inherit;
		background: transparent;
	}
	display: flex;
`

export const SSearchIcon = styled.button`
	${btnReset};
	padding: calc(${v.mdSpacing} - 2px) ${v.mdSpacing};
	display: flex;
	cursor: pointer;

	svg {
		font-size: 20px;
	}
`

export const SDivider = styled.div`
	height: 1px;
	width: 100%;
	background: ${({ theme }) => theme.bg3};
	margin: ${v.lgSpacing} 0;
`
export const SDropDownDivider = styled.div`
	height: 1px;
	width: 15%;
	background: ${({ theme }) => theme.bg3};
	margin: 0 ${v.mdSpacing};
`
export const SLinkContainer = styled.div`
	background: ${({ theme, isActive }) => (!isActive ? `transparent` : theme.bg2)};
	border-radius: ${v.borderRadius};
	margin: 8px 0;
	min-width: 50px;
	:hover {
		box-shadow: inset 0 0 0 1px ${({ theme }) => theme.bg3};
	}
`

export const SLinkDropDownContainer = styled.div`
	background: ${({ theme, isActive }) => (!isActive ? `transparent` : theme.bg2)};
	border-radius: ${v.borderRadius};
	margin: 8px 0;

	:hover {
		box-shadow: inset 0 0 0 1px ${({ theme }) => theme.bg3};
	}
`

export const SLink = styled(Link)`
	display: flex;
	align-items: center;
	max-height: 50px;
	text-decoration: none;
	color: inherit;
	font-size: 16px;
	padding: calc(${v.smSpacing} - 2px) 0;
	&:hover {
		color: ${({ theme }) => theme.text};
	}
`

export const SLinkIcon = styled.div`
	padding: ${v.smSpacing} ${v.mdSpacing};
	display: flex;

	svg {
		font-size: 20px;
	}
`
export const SLinkLogo = styled.img`
	height: 40px;
	display: flex;
	padding: ${v.smSpacing} 0;
	border-radius: 100%;
`
export const SLinkLabel = styled.span`
	display: block;
	flex: 1;
	margin-left: ${v.smSpacing};
`

export const SLinkNotification = styled.div`
	font-size: 14px;
	padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
	border-radius: calc(${v.borderRadius} / 2);
	background: ${({ theme }) => theme.bgAlpha};
	color: ${({ theme }) => theme.text};

	margin-right: ${v.mdSpacing};
`
