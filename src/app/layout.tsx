import { cookieToInitialState } from 'wagmi'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppKitProvider } from "./provider"
import { headers } from 'next/headers'
import { config } from '../config'
import Navigation from '@/components/ui/navigation'
import Footer from '@/components/ui/footer'


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Bridge token application",
	description: "Bridge token application",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const initialState = cookieToInitialState(config, headers().get('cookie'))

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50`}>
				<AppKitProvider initialState={initialState}>
					{/* navbar */}
					<Navigation />
					
          <main className='px-4 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto'>
            {children}
          </main>
					<Footer />
				</AppKitProvider>
			</body>
		</html>
	)
}
