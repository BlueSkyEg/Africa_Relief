export interface IApiResponse<T = null> {
  success: boolean,
  message: string,
  data: T,
  errors: IValidationError
}

interface IValidationError {
  [key: string]: string[];
}
