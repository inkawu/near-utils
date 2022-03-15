import type { Options } from 'ky'
import { Near } from '@inkawu/near-api'
import { NFTContractMetadata, TokenData } from '../types/nft-metadata.js'
import { ExecutionError } from './errors.js'
import { numArrToString } from './helpers.js'

export class NftClient {
  private readonly near: Near

  private constructor (urlOrNear: string | Near, options?: Options) {
    if (urlOrNear instanceof Near) {
      this.near = urlOrNear
    } else {
      this.near = Near.create(urlOrNear, options)
    }
  }

  static create (urlOrNear: string | Near, options?: Options) {
    return new this(urlOrNear, options)
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

    if (response?.result) {
      return JSON.parse(numArrToString(response.result)) as T
    } else {
      throw new ExecutionError(response.error!, response) // eslint-disable-line
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

    if (!tokenData) return null

    return {
      baseUri: contractMetadata.base_uri,
      media: tokenData.metadata.media
    }
  }
}
