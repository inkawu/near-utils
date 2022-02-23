import {
  AccessKeyList,
  AccessKeyView,
  AccountId,
  AccountView,
  BlockHash,
  BlockHeight,
  BlockView,
  CallResult,
  ChunkView,
  ContractCodeView,
  CryptoHash,
  EpochValidatorInfo,
  FinalExecutionOutcomeView,
  GasPriceView,
  Option,
  QueryResponseKind,
  ReceiptView,
  RpcKnownProducer,
  RpcPeerInfo,
  StatusSyncInfo,
  ValidatorInfo,
  Version,
  ViewStateResult
} from './near.js'

type QueryResultBase = {
  block_height: BlockHeight
  block_hash: BlockHash
}

export type Chunk = ChunkView
export type Tx = FinalExecutionOutcomeView
export type Receipt = ReceiptView
export type Block = BlockView

export type Query = QueryResultBase & QueryResponseKind
export type ViewAccount = QueryResultBase & AccountView
export type FunctionCall = QueryResultBase & CallResult
export type ViewAccessKey = QueryResultBase & AccessKeyView
export type ViewAccessKeyList = QueryResultBase & AccessKeyList
export type ViewCode = QueryResultBase & ContractCodeView
export type ViewState = QueryResultBase & ViewStateResult

export type Validators = EpochValidatorInfo

export type GasPrice = GasPriceView

export type Health = null

export type BroadcastTxAsync = CryptoHash

export type BroadcastTxCommit = FinalExecutionOutcomeView

export type Status = {
  chain_id: string
  rpc_addr?: string
  sync_info: StatusSyncInfo
  validators: ValidatorInfo[]
  version: Version
  protocol_version: number
  latest_protocol_version: number
  validator_account_id: Option<AccountId>
}

export type NetworkInfo = {
  active_peers: RpcPeerInfo[]
  num_active_peers: number
  peer_max_count: number
  sent_bytes_per_sec: number
  received_bytes_per_sec: number
  known_producers: RpcKnownProducer[]
}
