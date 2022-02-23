export type StatusSyncInfo = {
  latest_block_hash: CryptoHash
  latest_block_height: BlockHeight
  latest_state_root: CryptoHash
  latest_block_time: DateTimeUtc
  syncing: boolean
  earliest_block_hash: Option<CryptoHash>
  earliest_block_height: Option<BlockHeight>
  earliest_block_time: Option<DateTimeUtc>
}

export type Version = {
  version: string
  build: string
}

export type ValidatorInfo = {
  account_id: AccountId
  is_slashed: boolean
}

export type Option<T> = T | null
export type DateTimeUtc = string
export type BlockHash = string
export type BlockHeight = number
export type CryptoHash = string
export type AccountId = string
export type Balance = string
export type PublicKey = string
export type Gas = number | string
export type Nonce = number
export type MerkleHash = CryptoHash
export type Signature = string
export type StorageUsage = number
export type TrieProofPath = string[]
export type NumBlocks = number
export type ProtocolVersion = number
export type StateRoot = CryptoHash

export type BlockId = BlockHash | BlockHeight

export type Finality = 'optimistic' | 'near-final' | 'final'
export type SyncCheckpoint = 'genesis' | 'earliest_available'

export type BlockReference = { block_id: BlockId } | { finality: Finality } | { sync_checkpoint: SyncCheckpoint }

export type ExecutionStatusBasic = 'Unknown' | 'Pending' | 'Failure'

export type ExecutionStatus = {
  SuccessValue?: string
  SuccessReceiptId?: CryptoHash
  Failure?: ExecutionError
}

export type FinalExecutionStatusBasic = 'NotStarted' | 'Started' | 'Failure'

export type ExecutionError = {
  error_message: string
  error_type: string
}

export type FinalExecutionStatus = {
  SuccessValue?: string
  Failure?: ExecutionError
}

export type ExecutionOutcomeWithId = {
  id: CryptoHash
  outcome: ExecutionOutcomeView
  block_hash: CryptoHash
  proof: MerklePath
}

export type CostGasUsed = {
  cost_category: string
  cost: string
  gas_used: Gas
}

export type ExecutionMetadataView = {
  version: number
  gas_profile: Option<CostGasUsed[]>
}

export type ExecutionOutcomeView = {
  logs: string[]
  receipt_ids: CryptoHash[]
  gas_burnt: Gas
  status: ExecutionStatus | ExecutionStatusBasic
  tokens_burnt: Balance
  executor_id: AccountId
  metadata: ExecutionMetadataView
}

export type ExecutionOutcomeWithIdView = {
  proof: MerklePath
  block_hash: CryptoHash
  id: CryptoHash
  outcome: ExecutionOutcomeView
}
// pub signer_id: AccountId,
// pub public_key: PublicKey,
// pub nonce: Nonce,
// pub receiver_id: AccountId,
// pub actions: Vec<ActionView>,
// pub signature: Signature,
// pub hash: CryptoHash,

export type CreateAccountAction = 'CreateAccount'
export type DeployContractAction = {
  DeployContract: {
    code: string
  }
}
export type FunctionCallAction = {
  FunctionCall: {
    method_name: string
    args: string
    gas: Gas
    deposit: Balance
  }
}
export type TransferAction = {
  Transfer: {
    deposit: Balance
  }
}

export type StakeAction = {
  Stake: {
    stake: Balance
    public_key: PublicKey
  }
}

export type AddKeyAction = {
  AddKey: {
    public_key: PublicKey
    access_key: AccessKeyView
  }
}

export type DeleteKeyAction = {
  DeleteKey: {
    public_key: PublicKey
  }
}

export type DeleteAccountAction = {
  DeleteAccount: {
    beneficiary_id: AccountId
  }
}

export type StakeChunkOnlyAction = {
  StakeChunkOnly: {
    stake: string
    public_key: string
  }
}

export type ActionView =
CreateAccountAction |
DeployContractAction |
FunctionCallAction |
TransferAction |
StakeAction |
AddKeyAction |
DeleteKeyAction |
DeleteAccountAction |
StakeChunkOnlyAction

export type SignedTransactionView = {
  hash: CryptoHash
  signature: Signature
  signer_id: AccountId
  public_key: PublicKey
  nonce: Nonce
  receiver_id: AccountId
  actions: ActionView[]
}

