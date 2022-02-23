import { Near } from '@inkawu/near-api'
import { Errors } from '@inkawu/near-api-types'
import { Error } from '@inkawu/near-api/dist/lib/rpc-client'
import { NFTContractMetadata, TokenData } from '../types/nft-metadata.js'
import { numArrToString } from './helpers.js'

export type DataResult<T> = {
  ok: true
  data: T
}
export class NftClient {
  private readonly near: Near

  private constructor (urlOrNear: string | Near) {
    if (urlOrNear instanceof Near) {
      this.near = urlOrNear
    } else {
      this.near = Near.create(urlOrNear)
    }
  }

  static create (urlOrNear: string | Near) {
    return new this(urlOrNear)
  }

  private async contractCall <T>({
    method,
    accountId,
    args = {}
  }: {
    method: string
    accountId: string
    args?: unknown
  }) {
    const response = await this.near.functionCall({
      method,
      accountId,
      args
    })

    if (response.ok && response.result.result) {
      return {
        ok: true,
        data: JSON.parse(numArrToString(response.result.result)) as T
      } as DataResult<T>
    } else {
      return response as Error<Errors.FunctionCall>
    }
  }

  async nftToken (contract: string, tokenId: string) {
    return await this.contractCall<TokenData | null>({
      method: 'nft_token',
      accountId: contract,
      args: {
        token_id: tokenId
      }
    })
  }

  async nftMetadata (contract: string) {
    return await this.contractCall<NFTContractMetadata>({
      method: 'nft_metadata',
      accountId: contract
    })
  }

  async nftSupplyForOwner (contract: string, account: string) {
    return await this.contractCall<string>({
      method: 'nft_supply_for_owner',
      accountId: contract,
      args: {
        account_id: account
      }
    })
  }

  async nftTokensForOwner ({
    contract,
    account,
    fromIndex = 0,
    limit = 10
  }: {
    contract: string
    account: string
    fromIndex?: number
    limit?: number
  }) {
    return await this.contractCall<TokenData[]>({
      method: 'nft_tokens_for_owner',
      accountId: contract,
      args: {
        account_id: account,
        from_index: fromIndex.toString(),
        limit
      }
    })
  }

  async nftTokens ({
    contract,
    fromIndex = 0,
    limit = 10
  }: {
    contract: string
    fromIndex?: number
    limit?: number
  }) {
    return await this.contractCall<TokenData[]>({
      method: 'nft_tokens',
      accountId: contract,
      args: {
        from_index: fromIndex.toString(),
        limit
      }
    })
  }

  async nftTotalSupply (contract: string) {
    return await this.contractCall<string>({
      method: 'nft_total_supply',
      accountId: contract
    })
  }

  async nftMediaUri (contract: string, tokenId: string) {
    const [contractMetadata, tokenData] = await Promise.all([
      this.nftMetadata(contract),
      this.nftToken(contract, tokenId)
    ])

    if ('data' in contractMetadata && 'data' in tokenData) {
      if (!tokenData.data?.metadata.media || !contractMetadata.data.base_uri) return null
      return `${contractMetadata.data.base_uri}${tokenData.data.metadata.media}`
    }
    return null
  }
}