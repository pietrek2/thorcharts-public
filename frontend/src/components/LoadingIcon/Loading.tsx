import React, { useContext } from 'react'

import { AiOutlineLoading } from 'react-icons/ai'
import { ThemeContext } from '../../App'
import { SLoadingIcon } from './styles'

function LoadingChart() {
	const { setTheme, theme } = useContext(ThemeContext)

	return (
		<SLoadingIcon>
			<AiOutlineLoading />
		</SLoadingIcon>
	)
}

export default LoadingChart
