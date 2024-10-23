import { 
  AuthorizedTokensType, 
  ContractsType, 
  OperationStatusSelectorType, 
  TokenBridgedLabelType, 
  TokenPairsType 
} from "@/context/types"


/**
 * Token pairs
 * origin chain: target chain -> bridged token
 */
export const TOKEN_PAIRS: TokenPairsType = {
  "HMY": "ETH",   // give gbAFT; origin HMY, target ETH
  "ETH": "HMY",   // give hbETH; origin ETH, target HMY
  "hbETH": "ETH", // give ETH  ; origin HMY, target Ethereum
  "gbHMY": "HMY", // give HMY  ; origin Ethereum, target HMY
}


export const AUTHORIZED_TOKENS: AuthorizedTokensType = {
  ETH: 'ethereum',
  hbETH: 'ethereum',
  HMY: 'harmonie',
  gbHMY: 'harmonie',
}


export const tokenBridgedLabel: TokenBridgedLabelType = {
  hbETH: 'from Harmonie to Ethereum',
  gbHMY: 'from Ethereum to Harmonie',
  HMY: 'from Harmonie to Ethereum',
  ETH: 'from Ethereum to Harmonie',
}

export const DEPLOYED_CONTRACTS: ContractsType = {
  440: {
    contracts: {
      Storage: process.env.NEXT_PUBLIC_HARMONIE_STORAGE_ADDRESS || "",
      RelayerBase: process.env.NEXT_PUBLIC_HARMONIE_RELAYER_ADDRESS || "",
      BridgeBase: process.env.NEXT_PUBLIC_HARMONIE_BRIDGE_ADDRESS || "",
    },
    tokens: {
      BridgedToken: {
        hbETH: process.env.NEXT_PUBLIC_HARMONIE_HBETH_ADDRESS || "",
      },
      Native: {
        HMY: '0x'
      }
    }
  },
  1337: {
    contracts: {
      Storage: process.env.NEXT_PUBLIC_ETHEREUM_STORAGE_ADDRESS || "",
      RelayerBase: process.env.NEXT_PUBLIC_ETHEREUM_RELAYER_ADDRESS || "",
      BridgeBase: process.env.NEXT_PUBLIC_ETHEREUM_BRIDGE_ADDRESS || "",
    },
    tokens: {
      BridgedToken: { 
        gbHMY: process.env.NEXT_PUBLIC_ETHEREUM_GBHMY_ADDRESS || "",
      },
      Native: {
        ETH: '0x',
      }
    }
  }
}


export enum OperationStatusLabels {
  'NONE',
  'Operation created',
  'Fees deposit in progress on destination chain',
  'Fees deposit confirmed on destination chain',
  'Fees locked on destination chain',
  'Fees and assets locked confirmed',
  'Assets received on destination chain',
  'Operation finalized',
  'Operation successfully completed',
  'Operation canceled'
}

export const nextOperationStatusSelector: OperationStatusSelectorType[] = [
	{ method: "getOriginOperationStatus", chain: "origin" },     // get status 1
	{ method: "getDestinationOperationStatus", chain: "target" }, // get status 2
	{ method: "getDestinationOperationStatus", chain: "target" }, // get status 3
	{ method: "getOriginOperationStatus", chain: "origin" },     // get status 4
	{ method: "getOriginOperationStatus", chain: "origin" },     // get status 5
	{ method: "getDestinationOperationStatus", chain: "target" }, // get status 6
	{ method: "getDestinationOperationStatus", chain: "target" }, // get status 7
	{ method: "getOriginOperationStatus", chain: "origin" },     // get status 8
]


