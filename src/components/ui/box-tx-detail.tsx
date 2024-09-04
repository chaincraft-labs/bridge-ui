"use client"

import { clx } from "@/lib/utils/clx/clx-merge";
import { useState } from "react";
import { getExplorerUrl } from "@/context/allfeat_bridge";

const Button = clx.button('text-xs sm:text-sm text-teal-500 dark:text-teal-200')

type ExpendsType = {
  [key: number]: boolean
}

type txDetail = {
  chainId: number,
  txHash: string,
  label: string
}

const BoxTxDetail = (
  {
    txDatas,
    className = 'bg-zinc-100 dark:bg-zinc-800'
  }: 
  {
    txDatas: txDetail[],
    className?: string
  }
) => {
  const [expends, setExpands] = useState<ExpendsType>({});
  
  const handleClick = (index: number): void => {
    setExpands(prev => ({...prev, [index]: !expends[index]}))
  };

  const handleCopy = async (index: number) => {
    const value = txDatas[index].txHash;

    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleExplorer = async (index: number) => {
    const value = txDatas[index].txHash;
    const explorerUrl = getExplorerUrl(txDatas[index].chainId)
    const url = `${explorerUrl}${value}`

    console.log(txDatas)

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