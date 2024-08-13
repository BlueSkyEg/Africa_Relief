export interface IApiResponse<T> {
  success: boolean,
  message: string,
  data: T,
  errors: IValidationError
}

interface IValidationError {
  [key: string]: string[];
}
