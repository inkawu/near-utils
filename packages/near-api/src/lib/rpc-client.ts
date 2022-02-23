import type KyInstance from 'ky'
import { Responses } from '@inkawu/near-api-types'
import ky from 'ky-universal'
import { InvalidUrlError } from './errors.js'

export type Result<T> = {
  ok: true
  result: NonNullable<T>
}
export type Error<T> = {
  ok: false
  error: NonNullable<T>
}

export class RpcClient {
  private readonly client: typeof KyInstance

  private constructor (url: string) {
    try {
      this.client = ky.create({
        prefixUrl: new URL(url)
      })
    } catch {
      throw new InvalidUrlError(url)
    }
  }

  static create (url: string) {
    return new this(url)
  }

  async call <T extends Responses.JsonRpcResponse<T['result'], T['error']>>(method: string, params: any): Promise<Result<T['result']> | Error<T['error']>> {
    const response = await this.client.post('', {
      json: {
        id: 'dontcare',
        jsonrpc: '2.0',
        method,
        params
      }
    })

    const body = await response.json() as T

    if (body.result) {
      return {
        ok: true,
        result: body.result! // eslint-disable-line
      }
    } else {
      return {
        ok: false,
        error: body.error! // eslint-disable-line
      }
    }
  }
}
