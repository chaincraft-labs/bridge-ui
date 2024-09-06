import { getBalance, GetBalanceReturnType, GetBlockNumberErrorType, } from 'wagmi/actions'
import { config } from "@/config";
import { createSignMessage, formattedError, readContractByFunctionName, readContractByFunctionNamev2, writeContractByFunctionNamev2 } from "@/context";
import { DEPLOYED_CONTRACTS, RELAYER_ABI, tokenBridgedLabel, TOKEN_PAIRS, OperationStatusLabels, BRIDGE_ABI, STORAGE_ABI, AUTHORIZED_TOKENS, nextOperationStatusSelector} from "@/constants";
import { TokenType, TokenPairType, UserBalancesType, OperationDetailType, BridgeRequestPreparedType, BridgeTransferDetailType, OperationStatusSelectorType } from '@/context/types';


/**
 * Converts a given amount to a short decimal format.
 *
 * @param {number} amount - The amount to be converted.
 * @return {number} The converted amount in short decimal format.
 */
export const getAmountToShortDecimal = (amount: number): number => {
	const factor = 10n ** 18n; 
	return Math.floor(( amount / Number(factor)) * 10000) / 10000;
}

/**
 * Converts a given short decimal amount to its original value.
 *
 * @param {number} amount - The short decimal amount to be converted.
 * @return {bigint} The original amount.
 */
export const getAmountFromShortDecimal = (amount: number): bigint => {
	const factor = 10n ** 18n; 
	return BigInt(Math.floor(( amount * Number(factor)) / 10000) * 10000);
}


/**
 * Returns the URL of the explorer for a given chain ID.
 *
 * @param {number} chainId - The ID of the chain.
 * @return {string} The URL of the explorer.
 */
export const getExplorerUrl = (chainId: number) => {
	const customUrl: { [key: number]: string } = {
		440: "/query/"
	}

	for (let i = 0; i < config.chains.length; i++) {
		if (config.chains[i].id === chainId) {
			const cs: string = customUrl[chainId] ?? ""
			return config.chains[i].blockExplorers?.default.url + cs
		}
	}
}


/**
 * Returns a token pair object with the origin and target tokens reversed.
 *
 * @param {string} token - the token to reverse
 * @return {TokenPairType} an object containing the origin and target tokens
 */
export const getTokenPairsReverse = (token: string): TokenPairType => {
  return {
    origin: token,
    target: TOKEN_PAIRS[token]
  }
}


/**
 * get all chain ids
 * 
 * @returns number[]
 */
export const getChainIds = (): number[] => Object.keys(DEPLOYED_CONTRACTS).map(Number);


/**
 * Retrieves all tokens from all chains.
 *
 * @return {Promise<TokenType[]>} A promise that resolves to a list of all tokens.
 */
export const getAllTokens = async (): Promise<TokenType[]> => {
	const chainIds = getChainIds()
	const allTokens: TokenType[] = []

	for (const chainId of chainIds) {	
		if (Number.isNaN(chainId)) continue

		try {
      const tokens: TokenType[] = await getTokens(chainId);
      allTokens.push(...tokens);
    } catch (err) {
      console.warn(`Error fetching tokens for chainId ${chainId}:`, err);
    }
	}

	return allTokens
}


/**
 * Retrieves a list of tokens for a given chain ID.
 *
 * @param {number} chainId - The ID of the chain for which to retrieve tokens.
 * @return {Promise<TokenType[]>} A promise that resolves to a list of tokens for the specified chain ID.
 */
export const getTokens = async (chainId: number): Promise<TokenType[]> => {
  const tokensList: TokenType[] = [];
  const tokens = DEPLOYED_CONTRACTS[chainId].tokens;
  
	if (tokens) {
    Object.entries(tokens).forEach(([tokenType, tokens]) => {
      Object.entries(tokens).forEach(([tokenName, tokenAddress]) => {

        tokensList.push({
          chainId,
					tokenType,
          tokenName,
          tokenAddress: tokenAddress as `0x${string}`,
					label: tokenBridgedLabel[tokenName] ?? tokenName
        });
      });
    });
  }

  return tokensList;
}


