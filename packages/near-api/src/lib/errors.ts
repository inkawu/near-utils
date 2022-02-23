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
