// import { readContractByFunctionName, writeContractByFunctionName } from ".";
// import { alltunes_abi, alltunes_contract_address } from "../constants";



// // 
// // Read from blockchain
// // 
// export const getAdmin = async (address: `0x${string}`): Promise<string> => {
// 	//
// 	// Get the Alltunes Smart contract' Admin
// 	//
// 	// Returms:
// 	//      (`0x${string}`) The smart contract's admin
// 	//
// 	return readContractByFunctionName<string>(
// 		"getAdmin",
// 		alltunes_abi,
// 		alltunes_contract_address,
// 		address,
// 	)
// 	.then((admin) => admin)
// 	.catch((err) => {
// 		console.log(err);
// 		return "";
// 	});
// };

// export interface I_ISRCSpec {
// 	minPrice: BigInt;
// 	artistAddress: `0x${string}`;
// 	isBound: boolean;
// }

// export const getISRCSpec = async (
// 	address: `0x${string}`,
// 	ISRCCode: string
// ): Promise<I_ISRCSpec | void> => {
// 	//
// 	// Get the ISRC Spec for a specific ISRC code
// 	//
// 	// Returns:
// 	//      (I_ISRCSpec) The ISRC Spec
// 	//
// 	const func_name = "getISRCSpec"
// 	return readContractByFunctionName<I_ISRCSpec | void>(
// 		func_name,
// 		alltunes_abi,
// 		alltunes_contract_address,
// 		address,
// 		ISRCCode
// 	)
// 	.then((ISRCSpec) => {
// 		console.log(`success function:${func_name} : `, ISRCSpec);
// 		console.log("result  ISRCSpec : ", ISRCSpec);
// 		return ISRCSpec
// 	})
// 	.catch((err) => {
// 		console.log(`Error function:${func_name} : `, err);
// 	});
// };

// export const Allowance: string[] = ["NONE", "SHORT", "LIFE"];
// export const UserMode: string[] = ["PRIVATE", "PRO"];

// export interface I_UserUsage {
// 	listenDuration: bigint;
// 	mode: number;
// 	allowanceType: number;
// }

// export const getUserUsage = async (
//   address: `0x${string}`,
//   ISRCCode: string
// ): Promise<I_UserUsage | void> => {
//     //
//     // Get the user usage for a specific ISRC Code
//     //   
//     // Args:
//     //      (ISRCCode): The ISRC code
//     //      (address): The user address
//     // Returns:
//     //      (I_UserUsage) The user usage
//     //
// 	const func_name = "getUserUsage"
//     return readContractByFunctionName<I_UserUsage | void>(
//         func_name,
//         alltunes_abi,
//         alltunes_contract_address,
//         address,
//         ISRCCode,
//         address
//     )
//     .then((UserUsage) => {
// 		console.log(`success function:${func_name} : `, UserUsage);
// 		return UserUsage
// 	})
//     .catch((err) => {
// 		console.log(`Error function:${func_name} : `, err);
// 	});
// };

// // 
// // Write to blockchain
// // 
// export const mockedCheckISRCValidity = async (
//   code: string, 
//   artist: `0x${string}`,
// ) => {
// 	const funcName = 'mockedCheckISRCValidity'
// 	return writeContractByFunctionName(
// 		funcName, 
// 		alltunes_abi,
// 		alltunes_contract_address,
// 		code,
// 		artist,
// 	)
// 	.then((result) => {
// 		console.log(`success function:${funcName} : `, result);
// 		return result
// 	})
// 	.catch((err) => {
// 		console.log(`Error function:${funcName} : `, err);
// 	});
// }


// export const buyAllowance = async (
//     ISRCCode: string, 
//     tokenAddress: `0x${string}`,
//     amount: BigInt,
// ) => {
//     const funcName = 'buyAllowance'
//     return writeContractByFunctionName(
//         funcName, 
//         alltunes_abi,
//         alltunes_contract_address,
//         ISRCCode,
//         tokenAddress,
//         amount,
//     )
//     .then((result) => {
//         console.log(`success function:${funcName} : `, result);
//         return result
// 	})
// 	.catch((err) => {
//         console.log(`Error function:${funcName} : `, err);
// 	});
// }