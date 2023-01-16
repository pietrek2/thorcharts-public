import React from 'react'
import { SFooter, SCopyRight, SFooterIcons } from './styles'
import { FaTwitter } from 'react-icons/fa'
function Footer() {
	return (
		<>
			<SFooter>
				<SFooterIcons>
					<FaTwitter />
				</SFooterIcons>

				<SCopyRight>© 2022 THORCharts. All Rights Reserved.</SCopyRight>
			</SFooter>
		</>
	)
}

export default Footer
