import { Chain } from 'wagmi/chains'

export const harmonie = {
  id: Number(process.env.NEXT_PUBLIC_HARMONIE_CHAIN_ID) ?? 440,
  name: process.env.NEXT_PUBLIC_HARMONIE_CHAIN_NAME ?? 'Harmonie',
  nativeCurrency: {
    name: process.env.NEXT_PUBLIC_HARMONIE_NATIVE_TOKEN_NAME ?? 'Harmonie',
    symbol: process.env.NEXT_PUBLIC_HARMONIE_NATIVE_TOKEN ?? 'HMY',
    decimals: Number(process.env.NEXT_PUBLIC_HARMONIE_NATIVE_TOKEN_DECIMALS) ?? 18,
  },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_HARMONIE_RPC_URL ?? ''] },
  },
  blockExplorers: {
    default: {
      name: process.env.NEXT_PUBLIC_HARMONIE_EXPLORER_NAME ?? '',
      url: process.env.NEXT_PUBLIC_HARMONIE_EXPLORER_URL ?? '',
    },
  },
  testnet: Boolean(process.env.NEXT_PUBLIC_HARMONIE_TESTNET) ?? true
} as const satisfies Chain