"use client"

import { WagmiProvider, State } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config, projectId, metadata } from "../config"
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { ThemeProvider } from "next-themes"
import { OperationDetailProvider } from "@/context/operation-status"

const queryClient = new QueryClient()

createWeb3Modal({
	metadata,
	wagmiConfig: config,
	projectId,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
	enableOnramp: true // Optional - false as default
})

export function AppKitProvider(
	{ children, initialState }: 
	{ children: React.ReactNode, initialState?: State }
) {
	return (
		<WagmiProvider config={config} initialState={initialState}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem> 
					<OperationDetailProvider>
					{children}
					</OperationDetailProvider>
        </ThemeProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
