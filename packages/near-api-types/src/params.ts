import {
  AccountId,
  BlockId,
  BlockReference,
  CallFunctionRequest,
  ChunkId,
  CryptoHash,
  ReceiptReference,
  ViewAccessKeyListRequest,
  ViewAccessKeyRequest,
  ViewAccountRequest,
  ViewCodeRequest,
  ViewStateRequest
} from './near.js'

export type ViewAccount = ViewAccountRequest & BlockReference
export type FunctionCall = CallFunctionRequest & BlockReference
export type ViewState = ViewStateRequest & BlockReference
export type ViewContractCode = ViewCodeRequest & BlockReference
export type ViewAccessKey = ViewAccessKeyRequest & BlockReference
export type ViewAccessKeyList = ViewAccessKeyListRequest & BlockReference
export type Receipt = ReceiptReference
export type Block = BlockReference
export type Tx = [CryptoHash, AccountId]
export type Chunk = { chunk_id: ChunkId }
export type Status = []
export type Health = []
export type Validators = [BlockId] | []
export type GasPrice = [BlockId] | []
export type BroadcastTxAsync = [string]
export type BroadcastTxCommit = [string]
export type NetworkInfo = []
