import { AccountId, BlockHash, BlockHeight, ChunkHash, CryptoHash, PublicKey, ShardId } from './near.js'

export type Cause = {
  name: string
  info?: {}
}

export type JsonRpcError<E extends ErrorType, C extends Cause> = {
  name: E
  code: -32000
  data: string
  message: string
  cause: C
}

export type ErrorType = 'HANDLER_ERROR' | 'REQUEST_VALIDATION_ERROR' | 'INTERNAL_ERROR'

export type RequestValidationError<C extends Cause> = JsonRpcError<'REQUEST_VALIDATION_ERROR', C>

export type InternalError = JsonRpcError<'INTERNAL_ERROR', {
  name: 'INTERNAL_ERROR'
  info: {}
}>

export type ParseError = RequestValidationError<{
  name: 'PARSE_ERROR'
  info: {
    error_message: string
  }
}>

export type HandlerError<C extends Cause> = JsonRpcError<'HANDLER_ERROR', C>

export type UnknownTransaction = HandlerError<{
  name: 'UNKNOWN_TRANSACTION'
  info: {
    requested_transaction_hash: CryptoHash
  }
}>

export type UnknownBlock = HandlerError<{
  name: 'UNKNOWN_BLOCK'
  info: {}
}>

export type InvalidAccount = HandlerError<{
  name: 'INVALID_ACCOUNT'
  info: {
    requested_account_id: string
    block_height: BlockHeight
    block_hash: BlockHash
  }
}>

export type UnknownAccount = HandlerError<{
  name: 'UNKNOWN_ACCOUNT'
  info: {
    requested_account_id: AccountId
    block_height: BlockHeight
    block_hash: BlockHash
  }
}>

export type NoContractCode = HandlerError<{
  name: 'NO_CONTRACT_CODE'
  info: {
    contract_account_id: AccountId
    block_height: BlockHeight
    block_hash: BlockHash
  }
}>

export type TooLargeContractState = HandlerError<{
  name: 'TOO_LARGE_CONTRACT_STATE'
  info: {
    contract_account_id: AccountId
    block_height: BlockHeight
    block_hash: BlockHash
  }
}>

export type NoSyncedBlocks = HandlerError<{
  name: 'NO_SYNCED_BLOCKS'
}>

export type UnavailableShard = HandlerError<{
  name: 'UNAVAILABLE_SHARD'
  info: {
    requested_shard_id: ShardId
  }
}>

export type UnknownAccessKey = HandlerError<{
  name: 'UNKNOWN_ACCESS_KEY'
  info: {
    public_key: PublicKey
    block_height: BlockHeight
    block_hash: BlockHash
  }
}>

export type ContractExecutionError = HandlerError<{
  name: 'CONTRACT_EXECUTION_ERROR'
  info: {
    vm_error: string
    block_height: BlockHeight
    block_hash: BlockHash
  }
}>

export type NotSyncedYet = HandlerError<{
  name: 'NOT_SYNCED_YET'
}>

export type UnknownChunk = HandlerError<{
  name: 'UNKNOWN_CHUNK'
  info: {
    chunk_hash: ChunkHash
  }
}>

export type InvalidShardId = HandlerError<{
  name: 'INVALID_SHARD_ID'
  info: {
    shard_id: ShardId
  }
}>

export type UnknownReceipt = HandlerError<{
  name: 'UNKNOWN_RECEIPT'
  info: {
    receipt_id: CryptoHash
  }
}>

export type InvalidTransaction = HandlerError<{
  name: 'INVALID_TRANSACTION'
  /**
   * There might be some info here but i have not found it yet
   */
  info?: {}
}>

export type TimeoutError = HandlerError<{
  name: 'TIMEOUT_ERROR'
  /**
   * There might be some info here but i have not found it yet
   */
  info?: {}
}>

export type UnknownEpoch = HandlerError<{
  name: 'UNKNOWN_EPOCH'
}>

export type AllCauses =
  UnknownTransaction |
  UnknownBlock |
  InvalidAccount |
  UnknownAccount |
  NoContractCode |
  TooLargeContractState |
  NoSyncedBlocks |
  UnavailableShard |
  UnknownAccessKey |
  ContractExecutionError |
  NotSyncedYet |
  UnknownChunk |
  InvalidShardId |
  UnknownReceipt |
  InvalidTransaction |
  TimeoutError |
  UnknownEpoch

export type Query =
  NoSyncedBlocks |
  UnavailableShard |
  InvalidAccount |
  UnknownAccount |
  NoContractCode |
  TooLargeContractState |
  UnknownAccessKey |
  ContractExecutionError |
  InternalError |
  UnknownBlock |
  ParseError

export type ViewState =
  UnknownBlock |
  InvalidAccount |
  UnknownAccount |
  NoContractCode |
  TooLargeContractState |
  UnavailableShard |
  NoSyncedBlocks |
  ParseError |
  InternalError

export type ViewCode =
  UnknownBlock |
  InvalidAccount |
  UnknownAccount |
  NoContractCode |
  UnavailableShard |
  NoSyncedBlocks |
  ParseError |
  InternalError

export type ViewAccessKeyList =
  UnknownBlock |
  InvalidAccount |
  UnknownAccount |
  UnavailableShard |
  NoSyncedBlocks |
  ParseError |
  InternalError

export type ViewAccessKey =
  UnknownBlock |
  InvalidAccount |
  UnknownAccount |
  UnknownAccessKey |
  UnavailableShard |
  NoSyncedBlocks |
  ParseError |
  InternalError

export type Block =
  UnknownBlock |
  ParseError |
  InternalError |
  NotSyncedYet

export type Chunk =
  UnknownBlock |
  ParseError |
  InternalError |
  UnknownChunk |
  InvalidShardId

export type ViewAccount =
  ParseError |
  InternalError |
  UnknownBlock |
  InvalidAccount |
  UnknownAccount |
  UnavailableShard |
  NoSyncedBlocks

export type Changes =
  ParseError |
  InternalError |
  UnknownBlock |
  NotSyncedYet

export type Receipt =
  ParseError |
  InternalError |
  UnknownReceipt

export type Tx =
  InvalidTransaction |
  ParseError |
  InternalError |
  UnknownTransaction |
  TimeoutError

export type Status = InternalError

export type Validators =
  InternalError |
  ParseError |
  UnknownEpoch

export type GasPrice =
  InternalError |
  ParseError |
  UnknownBlock

export type BroadcastTxAsync =
  ParseError |
  InternalError

export type BroadcastTxCommit =
  ParseError |
  TimeoutError |
  InvalidTransaction |
  InternalError

export type Health = InternalError
export type NetworkInfo = InternalError

export type FunctionCall =
  InternalError |
  ParseError |
  UnknownBlock |
  UnknownAccount |
  NoContractCode |
  ContractExecutionError |
  UnavailableShard |
  NoSyncedBlocks
