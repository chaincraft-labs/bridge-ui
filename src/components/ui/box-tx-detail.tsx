"use client"

import { clx } from "@/lib/utils/clx/clx-merge";
import { useState } from "react";
import { getExplorerUrl } from "@/context/bridge";

const Button = clx.button('text-xs sm:text-sm text-teal-500 dark:text-teal-200')

type ExpendsType = {
  [key: number]: boolean
}

type txDetail = {
  chainId: number,
  txHash: string,
  label: string
}

/**
 * A component that displays a list of transaction details with expandable transaction hashes.
 * It also provides buttons to copy the transaction hash and open it in a blockchain explorer.
 *
 * @param {txDetail[]} txDatas - An array of transaction detail objects.
 * @param {string} [className] - An optional CSS class name to apply to the component.
 * @return {JSX.Element} The rendered component.
 */
const BoxTxDetail = (
  {
    txDatas,
    className = 'bg-zinc-100 dark:bg-zinc-800'
  }: 
  {
    txDatas: txDetail[],
    className?: string
  }
): JSX.Element => {
  const [expends, setExpands] = useState<ExpendsType>({});
  
  /**
   *  Toggles the expansion state of a transaction detail item.
   *
   *  @param {number} index - The index of the transaction detail item to toggle.
   *  @return {void}
   */
  const handleClick = (index: number): void => {
    setExpands(prev => ({...prev, [index]: !expends[index]}))
  };


  /**
   *  Copies the transaction hash item to the clipboard.
   *
   *  @param {number} index - The index of the transaction detail item to copy.
   *  @return {void}
   */
  const handleCopy = async (index: number): Promise<void> => {
    const value = txDatas[index].txHash;

    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.warn("Failed to copy: ", err);
    }
  };


  /**
   *  Opens the transaction detail item in a blockchain explorer.
   *
   *  @param {number} index - The index of the transaction detail item to open.
   *  @return {void}
   */
  const handleExplorer = async (index: number): Promise<void> => {
    const value = txDatas[index].txHash;
    const explorerUrl = getExplorerUrl(txDatas[index].chainId)
    const url = `${explorerUrl}${value}`

    window.open(url, '_blank');
  };

  return (
    <div className={`flex flex-col gap-1 m-0 p-1 rounded ${className}`}>
      {txDatas.map((item: txDetail, index: number) => (
        <div key={index} className='flex justify-between items-center'>
          <div
            onClick={() => handleClick(Number(index))} 
            className="w-full text-xs sm:text-sm p-0 cursor-pointer"
          >
            <div className="flex gap-1">
              <span className="font-bold">{item.label}:</span>

              {expends[Number(index)] ? (
                <div className="break-all">{item.txHash}</div>
              ) : (
                <div>{item.txHash.slice(0, 6)}...{item.txHash.slice(-6)}</div>
              )}
            </div>

          </div>
          <div className="flex gap-1">            
            <Button 
              onClick={() => handleExplorer(Number(index))} 
              className="whitespace-nowrap p-1 px-2 text-xs sm:text-sm"
            >
              See Explorer
            </Button>

            <Button 
              onClick={() => handleCopy(Number(index))} 
              className="whitespace-nowrap p-1 px-2 text-xs sm:text-sm"
            >
              Copy
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BoxTxDetail