/**
 * Checks if the given token is a native token.
 *
 * @param {string} token - The token to check.
 * @return {Promise<boolean>} A promise that resolves to true if the token is a native token, false otherwise.
 */
export const isNativeToken = async (token: string): Promise<boolean> => {
	const tokens: TokenType[] = await getAllTokens()
	return tokens.some(t => t.tokenName === token && t.tokenType === "Native")
}


/**
 * Retrieves the user's balances for all tokens, including native and bridged tokens.
 *
 * @param {`0x${string}` | undefined} address - The address of the user.
 * @return {Promise<userBalances>} - A promise that resolves to an object containing the user's balances for each token.
 */
export const getUserBalances = async (address: `0x${string}` | undefined,): Promise<UserBalancesType> => {
	const tokens: TokenType[] = await getAllTokens()
	const userBalances: UserBalancesType = {}

	// native token
	const chainIds = getChainIds()
	for (const chainId of chainIds) {
		const balance = await getUserBalance(address, chainId)
		
		if (balance) {
			userBalances[balance.symbol] = {
				address: address as `0x${string}`,
				chainId: chainId,
				balance: Number(balance.value)
			}
		}
	}
	
	// bridged token
	for (const token of tokens) {
		if (token.tokenAddress === '0x') continue

		const balance = await getUserBalance(address, token.chainId, token.tokenAddress)
		const tokenBalance = Number(balance?.value ?? 0)

		userBalances[token.tokenName] = {
			address: address as `0x${string}`,
			chainId: token.chainId,
			token: token.tokenAddress,
			balance: Number(tokenBalance)
		}

	}
	return userBalances
}


/**
 * Retrieves the user's balance for a given address, chain ID, and token address.
 *
 * @param {`0x${string}` | undefined} address - The address of the user.
 * @param {number} chainId - The ID of the chain.
 * @param {`0x${string}` | undefined} [tokenAdress] - The address of the token.
 * @return {Promise<GetBalanceReturnType|void>} - A Promise that resolves to the user's balance or undefined.
 */
export const getUserBalance = async (
	address: `0x${string}` | undefined,
	chainId: number,
	tokenAdress: `0x${string}` | undefined = undefined
): Promise<GetBalanceReturnType|void> => {
	const request = {
		address: address as `0x${string}`,
		chainId: chainId,
		token: tokenAdress
	}
	return getBalance(config, request)
		.then((balance) => {
			return balance
		})
	.catch(err => { console.warn("error : ", err.message, address, chainId, tokenAdress) })
}


/**
 * Saves the operation status to local storage.
 *
 * @param {OperationDetailType} operationStatus - The operation status to be saved.
 * @return {void} No return value, saves operation status asynchronously.
 */
export const saveOperationStatusData = (operationStatus: OperationDetailType): void => 
  localStorage.setItem('operationStatus', JSON.stringify(operationStatus));


/**
 * Retrieves the operation status from local storage.
 *
 * @return {OperationDetailType | null} The operation status if found, otherwise null.
 */
export const getOperationStatusData = (): OperationDetailType | null => {
  const operationStatus = localStorage.getItem('operationStatus');
  return operationStatus ? JSON.parse(operationStatus) : null;
}


/**
 * Deletes the operation status data from local storage.
 *
 * @return {void} No return value, deletes operation status asynchronously.
 */
export const deleteOperationStatusData = (): void => {
	localStorage.removeItem('operationStatus');
}


/**
 * Retrieves the status label from the OperationStatus enum based on the given status number.
 *
 * @param {number} status - The status number to retrieve the status name for.
 * @return {string|null} The status label if found, otherwise null.
 */
export const getStatusLabel = (status: number): string | null => {
	return OperationStatusLabels[status] ?? null;
}


// ----------------------------------------------------------------- 
// 
// Read from blockchain
// 
// ----------------------------------------------------------------- 


