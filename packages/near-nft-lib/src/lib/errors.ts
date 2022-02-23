export class NearNftError extends Error {
  data: unknown
  constructor (message: string, data?: unknown) {
    super(message)
    this.name = this.constructor.name
    this.data = data
  }
}

export class ExecutionError extends NearNftError {}
