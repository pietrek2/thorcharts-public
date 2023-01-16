import React, { useState, useContext, useEffect, useRef } from 'react'
import {
	SNavbar,
	SLeftContainer,
	SRightContainer,
	SNavbarExtendedContainer,
	SNavbarInnerContainer,
	SNavbarLinkContainer,
	SNavbarLink,
	SLogo,
	SOpenLinksButton,
	SThemeModeIconContainer,
	SNavbarLinkExtended
} from './styles'
import { mainLogoWhiteSVG, mainLogoBlackSVG } from '../../assets'
import { ThemeContext } from '../../App'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'

function Navbar() {
	const [extendNavbar, setExtendNavbar] = useState(false)
	const { setTheme, theme } = useContext(ThemeContext)
	const wrapperRef = useRef(null)
	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				if (extendNavbar) {
					setExtendNavbar((curr) => !curr)
				}
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [extendNavbar, wrapperRef])

	return (
		<SNavbar extendNavbar={extendNavbar} ref={wrapperRef}>
			<SNavbarInnerContainer>
				<SLeftContainer>
					{theme === 'dark' && <SLogo src={mainLogoWhiteSVG}></SLogo>}
					{theme === 'light' && <SLogo src={mainLogoBlackSVG}></SLogo>}
					<SNavbarLinkContainer>
						<SNavbarLink to="/">Dashboard</SNavbarLink>
						<SNavbarLink to="/discordbots">Discord Bots</SNavbarLink>
						<SNavbarLink to={{ pathname: 'https://docs.thorchain.org' }} target="_blank" rel="noreferrer">
							THORChain Docs
						</SNavbarLink>
						<SNavbarLink to="/tools">Tools</SNavbarLink>
						<SOpenLinksButton
							onClick={() => {
								setExtendNavbar((curr) => !curr)
							}}
						>
							{extendNavbar ? <>&#10005;</> : <> &#8801;</>}
						</SOpenLinksButton>
					</SNavbarLinkContainer>
				</SLeftContainer>
				<SRightContainer>
					<SThemeModeIconContainer>
						{theme === 'dark' && <MdOutlineLightMode onClick={() => setTheme((p) => (p === 'light' ? 'dark' : 'light'))} style={{ cursor: 'pointer' }} />}
						{theme === 'light' && <MdOutlineDarkMode onClick={() => setTheme((p) => (p === 'light' ? 'dark' : 'light'))} style={{ cursor: 'pointer' }} />}
					</SThemeModeIconContainer>
				</SRightContainer>
			</SNavbarInnerContainer>
			{extendNavbar && (
				<SNavbarExtendedContainer>
					<SNavbarLinkExtended to="/"> Dashboard</SNavbarLinkExtended>
					<SNavbarLinkExtended to="/discordbots">Discord Bots</SNavbarLinkExtended>
					<SNavbarLinkExtended to={{ pathname: 'https://docs.thorchain.org' }} target="_blank" rel="noreferrer">
						THORChain Docs
					</SNavbarLinkExtended>
					<SNavbarLinkExtended to="/tools"> Tools</SNavbarLinkExtended>
				</SNavbarExtendedContainer>
			)}
		</SNavbar>
	)
}

export default Navbar
