import IAppError from '../types/IAppError'

class AppError extends Error implements IAppError {
  constructor (message: string) {
    super(message)
  }
}

export default AppError
