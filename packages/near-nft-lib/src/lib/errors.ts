export class NearNftError extends Error {
  constructor (message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class ExecutionError extends NearNftError {}
