import { Chain } from 'wagmi/chains'

export const allfeat = {
  id: Number(process.env.NEXT_PUBLIC_ALLFEAT_CHAIN_ID) ?? 440,
  name: process.env.NEXT_PUBLIC_ALLFEAT_CHAIN_NAME ?? 'Allfeat',
  nativeCurrency: {
    name: process.env.NEXT_PUBLIC_ALLFEAT_NATIVE_TOKEN_NAME ?? 'Allfeat',
    symbol: process.env.NEXT_PUBLIC_ALLFEAT_NATIVE_TOKEN ?? 'AFT',
    decimals: Number(process.env.NEXT_PUBLIC_ALLFEAT_NATIVE_TOKEN_DECIMALS) ?? 18,
  },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_ALLFEAT_RPC_URL ?? ''] },
  },
  blockExplorers: {
    default: {
      name: process.env.NEXT_PUBLIC_ALLFEAT_EXPLORER_NAME ?? '',
      url: process.env.NEXT_PUBLIC_ALLFEAT_EXPLORER_URL ?? '',
    },
  },
  testnet: Boolean(process.env.NEXT_PUBLIC_ALLFEAT_TESTNET) ?? true
} as const satisfies Chain