/**
 * Retrieves the list of authorized token names by chain ID.
 *
 * @param {number} chainId - The ID of the chain.
 * @return {Promise<string[] | null>} A promise that resolves to an array of authorized token names or null if an error occurs.
 */
export const getAuthorizedTokenNamesListByChainId = async (
	chainId: number,
): Promise<string[] | null> => {

	const parameters: any = {
		chainId: chainId,
		abi: STORAGE_ABI,
		address: DEPLOYED_CONTRACTS[chainId].contracts.Storage,
		functionName: 'getAuthorizedTokenNamesListByChainId',
		args: [
			chainId
		]
	}

	return readContractByFunctionNamev2<string[]>(parameters)
		.then((data) => {
			return data
		})
		.catch((err) => {
			console.warn("Error: operationStatus : ", err)
			return null;
		});
}

/**
 * Retrieves the operation hash status from the blockchain based on the given parameters.
 *
 * @param {`0x${string}`} address - The Ethereum address to retrieve the operation hash status for.
 * @param {number} originChainId - The ID of the origin chain.
 * @param {number} targetChainId - The ID of the target chain.
 * @param {string} operationHash - The operation hash to retrieve the status for.
 * @param {number} previousStatus - The previous status of the operation.
 * @return {Promise<number | null>} A promise that resolves to the operation hash status or null if an error occurs.
 */
export const getOperationHashStatus = async (
	address: `0x${string}`,
	originChainId: number,
	targetChainId: number,
	operationHash: string,
	previousStatus: number,
): Promise<number | null> => {
	
	const selector: OperationStatusSelectorType = nextOperationStatusSelector[previousStatus]
	const chainId = selector.chain === 'origin' ? originChainId : targetChainId
	const contractAddress: `0x${string}` = DEPLOYED_CONTRACTS[chainId].contracts.RelayerBase as `0x${string}`

	return readContractByFunctionName<number>(
				selector.method,
				chainId,
				RELAYER_ABI,
				contractAddress,
				address,
				operationHash,
			)
			.then((operationStatus) => {
				return operationStatus
			})
			.catch((err) => {
				console.warn("Error: operationStatus : ", err)
				return null;
			});
}


/**
 * Retrieves the available nonce for a given user on a specific blockchain.
 *
 * @param {`0x${string}`} address - The Ethereum address of the user.
 * @param {number} chainId - The ID of the blockchain.
 * @return {Promise<bigint | null>} A promise that resolves to the available nonce or null if an error occurs.
 */
export const getAvailableNonceForUser = async (
	address: `0x${string}`,
	chainId: number,
): Promise<bigint | null> => {
	const contractAddress: `0x${string}` = DEPLOYED_CONTRACTS[chainId].contracts.BridgeBase as `0x${string}`

	return readContractByFunctionName<bigint>(
				"getNewUserNonce",
				Number(chainId),
				BRIDGE_ABI,
				contractAddress,
				address,
				address,
			)
			.then((nonce) => {
				return BigInt(nonce)
			})
			.catch((err) => {
				console.warn("Error: nonce : ", err)
				return null;
			});
}


/**
 * Retrieves the operation hash for a given address, origin chain ID, target chain ID, token name, amount, and nonce.
 *
 * @param {`0x${string}`} address - The Ethereum address.
 * @param {number} originChainId - The ID of the origin chain.
 * @param {number} targetChainId - The ID of the target chain.
 * @param {string} tokenName - The name of the token.
 * @param {bigint} amount - The amount.
 * @param {bigint} nonce - The nonce.
 * @return {Promise<`0x${string}` | null>} A promise that resolves to the operation hash or null if an error occurs.
 */
export const getOperationHash = async (
	address: `0x${string}`,
	originChainId: number,
	targetChainId: number,
	tokenName: string,
	amount: bigint,
	nonce: bigint
): Promise<`0x${string}` | null> => {
	const contractAddress: `0x${string}` = DEPLOYED_CONTRACTS[originChainId].contracts.BridgeBase as `0x${string}`
	
	return readContractByFunctionName<`0x${string}`>(
				"getMessageHash",
				Number(originChainId),
				BRIDGE_ABI,
				contractAddress,
				address,
				address,
				address,
				originChainId,
				targetChainId,
				tokenName,
				amount,
				nonce
			)
			.then((operationHash) => {
				return operationHash
			})
			.catch((err) => {
				console.warn("Error: operationHash : ", err)
				return null;
			});
}

