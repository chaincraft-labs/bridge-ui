import { http } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains"
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { harmonie } from "./network_hmy"
import { geth } from "./network_eth"


export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ""
if (!projectId) throw new Error('Project ID is not defined')

export const metadata = {
  name: 'Harmonie-funding',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}
const chains = [sepolia, mainnet, harmonie, geth] as const

export const config = defaultWagmiConfig({
  ssr: true,
  metadata,
  chains,
  projectId,
  transports: {
    // RPC URL for each chain
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    ),
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    ),
    [harmonie.id]: http(harmonie.rpcUrls.default.http[0]),
    [geth.id]: http(geth.rpcUrls.default.http[0]),
  },
})


