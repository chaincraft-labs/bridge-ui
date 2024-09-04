"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { clx } from "@/lib/utils/clx/clx-merge";
import HighlightButton from "@/components/ui/highlight-button";

export const ButtonDisconnect = clx(HighlightButton, "w-fit hover:text-rose-500 dark:hover:text-rose-500");
export const ButtonConnect = clx(HighlightButton, "w-fit hover:text-indigo-700 dark:hover:text-indigo-400");

export default function WalletButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <ButtonDisconnect onClick={() => disconnect()}>
        Disconnect
      </ButtonDisconnect>
    );
  return (
    <ButtonConnect onClick={() => open()}>
      Connect Wallet
    </ButtonConnect>
  );
}
