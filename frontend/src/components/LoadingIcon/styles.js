import styled, { keyframes } from 'styled-components'
import { v } from '../../styles/variables'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SLoadingIcon = styled.div`
	display: grid;
	margin-top: 150px;
	margin-left: 40%;
	svg {
		font-size: 150px;
		animation: ${rotate} 1.5s linear infinite;
	}
`
