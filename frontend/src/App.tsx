import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Layout from './components/Layout/Layout'
import Routes from './Routes'
import { GlobalStyle } from './styles/globalStyles'
import { darkTheme, lightTheme } from './styles/theme'

export const ThemeContext = React.createContext<any>(null)

const App = () => {
	const [theme, setTheme] = useState('dark')
	const themeStyle = theme === 'light' ? lightTheme : darkTheme

	return (
		<ThemeContext.Provider value={{ setTheme, theme }}>
			<ThemeProvider theme={themeStyle}>
				<GlobalStyle />
				<>
					<Layout>
						<Routes />
					</Layout>
				</>
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}

export default App
