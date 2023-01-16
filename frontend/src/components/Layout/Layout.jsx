import React, { useContext } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { SLayout, SMain, SSecondaryLayout } from './styles'
import { ThemeContext } from '../../App'
const Layout = ({ children }) => {
	// eslint-disable-next-line no-unused-vars
	const { setTheme, theme } = useContext(ThemeContext)
	return (
		<SLayout>
			<Navbar />
			<SSecondaryLayout>
				<Sidebar />
				<SMain id='main-content'>{children}</SMain>
			</SSecondaryLayout>
			{/* <Footer /> */}
		</SLayout>
	)
}

export default Layout