// ----------------------------------------------------------------- 
// 
// Write to blockchain
//
// ----------------------------------------------------------------- 

/**
 * Prepares a bridge request by retrieving the available nonce for the user, 
 * generating an operation hash, and creating a signed message.
 *
 * @param {`0x${string}`} address - The Ethereum address of the user.
 * @param {number} originChainId - The ID of the origin chain.
 * @param {number} targetChainId - The ID of the target chain.
 * @param {string} tokenName - The name of the token.
 * @param {bigint} amount - The amount of the token.
 * @return {Promise<BridgeRequestPreparedType>} A promise that resolves to the prepared bridge request.
 */
export const prepareBridgeRequest = async (
	address: `0x${string}`,
	originChainId: number,
	targetChainId: number,
	tokenName: string,
	amount: bigint,
): Promise<BridgeRequestPreparedType> => {
	try {
		const nonce = await getAvailableNonceForUser(address, originChainId)
		if ( nonce === null ) {
			throw new Error('Nonce not found');
		}

		const operationHash = await getOperationHash(
			address, 
			originChainId, 
			targetChainId, 
			tokenName, 
			amount, 
			nonce
		)

		if ( !operationHash ) {
			throw new Error('Operation hash not found');
		}
		const signedMessage = await createSignMessage(address, operationHash)
	
		return { 
			nonce: nonce, 
			operationHash: operationHash, 
			signedMessage: signedMessage 
		}
	} catch (e) {
		const error = e as GetBlockNumberErrorType
		throw formattedError(error);
	}
}

/**
 * Creates a bridge operation by calling the 'createBridgeOperation' function 
 * on the BridgeBase contract.
 *
 * @param {Object} options - The options for creating the bridge operation.
 * @param {string} options.address - The address of the user.
 * @param {number} options.originChainId - The ID of the origin chain.
 * @param {number} options.targetChainId - The ID of the target chain.
 * @param {string} options.tokenName - The name of the token.
 * @param {bigint} options.amount - The amount of the token.
 * @param {bigint} options.nonce - The nonce of the user.
 * @param {string} options.signedMessage - The signed message.
 * @param {boolean} [options.simulate=true] - Whether to simulate the transaction.
 * @param {boolean} [options.execute=true] - Whether to execute the transaction.
 * @return {Promise<any>} A promise that resolves to the transaction object.
 * @throws {GetBlockNumberErrorType} If there is an error calling the function.
 */
export const createBridgeOperation = async (
	{
		address,
		originChainId,
		targetChainId,
		tokenSymbol,
		tokenName,
		amount,
		nonce,
		signedMessage,
		simulate = true,
		execute = true,
	} : {
		address: `0x${string}`,
		originChainId: number,
		targetChainId: number,
		tokenSymbol: string,
		tokenName: string,
		amount: bigint,
		nonce: bigint,
		signedMessage: string,
		simulate?: boolean,
		execute?: boolean,
	}
): Promise<any> => {
	const parameters: any = {
		chainId: originChainId,
		abi: BRIDGE_ABI,
		address: DEPLOYED_CONTRACTS[originChainId].contracts.BridgeBase,
		functionName: 'createBridgeOperation',
		args: [
			address,
			address,
			originChainId,
			targetChainId,
			tokenName,
			amount,
			nonce,
			signedMessage,
		],
		value: amount
	}

	if (!await isNativeToken(tokenSymbol)) {
		parameters.value = 0
	}

	return writeContractByFunctionNamev2(parameters, simulate, execute)
	.then((tx) => {
		return tx
	})
	.catch((err) => {
		const error = err as GetBlockNumberErrorType
		throw formattedError(error);
	});
}

