import { Chain } from 'wagmi/chains'

export const geth = {
  id: Number(process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_ID) ?? 1337,
  name: process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_NAME ?? 'Geth',
  nativeCurrency: {
    name: process.env.NEXT_PUBLIC_ETHEREUM_NATIVE_TOKEN_NAME ?? 'Ether',
    symbol: process.env.NEXT_PUBLIC_ETHEREUM_NATIVE_TOKEN ?? 'ETH',
    decimals: Number(process.env.NEXT_PUBLIC_ETHEREUM_NATIVE_TOKEN_DECIMALS) ?? 18,
  },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL ?? ''] },
  },
  blockExplorers: {
    default: {
      name: process.env.NEXT_PUBLIC_ETHEREUM_EXPLORER_NAME ?? '',
      url: process.env.NEXT_PUBLIC_ETHEREUM_EXPLORER_URL ?? '',
    },
  },
  testnet: Boolean(process.env.NEXT_PUBLIC_ETHEREUM_TESTNET) ?? true
} as const satisfies Chain