export type FinalExecutionOutcomeView = {
  status: FinalExecutionStatus | FinalExecutionStatusBasic
  transaction: SignedTransactionView
  transaction_outcome: ExecutionOutcomeWithIdView
  receipts_outcome: ExecutionOutcomeWithId[]
}

export type TotalWeight = {
  num: number
}

export type ValidatorStakeViewV1 = {
  account_id: AccountId
  public_key: PublicKey
  stake: Balance
  validator_stake_struct_version: 'V1'
}

export type ValidatorStakeViewV2 = {
  account_id: AccountId
  public_key: PublicKey
  stake: Balance
  is_chunk_only: boolean
  validator_stake_struct_version: 'V2'
}

export type ValidatorStakeView = ValidatorStakeViewV1 | ValidatorStakeViewV2

export type SlashedValidator = {
  account_id: string
  is_double_sign: boolean
}

export type ChallengesResult = SlashedValidator[]

export type BlockHeader = {
  height: BlockHeight
  prev_height: Option<BlockHeight>
  epoch_id: CryptoHash
  next_epoch_id: CryptoHash
  hash: CryptoHash
  prev_hash: CryptoHash
  prev_state_root: CryptoHash
  chunk_receipts_root: CryptoHash
  chunk_headers_root: CryptoHash
  chunk_tx_root: CryptoHash
  outcome_root: CryptoHash
  chunks_included: number
  challenges_root: CryptoHash
  /**
 * @deprecated Legacy, use timestamp_nanosec instead
 */
  timestamp: number
  timestamp_nanosec: string
  random_value: CryptoHash
  validator_proposals: ValidatorStakeView[]
  chunk_mask: boolean[]
  gas_price: Balance
  block_ordinal: Option<NumBlocks>
  /**
 * @deprecated deprecated.
 */
  rent_paid: Balance
  validator_reward: Balance
  total_supply: Balance
  challenges_result: ChallengesResult[]
  last_final_block: CryptoHash
  last_ds_final_block: CryptoHash
  next_bp_hash: CryptoHash
  block_merkle_root: CryptoHash
  approvals: Array<Option<Signature>>
  signature: Signature
  latest_protocol_version: ProtocolVersion
}

export type ChunkHash = string
export type ShardId = number
export type BlockShardId = [BlockId, ShardId]
export type ChunkId = ChunkHash | BlockShardId

export type DataReceiverView = {
  data_id: CryptoHash
  receiver_id: AccountId
}

export type ReceiptEnumAction = {
  Action: {
    signer_id: AccountId
    signer_public_key: PublicKey
    gas_price: Balance
    output_data_receivers: DataReceiverView[]
    input_data_ids: CryptoHash[]
    actions: ActionView[]
  }
}

export type ReceiptEnumData = {
  Data: {
    data_id: string
    /**
     * Base 64
     */
    data: Option<string>
  }
}

export type ReceiptEnumView = ReceiptEnumAction | ReceiptEnumData

export type ReceiptView = {
  predecessor_id: AccountId
  receiver_id: AccountId
  receipt_id: CryptoHash
  receipt: ReceiptEnumView
}

export type ChunkView = {
  author: AccountId
  header: ChunkHeaderView
  receipts: ReceiptView[]
  transactions: SignedTransactionView[]
}

export type ChunkHeaderView = {
  chunk_hash: CryptoHash
  prev_block_hash: BlockHash
  outcome_root: CryptoHash
  prev_state_root: StateRoot
  encoded_merkle_root: CryptoHash
  encoded_length: number
  height_created: BlockHeight
  height_included: BlockHeight
  shard_id: ShardId
  gas_used: Gas
  gas_limit: Gas
  /**
   * @deprecated Deprecated
   */
  rent_paid: Balance
  /**
   * @deprecated Deprecated
   */
  validator_reward: Balance
  balance_burnt: Balance
  outgoing_receipts_root: CryptoHash
  tx_root: CryptoHash
  validator_proposals: ValidatorStakeView[]
  signature: Signature
}

export type BlockView = {
  author: string
  header: BlockHeader
  chunks: ChunkHeaderView[]
}

export type BlockChange = {
  type: string
  account_id: string
}

export type ReceiptReference = {
  receipt_id: CryptoHash
}

export type CurrentEpochValidatorInfo = {
  account_id: AccountId
  public_key: PublicKey
  is_slashed: boolean
  stake: Balance
  shards: ShardId[]
  num_produced_blocks: NumBlocks
  num_expected_blocks: NumBlocks
}

export type NextEpochValidatorInfo = {
  account_id: AccountId
  public_key: PublicKey
  stake: Balance
  shards: ShardId[]
}

