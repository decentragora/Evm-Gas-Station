import type { Metadata, ResolvedMetadata } from 'next'
import Head from 'next/head';
import '@fontsource-variable/space-grotesk';
import { Inter } from 'next/font/google'
import { Footer, Header } from '@/components'
import { Analytics } from '@vercel/analytics/react';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Evm Gas Station',
  category: 'Blockchain',
  description: 'One stop shop for all your evm gas needs',
  applicationName: 'Evm Gas Station',
  authors: [{ name: "0xOrphan", url: "https://0xorphan.vercel.app" }],
  creator: '0xOrphan',
  publisher: 'DecentrAgora',
  generator: 'Evm Gas Station',
  twitter: { card: 'summary_large_image', site: '@0xOrphan', creator: '@0xOrphan', title: 'Evm Gas Station', description: 'One stop shop for all your evm gas needs', images: 'https://evmgasstation.com/api/twitter-image' },
  openGraph: {
    title: 'Evm Gas Station',
    description: 'One stop shop for all your evm gas needs',
    url: 'https://evmgasstation.com',
    type: 'website',
    images: [
      {
        url: 'https://evmgasstation.com/api/twitter-image',
        width: 800,
        height: 600,
        alt: 'Evm Gas Station',
      },
    ],
  },
  keywords: [
    'Ethereum', 'EVM', 'Gas', 'Gas Station', 'Blockchain', 'Smart Contracts', 
    'DeFi', 'Decentralized Finance', 'Crypto', 'Cryptocurrency', 'Gwei', 
    'Transaction Fees', 'Metamask', 'Wallet', 'dApps', 'Web3', 'Solidity', 
    'Mainnet', 'Testnet', 'Layer 2', 'Scalability', 'Staking', 'Mining', 
    'Validators', 'Oracles', 'Tokens', 'ERC20', 'NFT', 'Non-Fungible Tokens', 
    'Consensus', 'Proof of Work', 'Proof of Stake', 'Binance Smart Chain', 
    'Polygon', 'Optimism', 'Arbitrum', 'DAO', 'Decentralized Autonomous Organization', 
    'Interoperability', 'Liquidity', 'Yield Farming', 'Swaps', 'DEX', 'Decentralized Exchange', 
    'Cryptography', 'Protocol', 'Governance', 'Airdrop', 'Fork', 'Smart Contract Audits', 
    'Whale', 'Gasless', 'Rollups', 'Ankr', 'Infura', 
    'Etherscan', 'Open-source', 'Community-driven'
  ],
  icons: [
    {
      url: '/favicon.ico',
      sizes: '64x64',
      type: 'image/x-icon',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Analytics mode={'production'} />
      </body>
    </html>
  )
}
