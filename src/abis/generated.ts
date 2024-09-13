import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AscendCore
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ascendCoreAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_guardian', internalType: 'address', type: 'address' },
      { name: '_priceFeed', internalType: 'address', type: 'address' },
      { name: '_feeReceiver', internalType: 'address', type: 'address' },
      { name: '_keepers', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OWNERSHIP_TRANSFER_DELAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptTransferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'commitTransferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeReceiver',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'guardian',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'keepers',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ownershipTransferDeadline',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'priceFeed',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokeTransferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_feeReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'setFeeReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_guardian', internalType: 'address', type: 'address' }],
    name: 'setGuardian',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_keepers', internalType: 'address', type: 'address' }],
    name: 'setKeepers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_priceFeed', internalType: 'address', type: 'address' }],
    name: 'setPriceFeed',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeReceiver',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FeeReceiverSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'guardian',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GuardianSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'keepers',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'KeepersSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NewOwnerAccepted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NewOwnerCommitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'revokedOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NewOwnerRevoked',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Paused' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'priceFeed',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PriceFeedSet',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Unpaused' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BorrowerOperations
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const borrowerOperationsAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_ascendCore', internalType: 'address', type: 'address' },
      { name: '_debtTokenAddress', internalType: 'address', type: 'address' },
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_minNetDebt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ASCEND_CORE',
    outputs: [
      { name: '', internalType: 'contract IAscendCore', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'CCR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DECIMAL_PRECISION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: '_collateralAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_upperHint', internalType: 'address', type: 'address' },
      { name: '_lowerHint', internalType: 'address', type: 'address' },
    ],
    name: 'addColl',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: '_collDeposit', internalType: 'uint256', type: 'uint256' },
      { name: '_collWithdrawal', internalType: 'uint256', type: 'uint256' },
      { name: '_debtChange', internalType: 'uint256', type: 'uint256' },
      { name: '_isDebtIncrease', internalType: 'bool', type: 'bool' },
      { name: '_upperHint', internalType: 'address', type: 'address' },
      { name: '_lowerHint', internalType: 'address', type: 'address' },
    ],
    name: 'adjustTrove',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'TCR', internalType: 'uint256', type: 'uint256' }],
    name: 'checkRecoveryMode',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'closeTrove',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      {
        name: 'collateralToken',
        internalType: 'contract IERC20',
        type: 'address',
      },
    ],
    name: 'configureCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'debtToken',
    outputs: [
      { name: '', internalType: 'contract IDebtToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fetchBalances',
    outputs: [
      {
        name: 'balances',
        internalType: 'struct BorrowerOperations.SystemBalances',
        type: 'tuple',
        components: [
          { name: 'collaterals', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'debts', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'prices', internalType: 'uint256[]', type: 'uint256[]' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getGlobalSystemBalances',
    outputs: [
      {
        name: 'totalPricedCollateral',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'totalDebt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTCR',
    outputs: [
      {
        name: 'globalTotalCollateralRatio',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'guardian',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedDelegate',
    outputs: [{ name: 'isApproved', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'keepers',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minNetDebt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: '_collateralAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_debtAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_upperHint', internalType: 'address', type: 'address' },
      { name: '_lowerHint', internalType: 'address', type: 'address' },
    ],
    name: 'openTrove',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
    ],
    name: 'removeTroveManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: '_debtAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_upperHint', internalType: 'address', type: 'address' },
      { name: '_lowerHint', internalType: 'address', type: 'address' },
    ],
    name: 'repayDebt',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_delegate', internalType: 'address', type: 'address' },
      { name: '_isApproved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setDelegateApproval',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_minNetDebt', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinNetDebt',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'contract ITroveManager', type: 'address' },
    ],
    name: 'troveManagersData',
    outputs: [
      {
        name: 'collateralToken',
        internalType: 'contract IERC20',
        type: 'address',
      },
      { name: 'index', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: '_collWithdrawal', internalType: 'uint256', type: 'uint256' },
      { name: '_upperHint', internalType: 'address', type: 'address' },
      { name: '_lowerHint', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawColl',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: '_debtAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_upperHint', internalType: 'address', type: 'address' },
      { name: '_lowerHint', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawDebt',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
        indexed: false,
      },
      {
        name: 'collateralToken',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'CollateralConfigured',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delegate',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'isApproved',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'DelegateApprovalSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'TroveManagerRemoved',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiCollateralHintHelpers
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multiCollateralHintHelpersAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_borrowerOperationsAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'CCR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DECIMAL_PRECISION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'borrowerOperations',
    outputs: [
      {
        name: '',
        internalType: 'contract IBorrowerOperations',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_coll', internalType: 'uint256', type: 'uint256' },
      { name: '_debt', internalType: 'uint256', type: 'uint256' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computeCR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '_coll', internalType: 'uint256', type: 'uint256' },
      { name: '_debt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computeNominalCR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: '_CR', internalType: 'uint256', type: 'uint256' },
      { name: '_numTrials', internalType: 'uint256', type: 'uint256' },
      { name: '_inputRandomSeed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getApproxHint',
    outputs: [
      { name: 'hintAddress', internalType: 'address', type: 'address' },
      { name: 'diff', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: '_debtAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
      { name: '_maxIterations', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRedemptionHints',
    outputs: [
      { name: 'firstRedemptionHint', internalType: 'address', type: 'address' },
      {
        name: 'partialRedemptionHintNICR',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'truncatedDebtAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiTroveGetter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multiTroveGetterAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      {
        name: 'troveManager',
        internalType: 'contract ITroveManager',
        type: 'address',
      },
      { name: '_startIdx', internalType: 'int256', type: 'int256' },
      { name: '_count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getMultipleSortedTroves',
    outputs: [
      {
        name: '_troves',
        internalType: 'struct MultiTroveGetter.CombinedTroveData[]',
        type: 'tuple[]',
        components: [
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'debt', internalType: 'uint256', type: 'uint256' },
          { name: 'coll', internalType: 'uint256', type: 'uint256' },
          { name: 'stake', internalType: 'uint256', type: 'uint256' },
          {
            name: 'snapshotCollateral',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'snapshotDebt', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SortedTroves
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sortedTrovesAbi = [
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'address', type: 'address' }],
    name: 'contains',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'data',
    outputs: [
      { name: 'head', internalType: 'address', type: 'address' },
      { name: 'tail', internalType: 'address', type: 'address' },
      { name: 'size', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_NICR', internalType: 'uint256', type: 'uint256' },
      { name: '_prevId', internalType: 'address', type: 'address' },
      { name: '_nextId', internalType: 'address', type: 'address' },
    ],
    name: 'findInsertPosition',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getFirst',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLast',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'address', type: 'address' }],
    name: 'getNext',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'address', type: 'address' }],
    name: 'getPrev',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSize',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'address', type: 'address' },
      { name: '_NICR', internalType: 'uint256', type: 'uint256' },
      { name: '_prevId', internalType: 'address', type: 'address' },
      { name: '_nextId', internalType: 'address', type: 'address' },
    ],
    name: 'insert',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isEmpty',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'address', type: 'address' },
      { name: '_newNICR', internalType: 'uint256', type: 'uint256' },
      { name: '_prevId', internalType: 'address', type: 'address' },
      { name: '_nextId', internalType: 'address', type: 'address' },
    ],
    name: 'reInsert',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'address', type: 'address' }],
    name: 'remove',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_troveManagerAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setAddresses',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'troveManager',
    outputs: [
      { name: '', internalType: 'contract ITroveManager', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_NICR', internalType: 'uint256', type: 'uint256' },
      { name: '_prevId', internalType: 'address', type: 'address' },
      { name: '_nextId', internalType: 'address', type: 'address' },
    ],
    name: 'validInsertPosition',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_id', internalType: 'address', type: 'address', indexed: false },
      {
        name: '_NICR',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NodeAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_id', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NodeRemoved',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TroveManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const troveManagerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_ascendCore', internalType: 'address', type: 'address' },
      { name: '_debtTokenAddress', internalType: 'address', type: 'address' },
      {
        name: '_borrowerOperationsAddress',
        internalType: 'address',
        type: 'address',
      },
      { name: '_liquidationManager', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ASCEND_CORE',
    outputs: [
      { name: '', internalType: 'contract IAscendCore', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BOOTSTRAP_PERIOD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'CCR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DECIMAL_PRECISION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'L_collShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'L_debt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MCR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'Troves',
    outputs: [
      { name: 'debt', internalType: 'uint256', type: 'uint256' },
      { name: 'collShares', internalType: 'uint256', type: 'uint256' },
      { name: 'stake', internalType: 'uint256', type: 'uint256' },
      {
        name: 'status',
        internalType: 'enum TroveManager.Status',
        type: 'uint8',
      },
      { name: 'arrayIndex', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'collSurplus', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addCollateralSurplus',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'applyPendingRewards',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'borrowerOperationsAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'calculateUnrealizedActiveBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_receiver', internalType: 'address', type: 'address' }],
    name: 'claimCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_borrower', internalType: 'address', type: 'address' },
      { name: '_receiver', internalType: 'address', type: 'address' },
      { name: 'collAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'debtAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'closeTrove',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'closeTroveByLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'collGasCompPercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'collateralToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'convertEthToYieldTokens',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'convertSharesToEth',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'convertSharesToYieldTokens',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'convertYieldTokensToEth',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'convertYieldTokensToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentHarvestStrategy',
    outputs: [
      { name: '', internalType: 'contract IHarvestStrategy', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'debtToken',
    outputs: [
      { name: '', internalType: 'contract IDebtToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'debt', internalType: 'uint256', type: 'uint256' },
      { name: 'collAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseDebtAndSendCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultedCollShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultedDebt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fetchExchangeRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fetchPriceInUsd',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_liquidator', internalType: 'address', type: 'address' },
      { name: '_debt', internalType: 'uint256', type: 'uint256' },
      { name: '_collAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_collSurplusAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_collGasComp', internalType: 'uint256', type: 'uint256' },
      { name: '_liquidationFee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'finalizeLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_borrower', internalType: 'address', type: 'address' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getCurrentICR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'getEntireDebtAndCollShares',
    outputs: [
      { name: 'debt', internalType: 'uint256', type: 'uint256' },
      { name: 'collShares', internalType: 'uint256', type: 'uint256' },
      { name: 'pendingDebtReward', internalType: 'uint256', type: 'uint256' },
      {
        name: 'pendingCollSharesReward',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getEntireSystemBalances',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getEntireSystemColl',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getEntireSystemCollShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getEntireSystemDebt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'getNominalICR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'getPendingCollSharesAndDebtRewards',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_collateralDrawn', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRedemptionFeeWithDecay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRedemptionRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRedemptionRateWithDecay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalActiveCollShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalActiveDebt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'getTroveCollAndDebt',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'getTroveCollSharesAndDebt',
    outputs: [
      { name: 'collShares', internalType: 'uint256', type: 'uint256' },
      { name: 'debt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_index', internalType: 'uint256', type: 'uint256' }],
    name: 'getTroveFromTroveOwnersArray',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTroveOwnersCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'getTroveStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'getTroveStatus',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'guardian',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'harvest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'harvestableBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'hasPendingRewards',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'keepers',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastCollSharesError_Redistribution',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastDebtError_Redistribution',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastFeeOperationTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'liquidationFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'liquidationManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxRedemptionFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxSystemDebt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minuteDecayFactor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'movePendingTroveRewardsToActiveBalances',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_borrower', internalType: 'address', type: 'address' },
      { name: '_collateralAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_compositeDebt', internalType: 'uint256', type: 'uint256' },
      { name: '_upperHint', internalType: 'address', type: 'address' },
      { name: '_lowerHint', internalType: 'address', type: 'address' },
    ],
    name: 'openTrove',
    outputs: [
      { name: 'stake', internalType: 'uint256', type: 'uint256' },
      { name: 'arrayIndex', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'preemptivelyHarvest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'priceFeed',
    outputs: [
      { name: '', internalType: 'contract IPriceFeed', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_debtAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: '_firstRedemptionHint',
        internalType: 'address',
        type: 'address',
      },
      {
        name: '_upperPartialRedemptionHint',
        internalType: 'address',
        type: 'address',
      },
      {
        name: '_lowerPartialRedemptionHint',
        internalType: 'address',
        type: 'address',
      },
      {
        name: '_partialRedemptionHintNICR',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_maxIterations', internalType: 'uint256', type: 'uint256' },
      { name: '_maxFeePercentage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'redeemCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'redemptionFeeFloor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'rewardSnapshots',
    outputs: [
      { name: 'collShares', internalType: 'uint256', type: 'uint256' },
      { name: 'debt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'serviceFeePercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_priceFeedAddress', internalType: 'address', type: 'address' },
      {
        name: '_sortedTrovesAddress',
        internalType: 'address',
        type: 'address',
      },
      { name: '_collateralToken', internalType: 'address', type: 'address' },
    ],
    name: 'setAddresses',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_collGasCompPercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setCollGasCompPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_harvestStrategyAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setHarvestStrategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_liquidationFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setLiquidationFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_minuteDecayFactor', internalType: 'uint256', type: 'uint256' },
      { name: '_redemptionFeeFloor', internalType: 'uint256', type: 'uint256' },
      { name: '_maxRedemptionFee', internalType: 'uint256', type: 'uint256' },
      { name: '_maxSystemDebt', internalType: 'uint256', type: 'uint256' },
      { name: '_MCR', internalType: 'uint256', type: 'uint256' },
      {
        name: '_collGasCompPercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: '_liquidationFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setParameters',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_paused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_priceFeedAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setPriceFeed',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_serviceFeePercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setServiceFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sortedTroves',
    outputs: [
      { name: '', internalType: 'contract ISortedTroves', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startSunset',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sunsetting',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'surplusCollShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'systemDeploymentTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalActiveCollBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalActiveCollShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalActiveDebt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalCollExpectedValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalCollShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalStakes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalStakesSnapshot',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSystemCollSharesSnapshot',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_isDebtIncrease', internalType: 'bool', type: 'bool' },
      { name: '_debtChange', internalType: 'uint256', type: 'uint256' },
      { name: '_netDebtChange', internalType: 'uint256', type: 'uint256' },
      { name: '_isCollIncrease', internalType: 'bool', type: 'bool' },
      { name: '_collChange', internalType: 'uint256', type: 'uint256' },
      { name: '_upperHint', internalType: 'address', type: 'address' },
      { name: '_lowerHint', internalType: 'address', type: 'address' },
      { name: '_borrower', internalType: 'address', type: 'address' },
      { name: '_receiver', internalType: 'address', type: 'address' },
    ],
    name: 'updateTroveFromAdjustment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_baseRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BaseRateUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_to', internalType: 'address', type: 'address', indexed: false },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CollateralSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Harvested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_L_collShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_L_debt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LTermsUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_lastFeeOpTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LastFeeOpTimeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_attemptedDebtAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_actualDebtAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_collateralSent',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_collateralFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Redemption',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_totalStakesSnapshot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_totalSystemCollSharesSnapshot',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SystemSnapshotsUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_newTotalStakes',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TotalStakesUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_borrower',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_newIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TroveIndexUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_L_collShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_L_debt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TroveSnapshotsUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_borrower',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_debt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_collShares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_stake',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_operation',
        internalType: 'enum TroveManager.TroveManagerOperation',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'TroveUpdated',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__
 */
export const useReadAscendCore = /*#__PURE__*/ createUseReadContract({
  abi: ascendCoreAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"OWNERSHIP_TRANSFER_DELAY"`
 */
export const useReadAscendCoreOwnershipTransferDelay =
  /*#__PURE__*/ createUseReadContract({
    abi: ascendCoreAbi,
    functionName: 'OWNERSHIP_TRANSFER_DELAY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"feeReceiver"`
 */
export const useReadAscendCoreFeeReceiver = /*#__PURE__*/ createUseReadContract(
  { abi: ascendCoreAbi, functionName: 'feeReceiver' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"guardian"`
 */
export const useReadAscendCoreGuardian = /*#__PURE__*/ createUseReadContract({
  abi: ascendCoreAbi,
  functionName: 'guardian',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"keepers"`
 */
export const useReadAscendCoreKeepers = /*#__PURE__*/ createUseReadContract({
  abi: ascendCoreAbi,
  functionName: 'keepers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAscendCoreOwner = /*#__PURE__*/ createUseReadContract({
  abi: ascendCoreAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"ownershipTransferDeadline"`
 */
export const useReadAscendCoreOwnershipTransferDeadline =
  /*#__PURE__*/ createUseReadContract({
    abi: ascendCoreAbi,
    functionName: 'ownershipTransferDeadline',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"paused"`
 */
export const useReadAscendCorePaused = /*#__PURE__*/ createUseReadContract({
  abi: ascendCoreAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const useReadAscendCorePendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: ascendCoreAbi,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"priceFeed"`
 */
export const useReadAscendCorePriceFeed = /*#__PURE__*/ createUseReadContract({
  abi: ascendCoreAbi,
  functionName: 'priceFeed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"startTime"`
 */
export const useReadAscendCoreStartTime = /*#__PURE__*/ createUseReadContract({
  abi: ascendCoreAbi,
  functionName: 'startTime',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ascendCoreAbi}__
 */
export const useWriteAscendCore = /*#__PURE__*/ createUseWriteContract({
  abi: ascendCoreAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"acceptTransferOwnership"`
 */
export const useWriteAscendCoreAcceptTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ascendCoreAbi,
    functionName: 'acceptTransferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"commitTransferOwnership"`
 */
export const useWriteAscendCoreCommitTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ascendCoreAbi,
    functionName: 'commitTransferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"revokeTransferOwnership"`
 */
export const useWriteAscendCoreRevokeTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ascendCoreAbi,
    functionName: 'revokeTransferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setFeeReceiver"`
 */
export const useWriteAscendCoreSetFeeReceiver =
  /*#__PURE__*/ createUseWriteContract({
    abi: ascendCoreAbi,
    functionName: 'setFeeReceiver',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setGuardian"`
 */
export const useWriteAscendCoreSetGuardian =
  /*#__PURE__*/ createUseWriteContract({
    abi: ascendCoreAbi,
    functionName: 'setGuardian',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setKeepers"`
 */
export const useWriteAscendCoreSetKeepers =
  /*#__PURE__*/ createUseWriteContract({
    abi: ascendCoreAbi,
    functionName: 'setKeepers',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setPaused"`
 */
export const useWriteAscendCoreSetPaused = /*#__PURE__*/ createUseWriteContract(
  { abi: ascendCoreAbi, functionName: 'setPaused' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setPriceFeed"`
 */
export const useWriteAscendCoreSetPriceFeed =
  /*#__PURE__*/ createUseWriteContract({
    abi: ascendCoreAbi,
    functionName: 'setPriceFeed',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ascendCoreAbi}__
 */
export const useSimulateAscendCore = /*#__PURE__*/ createUseSimulateContract({
  abi: ascendCoreAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"acceptTransferOwnership"`
 */
export const useSimulateAscendCoreAcceptTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ascendCoreAbi,
    functionName: 'acceptTransferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"commitTransferOwnership"`
 */
export const useSimulateAscendCoreCommitTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ascendCoreAbi,
    functionName: 'commitTransferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"revokeTransferOwnership"`
 */
export const useSimulateAscendCoreRevokeTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ascendCoreAbi,
    functionName: 'revokeTransferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setFeeReceiver"`
 */
export const useSimulateAscendCoreSetFeeReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ascendCoreAbi,
    functionName: 'setFeeReceiver',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setGuardian"`
 */
export const useSimulateAscendCoreSetGuardian =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ascendCoreAbi,
    functionName: 'setGuardian',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setKeepers"`
 */
export const useSimulateAscendCoreSetKeepers =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ascendCoreAbi,
    functionName: 'setKeepers',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setPaused"`
 */
export const useSimulateAscendCoreSetPaused =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ascendCoreAbi,
    functionName: 'setPaused',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ascendCoreAbi}__ and `functionName` set to `"setPriceFeed"`
 */
export const useSimulateAscendCoreSetPriceFeed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ascendCoreAbi,
    functionName: 'setPriceFeed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__
 */
export const useWatchAscendCoreEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ascendCoreAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__ and `eventName` set to `"FeeReceiverSet"`
 */
export const useWatchAscendCoreFeeReceiverSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ascendCoreAbi,
    eventName: 'FeeReceiverSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__ and `eventName` set to `"GuardianSet"`
 */
export const useWatchAscendCoreGuardianSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ascendCoreAbi,
    eventName: 'GuardianSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__ and `eventName` set to `"KeepersSet"`
 */
export const useWatchAscendCoreKeepersSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ascendCoreAbi,
    eventName: 'KeepersSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__ and `eventName` set to `"NewOwnerAccepted"`
 */
export const useWatchAscendCoreNewOwnerAcceptedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ascendCoreAbi,
    eventName: 'NewOwnerAccepted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__ and `eventName` set to `"NewOwnerCommitted"`
 */
export const useWatchAscendCoreNewOwnerCommittedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ascendCoreAbi,
    eventName: 'NewOwnerCommitted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__ and `eventName` set to `"NewOwnerRevoked"`
 */
export const useWatchAscendCoreNewOwnerRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ascendCoreAbi,
    eventName: 'NewOwnerRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchAscendCorePausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ascendCoreAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__ and `eventName` set to `"PriceFeedSet"`
 */
export const useWatchAscendCorePriceFeedSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ascendCoreAbi,
    eventName: 'PriceFeedSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ascendCoreAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchAscendCoreUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ascendCoreAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__
 */
export const useReadBorrowerOperations = /*#__PURE__*/ createUseReadContract({
  abi: borrowerOperationsAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"ASCEND_CORE"`
 */
export const useReadBorrowerOperationsAscendCore =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'ASCEND_CORE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"CCR"`
 */
export const useReadBorrowerOperationsCcr = /*#__PURE__*/ createUseReadContract(
  { abi: borrowerOperationsAbi, functionName: 'CCR' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"DECIMAL_PRECISION"`
 */
export const useReadBorrowerOperationsDecimalPrecision =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'DECIMAL_PRECISION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"checkRecoveryMode"`
 */
export const useReadBorrowerOperationsCheckRecoveryMode =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'checkRecoveryMode',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"debtToken"`
 */
export const useReadBorrowerOperationsDebtToken =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'debtToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"factory"`
 */
export const useReadBorrowerOperationsFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'factory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"guardian"`
 */
export const useReadBorrowerOperationsGuardian =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'guardian',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"isApprovedDelegate"`
 */
export const useReadBorrowerOperationsIsApprovedDelegate =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'isApprovedDelegate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"keepers"`
 */
export const useReadBorrowerOperationsKeepers =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'keepers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"minNetDebt"`
 */
export const useReadBorrowerOperationsMinNetDebt =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'minNetDebt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"owner"`
 */
export const useReadBorrowerOperationsOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"troveManagersData"`
 */
export const useReadBorrowerOperationsTroveManagersData =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowerOperationsAbi,
    functionName: 'troveManagersData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__
 */
export const useWriteBorrowerOperations = /*#__PURE__*/ createUseWriteContract({
  abi: borrowerOperationsAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"addColl"`
 */
export const useWriteBorrowerOperationsAddColl =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'addColl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"adjustTrove"`
 */
export const useWriteBorrowerOperationsAdjustTrove =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'adjustTrove',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"closeTrove"`
 */
export const useWriteBorrowerOperationsCloseTrove =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'closeTrove',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"configureCollateral"`
 */
export const useWriteBorrowerOperationsConfigureCollateral =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'configureCollateral',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"fetchBalances"`
 */
export const useWriteBorrowerOperationsFetchBalances =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'fetchBalances',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"getGlobalSystemBalances"`
 */
export const useWriteBorrowerOperationsGetGlobalSystemBalances =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'getGlobalSystemBalances',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"getTCR"`
 */
export const useWriteBorrowerOperationsGetTcr =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'getTCR',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"openTrove"`
 */
export const useWriteBorrowerOperationsOpenTrove =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'openTrove',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"removeTroveManager"`
 */
export const useWriteBorrowerOperationsRemoveTroveManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'removeTroveManager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"repayDebt"`
 */
export const useWriteBorrowerOperationsRepayDebt =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'repayDebt',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"setDelegateApproval"`
 */
export const useWriteBorrowerOperationsSetDelegateApproval =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'setDelegateApproval',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"setMinNetDebt"`
 */
export const useWriteBorrowerOperationsSetMinNetDebt =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'setMinNetDebt',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"withdrawColl"`
 */
export const useWriteBorrowerOperationsWithdrawColl =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'withdrawColl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"withdrawDebt"`
 */
export const useWriteBorrowerOperationsWithdrawDebt =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowerOperationsAbi,
    functionName: 'withdrawDebt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__
 */
export const useSimulateBorrowerOperations =
  /*#__PURE__*/ createUseSimulateContract({ abi: borrowerOperationsAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"addColl"`
 */
export const useSimulateBorrowerOperationsAddColl =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'addColl',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"adjustTrove"`
 */
export const useSimulateBorrowerOperationsAdjustTrove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'adjustTrove',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"closeTrove"`
 */
export const useSimulateBorrowerOperationsCloseTrove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'closeTrove',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"configureCollateral"`
 */
export const useSimulateBorrowerOperationsConfigureCollateral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'configureCollateral',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"fetchBalances"`
 */
export const useSimulateBorrowerOperationsFetchBalances =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'fetchBalances',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"getGlobalSystemBalances"`
 */
export const useSimulateBorrowerOperationsGetGlobalSystemBalances =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'getGlobalSystemBalances',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"getTCR"`
 */
export const useSimulateBorrowerOperationsGetTcr =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'getTCR',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"openTrove"`
 */
export const useSimulateBorrowerOperationsOpenTrove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'openTrove',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"removeTroveManager"`
 */
export const useSimulateBorrowerOperationsRemoveTroveManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'removeTroveManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"repayDebt"`
 */
export const useSimulateBorrowerOperationsRepayDebt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'repayDebt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"setDelegateApproval"`
 */
export const useSimulateBorrowerOperationsSetDelegateApproval =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'setDelegateApproval',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"setMinNetDebt"`
 */
export const useSimulateBorrowerOperationsSetMinNetDebt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'setMinNetDebt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"withdrawColl"`
 */
export const useSimulateBorrowerOperationsWithdrawColl =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'withdrawColl',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `functionName` set to `"withdrawDebt"`
 */
export const useSimulateBorrowerOperationsWithdrawDebt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowerOperationsAbi,
    functionName: 'withdrawDebt',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowerOperationsAbi}__
 */
export const useWatchBorrowerOperationsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: borrowerOperationsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `eventName` set to `"CollateralConfigured"`
 */
export const useWatchBorrowerOperationsCollateralConfiguredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowerOperationsAbi,
    eventName: 'CollateralConfigured',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `eventName` set to `"DelegateApprovalSet"`
 */
export const useWatchBorrowerOperationsDelegateApprovalSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowerOperationsAbi,
    eventName: 'DelegateApprovalSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowerOperationsAbi}__ and `eventName` set to `"TroveManagerRemoved"`
 */
export const useWatchBorrowerOperationsTroveManagerRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowerOperationsAbi,
    eventName: 'TroveManagerRemoved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__
 */
export const useReadMultiCollateralHintHelpers =
  /*#__PURE__*/ createUseReadContract({ abi: multiCollateralHintHelpersAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__ and `functionName` set to `"CCR"`
 */
export const useReadMultiCollateralHintHelpersCcr =
  /*#__PURE__*/ createUseReadContract({
    abi: multiCollateralHintHelpersAbi,
    functionName: 'CCR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__ and `functionName` set to `"DECIMAL_PRECISION"`
 */
export const useReadMultiCollateralHintHelpersDecimalPrecision =
  /*#__PURE__*/ createUseReadContract({
    abi: multiCollateralHintHelpersAbi,
    functionName: 'DECIMAL_PRECISION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__ and `functionName` set to `"borrowerOperations"`
 */
export const useReadMultiCollateralHintHelpersBorrowerOperations =
  /*#__PURE__*/ createUseReadContract({
    abi: multiCollateralHintHelpersAbi,
    functionName: 'borrowerOperations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__ and `functionName` set to `"computeCR"`
 */
export const useReadMultiCollateralHintHelpersComputeCr =
  /*#__PURE__*/ createUseReadContract({
    abi: multiCollateralHintHelpersAbi,
    functionName: 'computeCR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__ and `functionName` set to `"computeNominalCR"`
 */
export const useReadMultiCollateralHintHelpersComputeNominalCr =
  /*#__PURE__*/ createUseReadContract({
    abi: multiCollateralHintHelpersAbi,
    functionName: 'computeNominalCR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__ and `functionName` set to `"getApproxHint"`
 */
export const useReadMultiCollateralHintHelpersGetApproxHint =
  /*#__PURE__*/ createUseReadContract({
    abi: multiCollateralHintHelpersAbi,
    functionName: 'getApproxHint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__
 */
export const useWriteMultiCollateralHintHelpers =
  /*#__PURE__*/ createUseWriteContract({ abi: multiCollateralHintHelpersAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__ and `functionName` set to `"getRedemptionHints"`
 */
export const useWriteMultiCollateralHintHelpersGetRedemptionHints =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiCollateralHintHelpersAbi,
    functionName: 'getRedemptionHints',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__
 */
export const useSimulateMultiCollateralHintHelpers =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiCollateralHintHelpersAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiCollateralHintHelpersAbi}__ and `functionName` set to `"getRedemptionHints"`
 */
export const useSimulateMultiCollateralHintHelpersGetRedemptionHints =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiCollateralHintHelpersAbi,
    functionName: 'getRedemptionHints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiTroveGetterAbi}__
 */
export const useReadMultiTroveGetter = /*#__PURE__*/ createUseReadContract({
  abi: multiTroveGetterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiTroveGetterAbi}__ and `functionName` set to `"getMultipleSortedTroves"`
 */
export const useReadMultiTroveGetterGetMultipleSortedTroves =
  /*#__PURE__*/ createUseReadContract({
    abi: multiTroveGetterAbi,
    functionName: 'getMultipleSortedTroves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__
 */
export const useReadSortedTroves = /*#__PURE__*/ createUseReadContract({
  abi: sortedTrovesAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"contains"`
 */
export const useReadSortedTrovesContains = /*#__PURE__*/ createUseReadContract({
  abi: sortedTrovesAbi,
  functionName: 'contains',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"data"`
 */
export const useReadSortedTrovesData = /*#__PURE__*/ createUseReadContract({
  abi: sortedTrovesAbi,
  functionName: 'data',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"findInsertPosition"`
 */
export const useReadSortedTrovesFindInsertPosition =
  /*#__PURE__*/ createUseReadContract({
    abi: sortedTrovesAbi,
    functionName: 'findInsertPosition',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"getFirst"`
 */
export const useReadSortedTrovesGetFirst = /*#__PURE__*/ createUseReadContract({
  abi: sortedTrovesAbi,
  functionName: 'getFirst',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"getLast"`
 */
export const useReadSortedTrovesGetLast = /*#__PURE__*/ createUseReadContract({
  abi: sortedTrovesAbi,
  functionName: 'getLast',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"getNext"`
 */
export const useReadSortedTrovesGetNext = /*#__PURE__*/ createUseReadContract({
  abi: sortedTrovesAbi,
  functionName: 'getNext',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"getPrev"`
 */
export const useReadSortedTrovesGetPrev = /*#__PURE__*/ createUseReadContract({
  abi: sortedTrovesAbi,
  functionName: 'getPrev',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"getSize"`
 */
export const useReadSortedTrovesGetSize = /*#__PURE__*/ createUseReadContract({
  abi: sortedTrovesAbi,
  functionName: 'getSize',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"isEmpty"`
 */
export const useReadSortedTrovesIsEmpty = /*#__PURE__*/ createUseReadContract({
  abi: sortedTrovesAbi,
  functionName: 'isEmpty',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"troveManager"`
 */
export const useReadSortedTrovesTroveManager =
  /*#__PURE__*/ createUseReadContract({
    abi: sortedTrovesAbi,
    functionName: 'troveManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"validInsertPosition"`
 */
export const useReadSortedTrovesValidInsertPosition =
  /*#__PURE__*/ createUseReadContract({
    abi: sortedTrovesAbi,
    functionName: 'validInsertPosition',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sortedTrovesAbi}__
 */
export const useWriteSortedTroves = /*#__PURE__*/ createUseWriteContract({
  abi: sortedTrovesAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"insert"`
 */
export const useWriteSortedTrovesInsert = /*#__PURE__*/ createUseWriteContract({
  abi: sortedTrovesAbi,
  functionName: 'insert',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"reInsert"`
 */
export const useWriteSortedTrovesReInsert =
  /*#__PURE__*/ createUseWriteContract({
    abi: sortedTrovesAbi,
    functionName: 'reInsert',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"remove"`
 */
export const useWriteSortedTrovesRemove = /*#__PURE__*/ createUseWriteContract({
  abi: sortedTrovesAbi,
  functionName: 'remove',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"setAddresses"`
 */
export const useWriteSortedTrovesSetAddresses =
  /*#__PURE__*/ createUseWriteContract({
    abi: sortedTrovesAbi,
    functionName: 'setAddresses',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sortedTrovesAbi}__
 */
export const useSimulateSortedTroves = /*#__PURE__*/ createUseSimulateContract({
  abi: sortedTrovesAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"insert"`
 */
export const useSimulateSortedTrovesInsert =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sortedTrovesAbi,
    functionName: 'insert',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"reInsert"`
 */
export const useSimulateSortedTrovesReInsert =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sortedTrovesAbi,
    functionName: 'reInsert',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"remove"`
 */
export const useSimulateSortedTrovesRemove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sortedTrovesAbi,
    functionName: 'remove',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sortedTrovesAbi}__ and `functionName` set to `"setAddresses"`
 */
export const useSimulateSortedTrovesSetAddresses =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sortedTrovesAbi,
    functionName: 'setAddresses',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sortedTrovesAbi}__
 */
export const useWatchSortedTrovesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: sortedTrovesAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sortedTrovesAbi}__ and `eventName` set to `"NodeAdded"`
 */
export const useWatchSortedTrovesNodeAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: sortedTrovesAbi,
    eventName: 'NodeAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sortedTrovesAbi}__ and `eventName` set to `"NodeRemoved"`
 */
export const useWatchSortedTrovesNodeRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: sortedTrovesAbi,
    eventName: 'NodeRemoved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__
 */
export const useReadTroveManager = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"ASCEND_CORE"`
 */
export const useReadTroveManagerAscendCore =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'ASCEND_CORE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"BOOTSTRAP_PERIOD"`
 */
export const useReadTroveManagerBootstrapPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'BOOTSTRAP_PERIOD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"CCR"`
 */
export const useReadTroveManagerCcr = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
  functionName: 'CCR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"DECIMAL_PRECISION"`
 */
export const useReadTroveManagerDecimalPrecision =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'DECIMAL_PRECISION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"L_collShares"`
 */
export const useReadTroveManagerLCollShares =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'L_collShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"L_debt"`
 */
export const useReadTroveManagerLDebt = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
  functionName: 'L_debt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"MCR"`
 */
export const useReadTroveManagerMcr = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
  functionName: 'MCR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"Troves"`
 */
export const useReadTroveManagerTroves = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
  functionName: 'Troves',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"baseRate"`
 */
export const useReadTroveManagerBaseRate = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
  functionName: 'baseRate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"borrowerOperationsAddress"`
 */
export const useReadTroveManagerBorrowerOperationsAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'borrowerOperationsAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"collGasCompPercentage"`
 */
export const useReadTroveManagerCollGasCompPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'collGasCompPercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"collateralToken"`
 */
export const useReadTroveManagerCollateralToken =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'collateralToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"currentHarvestStrategy"`
 */
export const useReadTroveManagerCurrentHarvestStrategy =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'currentHarvestStrategy',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"debtToken"`
 */
export const useReadTroveManagerDebtToken = /*#__PURE__*/ createUseReadContract(
  { abi: troveManagerAbi, functionName: 'debtToken' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"defaultedCollShares"`
 */
export const useReadTroveManagerDefaultedCollShares =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'defaultedCollShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"defaultedDebt"`
 */
export const useReadTroveManagerDefaultedDebt =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'defaultedDebt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getEntireDebtAndCollShares"`
 */
export const useReadTroveManagerGetEntireDebtAndCollShares =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getEntireDebtAndCollShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getEntireSystemCollShares"`
 */
export const useReadTroveManagerGetEntireSystemCollShares =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getEntireSystemCollShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getEntireSystemDebt"`
 */
export const useReadTroveManagerGetEntireSystemDebt =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getEntireSystemDebt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getNominalICR"`
 */
export const useReadTroveManagerGetNominalIcr =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getNominalICR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getPendingCollSharesAndDebtRewards"`
 */
export const useReadTroveManagerGetPendingCollSharesAndDebtRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getPendingCollSharesAndDebtRewards',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getRedemptionFeeWithDecay"`
 */
export const useReadTroveManagerGetRedemptionFeeWithDecay =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getRedemptionFeeWithDecay',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getRedemptionRate"`
 */
export const useReadTroveManagerGetRedemptionRate =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getRedemptionRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getRedemptionRateWithDecay"`
 */
export const useReadTroveManagerGetRedemptionRateWithDecay =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getRedemptionRateWithDecay',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getTotalActiveCollShares"`
 */
export const useReadTroveManagerGetTotalActiveCollShares =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getTotalActiveCollShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getTotalActiveDebt"`
 */
export const useReadTroveManagerGetTotalActiveDebt =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getTotalActiveDebt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getTroveCollSharesAndDebt"`
 */
export const useReadTroveManagerGetTroveCollSharesAndDebt =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getTroveCollSharesAndDebt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getTroveFromTroveOwnersArray"`
 */
export const useReadTroveManagerGetTroveFromTroveOwnersArray =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getTroveFromTroveOwnersArray',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getTroveOwnersCount"`
 */
export const useReadTroveManagerGetTroveOwnersCount =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getTroveOwnersCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getTroveStake"`
 */
export const useReadTroveManagerGetTroveStake =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getTroveStake',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getTroveStatus"`
 */
export const useReadTroveManagerGetTroveStatus =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'getTroveStatus',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"guardian"`
 */
export const useReadTroveManagerGuardian = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
  functionName: 'guardian',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"harvestableBalance"`
 */
export const useReadTroveManagerHarvestableBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'harvestableBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"hasPendingRewards"`
 */
export const useReadTroveManagerHasPendingRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'hasPendingRewards',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"keepers"`
 */
export const useReadTroveManagerKeepers = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
  functionName: 'keepers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"lastCollSharesError_Redistribution"`
 */
export const useReadTroveManagerLastCollSharesErrorRedistribution =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'lastCollSharesError_Redistribution',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"lastDebtError_Redistribution"`
 */
export const useReadTroveManagerLastDebtErrorRedistribution =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'lastDebtError_Redistribution',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"lastFeeOperationTime"`
 */
export const useReadTroveManagerLastFeeOperationTime =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'lastFeeOperationTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"liquidationFeePercentage"`
 */
export const useReadTroveManagerLiquidationFeePercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'liquidationFeePercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"liquidationManager"`
 */
export const useReadTroveManagerLiquidationManager =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'liquidationManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"maxRedemptionFee"`
 */
export const useReadTroveManagerMaxRedemptionFee =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'maxRedemptionFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"maxSystemDebt"`
 */
export const useReadTroveManagerMaxSystemDebt =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'maxSystemDebt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"minuteDecayFactor"`
 */
export const useReadTroveManagerMinuteDecayFactor =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'minuteDecayFactor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"owner"`
 */
export const useReadTroveManagerOwner = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"paused"`
 */
export const useReadTroveManagerPaused = /*#__PURE__*/ createUseReadContract({
  abi: troveManagerAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"priceFeed"`
 */
export const useReadTroveManagerPriceFeed = /*#__PURE__*/ createUseReadContract(
  { abi: troveManagerAbi, functionName: 'priceFeed' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"redemptionFeeFloor"`
 */
export const useReadTroveManagerRedemptionFeeFloor =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'redemptionFeeFloor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"rewardSnapshots"`
 */
export const useReadTroveManagerRewardSnapshots =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'rewardSnapshots',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"serviceFeePercentage"`
 */
export const useReadTroveManagerServiceFeePercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'serviceFeePercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"sortedTroves"`
 */
export const useReadTroveManagerSortedTroves =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'sortedTroves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"sunsetting"`
 */
export const useReadTroveManagerSunsetting =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'sunsetting',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"surplusCollShares"`
 */
export const useReadTroveManagerSurplusCollShares =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'surplusCollShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"systemDeploymentTime"`
 */
export const useReadTroveManagerSystemDeploymentTime =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'systemDeploymentTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"totalActiveCollBalance"`
 */
export const useReadTroveManagerTotalActiveCollBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'totalActiveCollBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"totalActiveCollShares"`
 */
export const useReadTroveManagerTotalActiveCollShares =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'totalActiveCollShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"totalActiveDebt"`
 */
export const useReadTroveManagerTotalActiveDebt =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'totalActiveDebt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"totalCollExpectedValue"`
 */
export const useReadTroveManagerTotalCollExpectedValue =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'totalCollExpectedValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"totalCollShares"`
 */
export const useReadTroveManagerTotalCollShares =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'totalCollShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"totalStakes"`
 */
export const useReadTroveManagerTotalStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'totalStakes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"totalStakesSnapshot"`
 */
export const useReadTroveManagerTotalStakesSnapshot =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'totalStakesSnapshot',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"totalSystemCollSharesSnapshot"`
 */
export const useReadTroveManagerTotalSystemCollSharesSnapshot =
  /*#__PURE__*/ createUseReadContract({
    abi: troveManagerAbi,
    functionName: 'totalSystemCollSharesSnapshot',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__
 */
export const useWriteTroveManager = /*#__PURE__*/ createUseWriteContract({
  abi: troveManagerAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"addCollateralSurplus"`
 */
export const useWriteTroveManagerAddCollateralSurplus =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'addCollateralSurplus',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"applyPendingRewards"`
 */
export const useWriteTroveManagerApplyPendingRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'applyPendingRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"calculateUnrealizedActiveBalance"`
 */
export const useWriteTroveManagerCalculateUnrealizedActiveBalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'calculateUnrealizedActiveBalance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"claimCollateral"`
 */
export const useWriteTroveManagerClaimCollateral =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'claimCollateral',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"closeTrove"`
 */
export const useWriteTroveManagerCloseTrove =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'closeTrove',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"closeTroveByLiquidation"`
 */
export const useWriteTroveManagerCloseTroveByLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'closeTroveByLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertEthToYieldTokens"`
 */
export const useWriteTroveManagerConvertEthToYieldTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'convertEthToYieldTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertSharesToEth"`
 */
export const useWriteTroveManagerConvertSharesToEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'convertSharesToEth',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertSharesToYieldTokens"`
 */
export const useWriteTroveManagerConvertSharesToYieldTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'convertSharesToYieldTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertYieldTokensToEth"`
 */
export const useWriteTroveManagerConvertYieldTokensToEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'convertYieldTokensToEth',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertYieldTokensToShares"`
 */
export const useWriteTroveManagerConvertYieldTokensToShares =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'convertYieldTokensToShares',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"decreaseDebtAndSendCollateral"`
 */
export const useWriteTroveManagerDecreaseDebtAndSendCollateral =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'decreaseDebtAndSendCollateral',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"fetchExchangeRate"`
 */
export const useWriteTroveManagerFetchExchangeRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'fetchExchangeRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"fetchPriceInUsd"`
 */
export const useWriteTroveManagerFetchPriceInUsd =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'fetchPriceInUsd',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"finalizeLiquidation"`
 */
export const useWriteTroveManagerFinalizeLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'finalizeLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getCurrentICR"`
 */
export const useWriteTroveManagerGetCurrentIcr =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'getCurrentICR',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getEntireSystemBalances"`
 */
export const useWriteTroveManagerGetEntireSystemBalances =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'getEntireSystemBalances',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getEntireSystemColl"`
 */
export const useWriteTroveManagerGetEntireSystemColl =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'getEntireSystemColl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getTroveCollAndDebt"`
 */
export const useWriteTroveManagerGetTroveCollAndDebt =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'getTroveCollAndDebt',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"harvest"`
 */
export const useWriteTroveManagerHarvest = /*#__PURE__*/ createUseWriteContract(
  { abi: troveManagerAbi, functionName: 'harvest' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"movePendingTroveRewardsToActiveBalances"`
 */
export const useWriteTroveManagerMovePendingTroveRewardsToActiveBalances =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'movePendingTroveRewardsToActiveBalances',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"openTrove"`
 */
export const useWriteTroveManagerOpenTrove =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'openTrove',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"preemptivelyHarvest"`
 */
export const useWriteTroveManagerPreemptivelyHarvest =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'preemptivelyHarvest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"redeemCollateral"`
 */
export const useWriteTroveManagerRedeemCollateral =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'redeemCollateral',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setAddresses"`
 */
export const useWriteTroveManagerSetAddresses =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'setAddresses',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setCollGasCompPercentage"`
 */
export const useWriteTroveManagerSetCollGasCompPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'setCollGasCompPercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setHarvestStrategy"`
 */
export const useWriteTroveManagerSetHarvestStrategy =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'setHarvestStrategy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setLiquidationFeePercentage"`
 */
export const useWriteTroveManagerSetLiquidationFeePercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'setLiquidationFeePercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setParameters"`
 */
export const useWriteTroveManagerSetParameters =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'setParameters',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setPaused"`
 */
export const useWriteTroveManagerSetPaused =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'setPaused',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setPriceFeed"`
 */
export const useWriteTroveManagerSetPriceFeed =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'setPriceFeed',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setServiceFeePercentage"`
 */
export const useWriteTroveManagerSetServiceFeePercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'setServiceFeePercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"startSunset"`
 */
export const useWriteTroveManagerStartSunset =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'startSunset',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"updateTroveFromAdjustment"`
 */
export const useWriteTroveManagerUpdateTroveFromAdjustment =
  /*#__PURE__*/ createUseWriteContract({
    abi: troveManagerAbi,
    functionName: 'updateTroveFromAdjustment',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__
 */
export const useSimulateTroveManager = /*#__PURE__*/ createUseSimulateContract({
  abi: troveManagerAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"addCollateralSurplus"`
 */
export const useSimulateTroveManagerAddCollateralSurplus =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'addCollateralSurplus',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"applyPendingRewards"`
 */
export const useSimulateTroveManagerApplyPendingRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'applyPendingRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"calculateUnrealizedActiveBalance"`
 */
export const useSimulateTroveManagerCalculateUnrealizedActiveBalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'calculateUnrealizedActiveBalance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"claimCollateral"`
 */
export const useSimulateTroveManagerClaimCollateral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'claimCollateral',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"closeTrove"`
 */
export const useSimulateTroveManagerCloseTrove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'closeTrove',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"closeTroveByLiquidation"`
 */
export const useSimulateTroveManagerCloseTroveByLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'closeTroveByLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertEthToYieldTokens"`
 */
export const useSimulateTroveManagerConvertEthToYieldTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'convertEthToYieldTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertSharesToEth"`
 */
export const useSimulateTroveManagerConvertSharesToEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'convertSharesToEth',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertSharesToYieldTokens"`
 */
export const useSimulateTroveManagerConvertSharesToYieldTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'convertSharesToYieldTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertYieldTokensToEth"`
 */
export const useSimulateTroveManagerConvertYieldTokensToEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'convertYieldTokensToEth',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"convertYieldTokensToShares"`
 */
export const useSimulateTroveManagerConvertYieldTokensToShares =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'convertYieldTokensToShares',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"decreaseDebtAndSendCollateral"`
 */
export const useSimulateTroveManagerDecreaseDebtAndSendCollateral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'decreaseDebtAndSendCollateral',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"fetchExchangeRate"`
 */
export const useSimulateTroveManagerFetchExchangeRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'fetchExchangeRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"fetchPriceInUsd"`
 */
export const useSimulateTroveManagerFetchPriceInUsd =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'fetchPriceInUsd',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"finalizeLiquidation"`
 */
export const useSimulateTroveManagerFinalizeLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'finalizeLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getCurrentICR"`
 */
export const useSimulateTroveManagerGetCurrentIcr =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'getCurrentICR',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getEntireSystemBalances"`
 */
export const useSimulateTroveManagerGetEntireSystemBalances =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'getEntireSystemBalances',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getEntireSystemColl"`
 */
export const useSimulateTroveManagerGetEntireSystemColl =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'getEntireSystemColl',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"getTroveCollAndDebt"`
 */
export const useSimulateTroveManagerGetTroveCollAndDebt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'getTroveCollAndDebt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"harvest"`
 */
export const useSimulateTroveManagerHarvest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'harvest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"movePendingTroveRewardsToActiveBalances"`
 */
export const useSimulateTroveManagerMovePendingTroveRewardsToActiveBalances =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'movePendingTroveRewardsToActiveBalances',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"openTrove"`
 */
export const useSimulateTroveManagerOpenTrove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'openTrove',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"preemptivelyHarvest"`
 */
export const useSimulateTroveManagerPreemptivelyHarvest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'preemptivelyHarvest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"redeemCollateral"`
 */
export const useSimulateTroveManagerRedeemCollateral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'redeemCollateral',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setAddresses"`
 */
export const useSimulateTroveManagerSetAddresses =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'setAddresses',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setCollGasCompPercentage"`
 */
export const useSimulateTroveManagerSetCollGasCompPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'setCollGasCompPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setHarvestStrategy"`
 */
export const useSimulateTroveManagerSetHarvestStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'setHarvestStrategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setLiquidationFeePercentage"`
 */
export const useSimulateTroveManagerSetLiquidationFeePercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'setLiquidationFeePercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setParameters"`
 */
export const useSimulateTroveManagerSetParameters =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'setParameters',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setPaused"`
 */
export const useSimulateTroveManagerSetPaused =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'setPaused',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setPriceFeed"`
 */
export const useSimulateTroveManagerSetPriceFeed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'setPriceFeed',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"setServiceFeePercentage"`
 */
export const useSimulateTroveManagerSetServiceFeePercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'setServiceFeePercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"startSunset"`
 */
export const useSimulateTroveManagerStartSunset =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'startSunset',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link troveManagerAbi}__ and `functionName` set to `"updateTroveFromAdjustment"`
 */
export const useSimulateTroveManagerUpdateTroveFromAdjustment =
  /*#__PURE__*/ createUseSimulateContract({
    abi: troveManagerAbi,
    functionName: 'updateTroveFromAdjustment',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__
 */
export const useWatchTroveManagerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: troveManagerAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"BaseRateUpdated"`
 */
export const useWatchTroveManagerBaseRateUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'BaseRateUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"CollateralSent"`
 */
export const useWatchTroveManagerCollateralSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'CollateralSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"Harvested"`
 */
export const useWatchTroveManagerHarvestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'Harvested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"LTermsUpdated"`
 */
export const useWatchTroveManagerLTermsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'LTermsUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"LastFeeOpTimeUpdated"`
 */
export const useWatchTroveManagerLastFeeOpTimeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'LastFeeOpTimeUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"Redemption"`
 */
export const useWatchTroveManagerRedemptionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'Redemption',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"SystemSnapshotsUpdated"`
 */
export const useWatchTroveManagerSystemSnapshotsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'SystemSnapshotsUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"TotalStakesUpdated"`
 */
export const useWatchTroveManagerTotalStakesUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'TotalStakesUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"TroveIndexUpdated"`
 */
export const useWatchTroveManagerTroveIndexUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'TroveIndexUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"TroveSnapshotsUpdated"`
 */
export const useWatchTroveManagerTroveSnapshotsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'TroveSnapshotsUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link troveManagerAbi}__ and `eventName` set to `"TroveUpdated"`
 */
export const useWatchTroveManagerTroveUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: troveManagerAbi,
    eventName: 'TroveUpdated',
  })
