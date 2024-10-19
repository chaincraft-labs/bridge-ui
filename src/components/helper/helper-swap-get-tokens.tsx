"use client"

import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { GetBalanceReturnType } from 'wagmi/actions'
import { createSignMessage } from '@/context'
import { 
  createBridgeOperation, 
  createBridgeTransfer, 
  depositFees, 
  getAllTokens, 
  getAmountFromShortDecimal, 
  getAmountToShortDecimal, 
  getAuthorizedTokenNamesListByChainId, 
  getAvailableNonceForUser, 
  getChainIds, 
  getExplorerUrl, 
  getOperationHash, 
  getOperationHashStatus, 
  getStatusLabel, 
  getTokens, 
  getUserBalance, 
  getUserBalances, 
  isNativeToken, 
  prepareBridgeRequest 
} from '@/context/bridge'
import { 
  BridgeRequestPreparedType, 
  BridgeTransferDetailType, 
  TokenType, 
  UserBalancesType 
} from '@/context/types'

const PATH = 'context/bridge'

const HelperSwapGetTokens = () => {
  const { address } = useAccount();

  // get chain ids
  const [chainIds, setChainIds] = useState<number[]>([])
  const [chainId, setChainId] = useState<number>(0)

  // Get tokens
  const [tokens, setTokens] = useState<TokenType[]>([])
  const [tokens2, setTokens2] = useState<TokenType[]>([])
  const [addressInput, setAddressInput] = useState<`0x${string}`>("0x")

  // User balances
  const [userBalances, setUserBalances] = useState<UserBalancesType>({})
  // User balance
  const [userBalanceAddressInput, setUserBalanceAddressInput] = useState<`0x${string}`>("0x")
  const [userBalanceChainIdInput, setUserBalanceChainIdInput] = useState<number>(0)
  const [userBalanceTokenAddressInput, setUserBalanceTokenAddressInput] = useState<`0x${string}`>("0x")
  const [userBalance, setUserBalance] = useState<GetBalanceReturnType>()

  // operation status
  const [operationStatusAccountAddressInput, setOperationStatusAccountAddressInput] = useState<`0x${string}`>('0x')
  const [operationStatusOriginChainIdInput, setOperationStatusOriginChainIdInput] = useState<number>(0)
  const [operationStatusTargetChainIdInput, setOperationStatusTargetChainIdInput] = useState<number>(0)
  const [operationStatusOperationHashInput, setOperationStatusOperationHashInput] = useState<`0x${string}`>('0x')
  const [operationStatusPreviousStatus, setOperationStatusPreviousStatus] = useState<number>(0)
  const [operationStatus, setOperationStatus] = useState<number | null>()

  // Get user nonce
  const [nonce, setNonce] = useState<bigint | null>(null)
  const [nonceAccountInput, setNonceAccountInput] = useState<`0x${string}`>("0x")
  const [nonceChainIdInput, setNonceChainIdInput] = useState<number>(0)

  // Get operationHash
  const [operationHash, setOperationHash] = useState<`0x${string}`>("0x")
  const [operationHashAccountInput, setOperationHashAccountInput] = useState<`0x${string}`>("0x")
  const [operationHashOriginChainIdInput, setOperationHashOriginChainIdInput] = useState<number>(0)
  const [operationHashTargetChainIdInput, setOperationHashTargetChainIdInput] = useState<number>(0)
  const [operationHashTokenNameInput, setOperationHashTokenNameInput] = useState<string>('')
  const [operationHashAmountInput, setOperationHashAmountInput] = useState<bigint>(0n)
  const [operationHashNonceInput, setOperationHashNonceInput] = useState<bigint>(0n)

  // Sign message
  const [signedMessage, setSignedMessage] = useState<`0x${string}`>("0x")
  const [signMessageAccountInput, setSignMessageAccountInput] = useState<`0x${string}`>("0x")
  const [signMessageMessageInput, setSignMessageMessageInput] = useState<any>("0x")

  // Prepare create bridge operation
  const [bridgeOperationPrepared, setBridgeOperationPrepared] = useState<BridgeRequestPreparedType>({
    nonce: 0n,
    operationHash: "0x",
    signedMessage: "0x"
  })
  const [prepareBridgeOperAccountInput, setPrepareBridgeOperAccountInput] = useState<`0x${string}`>("0x")
  const [prepareBridgeOperOriginChainIdInput, setPrepareBridgeOperOriginChainIdInput] = useState<number>(0)
  const [prepareBridgeOperTargetChainIdInput, setPrepareBridgeOperTargetChainIdInput] = useState<number>(0)
  const [prepareBridgeOperTokenNameInput, setPrepareBridgeOperTokenNameInput] = useState<string>('')
  const [prepareBridgeOperAmountInput, setPrepareBridgeOperAmountInput] = useState<bigint>(0n)

  // Create bridge operation
  const [bridgeOperTx, setBridgeOperTx] = useState<`0x${string}`>("0x")
  const [bridgeOperAccountInput, setBridgeOperAccountInput] = useState<`0x${string}`>("0x")
  const [bridgeOperOriginChainIdInput, setBridgeOperOriginChainIdInput] = useState<number>(0)
  const [bridgeOperTargetChainIdInput, setBridgeOperTargetChainIdInput] = useState<number>(0)
  const [bridgeOperTokenSymbolInput, setBridgeOperTokenSymbolInput] = useState<string>('')
  const [bridgeOperTokenNameInput, setBridgeOperTokenNameInput] = useState<string>('')
  const [bridgeOperAmountInput, setBridgeOperAmountInput] = useState<bigint>(0n)
  const [bridgeOperNonceInput, setBridgeOperNonceInput] = useState<bigint>(0n)
  const [bridgeOperSignedMessageInput, setBridgeOperSignedMessageInput] = useState<`0x${string}`>("0x")


  // Deposit Fees
  const [depositFeesTx, setDepositFeesTx] = useState<`0x${string}`>("0x")
  const [depositFeesOriginChainIdInput, setDepositFeesOriginChainIdInput] = useState<number>(0)
  const [depositFeesTargetChainIdInput, setDepositFeesTargetChainIdInput] = useState<number>(0)
  const [depositFeesAmountInput, setDepositFeesAmountInput] = useState<bigint>(0n)
  const [depositFeesOperationHashInput, setDepositFeesOperationHashInput] = useState<`0x${string}`>("0x")

  // getAuthorizedTokenNamesListByChainId
  const [authorizedTokens, setAuthorizedTokens] = useState<string[]>([])

  // Create bridge transfer
  const [createBridgeTransferAddress, setCreateBridgeTransferAddress] = useState<`0x${string}`>("0x")
  const [createBridgeTransferOriginChainId, setCreateBridgeTransferOriginChainId] = useState(0)
  const [createBridgeTransferTargetChainId, setCreateBridgeTransferTargetChainId] = useState(0)
  const [createBridgeTransferTokenName, setCreateBridgeTransferTokenName] = useState("")
  const [createBridgeTransferAmount, setCreateBridgeTransferAmount] = useState<bigint>(0n)
  const [createBridgeTransferTx, setCreateBridgeTransferTx] = useState<BridgeTransferDetailType>({})

  // Convert amount short dec and long number
  const [convertShortUserBalance, setConvertShortUserBalance] = useState(0)
  const [convertLongUserBalance, setConvertLongUserBalance] = useState<bigint>(0n)
  const [convertFromShortUserBalance, setConvertFromShortUserBalance] = useState<bigint>(0n)
  const [convertFromLongUserBalance, setConvertFromLongUserBalance] = useState(0)

  // Explorer Url
  const [explorerUrlChainId, setExplorerUrlChainId] = useState(0)
  const [explorerUrl, setExplorerUrl] = useState("")

  // Is native token
  const [isNativeTokenResult, setIsNativeTokenResult] = useState(false)
  const [tokenName, setTokenName] = useState("")
  

  const handleGetChainIds = () => {
    setChainIds(getChainIds())
  }

  const handleGetAllTokens = () => {
    getAllTokens()
      .then((tokens) => { setTokens(tokens) })
      .catch(err => { console.log("error : ", err) })
  }

  const handleGetTokens = () => {
    if (chainId === undefined) { return }

    getTokens(chainId)
      .then((tokens) => { setTokens2(tokens) })
      .catch(err => { console.log("error : ", err) })
  }

  const handleGetUserBalances = () => {
    getUserBalances(addressInput).then((userBalances) => { setUserBalances(userBalances) })
  }

  const handleGetUserBalances2 = () => {
    getUserBalance(userBalanceAddressInput, userBalanceChainIdInput, userBalanceTokenAddressInput).then((userBalances: GetBalanceReturnType | void) => {
      console.log("userBalances : ", userBalances)
      if (userBalances) { setUserBalance(userBalances) }
    })
  }


  const handleGetOperationHashStatus = () => {
    console.log('call handleGetOperationHashStatusv2')

    getOperationHashStatus(
      operationStatusAccountAddressInput,
      operationStatusOriginChainIdInput,
      operationStatusTargetChainIdInput,
      operationStatusOperationHashInput,
      operationStatusPreviousStatus
    )
      .then((operationStatus) => {
        if (!operationStatus) { setOperationStatus(-1) }
        else { setOperationStatus(operationStatus) }
      })
      .catch(err => {
        console.log("error : ", err)
        setOperationStatus(0)
      })
  }


  const handleGetAvailableNonceForUser = () => {
    console.log('call handleGetAvailableNonceForUser')

    getAvailableNonceForUser(
      nonceAccountInput,
      nonceChainIdInput,
    )
      .then((nonce) => {
        setNonce(nonce)
      })
      .catch(err => {
        console.log("error : ", err)
        setNonce(null)
      })
  }

  const fetchGetOperationHash = () => {
    console.log('call getOperationHash')

    getOperationHash(
      operationHashAccountInput,
      operationHashOriginChainIdInput,
      operationHashTargetChainIdInput,
      operationHashTokenNameInput,
      operationHashAmountInput,
      operationHashNonceInput,
    )
      .then((operationHash) => {
        if (operationHash) { setOperationHash(operationHash) }
        else { setOperationHash("0x") }
      })
      .catch(err => {
        console.log("error : ", err)
        setOperationHash("0x")
      })
  }

  const handleCreateSignMessage = () => {
    console.log('call createSignMessage')

    createSignMessage(
      signMessageAccountInput,
      signMessageMessageInput,
    )
      .then((signedMessage) => {
        if (signedMessage) { setSignedMessage(signedMessage) }
        else { setSignedMessage("0x") }
      })
      .catch(err => {
        console.log("error : ", err)
        setSignedMessage("0x")
      })
  }


  const handlePrepareCreateOperationBridge = () => {
    console.log('call handlePrepareCreateOperationBridge')

    prepareBridgeRequest(
      prepareBridgeOperAccountInput,
      prepareBridgeOperOriginChainIdInput,
      prepareBridgeOperTargetChainIdInput,
      prepareBridgeOperTokenNameInput,
      prepareBridgeOperAmountInput,
    )
      .then((operationPrepared) => {
        if (operationPrepared) { setBridgeOperationPrepared(operationPrepared) }
        else { setBridgeOperationPrepared({ nonce: 0n, operationHash: "0x", signedMessage: "0x" }) }
      })
      .catch(err => {
        console.log("error : ", err)
        setBridgeOperationPrepared({ nonce: 0n, operationHash: "0x", signedMessage: "0x" })
      })
  }

  const handleCreateBridgeOperation = () => {
    console.log('call handleCreateBridgeOperation')

    createBridgeOperation({
      address: bridgeOperAccountInput,
      originChainId: bridgeOperOriginChainIdInput,
      targetChainId: bridgeOperTargetChainIdInput,
      tokenSymbol: bridgeOperTokenSymbolInput,
      tokenName: bridgeOperTokenNameInput,
      amount: bridgeOperAmountInput,
      nonce: bridgeOperNonceInput,
      signedMessage: bridgeOperSignedMessageInput,
    })
      .then((tx) => {
        if (tx) { setBridgeOperTx(tx) }
        else { setBridgeOperTx("0x") }
      })
      .catch(err => {
        console.log("error : ", err)
        setBridgeOperTx("0x")
      })
  }

  const handleDepositFees = () => {
    console.log('call handleDepositFees')

    depositFees({
      originChainId: depositFeesOriginChainIdInput,
      targetChainId: depositFeesTargetChainIdInput,
      amount: depositFeesAmountInput,
      operationHash: depositFeesOperationHashInput,
    })
      .then((tx) => {
        if (tx) { setDepositFeesTx(tx) }
        else { setDepositFeesTx("0x") }
      })
      .catch(err => {
        console.log("error : ", err)
        setDepositFeesTx("0x")
      })
  }


  const fetchGetAuthorizedTokenNamesListByChainId = () => {
    console.log('call getAuthorizedTokenNamesListByChainId')

    getAuthorizedTokenNamesListByChainId(
      chainId
    )
      .then((tokens) => {
        if (tokens) { setAuthorizedTokens(tokens) }
        else { setAuthorizedTokens([]) }
      })
      .catch(err => {
        console.log("error : ", err)
        setAuthorizedTokens([])
      })
  }

  const handleCreateBridgeTransfer = () => {
    console.log('call handleCreateBridgeTransfer')

    createBridgeTransfer(
      createBridgeTransferAddress,
      createBridgeTransferOriginChainId,
      createBridgeTransferTargetChainId,
      createBridgeTransferTokenName,
      createBridgeTransferAmount
    )
      .then((tx) => {
        if (tx) { setCreateBridgeTransferTx(tx) }
        else { setCreateBridgeTransferTx({}) }
      })
      .catch(err => {
        console.log("error : ", err)
        setCreateBridgeTransferTx({})
      })
  }

  const handleConvertTokenAmount = () => {
    console.log('call handleConvertTokenAmount')
    setConvertFromLongUserBalance(getAmountToShortDecimal(Number(convertLongUserBalance)))
    setConvertFromShortUserBalance(getAmountFromShortDecimal(convertShortUserBalance))
  }

  const handleGetExplorerUrl = () => {
    setExplorerUrl(getExplorerUrl(explorerUrlChainId) ?? "")
  }


  const handleIsNativeToken = () => {
    console.log('call handleIsNativeToken')
      isNativeToken(tokenName)
      .then((result) => {
        setIsNativeTokenResult(result)
      })
  }

  return (
    <div className='mt-6 mb-12' >
      <h1 className='p-1 text-xl'>HelperSwapGetTokens</h1>

      {/* getChainIds */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getChainIds</h2>
        <button onClick={handleGetChainIds} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>getChainIds</button>
        <div>chainIds: {chainIds.join(',')}</div>
      </div>

      {/* getExplorerUrl */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getExplorerUrl</h2>

        <div className='my-1 text-xs break-all'>chainID : 1337 | 440</div>

        <input type="number" onChange={e => setExplorerUrlChainId(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='chainId e.g. 440' />

        <button onClick={handleGetExplorerUrl} className='my-1 rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>getExplorerUrl</button>

        <div className='break-all text-xs'>explorerUrl: {explorerUrl}</div>
      </div>

      {/* getAllTokens */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getAllTokens</h2>
        <button onClick={handleGetAllTokens} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>getAllTokens</button>
        <div>
          <div className='flex flex-col text-xs'>
            {tokens.map((token, index) =>
              <div key={index} className='p-1 flex flex-col rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 w-full  break-all'>
                <div><span className='pr-1 font-bold'>chainId</span>{token.chainId}</div>
                <div><span className='pr-1 font-bold'>tokenName</span>{token.tokenName}</div>
                <div><span className='pr-1 font-bold'>tokenAddress</span>{token.tokenAddress}</div>
                <div><span className='pr-1 font-bold'>label</span>{token.label}</div>
              </div>

            )}</div>
        </div>
      </div>


      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getTokens</h2>

        <input type="text" onChange={e => setChainId(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='chainId e.g. 440' />

        <button onClick={handleGetTokens} className='my-1 rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>handleGetTokens</button>

        <div className='mt-1 flex flex-col text-xs'>
          {tokens2.map((token, index) =>
            <div key={index} className='p-1 flex flex-col rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 w-full break-all'>
              <div><span className='pr-1 font-bold'>chainId</span>{token.chainId}</div>
              <div><span className='pr-1 font-bold'>tokenName</span>{token.tokenName}</div>
              <div><span className='pr-1 font-bold'>tokenAddress</span>{token.tokenAddress}</div>
              <div><span className='pr-1 font-bold'>label</span>{token.label}</div>
            </div>

          )}
        </div>

      </div>

      {/* getUserBalances */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getUserBalances</h2>

        <div className='my-1 text-xs break-all'>{address}</div>

        <input type="text" onChange={e => setAddressInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='Wallet address 0x' />

        <button onClick={handleGetUserBalances} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>getUserBalances</button>
        <div>
          {Object.keys(userBalances).map((key, index) =>
            <div key={index} className='flex flex-col p-1 text-xs md:text-base rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 w-full break-all'>
              <div><span className='pr-1 font-bold'>chainId</span>{key}</div>
              <div><span className='pr-1 font-bold'>balance</span>{userBalances[key].balance}</div>
            </div>
          )}
        </div>
      </div>

      {/* getUserBalance */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getUserBalance</h2>

        <div className='my-1 text-xs break-all'>addr : {address}</div>
        <div className='my-1 text-xs break-all'>chainID : 440</div>
        <div className='my-1 text-xs break-all'>token : 0x763D958Bd2a480A986f9393aE0E7Ce126b037bc6</div>

        <input type="text" onChange={e => setUserBalanceAddressInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='Wallet address 0x' />
        <input type="text" onChange={e => setUserBalanceChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='ChainID e.g. 440' />
        <input type="text" onChange={e => setUserBalanceTokenAddressInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='Token address 0x' />

        <button onClick={handleGetUserBalances2} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>getUserBalance</button>

        <div className='flex flex-col p-1 text-xs md:text-base rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 w-full break-all'>

          <div><span className='pr-1 font-bold'>Symbol</span>{userBalance?.symbol}</div>
          <div><span className='pr-1 font-bold'>balance</span>{Number(userBalance?.value)}</div>
          <div><span className='pr-1 font-bold'>decimals</span>{userBalance?.decimals}</div>
        </div>
      </div>


      {/* getOperationHashStatus */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getOperationHashStatus</h2>

        <div className='my-1 text-xs break-all'>addr : {address}</div>
        <div className='my-1 text-xs break-all'>chainID : 440 | 1337</div>
        <div className='my-1 text-xs break-all'>operation hash : 0xa30aa32983edf97939fdbaf454067fc459cd3b43f8a374cc899ac83cf0ce41fa</div>
        <div className='my-1 text-xs break-all'>previousStatus : 0...8</div>

        <button onClick={handleGetOperationHashStatus} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>getOperationHashStatusv2</button>

        <input type="text" onChange={e => setOperationStatusAccountAddressInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='account address 0x' />
        <input type="number" onChange={e => setOperationStatusOriginChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='origin chain id' />
        <input type="number" onChange={e => setOperationStatusTargetChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='target chain id' />
        <input type="text" onChange={e => setOperationStatusOperationHashInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='operation hash 0x' />
        <input type="number" onChange={e => setOperationStatusPreviousStatus(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='previous status' />

        <div>status: {operationStatus}</div>
        <div>status: {getStatusLabel(operationStatus ?? 0) ?? ""}</div>
      </div>

      {/* getAvailableNonceForUser */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getAvailableNonceForUser</h2>

        <div className='my-1 text-xs break-all'>addr : {address}</div>
        <div className='my-1 text-xs break-all'>chainID : 440 | 1337</div>

        <input type="text" onChange={e => setNonceAccountInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='account address 0x' />
        <input type="number" onChange={e => setNonceChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='origin chain id' />

        <button onClick={handleGetAvailableNonceForUser} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>getAvailableNonceForUser</button>
        <div>nonce: {String(nonce)}</div>
      </div>

      {/* getOperationHash */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getOperationHash</h2>

        <div className='my-1 text-xs break-all'>addr : {address}</div>
        <div className='my-1 text-xs break-all'>chainID : 440 | 1337</div>
        <div className='my-1 text-xs break-all'>Token name ethereum | harmonie: </div>
        <div className='my-1 text-xs break-all'>amount : 1_000_000_000_000_000n </div>
        <div className='my-1 text-xs break-all'>nonce : 1 </div>

        <input type="text" onChange={e => setOperationHashAccountInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='account address 0x' />
        <input type="number" onChange={e => setOperationHashOriginChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='origin chain id' />
        <input type="number" onChange={e => setOperationHashTargetChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='target chain id' />
        <input type="text" onChange={e => setOperationHashTokenNameInput(e.target.value)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='token name' />
        <input type="number" onChange={e => setOperationHashAmountInput(BigInt(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='amount (bigint)' />
        <input type="number" onChange={e => setOperationHashNonceInput(BigInt(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='nonce' />

        <button onClick={fetchGetOperationHash} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>getOperationHash</button>
        <div className='text-xs break-all'><span className='font-bold'>operationHash: </span>{operationHash}</div>
      </div>

      {/* createSignMessage */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/createSignMessage</h2>

        <div className='my-1 text-xs break-all'>addr : {address}</div>
        <div className='my-1 text-xs break-all'>message: 0xa30aa32983edf97939fdbaf454067fc459cd3b43f8a374cc899ac83cf0ce41fa</div>

        <input type="text" onChange={e => setSignMessageAccountInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='account address 0x' />
        <input type="text" onChange={e => setSignMessageMessageInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='message 0x' />
        <button onClick={handleCreateSignMessage} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>createSignMessage</button>

        <div className='text-xs break-all'>
          <span className='font-bold'>signedMessage: </span>{signedMessage}
        </div>
      </div>

      {/* prepareCreateOperationBridge */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/prepareCreateOperationBridge</h2>

        <div className='my-1 text-xs break-all'>addr : {address}</div>
        <div className='my-1 text-xs break-all'>chainID : 440 | 1337</div>
        <div className='my-1 text-xs break-all'>Token name ethereum | harmonie: </div>
        <div className='my-1 text-xs break-all'>amount : 1_000_000_000_000_000n </div>

        <input type="text" onChange={e => setPrepareBridgeOperAccountInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='account address 0x' />
        <input type="number" onChange={e => setPrepareBridgeOperOriginChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='origin chain id' />
        <input type="number" onChange={e => setPrepareBridgeOperTargetChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='target chain id' />
        <input type="text" onChange={e => setPrepareBridgeOperTokenNameInput(e.target.value)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='token name' />
        <input type="number" onChange={e => setPrepareBridgeOperAmountInput(BigInt(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='amount (bigint)' />

        <button onClick={handlePrepareCreateOperationBridge} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>prepareCreateOperationBridge</button>
        <div className='text-xs break-all'>nonce: {Number(bridgeOperationPrepared.nonce)}</div>
        <div className='text-xs break-all'>operationHash: {bridgeOperationPrepared.operationHash}</div>
        <div className='text-xs break-all'>signedMessage: {bridgeOperationPrepared.signedMessage}</div>
      </div>


      {/* createBridgeOperation */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/createBridgeOperation</h2>

        <div className='my-1 text-xs break-all'>addr : {address}</div>
        <div className='my-1 text-xs break-all'>chainID : 440 | 1337</div>
        <div className='my-1 text-xs break-all'>Token symbol : ETH | HMY | hbETH | gbHMY</div>
        <div className='my-1 text-xs break-all'>Token name ethereum | harmonie: </div>
        <div className='my-1 text-xs break-all'>amount : 1_000_000_000_000_000n </div>
        <div className='my-1 text-xs break-all'>nonce : 1 </div>
        <div className='my-1 text-xs break-all'>signed message : 0x627e2c7068c214c433b0cb4b038d999466213ecddbac11a1ef925214ce8ec4f87ae4bc540328cf356109257e0c277d72252a3ad644af2fcf3dfe44c822d348f61b</div>

        <input type="text" onChange={e => setBridgeOperAccountInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='account address 0x' />
        <input type="number" onChange={e => setBridgeOperOriginChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='origin chain id' />
        <input type="number" onChange={e => setBridgeOperTargetChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='target chain id' />
        <input type="text" onChange={e => setBridgeOperTokenSymbolInput(e.target.value)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='token symbol' />
        <input type="text" onChange={e => setBridgeOperTokenNameInput(e.target.value)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='token name' />
        <input type="number" onChange={e => setBridgeOperAmountInput(BigInt(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='amount (bigint)' />
        <input type="number" onChange={e => setBridgeOperNonceInput(BigInt(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='nonce (bigint)' />
        <input type="text" onChange={e => setBridgeOperSignedMessageInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='signed message' />

        <button onClick={handleCreateBridgeOperation} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>createBridgeOperation</button>
        <div className='text-xs break-all'>Tx: {bridgeOperTx}</div>

      </div>


      {/* depositFees */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/depositFees</h2>

        <div className='my-1 text-xs break-all'>chainID : 440 | 1337</div>
        <div className='my-1 text-xs break-all'>amount : 1_000_000_000_000_000n </div>
        <div className='my-1 text-xs break-all'>operation hash: 0xa30aa32983edf97939fdbaf454067fc459cd3b43f8a374cc899ac83cf0ce41fa</div>

        <input type="number" onChange={e => setDepositFeesOriginChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='origin chain id' />
        <input type="number" onChange={e => setDepositFeesTargetChainIdInput(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='target chain id' />
        <input type="number" onChange={e => setDepositFeesAmountInput(BigInt(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='amount (bigint)' />
        <input type="text" onChange={e => setDepositFeesOperationHashInput(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='operation hash 0x' />

        <button onClick={handleDepositFees} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>depositFees</button>
        <div className='text-xs break-all'>Tx: {depositFeesTx}</div>

      </div>

      {/* getAuthorizedTokenNamesListByChainId */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getAuthorizedTokenNamesListByChainId</h2>

        <div className='my-1 text-xs break-all'>chainID : 440 | 1337</div>

        <input type="number" onChange={e => setChainId(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='chain id' />

        <button onClick={fetchGetAuthorizedTokenNamesListByChainId} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>getAuthorizedTokenNamesListByChainId</button>
        <div className='text-xs break-all'>Tokens: {authorizedTokens.join(', ')}</div>

      </div>


      {/* createBridgeTransfer */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/createBridgeTransfer</h2>

        <div className='my-1 text-xs break-all'>addr : {address}</div>
        <div className='my-1 text-xs break-all'>chainID : 440 | 1337</div>
        <div className='my-1 text-xs break-all'>amount : 1_000_000_000_000_000n </div>
        <div className='my-1 text-xs break-all'>Token name ETH | HMY | hbETH | gbHMY: </div>

        <input type="text" onChange={e => setCreateBridgeTransferAddress(e.target.value as `0x${string}`)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='account address 0x' />
        <input type="number" onChange={e => setCreateBridgeTransferOriginChainId(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='origin chain id' />
        <input type="number" onChange={e => setCreateBridgeTransferTargetChainId(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='target chain id' />
        <input type="number" onChange={e => setCreateBridgeTransferAmount(BigInt(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='amount (bigint)' />
        <input type="text" onChange={e => setCreateBridgeTransferTokenName(e.target.value)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='token name' />

        <button onClick={handleCreateBridgeTransfer} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>createBridgeTransfer</button>

        <div className='text-xs break-all'>txCreateBridgeOperation: {createBridgeTransferTx.txCreateBridgeOperation}</div>
        <div className='text-xs break-all'>txDeposiFees: {createBridgeTransferTx.txDeposiFees}</div>
        <div className='text-xs break-all'>operationHash: {createBridgeTransferTx.operationHash}</div>
      </div>

      {/* getAmountToShortDecimal | getAmountFromShortDecimal */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/getAmountToShortDecimal | getAmountFromShortDecimal</h2>

        <div className='my-1 text-xs break-all'>long (wei) : 1_000_000_000_000_000_000n = 1 (Ether)</div>
        <div className='my-1 text-xs break-all'>short (Ether) : 1 = 1_000_000_000_000_000_000n (wei) </div>

        <input type="number" onChange={e => setConvertLongUserBalance(BigInt(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='origin chain id' />
        <input type="number" onChange={e => setConvertShortUserBalance(Number(e.target.value))} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='target chain id' />


        <button onClick={handleConvertTokenAmount} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>ConvertTokenAmount</button>

        <div className='text-xs break-all'>convertFromLongUserBalance: {String(convertLongUserBalance)} == {String(convertFromLongUserBalance)}</div>
        <div className='text-xs break-all'>convertFromShortUserBalance: {String(convertShortUserBalance)} == {String(convertFromShortUserBalance)}</div>
      </div>

      {/* isNativeToken */}
      <div className='p-2 mt-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'>
        <h2 className='p-1 text-base'>{PATH}/isNativeToken</h2>

        <div className='my-1 text-xs break-all'>tokenName : ETH | HMY | hbETH | gbHMY</div>

        <input type="text" onChange={e => setTokenName(e.target.value)} className='p-2 rounded border border-zinc-200 dark:border-zinc-700 my-1 text-xs w-full' placeholder='tokenName' />

        <button onClick={handleIsNativeToken} className='rounded px-2 py-1 bg-zinc-700 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900'>isNativeToken</button>
        <div>is Native token: {String(isNativeTokenResult)}</div>
      </div>

    </div>
  )
}

export default HelperSwapGetTokens

