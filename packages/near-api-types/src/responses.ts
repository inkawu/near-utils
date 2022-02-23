import { Errors, Results } from './index.js'

export type JsonRpcResponse<Result, Error> = {
  jsonrpc: '2.0'
  id: string
  result?: Result
  error?: Error
}

export type ViewState = JsonRpcResponse<Results.ViewState, Errors.ViewState>
export type ViewCode = JsonRpcResponse<Results.ViewCode, Errors.ViewCode>
export type ViewAccessKeyList = JsonRpcResponse<Results.ViewAccessKeyList, Errors.ViewAccessKeyList>
export type ViewAccessKey = JsonRpcResponse<Results.ViewAccessKey, Errors.ViewAccessKey>
export type ViewAccount = JsonRpcResponse<Results.ViewAccount, Errors.ViewAccount>
export type FunctionCall = JsonRpcResponse<Results.FunctionCall, Errors.FunctionCall>
export type Query = JsonRpcResponse<Results.Query, Errors.Query>
export type Block = JsonRpcResponse<Results.Block, Errors.Block>
export type ExperimentalReceipt = JsonRpcResponse<Results.Receipt, Errors.Receipt>
export type Tx = JsonRpcResponse<Results.Tx, Errors.Tx>
export type Chunk = JsonRpcResponse<Results.Chunk, Errors.Chunk>
export type Status = JsonRpcResponse<Results.Status, Errors.Status>
export type Health = JsonRpcResponse<Results.Health, Errors.Health>
export type Validators = JsonRpcResponse<Results.Validators, Errors.Validators>
export type GasPrice = JsonRpcResponse<Results.GasPrice, Errors.GasPrice>
export type BroadcastTxAsync = JsonRpcResponse<Results.BroadcastTxAsync, Errors.BroadcastTxAsync>
export type BroadcastTxCommit = JsonRpcResponse<Results.BroadcastTxCommit, Errors.BroadcastTxCommit>
export type NetworkInfo = JsonRpcResponse<Results.NetworkInfo, Errors.NetworkInfo>
