
export type ContractsType = {
  [chainId: number]: {
    contracts: {
      [key: string]: string
    }
    tokens: {
      [key: string]: {
        [key: string]: string
      }
    }
  } 
}

export type TokenBridgedLabelType = {
  [key: string]: string
}

export type TokenPairsType = {
  [key: string]: string
}

export type TokenType = {
	chainId: number
  tokenType: string
	tokenSymbol: string
	tokenAddress: `0x${string}`
	label: string
}

export type TokenPairType = {
  origin: string
  target: string
}

export type UserBalanceType = {
	address: `0x${string}`,
	chainId: number,
	token?: `0x${string}`,
	balance: number
}

export type UserBalancesType = {
	[tokenName: string]: UserBalanceType
}

export type OperationDetailType = {
  chainIdOrigin: number
  chainIdTarget: number
  amount: number
  tokenOrigin: `0x${string}`
  tokenTarget: `0x${string}`
  address: `0x${string}`
  operationHash: `0x${string}`
  txCreateBridgeOperation: `0x${string}`
  txDeposiFees: `0x${string}`
}

export type BridgeRequestPreparedType = {
	nonce: bigint
	operationHash: `0x${string}`
	signedMessage: `0x${string}`
}

export type AuthorizedTokensType = {
  [key: string]: string
}

export type BridgeTransferDetailType = {
	txCreateBridgeOperation?: `0x${string}`
	txDeposiFees?: `0x${string}`
	operationHash?: `0x${string}`
}

export type OperationStatusSelectorType = {
  method: string
  chain: string
}