export type NearProtocolConfig = {
  runtime_config: NearProtocolRuntimeConfig
}

export type NearProtocolRuntimeConfig = {
  storage_amount_per_byte: string
}

export type GasPriceView = {
  gas_price: Balance
}

export type EpochValidatorInfo = {
  // Validators for the current epoch.
  next_validators: NextEpochValidatorInfo[]
  // Validators for the next epoch.
  current_validators: CurrentEpochValidatorInfo[]
  // Fishermen for the current epoch.
  next_fisherman: ValidatorStakeView[]
  // Fishermen for the next epoch.
  current_fisherman: ValidatorStakeView[]
  // Proposals in the current epoch.
  current_proposals: ValidatorStakeView[]
  // Kickout in the previous epoch.
  prev_epoch_kickout: ValidatorStakeView[]
  // Epoch start height.
  epoch_start_height: number
}

export const enum Direction {
  Left = 'Left',
  Right = 'Right'
}

export type MerklePathItem = {
  hash: MerkleHash
  direction: Direction
}

export type MerklePath = MerklePathItem[]

export type BlockHeaderInnerLiteView = {
  height: number
  epoch_id: string
  next_epoch_id: string
  prev_state_root: string
  outcome_root: string
  timestamp: number
  next_bp_hash: string
  block_merkle_root: string
}

export type LightClientBlockLiteView = {
  prev_block_hash: string
  inner_rest_hash: string
  inner_lite: BlockHeaderInnerLiteView
}

export type LightClientProof = {
  outcome_proof: ExecutionOutcomeWithIdView
  outcome_root_proof: MerklePath
  block_header_lite: LightClientBlockLiteView
  block_proof: MerklePath
}

export type IdType = 'transaction' | 'receipt'

export type LightClientProofRequest = {
  type: IdType
  light_client_head: string
  transaction_hash?: string
  sender_id?: string
  receipt_id?: string
  receiver_id?: string
}

export type GasPrice = {
  gas_price: string
}

export type AccessKeyWithPublicKey = {
  account_id: string
  public_key: string
}

export type QueryResponseKind =
  AccountView |
  ContractCodeView |
  ViewStateResult |
  CallResult |
  AccessKeyView |
  AccessKeyList

export type AccountView = {
  amount: Balance
  locked: Balance
  code_hash: CryptoHash
  storage_usage: StorageUsage
  storage_paid_at: BlockHeight
}

type StateItem = {
  key: string
  value: string
  proof: TrieProofPath
}

export type ViewStateResult = {
  values: StateItem[]
  proof: TrieProofPath[]
}

export type CallResult = {
  error?: string
  result?: number[]
  logs: string[]
}

export type ContractCodeView = {
  code_base64: string
  hash: CryptoHash
}

export type FunctionCall = {
  FunctionCall: {
    allowance: Balance
    receiver_id: AccountId
    method_names: string[]
  }
}

export type AccessKeyView = {
  nonce: Nonce
  permission: 'FullAccess' | FunctionCall
}

export type AccessKeyInfoView = {
  public_key: PublicKey
  access_key: AccessKeyView
}

export type AccessKeyList = {
  keys: AccessKeyInfoView[]
}

export type ViewAccountRequest = {
  request_type: 'view_account'
  account_id: AccountId
}

export type ViewCodeRequest = {
  request_type: 'view_code'
  account_id: AccountId
}

export type ViewStateRequest = {
  request_type: 'view_state'
  account_id: AccountId
  prefix_base64: string
}

export type ViewAccessKeyRequest = {
  request_type: 'view_access_key'
  account_id: AccountId
  public_key: string
}

export type ViewAccessKeyListRequest = {
  request_type: 'view_access_key_list'
  account_id: AccountId
}

export type CallFunctionRequest = {
  request_type: 'call_function'
  account_id: AccountId
  method_name: AccountId
  args_base64: string
}

export type RpcQueryRequest = BlockReference & (
  ViewAccountRequest |
  ViewCodeRequest |
  ViewStateRequest |
  ViewAccountRequest |
  ViewAccessKeyRequest |
  ViewAccessKeyListRequest |
  CallFunctionRequest
)

export type RpcPeerInfo = {
  id: PublicKey
  addr: Option<string>
  account_id: Option<AccountId>
}

export type RpcKnownProducer = {
  account_id: AccountId
  addr: Option<string>
  peer_id: PublicKey
}
