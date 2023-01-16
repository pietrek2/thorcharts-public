import React, { useEffect, useState } from 'react'
import { SChartScaleSwitch, SChartScaleSwitchButton } from './styles'

const ChartScaleSwitch = () => {
	const [isLinear, setIsLinear] = useState(true)
	return (
		<SChartScaleSwitch>
			<SChartScaleSwitchButton
				selectedScale={isLinear}
				onClick={() => {
					setIsLinear(true)
				}}
			>
				Linear
			</SChartScaleSwitchButton>
			/
			<SChartScaleSwitchButton
				selectedScale={!isLinear}
				onClick={() => {
					setIsLinear(false)
				}}
			>
				Logarythmic
			</SChartScaleSwitchButton>
		</SChartScaleSwitch>
	)
}

export default ChartScaleSwitch
