import React from 'react'
import { SModalContainer, SModalAddress, SCopyIcon, SDivider } from './styles'
import { CgCopy } from 'react-icons/cg'
const BuyMeACoffePopup = () => (
	<SModalContainer>
		<SModalAddress>
			<p>THORChain Address: thor1pwfmlvecjaue9zz7fax4pjkpdyaf6qt847295w </p>
			<SCopyIcon>
				<CgCopy
					onClick={() => {
						navigator.clipboard.writeText('thor1pwfmlvecjaue9zz7fax4pjkpdyaf6qt847295w')
					}}
				/>
			</SCopyIcon>
		</SModalAddress>
		<SDivider />
		<SModalAddress>
			<p>Ethereum Address: 0x99Ebcb369132539a970808c6672C56fd3A9153fd</p>

			<SCopyIcon>
				<CgCopy
					onClick={() => {
						navigator.clipboard.writeText('0x99Ebcb369132539a970808c6672C56fd3A9153fd')
					}}
				/>
			</SCopyIcon>
		</SModalAddress>
		<SDivider />
		<SModalAddress>
			<p>Binance (BEP2) Address: bnb1eyt9lxzjtt9l7sjgvjnsac28xksdcfy4fq708h</p>
			<SCopyIcon>
				<CgCopy
					onClick={() => {
						navigator.clipboard.writeText('bnb1eyt9lxzjtt9l7sjgvjnsac28xksdcfy4fq708h')
					}}
				/>
			</SCopyIcon>
		</SModalAddress>
	</SModalContainer>
)

export default BuyMeACoffePopup
