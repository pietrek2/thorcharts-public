import React from 'react'
import { SContainer, SContentHeader, SDecription, SLogo, SDivider, SButton, SText, SAd } from './styles'
import PriceBotLogo from '../../assets/discordBotAvatars/priceBotLogo.png'
import LiquidityBotLogo from '../../assets/discordBotAvatars/liquidityBotLogo.png'
import VolumeBotLogo from '../../assets/discordBotAvatars/volumeBotLogo.png'
import { contactUsLink } from '../../const'
import { FiTwitter } from 'react-icons/fi'
import { Row } from 'react-bootstrap'
import { IoIosAddCircleOutline } from 'react-icons/io'

const DiscordBotsPage = () => {
	return (
		<Row>
			<SAd>
				Do you need a custom built discord bot for your server?{' '}
				<a href={contactUsLink} target="_blank" rel="noreferrer">
					Contact <FiTwitter />
				</a>
			</SAd>
			<SContainer>
				<SContentHeader>
					Rune Price
					<a href="https://discord.com/api/oauth2/authorize?client_id=840954721669480548&permissions=67108864&scope=bot" target="_blank" rel="noreferrer">
						<SButton>
							Add to Server <IoIosAddCircleOutline />
						</SButton>
					</a>
				</SContentHeader>
				<SDivider />
				<SDecription>
					<SLogo src={PriceBotLogo} alt="RunePriceBotLogo" />
					<SText>Bot updates it's name to reflect current RUNE price. Additionally activity status shows 1h,24h and 7d price changes.</SText>
				</SDecription>
			</SContainer>
			<SContainer>
				<SContentHeader>
					TC Liquidity
					<a href="https://discord.com/api/oauth2/authorize?client_id=841296502986506292&permissions=67108864&scope=bot" target="_blank" rel="noreferrer">
						<SButton>
							Add to Server <IoIosAddCircleOutline />
						</SButton>
					</a>
				</SContentHeader>
				<SDivider />
				<SDecription>
					<SLogo src={LiquidityBotLogo} alt="RunePriceBotLogo" />
					<SText>Bot updates it's name to reflect current liquidity locked in THORChain pools in USD.</SText>
				</SDecription>
			</SContainer>
			<SContainer>
				<SContentHeader>
					TC Volume
					<a href="https://discord.com/api/oauth2/authorize?client_id=841296842003447839&permissions=67108864&scope=bot" target="_blank" rel="noreferrer">
						<SButton>
							Add to Server <IoIosAddCircleOutline />
						</SButton>
					</a>
				</SContentHeader>
				<SDivider />
				<SDecription>
					<SLogo src={VolumeBotLogo} alt="RunePriceBotLogo" />
					<SText>Bot updates it's name to reflect 24h volume on THORChain in USD.</SText>
				</SDecription>
			</SContainer>
		</Row>
	)
}

export default DiscordBotsPage
