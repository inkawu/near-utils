import { NftClient } from './nft-client.js'

export class NftContractClient {
  private readonly client: NftClient
  contract: string

  private constructor (client: NftClient, contract: string) {
    this.contract = contract
    this.client = client
  }

  static create (client: NftClient, contract: string) {
    return new this(client, contract)
  }

  async nftToken (tokenId: string) {
    return await this.client.nftToken(this.contract, tokenId)
  }

  async nftMetadata () {
    return await this.client.nftMetadata(this.contract)
  }

  async nftTokensForOwner ({
    account,
    fromIndex = 0,
    limit = 10
  }: {
    account: string
    fromIndex?: number
    limit?: number
  }) {
    return await this.client.nftTokensForOwner({
      contract: this.contract,
      account,
      fromIndex,
      limit
    })
  }

  async nftSupplyForOwner (account: string) {
    return await this.client.nftSupplyForOwner(this.contract, account)
  }

  async nftTokens ({
    fromIndex = 0,
    limit = 10
  }) {
    return await this.client.nftTokens({
      contract: this.contract,
      fromIndex,
      limit
    })
  }

  async nftTotalSupply () {
    return await this.client.nftTotalSupply(this.contract)
  }

  async nftMediaUri (tokenId: string) {
    return await this.client.nftMediaUri(this.contract, tokenId)
  }
}
