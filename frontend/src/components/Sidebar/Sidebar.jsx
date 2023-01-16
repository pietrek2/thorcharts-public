import React, { useContext, useRef, useState, useEffect } from 'react'
import { SDivider, SLink, SLinkContainer, SLinkIcon, SLinkLabel, SSearch, SSearchIcon, SSidebar, SSidebarButton, STheme, SThemeLabel, SThemeToggler, SToggleThumb } from './styles'
import SidebarList from './SidebarList'
import { contactUsLink } from '../../const'
import { AiOutlineSearch, AiOutlineArrowLeft } from 'react-icons/ai'
import { FiTwitter } from 'react-icons/fi'
import { ThemeContext } from '../../App'
import { useLocation } from 'react-router-dom'
import BuyMeACoffePopup from '../Popup/Popup'
import { FiCoffee } from 'react-icons/fi'
import Popup from 'reactjs-popup'

const MOBILE_WIDTH = 700

const Sidebar = () => {
	const wrapperRef = useRef(null)
	const searchRef = useRef(null)
	const { setTheme, theme } = useContext(ThemeContext)
	const [sidebarOpen, setSidebarOpen] = useState(() => {
		if (getWindowWidth() > MOBILE_WIDTH) {
			return true
		} else {
			return false
		}
	})
	const [searchText, setSearchText] = useState('')
	const [dropdownOpen, setDropdownOpen] = useState({
		Statistics: false,
		Diagrams: false
	})
	const { pathname } = useLocation()

	const searchClickHandler = (e) => {
		if (!sidebarOpen) {
			setSidebarOpen(true)
			searchRef.current.focus()
		}
	}
	const searchChangeHandler = (e) => {
		const lowerCase = e.target.value.toLowerCase()
		setSearchText(lowerCase)
	}
	function getWindowWidth() {
		// eslint-disable-next-line no-unused-vars
		const { innerWidth: width, innerHeight: height } = window
		return width
	}
	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				if (sidebarOpen && getWindowWidth() < MOBILE_WIDTH) {
					setSidebarOpen((curr) => !curr)
				}
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [sidebarOpen, wrapperRef])
	return (
		<>
			<SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
				<AiOutlineArrowLeft />
			</SSidebarButton>
			<SSidebar isOpen={sidebarOpen} ref={wrapperRef}>
				<SSearch onChange={searchChangeHandler} onClick={searchClickHandler} style={!sidebarOpen ? { width: `fit-content` } : {}}>
					<SSearchIcon>
						<AiOutlineSearch />
					</SSearchIcon>
					<input ref={searchRef} placeholder="Search" style={!sidebarOpen ? { width: 0, padding: 0 } : {}} />
				</SSearch>
				<SDivider />
				<SidebarList dropdownOpen={dropdownOpen} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setDropdownOpen={setDropdownOpen} pathname={pathname} searchText={searchText} />
				<SDivider />
				{secondaryLinksArray.map(({ icon, label, to, isPathNameBlank }) => (
					<SLinkContainer key={label}>
						{!isPathNameBlank && (
							<SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
								<SLinkIcon>{icon}</SLinkIcon>
								{sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
							</SLink>
						)}
						{isPathNameBlank && (
							<SLink to={{ pathname: to }} target="_blank" style={!sidebarOpen ? { width: `fit-content` } : {}}>
								<SLinkIcon>{icon}</SLinkIcon>
								{sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
							</SLink>
						)}
					</SLinkContainer>
				))}
				<SLinkContainer>
					<Popup
						trigger={
							<SLink to={pathname} style={!sidebarOpen ? { width: `fit-content` } : {}}>
								<SLinkIcon>
									<FiCoffee />
								</SLinkIcon>
								{sidebarOpen && (
									<SLinkLabel>
										<span style={{ fontStyle: 'italic' }}>Buy me a Coffee</span>
									</SLinkLabel>
								)}
							</SLink>
						}
						modal
					>
						<BuyMeACoffePopup />
					</Popup>
				</SLinkContainer>
			</SSidebar>
		</>
	)
}
const secondaryLinksArray = [
	{
		label: 'Contact',
		icon: <FiTwitter />,
		to: contactUsLink,
		isPathNameBlank: true
	}
]

export default Sidebar
