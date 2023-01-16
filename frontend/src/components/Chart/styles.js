import styled from 'styled-components'
import { v } from '../../styles/variables'
export const SMainGridContainer = styled.div`
	display: grid;
	grid-template-columns: min-content 1fr min-content;
	grid-template-rows: min-content 1fr min-content min-content;
	width: 100%;
	border: 1px solid ${({ theme }) => theme.bg3};
	background: ${({ theme }) => theme.bgf};
	box-shadow: 0 0 4px ${({ theme }) => theme.bg3}, 0 0 7px ${({ theme }) => theme.bg3};
	padding: ${v.lgSpacing};
	margin: ${v.smSpacing} 0;
`
export const SsvgChartContent = styled.svg`
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 2;
`
export const SChartContainer = styled.div`
	position: relative;
	width: 100%;
	grid-row: 4;
	grid-column: 2;
	cursor: crosshair;
`
export const SyAxis = styled.div`
	position: relative;
	height: 100%;
	min-width: 30px;
	grid-row: 4;
	grid-column: 1;
`
export const SxAxis = styled.div`
	height: 40px;
	width: 100%;
	grid-row: 5;
	grid-column: 2;
`
export const SyRightAxis = styled.div`
	height: 100%;
	min-width: 30px;
	grid-row: 4;
	grid-column: 3;
`
export const SSmall = styled.text`
	font: 12px sans-serif;
	pointer-events: none;
	font-family: Inter, Helvetica Neue, system-ui, sans-serif;
	cursor: default;
	fill: ${({ theme }) => theme.text};
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`
export const SHeavy = styled.text`
	font: bold 12px sans-serif;
	font-family: Inter, Helvetica Neue, system-ui, sans-serif;
	pointer-events: none;
	cursor: default;
	fill: ${({ theme }) => theme.text};
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`
export const SChartRect = styled.rect`
	fill: none;
	stroke-width: 2;
	stroke: ${({ theme }) => theme.text};
`
export const SChartLightStroke = styled.line`
	stroke-width: 1;
	stroke: ${({ theme }) => theme.bg3};
	stroke-linecap: round;
`
export const SChartCrossHair = styled.line`
	stroke-width: 1;
	stroke: ${({ theme }) => theme.text};
	stroke-linecap: round;
`
export const SsvgChartBackground = styled.svg`
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 1;
`
export const SsvgChartForeground = styled.svg`
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 3;
`
export const Circle = styled.div`
	border-radius: 50%;
	position: relative;
	width: 100%;
	height: 100%;
`

export const LegendContainer = styled.div`
	grid-row: 3;
	grid-column: 2 / span 3;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
`
export const LegendItemContainer = styled.div`
	display: flex;
	flex-wrap: no-wrap;
	justify-content: center;
	align-items: center;
	padding: 0.2em 0.4em;
`

export const LegendSubItemContainer = styled.div`
	padding: 0.1em 0.3em;
`

export const LegendCircleContainer = styled.div`
	width: 0.7em;
	height: 0.7em;
	position: relative;
`

export const LegendSpan = styled.span``

export const ToolTipBorder = styled.div`
	position: absolute;
	border-radius: 5px;
	border: 1px solid ${({ theme }) => theme.text};
	padding: 5px;
	background-color: ${({ theme }) => theme.bgAlpha};
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`

export const ToolTipContentContainer = styled.div`
	display: flex;
	flex-wrap: no-wrap;
	padding: 0.2em 0.4em;
`
export const ToolTipContentColumn = styled.div``
export const ToolTipHorizontalContainer = styled.div`
	display: flex;
	flex-wrap: no-wrap;
	align-items: center;
	padding: 0.05em 0.1em;
`

export const NonWrapSpan = styled.span`
	white-space: nowrap;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`

export const ToolTipDateContainer = styled.div`
	padding: 0.1em 0.2em;
`

export const ToolTipItemContainer = styled.div`
	display: flex;
	flex-wrap: no-wrap;
	justify-content: left;
	align-items: left;
	padding: 0.05em 0.1em;
`

export const ToolTipSubItem = styled.div`
	padding: 0.1em 0.3em;
`

export const FullScaleDiv = styled.div`
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 3;
`
export const ChartScaleSvg = styled.svg`
	grid-row 6;
	grid-column: 2;
	width: 100%;
	height: 50px;
	overflow: visible;
`
export const ChartScaleLine = styled.line`
	fill: none;
	vectoreffect: non-scaling-stroke;
	stroke: ${({ theme }) => theme.bg3};
	strokewidth: 1;
`
export const ChartScaleAdjustableRectangle = styled.rect`
	fill: ${({ theme }) => theme.bgAlpha2};
	cursor: e-resize;
`
export const ChartScaleRectangleHandle = styled.rect`
	fill: ${({ theme }) => theme.text};
	cursor: e-resize;
`
export const ChartLineLabel = styled.text`
	fill: ${({ theme }) => theme.highlight};
	font: 12px sans-serif;
	pointer-events: none;
	font-family: Inter, Helvetica Neue, system-ui, sans-serif;
	cursor: default;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`
export const ChartLineLabelBold = styled.text`
	fill: ${({ theme }) => theme.highlight};
	font: 12px sans-serif;
	pointer-events: none;
	font-family: Inter, Helvetica Neue, system-ui, sans-serif;
	cursor: default;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`
export const ChartScaleHandleLine = styled.line`
	fill: none;
	vectoreffect: non-scaling-stroke;
	stroke: ${({ theme }) => theme.bg3};
	cursor: e-resize;
	strokewidth: 1;
`
export const SChartTitle = styled.span`
	grid-row: 1;
	grid-column: span 3;
	text-align: center;
	margin-top: -${v.smSpacing};
	margin-bottom: ${v.smSpacing} - 2px;
	color: ${({ theme }) => theme.strongHighlight};
	font-size: 30px;
`

export const SChartUnitContainerLeft = styled.div`
	grid-column 1;
	grid-row 5 / span 3;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const SChartUnitContainerRight = styled.div`
	grid-column 3;
	grid-row 5 / span 3;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const SChartUnitSpan = styled.span`
	margin: 20px;
	white-space: nowrap;
	height: min-content;
	width: min-content;
`
export const VerticalText = styled.div`
	text-align: center;
	line-height: 1;
	position: relative;
	-webkit-transform: rotate(180deg);
	transform: rotate(180deg);
	white-space: nowrap;
	-webkit-writing-mode: vertical-rl;
	writing-mode: vertical-rl;
`
export const VerticalTextRight = styled.div`
	text-align: center;
	line-height: 1;
	position: relative;
	white-space: nowrap;
	-webkit-writing-mode: vertical-rl;
	writing-mode: vertical-rl;
`

export const SChartTools = styled.div`
	grid-row: 2;
	grid-column: span 3;
	margin-top: -${v.smSpacing};
	margin-bottom: ${v.smSpacing};
	//border-top: 1px solid ${({ theme }) => theme.bg3};
	border-bottom: 1px solid ${({ theme }) => theme.bg3};
`
export const SChartScaleSwitch = styled.div`
	//padding: ${v.smSpacing};
	margin: ${v.smSpacing};
`
export const SChartScaleSwitchButton = styled.button`
	text-decoration: none;
	font-size: 16px;
	background: ${({ theme }) => theme.bgf};
	color: ${({ selectedScale, theme }) => (selectedScale ? `${theme.strongHighlight}` : `${theme.highlight}`)};
	border: 0px;

	:hover {
		color: ${({ selectedScale, theme }) => (selectedScale ? `${theme.strongHighlight}` : `${theme.text}`)};
	}
`
