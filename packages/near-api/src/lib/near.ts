import type { Responses, Params, AccountId, BlockId, ChunkHash, CryptoHash, Finality, PublicKey, ShardId } from '@inkawu/near-api-types'
import { Options } from 'ky'
import { RpcClient } from './rpc-client.js'

export class Near {
  private readonly rpcClient: RpcClient

  private constructor (url: string, options?: Options) {
    this.rpcClient = RpcClient.create(url, options)
  }

  static create (url: string, options?: Options) {
    return new this(url, options)
  }

  async functionCall ({
    method,
    accountId,
    args,
    finality = 'final',
    blockId
  }: {
    method: string
    accountId: AccountId
    args?: any
    finality?: Finality
    blockId?: BlockId
  }) {
    const blockReference = blockId
      ? {
          block_id: blockId
        }
      : {
          finality
        }

    const params: Params.FunctionCall = {
      request_type: 'call_function',
      method_name: method,
      account_id: accountId,
      args_base64: btoa(JSON.stringify(args ?? '')),
      ...blockReference
    }

    return await this.rpcClient.call<Responses.FunctionCall>('query', params)
  }

  async block (blockOrFinality: Finality | BlockId) {
    const params = blockOrFinality === 'final' || blockOrFinality === 'optimistic'
      ? {
          finality: blockOrFinality
        }
      : {
          block_id: blockOrFinality
        }

    return await this.rpcClient.call<Responses.Block>('block', params)
  }

  async chunk (chunkId: ChunkHash | { blockId: BlockId, shardId: ShardId }) {
    const params = typeof chunkId === 'string'
      ? {
          chunk_id: chunkId
        }
      : {
          block_id: chunkId.blockId,
          shard_id: chunkId.shardId
        }

    return await this.rpcClient.call<Responses.Chunk>('chunk', params)
  }

  async tx ({ hash, accountId }: { hash: CryptoHash, accountId: AccountId }) {
    const params = [hash, accountId]

    return await this.rpcClient.call<Responses.Tx>('tx', params)
  }

  async experimentalReceipt (receiptId: CryptoHash) {
    const params = {
      receipt_id: receiptId
    }

    return await this.rpcClient.call<Responses.ExperimentalReceipt>('EXPERIMENTAL_receipt', params)
  }

  async status () {
    return await this.rpcClient.call<Responses.Status>('status', null)
  }

  async networkInfo () {
    return await this.rpcClient.call<Responses.NetworkInfo>('network_info', null)
  }

  async validators (blockId?: BlockId) {
    return await this.rpcClient.call<Responses.Validators>('validators', [blockId ?? null])
  }

  async gasPrice (blockId?: BlockId) {
    return await this.rpcClient.call<Responses.GasPrice>('gas_price', [blockId ?? null])
  }

  async broadcastTxAsync (signedTx: string) {
    return await this.rpcClient.call<Responses.BroadcastTxAsync>('broadcast_tx_async', [signedTx])
  }

  async broadcastTxAwait (signedTx: string) {
    return await this.rpcClient.call<Responses.BroadcastTxCommit>('broadcast_tx_commit', [signedTx])
  }

  async viewAccessKey ({
    finality = 'final',
    blockId,
    accountId,
    publicKey
  }: {
    finality?: Finality
    blockId?: BlockId
    accountId: AccountId
    publicKey: PublicKey
  }) {
    const blockReference = blockId
      ? {
          block_id: blockId
        }
      : {
          finality
        }

    const params = {
      request_type: 'view_access_key',
      ...blockReference,
      account_id: accountId,
      public_key: publicKey
    }

    return await this.rpcClient.call<Responses.ViewAccessKey>('query', params)
  }

  async viewAccessKeyList ({
    accountId,
    finality = 'final',
    blockId
  }: {
    accountId: AccountId
    finality?: Finality
    blockId?: BlockId
  }) {
    const blockReference = blockId
      ? {
          block_id: blockId
        }
      : {
          finality
        }

    const params = {
      request_type: 'view_access_key_list',
      ...blockReference,
      account_id: accountId
    }

    return await this.rpcClient.call<Responses.ViewAccessKeyList>('query', params)
  }

  async viewAccount ({
    accountId,
    finality = 'final',
    blockId
  }: {
    accountId: AccountId
    finality?: Finality
    blockId?: BlockId
  }) {
    const blockReference = blockId
      ? {
          block_id: blockId
        }
      : {
          finality
        }

    const params = {
      request_type: 'view_account',
      ...blockReference,
      account_id: accountId
    }

    return await this.rpcClient.call<Responses.ViewAccount>('query', params)
  }
}
