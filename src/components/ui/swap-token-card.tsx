"use client";


import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { clx } from "@/lib/utils/clx/clx-merge";
import { useAccount } from 'wagmi';
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { getUserBalances, saveOperationStatusData, getTokenPairsReverse, createBridgeTransfer, getAmountToShortDecimal, getAmountFromShortDecimal } from "@/context/allfeat_bridge";
import { BridgeTransferDetailType, OperationDetailType, TokenPairType } from '@/context/types';
import { useOperationDetail } from '@/context/operation-status';
import HighlightButton from '@/components/ui/highlight-button';
import { SelectTokens } from '@/components/ui/select-tokens';
import { ButtonConnect } from "@/components/ui/wallet-button";
import { Input } from "@/components/ui/input";


type FormData = {
  chainIdOrigin: number
  tokenOrigin: string
  chainIdTarget: number
  tokenTarget: string
  amountOrigin: number | undefined;
  amountTarget: number | undefined;
  address: `0x${string}`
}

type TokenBalances = {
  chainIdOrigin: number
  tokenOrigin: string
  balanceOrigin: number
  chainIdTarget: number
  tokenTarget: string
  balanceTarget: number
}

/**
 * 
 * @returns 
 */
export default function SwapTokenCard() {
  const ButtonTransfer = clx(HighlightButton, `py-6 text-xl from-teal-200 via-teal-100 to-teal-200 dark:from-teal-200 dark:via-teal-100 dark:to-teal-200 text-zinc-900 dark:text-zinc-900`)

  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { setOperationDetail } = useOperationDetail();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    chainIdOrigin: 0,
    chainIdTarget: 0,
    tokenOrigin: '',
    tokenTarget: '',
    amountOrigin: undefined,
    amountTarget: undefined,
    address: address as `0x${string}`
  });
  const [tokenBalances, setTokenBalances] = useState<TokenBalances>({
    chainIdOrigin: 0,
    tokenOrigin: '',
    balanceOrigin: 0,
    chainIdTarget: 0,
    tokenTarget: '',
    balanceTarget: 0
  });


  /**
   * Handles the submission of the form, executing a smart contract function 
   * and resetting the form data.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>} event 
   * - The event triggered by the form submission.
   * @return {void} No return value, updates component state asynchronously.
   */
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setError(null);
    
    try {
      // Execute smart contract function and get operationHash
      const bridgeTransfertDetail: BridgeTransferDetailType = await createBridgeTransfer(
        formData.address,
        formData.chainIdOrigin,
        formData.chainIdTarget,
        formData.tokenOrigin,
        getAmountFromShortDecimal(formData.amountOrigin ?? 0),
      )
      
      // Save operationHash
      const operationStatus: OperationDetailType = {
        chainIdOrigin: formData.chainIdOrigin,
        chainIdTarget: formData.chainIdTarget,
        amount: formData.amountOrigin ?? 0,
        tokenOrigin: formData.tokenOrigin as `0x${string}`,
        tokenTarget: formData.tokenTarget as `0x${string}`,
        address: formData.address as `0x${string}`,
        operationHash: bridgeTransfertDetail.operationHash ?? "0x",
        txCreateBridgeOperation: bridgeTransfertDetail.txCreateBridgeOperation ?? "0x",
        txDeposiFees: bridgeTransfertDetail.txDeposiFees ?? "0x",
      }
      
      // Save operationDetail to localStorage
      saveOperationStatusData(operationStatus);
      
      // update context
      setOperationDetail(operationStatus);
    } catch (error: any) {
      setError("An error occurred while submitting the form." + error.message);
      console.log("error : ", error.message, error.cause)
    } finally {
      reset()
    }
  };

  const reset = () => {

    // Reset form
    setFormData({
      chainIdOrigin: 0,
      chainIdTarget: 0,
      tokenOrigin: '',
      tokenTarget: '',
      amountOrigin: undefined,
      amountTarget: undefined,
      address: '0x'
    });

    setTokenBalances({
      chainIdOrigin: 0,
      tokenOrigin: '',
      balanceOrigin: 0,
      chainIdTarget: 0,
      tokenTarget: '',
      balanceTarget: 0
    });
  }

  /**
   * Sets the maximum amount in the form data and enables the submit button.
   *
   * @return {void} No return value, sets form data and submit button state instead.
   */
  const handleMaxAmount = (): void => {
    setFormData({
      ...formData,
      amountOrigin: tokenBalances.balanceOrigin,
      address: address as `0x${string}`,
    });
  } 


  /**
   * Checks if the form can be submitted based on token balances and amount.
   *
   * @return {void} No return value, sets setIsSubmitDisabled state instead.
   */
  const handleEnableSubmitButton = (): void => {
    if ( tokenBalances.balanceOrigin > 0 && 
      tokenBalances.balanceTarget > 0 && 
      formData.amountOrigin !== undefined &&
      formData.amountOrigin > 0
    ) {
      setIsSubmitDisabled(false)
    } else {
      setIsSubmitDisabled(true)
    }
  }


  /**
   * Handles the change event when a token is selected.
   * Calculates the decimal balance of the selected token and its pair,
   * and updates the token balances and form data accordingly.
   *
   * @param {string} token - The selected token
   * @return {void}
   */
  const handleChangeOnSelect = (token: any): void => {
    getUserBalances(address)
      .then((balances) => {
        // local process
        const tokenPair: TokenPairType = getTokenPairsReverse(token)        
        const tokenFormattedBalance = getAmountToShortDecimal(balances[token].balance)
        const tokenPairFormattedBalance = getAmountToShortDecimal(balances[tokenPair.target].balance)

        setTokenBalances({
          chainIdOrigin: Number(balances[token].chainId),
          tokenOrigin: token,
          balanceOrigin: Number(tokenFormattedBalance),
          chainIdTarget: Number(balances[tokenPair.target].chainId),
          tokenTarget: tokenPair.target,
          balanceTarget: Number(tokenPairFormattedBalance)
        })

        setFormData({
          ...formData,
          chainIdOrigin: Number(balances[token].chainId),
          chainIdTarget: Number(balances[tokenPair.target].chainId),
          tokenOrigin: token,
          tokenTarget: tokenPair.target,
          address: address as `0x${string}`,
        });

      })
      .catch(err => { console.log("error : ", err) })
  };


  /**
   * Handles the amount change event triggered by user input in a form field.
   *
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event - The event object containing information about the change.
   * @return {void}
   */
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    let amount: string | undefined | number = event.target.value
    if (amount === "") {
      amount = undefined
    } else {
      amount = Number(amount)
    }

    setFormData({
      ...formData,
      amountOrigin: amount,
      address: address as `0x${string}`,
    });
  };
  
  
  useEffect(() => {
    handleEnableSubmitButton()
  }, [formData.amountOrigin, formData.tokenOrigin])

  return (
    <div>
      <form className="text-sm md:text-md" onSubmit={handleSubmit}>
        <div className='p-2'>
          Transfer asset between <span className="font-bold">Allfeat </span> and blockchains. 
        </div>

        {/* Select token */}
        <div className="mt-8">
          <div className="relative">
            <SelectTokens 
              value={formData.tokenOrigin ?? "Select Token"}
              onChange={(e) => handleChangeOnSelect(e)} 
              className="w-full px-3 py-12 text-xl text-teal-400 dark:text-teal-200" 
              classNameContent="text-xl"/>

            <div className="text-sm absolute top-0 mt-2 ml-3">Transfer token</div>
          </div>       
        </div>

        {/* Amount */}        
        <div className="mt-1 relative">
          <Input onChange={handleChange} id="amount" name="amount" 
            value={formData.amountOrigin ?? ""}
            placeholder="0" type="number" 
            className="text-3xl px-2 pt-16 pb-8 relative min-w-[170px] text-teal-400 dark:text-teal-200"/>
      
          <div className="text-sm absolute top-0 p-2">Amount</div>

          {formData.tokenOrigin && (
            <div className='absolute top-0 right-0 w-fit p-2'>
              <div className='flex items-center gap-2'>
                <div className="text-sm flex gap-1">
                  <div>Balance: </div>
                  <div className='min-w-[40px] text-right'>{tokenBalances.tokenOrigin}</div> 
                  <div className={`min-w-[40px] ${tokenBalances.balanceOrigin === 0 ? "text-red-500" : ""}`}>
                    {tokenBalances.balanceOrigin}
                  </div>
                </div>
                
                {tokenBalances.balanceOrigin > 0 && (
                  <div role="button" onClick={handleMaxAmount} className="cursor-pointer text-sm p-0 w-fit text-teal-400 dark:text-teal-200 border-0">
                    max
                  </div>
                )}
              </div>
            
              <div className='flex items-center gap-2'>
                <div className="text-sm flex gap-1">
                  <div>Balance: </div>
                  <div className='min-w-[40px] text-right'>{tokenBalances.tokenTarget}</div>
                  <div className={`min-w-[40px] ${tokenBalances.balanceTarget === 0 ? "text-red-500" : ""}`}>
                    {tokenBalances.balanceTarget}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        {isConnected ? (
          <div className={`mt-4`}>
            <ButtonTransfer onClick={handleSubmit} type="button" disabled={isSubmitDisabled} className={`text-zinc-800 dark:text-zinc-800 }`}>
              Transfer
            </ButtonTransfer>
          </div>
        ): (
          <div className="flex flex-col mt-4">
            <p className="text-center">Please connect your wallet</p>
            <div className="justify-center">
            <ButtonConnect onClick={() => open()} className="text-xl px-2 py-4 min-w-[170px] w-full">
              Connect Wallet
            </ButtonConnect>
            </div>
          </div>
        )}

        {/* Eror */}
        {error && <div className="text-sm text-red-500">{error}</div>}
      </form>
    </div>  
  );
}
