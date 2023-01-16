import styled from 'styled-components'

import { v } from '../../styles/variables'

export const SLayout = styled.div`
	display: grid;
`
export const SSecondaryLayout = styled.div`
	position: absolute;
	top: 62px;
	height: calc(100% - 62px);
	// @media (min-height: 750px) {
	// 	// powyzej 750 px height
	// 	height: 92%;
	// }
	// @media (max-height: 750px) {
	// 	height: 92%;
	// 	top: 8%;
	// }
	display: flex;
	width: 100vw;
`
export const SMain = styled.main`
	padding: ${v.xlSpacing} calc(${v.xlSpacing} * 2);
	position: relative;
	width: 100%;
	overflow-y: scroll;
	z-index: 0;
	&::-webkit-scrollbar {
		width: 5px;
		height: 8px;
		background-color: ${({ theme }) => theme.bgf};
	}
	&::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.text};
	}
	margin-left: 10px;
}
`