export const RELAYER_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "storageAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "RelayerBase__BlockConfirmationNotReached",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "role",
        "type": "string"
      }
    ],
    "name": "RelayerBase__CallerHasNotRole",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "RelayerBase__InvalidOperationHash",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "RelayerBase__InvalidOperationStatus",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "RelayerBase__OperationAlreadyExists",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "RelayerBase__UserOperationsEmpty",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "indexed": false,
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "FeesDepositConfirmed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "indexed": false,
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "FeesDeposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "indexed": false,
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "FeesLockedAndDepositConfirmed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "indexed": false,
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "FeesLockedConfirmed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "OperationCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "OperationClosed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "indexed": false,
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "OperationCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "indexed": false,
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "OperationFinalized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "ReceveidOperationCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "SentOperationCanceled",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "completeOperation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "confirmFeesLockedAndDepositConfirmed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "createOperation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      }
    ],
    "name": "emitCancelOperation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      }
    ],
    "name": "getDestinationOperationStatus",
    "outputs": [
      {
        "internalType": "enum RelayerBase.OperationStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      }
    ],
    "name": "getDetailedDestinationOperation",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "chainIdFrom",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "chainIdTo",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "tokenName",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
              }
            ],
            "internalType": "struct RelayerBase.OperationParams",
            "name": "params",
            "type": "tuple"
          },
          {
            "internalType": "enum RelayerBase.OperationStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "feesDeposit",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "feesConfirmation",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "receptionBlock",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "finalisationBlock",
                "type": "uint64"
              }
            ],
            "internalType": "struct RelayerBase.DestinationBlockStep",
            "name": "blockStep",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "feesAmount",
                "type": "uint256"
              }
            ],
            "internalType": "struct RelayerBase.OperatorParams",
            "name": "operator",
            "type": "tuple"
          }
        ],
        "internalType": "struct RelayerBase.DestinationOperation",
        "name": "operation",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      }
    ],
    "name": "getDetailedOriginOperation",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "chainIdFrom",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "chainIdTo",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "tokenName",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
              }
            ],
            "internalType": "struct RelayerBase.OperationParams",
            "name": "params",
            "type": "tuple"
          },
          {
            "internalType": "enum RelayerBase.OperationStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "creationBlock",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "processingBlock",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "closingBlock",
                "type": "uint64"
              }
            ],
            "internalType": "struct RelayerBase.OriginBlockStep",
            "name": "blockStep",
            "type": "tuple"
          }
        ],
        "internalType": "struct RelayerBase.OriginOperation",
        "name": "operation",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "getMessageHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      }
    ],
    "name": "getOriginOperationStatus",
    "outputs": [
      {
        "internalType": "enum RelayerBase.OperationStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "getPrefixedMessageHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserOperations",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      }
    ],
    "name": "lockDestinationFees",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "prefixed",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      }
    ],
    "name": "receiveCancelOperation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "receiveFeesLockConfirmation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "receivedFinalizedOperation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "message",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "sig",
        "type": "bytes"
      }
    ],
    "name": "recoverSigner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_currentUserOperations",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "operations",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      }
    ],
    "name": "s_destinationOperations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "internalType": "enum RelayerBase.OperationStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "feesDeposit",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "feesConfirmation",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "receptionBlock",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "finalisationBlock",
            "type": "uint64"
          }
        ],
        "internalType": "struct RelayerBase.DestinationBlockStep",
        "name": "blockStep",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "feesAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct RelayerBase.OperatorParams",
        "name": "operator",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_destinationOperationsList",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      }
    ],
    "name": "s_originOperations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "internalType": "enum RelayerBase.OperationStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "creationBlock",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "processingBlock",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "closingBlock",
            "type": "uint64"
          }
        ],
        "internalType": "struct RelayerBase.OriginBlockStep",
        "name": "blockStep",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_originOperationsList",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainIdFrom",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "chainIdTo",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct RelayerBase.OperationParams",
        "name": "params",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "blockStep",
        "type": "uint256"
      }
    ],
    "name": "sendFeesLockConfirmation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export const BRIDGE_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "storageAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "role1",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "role2",
        "type": "string"
      }
    ],
    "name": "BridgeBase__CallerHasNotRole",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "BridgeBase__DepositFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "BridgeBase__FeesDepositFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "BridgeBase__FinalizationFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "BridgeBase__OperationCreationFailed",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenFrom",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenTo",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "BridgeOperationCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenFrom",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenTo",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "BridgeOperationCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenFrom",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "cancelBridgeDeposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "completeBridgeOperation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "computeFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "createBridgeOperation",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "operationHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      }
    ],
    "name": "depositFees",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenFrom",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "finalizeBridgeDeposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "getMessageHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getNewUserNonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainIdTo",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "getPrefixedMessageHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "prefixed",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "message",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "sig",
        "type": "bytes"
      }
    ],
    "name": "recoverSigner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "chainIdFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_destinationNonces",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "s_nextUserNonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "newNonce",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "simulateOperation",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export const STORAGE_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "nativeTokenName",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "name": "Storage__ChainIdAlreadyInList",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "name": "Storage__ChainIdNotInList",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "functionName",
        "type": "string"
      }
    ],
    "name": "Storage__InvalidArrayLengthInParams",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Storage__NotAdmin",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "name": "Storage__TokenAddressAlreadySet",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "name": "Storage__TokenAddressNotSet",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      }
    ],
    "name": "Storage__TokenAlreadyInList",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      }
    ],
    "name": "Storage__TokenNotInList",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "newArray",
        "type": "address[]"
      }
    ],
    "name": "Storage__AddressArrayChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newValue",
        "type": "address"
      }
    ],
    "name": "Storage__AddressArrayDataChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newValue",
        "type": "address"
      }
    ],
    "name": "Storage__AddressDataChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "newValue",
        "type": "bool"
      }
    ],
    "name": "Storage__BoolDataChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "newValue",
        "type": "bytes32"
      }
    ],
    "name": "Storage__Bytes32_DataChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "newValue",
        "type": "bytes"
      }
    ],
    "name": "Storage__BytesDataChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "name": "Storage__ChainIdAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string[]",
        "name": "newArray",
        "type": "string[]"
      }
    ],
    "name": "Storage__StringArrayChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newValue",
        "type": "string"
      }
    ],
    "name": "Storage__StringArrayDataChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newValue",
        "type": "string"
      }
    ],
    "name": "Storage__StringDataChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "Storage__TokenAddressSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      }
    ],
    "name": "Storage__TokenNameAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "newArray",
        "type": "uint256[]"
      }
    ],
    "name": "Storage__UintArrayChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newValue",
        "type": "uint256"
      }
    ],
    "name": "Storage__UintArrayDataChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newValue",
        "type": "uint256"
      }
    ],
    "name": "Storage__UintDataChanged",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "name": "addChainIdToList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "addNewTokenAddressByChainId",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "value",
        "type": "address"
      }
    ],
    "name": "addToAddressArray",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "name": "addToStringArray",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "addToUintArray",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      }
    ],
    "name": "addTokenNameToList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "chainIds",
        "type": "uint256[]"
      }
    ],
    "name": "batchAddChainIdsToList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "tokenNames",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "chainIds",
        "type": "uint256[]"
      },
      {
        "internalType": "address[]",
        "name": "tokenAddresses",
        "type": "address[]"
      }
    ],
    "name": "batchAddNewTokensAddressesByChainId",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "tokenNames",
        "type": "string[]"
      }
    ],
    "name": "batchAddTokenNamesToList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "roles",
        "type": "string[]"
      },
      {
        "internalType": "address[]",
        "name": "newOperators",
        "type": "address[]"
      }
    ],
    "name": "batchUpdateOperators",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "roles",
        "type": "string[]"
      },
      {
        "internalType": "address[]",
        "name": "operators",
        "type": "address[]"
      }
    ],
    "name": "checkOperators",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getAddr",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getAddressArray",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getAddressArrayValue",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getBool",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getBytes",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getBytes32",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getChainIdsList",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "number",
        "type": "uint256"
      }
    ],
    "name": "getKey",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "getKey",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      }
    ],
    "name": "getKey",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "role",
        "type": "string"
      }
    ],
    "name": "getOperator",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "roles",
        "type": "string[]"
      }
    ],
    "name": "getOperators",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getString",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getStringArray",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getStringArrayValue",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "name": "getTokenAddressByChainId",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "originChainId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "destinationChainId",
        "type": "uint256"
      }
    ],
    "name": "getTokenAddressesByChainIds",
    "outputs": [
      {
        "internalType": "address",
        "name": "originChainAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "destinationChainAddress",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTokenNamesList",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getUint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "getUintArray",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getUintArrayValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "name": "isAuthorizedTokenByChainId",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      }
    ],
    "name": "isChainIdInList",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "role",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "isRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      }
    ],
    "name": "isTokenNameInList",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "value",
        "type": "address"
      }
    ],
    "name": "setAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "address[]",
        "name": "array",
        "type": "address[]"
      }
    ],
    "name": "setAddressArray",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "value",
        "type": "bool"
      }
    ],
    "name": "setBool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "value",
        "type": "bytes"
      }
    ],
    "name": "setBytes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "value",
        "type": "bytes32"
      }
    ],
    "name": "setBytes32",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "name": "setString",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "string[]",
        "name": "array",
        "type": "string[]"
      }
    ],
    "name": "setStringArray",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "setUint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256[]",
        "name": "array",
        "type": "uint256[]"
      }
    ],
    "name": "setUintArray",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "value",
        "type": "address"
      }
    ],
    "name": "updateAddressArray",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "role",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "newOperator",
        "type": "address"
      }
    ],
    "name": "updateOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "name": "updateStringArray",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "updateTokenAddressByChainId",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "updateUintArray",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const