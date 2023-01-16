import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { v } from '../../styles/variables'
export const SNavbar = styled.nav`
	width: 100%;
    position: fixed;
    bottom: 92%
	height: ${(props) => (props.extendNavbar ? '100vh' : '80px')};
	background-color: ${({ theme }) => theme.bgf};
	display: flex;
	flex-direction: column;
    border-bottom: 1px solid ${({ theme }) => theme.bg3};
    z-index: 10;
	@media (min-width: 700px) {
		height: 80px;
	}
`

export const SLeftContainer = styled.div`
	flex: 70%;
	display: flex;
	align-items: center;
	padding-left: 1%;
`

export const SRightContainer = styled.div`
	flex: 30%;
	display: flex;
	justify-content: flex-end;
	padding-right: 50px;
`
export const SThemeModeIconContainer = styled.div`
	padding: ${v.smSpacing} ${v.mdSpacing};
	display: flex;
	align-items: center;
	svg {
		font-size: 40px;
	}
	@media (max-width: 700px) {
		margin-right: 30px;
	}
`
export const SNavbarInnerContainer = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
`

export const SNavbarLinkContainer = styled.div`
	display: flex;
	padding-left: 2%;
`

export const SNavbarLink = styled(Link)`
	color: inherit;
	font-size: x-large;
	text-decoration: none;
	margin: 15px;

	@media (max-width: 700px) {
		display: none;
	}
	&:hover {
		color: ${({ theme }) => theme.highlight};
	}
`

export const SNavbarLinkExtended = styled(Link)`
	color: inherit;
	font-size: x-large;
	text-decoration: none;
	margin: 10px;
	&:hover {
		color: ${({ theme }) => theme.highlight};
	}
`

export const SLogo = styled.img`
	margin: 10px;
	max-width: 200px;
	height: auto;
`
export const SOpenLinksButton = styled.button`
	width: 70px;
	height: 50px;
	background: none;
	border: none;
	padding: ${v.smSpacing} ${v.mdSpacing};
	display: flex;
	align-items: center;

	color: inherit;
	font-size: 45px;
	cursor: pointer;
	position: fixed;
	right: 2%;
	top: 2%;
	@media (min-width: 700px) {
		display: none;
	}
`

export const SNavbarExtendedContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 100;
	@media (min-width: 700px) {
		display: none;
	}
`
