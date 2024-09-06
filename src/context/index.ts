import { BaseError, ContractFunctionRevertedError } from 'viem';
import { simulateContract, writeContract,GetBlockNumberErrorType, readContract, signMessage, getChainId, switchChain } from 'wagmi/actions'
import { config } from '@/config';


/**
 * Asynchronously writes a contract by function name.
 *
 * @param {string} functionName - The name of the function to call on the contract.
 * @param {number} chainId - The chain ID of the contract.
 * @param {any} abi - The ABI of the contract.
 * @param {`0x${string}`} contractAddress - The address of the contract.
 * @param {...(`0x${string}`[] | any[])} args - The arguments to pass to the contract function.
 * @return {Promise<`0x${string}`>} A promise that resolves to the result of the contract write operation.
 * @throws {GetBlockNumberErrorType} If there is an error during the contract write operation.
 */
export const writeContractByFunctionName = async (
  functionName: string,
  chainId: number,
  abi: any,
  contractAddress: `0x${string}`,
  value: bigint,
  ...args: `0x${string}`[] | any[]
): Promise<`0x${string}`> => {
  try {
    await simulateContract(config, {
      chainId: chainId,
      abi: abi,
      address: contractAddress,
      functionName: functionName,
      args: args,
      value: value
    }) 

    const result = await writeContract(config, {
      chainId: chainId,
      abi: abi,
      address: contractAddress,
      functionName: functionName,
      args: args,
      value: value
    })
        
    return result;
  } catch (e) {
    const error = e as GetBlockNumberErrorType
    throw formattedError(error);
  }
}


/**
 * Writes a contract by function name with optional simulation and execution.
 *
 * @param {any} parameters - The parameters for the contract write operation.
 * @param {boolean} [simulate=true] - Whether to simulate the contract write operation.
 * @param {boolean} [execute=true] - Whether to execute the contract write operation.
 * @return {Promise<`0x${string}`>} A promise that resolves to the result of the contract write operation.
 */
export const writeContractByFunctionNamev2 = async (
  parameters: any,
  simulate: boolean = true,
  execute: boolean = true
): Promise<`0x${string}`> => {
  try {
    let tx = "0x" as `0x${string}`
    const currentChainId = getChainId(config)
    await switchChain(config, { chainId: parameters.chainId })

    if (simulate)
      await simulateContract(config, parameters)
    
    if (execute)
      tx = await writeContract(config, parameters)
    
    await switchChain(config, { chainId: currentChainId })
    return tx;
  } catch (e) {
    const error = e as GetBlockNumberErrorType
    throw formattedError(error);
  }
}


/**
 * Reads from a contract by function name.
 *
 * @param {string} functionName - The name of the function to call on the contract.
 * @param {any} abi - The ABI of the contract.
 * @param {`0x${string}`} contractAddress - The address of the contract.
 * @param {`0x${string}`} address - The account address to use for the contract read operation.
 * @param {...(`0x${string}`[] | any[])} args - The arguments to pass to the contract function.
 * @return {Promise<T>} The result of the contract read operation.
 */
export const readContractByFunctionName = async <T>(
  functionName: string,
  chainId: number,
  abi: any,
  contractAddress: `0x${string}`,
  address: `0x${string}`,
  ...args: `0x${string}`[] | any[]
): Promise<T> => {

  try {
    const data: Promise<T> | unknown = await readContract(config, {
      chainId: chainId,
      address: contractAddress,
      abi: abi,
      functionName: functionName,
      account: address,
      args: args,
    });

    return data as T;
  } catch (e) {
    const error = e as GetBlockNumberErrorType
    throw formattedError(error);
  }
}


/**
 * Reads from a contract by function name with chain switching.
 *
 * @param {any} parameters - The parameters for the contract read operation.
 * @return {Promise<T>} The result of the contract read operation.
 */
export const readContractByFunctionNamev2 = async <T>(parameters: any): Promise<T> => {

  try {
    const currentChainId = getChainId(config)
    await switchChain(config, { chainId: parameters.chainId })
    const data: Promise<T> | unknown = await readContract(config, parameters)    
    await switchChain(config, { chainId: currentChainId })

    return data as T;
  } catch (e) {
    const error = e as GetBlockNumberErrorType
    throw formattedError(error);
  }
}


/**
 * Creates a signed message for a given address and message.
 *
 * @param {`0x${string}`} address - The Ethereum address to sign the message with.
 * @param {`0x${string}` | Uint8Array} message - The message to be signed.
 * @return {any} The signed message result.
 */
export const createSignMessage = async (
  address: `0x${string}`,
  message: `0x${string}` | Uint8Array
) => {  
  try {
    const result = await signMessage(config, {
      account: address, 
      message: { raw: message},
    })

    return result
  } catch (e) {
    const error = e as GetBlockNumberErrorType
    throw formattedError(error);
  }
}


/**
 * Formats an error object into a standard Error object.
 *
 * @param {any} err - The error object to format.
 * @return {Error} A formatted Error object.
 */
export const formattedError = (err: any): Error => {
    if (err instanceof BaseError) {
      // Option 1: checking the instance of the error
      if (err.cause instanceof ContractFunctionRevertedError) {
        const errorOpt: ErrorOptions = {
          cause: {
            cause: err.cause,
            docsPath: err.docsPath,
            message: err.message,
            metaMessages: err.metaMessages,
            name: err.name,
            shortMessage: err.shortMessage,
            stack: err.stack,
            version: err.version,
          },
        }
        throw new Error(err.shortMessage, errorOpt);
      }
  
      // Option 2: using `walk` method from `BaseError`
      const revertError: any = err.walk(
        (err) => err instanceof ContractFunctionRevertedError
      );

      if (revertError) {
        const error = revertError.data?.message ?? "Unknown error";
        const errorOpt: ErrorOptions = {
          cause: revertError
        }
        throw new Error(error, errorOpt);
      }
    }
    
    throw new Error(err.message, err);
}