/**
 * Deposits fees for a bridge operation.
 *
 * @param {number} originChainId - The ID of the origin chain.
 * @param {number} targetChainId - The ID of the target chain.
 * @param {bigint} amount - The amount of fees to deposit.
 * @param {string} operationHash - The hash of the bridge operation.
 * @param {boolean} [simulate=true] - Whether to simulate the deposit operation.
 * @param {boolean} [execute=true] - Whether to execute the deposit operation.
 * @return {Promise<`0x${string}`>} A promise that resolves to the result of the deposit operation.
 */
export const depositFees = async (
	{
		originChainId,
		targetChainId,
		amount,
		operationHash,
		simulate = true,
		execute = true,
	}:{
		originChainId: number,
		targetChainId: number,
		amount: bigint,
		operationHash: string,
		simulate?: boolean,
		execute?: boolean,
	}
): Promise<`0x${string}`> => {

	const parameters: any = {
		chainId: targetChainId,
		abi: BRIDGE_ABI,
		address: DEPLOYED_CONTRACTS[targetChainId].contracts.BridgeBase,
		functionName: 'depositFees',
		args: [
			operationHash,
			originChainId,
			targetChainId,
		],
		value: amount
	}

	return writeContractByFunctionNamev2(parameters, simulate, execute)
	.then((tx) => {
		return tx
	})
	.catch((err) => {
		const error = err as GetBlockNumberErrorType
		throw formattedError(error);
	});
}

/**
 * Creates a bridge transfer by simulating transactions and depositing fees.
 *
 * @param {`0x${string}`} address - The Ethereum address of the user.
 * @param {number} originChainId - The ID of the origin chain.
 * @param {number} targetChainId - The ID of the target chain.
 * @param {string} tokenName - The name of the token being transferred.
 * @param {bigint} amount - The amount of tokens being transferred.
 * @return {Promise<BridgeTransferDetailType>} An object containing the transaction hash of the bridge operation, the transaction hash of the fees deposit, and the operation hash.
 */
export const createBridgeTransfer = async (
	address: `0x${string}`,
	originChainId: number,
	targetChainId: number,
	tokenName: string,
	amount: bigint,
): Promise<BridgeTransferDetailType> => {
	try {
		const tokenSymbol = tokenName
		const authorizedToken = AUTHORIZED_TOKENS[tokenName]
		
		const preparedRequest = await prepareBridgeRequest(
			address,
			originChainId,
			targetChainId,
			authorizedToken,
			amount
		)
		// Only simlate transaction first
		let txCreateBridgeOperation = await createBridgeOperation({
			address: address,
			originChainId: originChainId,
			targetChainId: targetChainId,
			tokenSymbol: tokenSymbol,
			tokenName: authorizedToken,
			amount: amount,
			nonce: preparedRequest.nonce,
			signedMessage: preparedRequest.signedMessage,
			simulate: true,
			execute: false,
		})

		let txDeposiFees = await depositFees({
			originChainId: originChainId,
			targetChainId: targetChainId,
			amount: amount,
			operationHash: preparedRequest.operationHash,
			simulate: true,
			execute: false,
		})

		// Execute transaction
		txCreateBridgeOperation = await createBridgeOperation({
			address: address,
			originChainId: originChainId,
			targetChainId: targetChainId,
			tokenSymbol: tokenSymbol,
			tokenName: authorizedToken,
			amount: amount,
			nonce: preparedRequest.nonce,
			signedMessage: preparedRequest.signedMessage,
			simulate: true,
			execute: true,
		})

		txDeposiFees = await depositFees({
			originChainId: originChainId,
			targetChainId: targetChainId,
			amount: amount,
			operationHash: preparedRequest.operationHash,
			simulate: true,
			execute: true,
		})

		return { 
			txCreateBridgeOperation: txCreateBridgeOperation ?? '0x', 
			txDeposiFees: txDeposiFees ?? '0x',
			operationHash: preparedRequest.operationHash
		}

	} catch (e) {
		const error = e as GetBlockNumberErrorType
		throw formattedError(error);
	}
}