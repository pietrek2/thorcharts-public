import React from 'react'
import { STextContent, STextContentHeader, SText, SDivider } from './styles'
import { FiExternalLink } from 'react-icons/fi'
const ToolsPage = () => {
	return (
		<>
			<STextContent>
				<STextContentHeader>Flipside Crypto</STextContentHeader>
				<SText>
					Explore data and make your own charts with{' '}
					<a href="https://flipsidecrypto.xyz" target="_blank" rel="noreferrer">
						FlipsideCrypto <FiExternalLink />
					</a>
				</SText>
				<SDivider />
				<STextContentHeader>THORyield</STextContentHeader>
				<SText>
					View your liquidity position on THORChain using{' '}
					<a href="https://thoryield.com" target="_blank" rel="noreferrer">
						THORyield <FiExternalLink />
					</a>
				</SText>
				<SDivider />
				<STextContentHeader>Block explorer</STextContentHeader>
				<SText>
					View your wallet history, assets {'&'} transactions{' '}
					<a href="https://v2.viewblock.io/thorchain" target="_blank" rel="noreferrer">
						ViewBlock <FiExternalLink />
					</a>
				</SText>
				<SDivider />
				<STextContentHeader>Swap on THORChain</STextContentHeader>
				<SText>
					<ul>
						<li>
							<a href="https://thorswap.finance" target="_blank" rel="noreferrer">
								THORSwap <FiExternalLink />
							</a>
						</li>
						<li>
							<a href="https://www.defispot.com" target="_blank" rel="noreferrer">
								DefiSpot <FiExternalLink />
							</a>
						</li>
						<li>
							<a href="https://github.com/thorchain/asgardex-electron/releases" target="_blank" rel="noreferrer">
								Asgardex <FiExternalLink />
							</a>
						</li>
						<li>
							<a href="https://rango.exchange" target="_blank" rel="noreferrer">
								Rango <FiExternalLink />
							</a>
						</li>
						<li>
							<a href="https://shapeshift.com" target="_blank" rel="noreferrer">
								ShapeShift <FiExternalLink />
							</a>
						</li>
						<li>
							<a href="https://app.thorwallet.org/" target="_blank" rel="noreferrer">
								THORWallet Web <FiExternalLink />
							</a>
						</li>
					</ul>
				</SText>
				<SDivider />
				<STextContentHeader>Mobile THORChain wallets</STextContentHeader>
				<SText>
					<ul>
						<li>
							<a href="https://www.thorwallet.org" target="_blank" rel="noreferrer">
								THORWallet <FiExternalLink />
							</a>
						</li>
						<li>
							<a href="https://ferz.com/en/" target="_blank" rel="noreferrer">
								Ferz Wallet <FiExternalLink />
							</a>
						</li>
						<li>
							<a href="https://trustwallet.com/" target="_blank" rel="noreferrer">
								Trust Wallet <FiExternalLink />
							</a>
						</li>
					</ul>
				</SText>
				<SDivider />
				<STextContentHeader>Learn</STextContentHeader>
				<SText>
					Ask questions about THORChain{' '}
					<a href="https://discord.gg/lpuniversity" target="_blank" rel="noreferrer">
						LPU Discord Server <FiExternalLink />
					</a>
				</SText>
				<SText>
					THORChain news{' '}
					<a href="https://www.runebase.org" target="_blank" rel="noreferrer">
						RUNEBASE <FiExternalLink />
					</a>
				</SText>
				<SText>
					<a href="https://www.youtube.com/c/GrassRootsCrypto" target="_blank" rel="noreferrer">
						{' '}
						GrassRoots Crypto <FiExternalLink />
					</a>{' '}
					youtube channel
				</SText>
				<SDivider />
				<STextContentHeader>Browser Extension Wallets</STextContentHeader>
				<SText>
					Multichain wallet{' '}
					<a href="https://www.xdefi.io" target="_blank" rel="noreferrer">
						XDefi <FiExternalLink />
					</a>
				</SText>
				<SDivider />
				<STextContentHeader>Community {'&'} NFTs</STextContentHeader>
				<SText>
					<ul>
						<li>
							<a href="https://www.vanirthreads.com" target="_blank" rel="noreferrer">
								Vanir Threads <FiExternalLink />
							</a>
						</li>
						<li>
							<a href="https://thorguards.com" target="_blank" rel="noreferrer">
								THORGuards <FiExternalLink />
							</a>
						</li>
					</ul>
				</SText>
				<SDivider />
				<STextContentHeader>Analytics</STextContentHeader>
				<SText>
					<ul>
						<li>
							<a href="https://thorchain.net/dashboard" target="_blank" rel="noreferrer">
								THORChain Explorer <FiExternalLink />
							</a>
						</li>
						<li>
							<a href="https://thornode.network" target="_blank" rel="noreferrer">
								THORNode Monitor <FiExternalLink />
							</a>
						</li>
					</ul>
				</SText>
			</STextContent>
		</>
	)
}

export default ToolsPage
