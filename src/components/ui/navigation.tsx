import React from 'react'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import WalletButton from '@/components/ui/wallet-button'


/**
 * A functional component that renders the navigation bar.
 *
 * @return {JSX.Element} The JSX element representing the navigation bar.
 */
const Navigation = (): JSX.Element => {
  return (
    <div className='p-2 flex justify-between border-b dark:border-zinc-800 mb-2 bg-zinc-300/30 dark:bg-zinc-700/30 sticky top-0 z-50 backdrop-blur-md shadow-md dark:shadow-zinc-800'>
        <WalletButton />
        <ThemeSwitcher />
    </div>
  )
}

export default Navigation

