import type KyInstance from 'ky'
import type { Options } from 'ky'
import { Responses } from '@inkawu/near-api-types'
import ky from 'ky-universal'
import { InvalidUrlError, RpcError } from './errors.js'

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

  private constructor (url: string, options: Options = {}) {
    try {
      this.client = ky.create({
        prefixUrl: new URL(url),
        ...options
      })
    } catch {
      throw new InvalidUrlError(url)
    }
  }

  static create (url: string, options?: Options) {
    return new this(url, options)
  }

  async call <T extends Responses.JsonRpcResponse<T['result'], T['error']>>(method: string, params: any): Promise<NonNullable<T['result']>> {
    const response = await this.client.post('', {
      json: {
        id: 'dontcare',
        jsonrpc: '2.0',
        method,
        params
      }
    })

    const body = await response.json() as T

    if ('result' in body && body.result) {
      // @ts-expect-error
      return body.result // eslint-disable-line
    } else {
      // @ts-expect-error
      throw new RpcError(body.error!) // eslint-disable-line
    }
  }
}
