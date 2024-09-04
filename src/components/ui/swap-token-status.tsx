"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import { useOperationDetail } from '@/context/operation-status';
import { OperationDetailType } from '@/context/types';
import { getOperationHashStatus, getOperationStatusData, getStatusLabel } from '@/context/allfeat_bridge';
import { OperationStatusLabels } from '@/constants';
import BoxTxDetail from '@/components/ui/box-tx-detail';
import ProgressBar from '@/components/ui/progress-bar';


type OperationStatusDataType = {
  operationHash?: string
  txCreateBridgeOperation?: string
  txDeposiFees?: string
  chainIdOrigin?: number
  chainIdTarget?: number
}

const RETRY_MAX = 50
const DURATION_PER_INTERVAL = 1000


const SwapTokenStatus = () => {

  const { address, isConnected } = useAccount();
  const { operationDetail } = useOperationDetail();

  const [operationHash, setOperationHash] = useState<string|null>()
  const [status, setStatus] = useState<number | null>(null)
  const [duration, setDuration] = useState(0)
  const [retryCount, setRetryCount] = useState(0)
  const [taskCompleted, setTaskCompleted] = useState(false)
  const [showProgessBar, setShowProgessBar] = useState(false)
  const [showError, setShowError] = useState(false)
  const [operationStatusData, setOperationStatusData] = useState<OperationDetailType | null>()

  const handleDuration = (): void => {
    if (duration === 0) 
      setDuration(prev => prev + DURATION_PER_INTERVAL) // 10 seconds
  }

  const isStatusInvalid = (status: number | null): boolean => {
    if (!status || [0, 9].includes(status)) 
      return true
    return false
  }
  
  const isStatusCompleted = (status: number | null): boolean => {
    if (status && [8].includes(status))
      return true
    return false
  }


  const handleGetStatusName = (status: number | null): string | null => {
    if ( status)
      return getStatusLabel(status)
    return ""
  }
  

  const getOperationDetail = (): OperationStatusDataType => {
    const operationStatusData: OperationDetailType | null = getOperationStatusData()

    if (operationStatusData) {
      setOperationHash(operationStatusData?.operationHash)
      setOperationStatusData(operationStatusData)
      
      return {
        operationHash: operationStatusData?.operationHash, 
        txCreateBridgeOperation: operationStatusData?.txCreateBridgeOperation, 
        txDeposiFees: operationStatusData?.txDeposiFees, 
        chainIdOrigin: operationStatusData?.chainIdOrigin,
        chainIdTarget: operationStatusData?.chainIdTarget,
      }
    } else {
      return {}
    }
  }

  const resetState = useCallback(() => {
    setDuration(0);
    setRetryCount(0);
    setTaskCompleted(true);
    setShowError(false);
  }, []);

  const initState = () => {
    setDuration(0);
    setStatus(null);
    setRetryCount(0);
    setTaskCompleted(false);
  }

  const getOperationHashStatusMock = async (
    address: `0x${string}`, 
    chainIdOrigin: number, 
    operationHash: string
  ): Promise<number> => {
    
    if (retryCount === 1 && status === 0) {
      return 1
    } else if (retryCount === 1 && status === 1) {
      return 2
    } else if (retryCount === 1 && status === 2) {
      return 3
    } else if (retryCount === 1 && status === 3) {
      return 4
    } else if (retryCount === 1 && status === 4) {
      return 5
    } else if (retryCount === 1 && status === 5) {
      return 6
    } else if (retryCount === 1 && status === 6) {
      return 7
    } else if (retryCount === 1 && status === 7) {
      return 8
    } 
    return status ?? 0
  }
 
  
  const manageOperationStatus = useCallback(async (immediate = false) => {
    try {
      handleDuration()
      const operationDetail: OperationStatusDataType = getOperationDetail()

      // check we have 2 tx hash 
      if (operationDetail.txCreateBridgeOperation === '0x' || operationDetail.txDeposiFees === '0x') {
        setShowError(true)
        // setShowProgessBar(true) // for testing only
        resetState()
        return
      }
      setShowProgessBar(true)

      if(!operationDetail.operationHash || !operationDetail.chainIdOrigin || !operationDetail.chainIdTarget) {
        resetState()
        return
      }

      // Get status from blockchain
      // const newStatus = await getOperationHashStatusMock(
      //   address as `0x${string}`,
      //   operationDetail.chainIdOrigin,
      //   operationDetail.operationHash
      // )

      const newStatus = await getOperationHashStatus(
        address as `0x${string}`,
        operationDetail.chainIdOrigin,
        operationDetail.chainIdTarget,
        operationDetail.operationHash,
        status ?? 0,
      )
      
      if (status === null || newStatus !== null && newStatus > status) {
        setStatus(newStatus);
      }
      const statusCompleted = isStatusCompleted(newStatus)
      const statusInvalid = isStatusInvalid(newStatus)

      if(statusCompleted) {
        resetState()
        return
      }
      
      if(statusInvalid) {
        // Reset and leave only after reached the max number of retries
        if (retryCount >= RETRY_MAX) {
          resetState()
          return
        }
      }

      if (newStatus === status) setRetryCount((prev) => prev + 1); 
      else setRetryCount(0);

      if (!immediate && retryCount >= RETRY_MAX) {
        resetState()
        return;
      }

    } catch (error) {
      console.log("error", error)
      resetState()
    }

  }, [status, retryCount, duration])

  useEffect(() => {        
    if (typeof window !== "undefined" && isConnected && !taskCompleted) {
      const intervalId = setInterval(() => manageOperationStatus(), duration)
      return () => clearInterval(intervalId);
    };
  }, [operationDetail, getOperationHashStatusMock, taskCompleted]);

  useEffect(() => {
    initState()
  }, [operationDetail]);


  return (
    <div className='w-full text-sm md:text-md lg:text-base min-w-[350px]'>    
      
      {(showProgessBar && operationHash && operationStatusData?.txCreateBridgeOperation && operationStatusData?.txDeposiFees) && (
        <>         
          {/* Show operation status */}
          <div className='flex flex-col mt-0 pt-0 rounded bg-zinc-100 dark:bg-zinc-800'>
            <div className='w-full p-1 pt-3 text-xs sm:text-sm'>
              
              Transfer<span className='font-bold'> {operationStatusData?.tokenOrigin} </span> 
              to<span className='font-bold'> {operationStatusData?.tokenTarget} </span> 
              amount<span className='font-bold'> {operationStatusData?.amount} </span>
              
            </div>
            
            <div className='w-full p-1 pt-3'>
              <ProgressBar 
                data={[1, 2, 3, 4, 5, 6, 7, 8]} 
                dataLabels={OperationStatusLabels}
                status={status ?? 0}
              />
            </div>

            {/* Show operation status label */}
            <div className="mt-4 w-full text-xs sm:text-sm p-2 text-right">
              {handleGetStatusName(status)}
            </div>
          </div>

          {/* SHow operation hash */}
          <div className='border-t border-zinc-200 dark:border-zinc-700'>
            <BoxTxDetail 
              txDatas={[
                {
                  chainId: operationStatusData.chainIdOrigin,
                  txHash: operationStatusData.txCreateBridgeOperation,
                  label: 'Deposit token Tx',
                },
                {
                  chainId: operationStatusData.chainIdTarget,
                  txHash: operationStatusData.txDeposiFees,
                  label: 'Deposit fees Tx',
                }
              ]}
            />
          </div>

        </>
      )}

      {showError && (
        <div className='flex flex-col mt-1 pt-0 rounded bg-zinc-100 dark:bg-zinc-800'>
          <div className='w-full p-1 pt-3 text-red-500'>
            Error swapping token
          </div>
        </div>
      )}
    </div>
  )
}

export default SwapTokenStatus
