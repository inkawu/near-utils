import { Errors } from '@inkawu/near-api-types'
import { AllCauses } from '@inkawu/near-api-types/dist/errors'

export class NearApiError extends Error {
  constructor (message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class InvalidUrlError extends NearApiError {
  constructor (url: string) {
    super(`${url} is an invalid url`)
  }
}

export class RpcError extends Error {
  response: Errors.AllCauses
  name: AllCauses['cause']['name']
  constructor (response: Errors.AllCauses) {
    super()
    this.response = response
    this.name = response.cause.name
  }
}
