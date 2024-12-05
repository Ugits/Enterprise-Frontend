export interface IExternalAPIErrorResponse {
    statusCode: number;
    message: string;
    timestamp: string;
  }
  
  export interface IValidationError {
    field: string;
    error: string;
  }
  
  export interface IInternalErrorResponse {
    statusCode: number;
    message: string;
    timestamp: string;
    errors?: IValidationError[];
  }

  export interface IValidationError {
    field: string
    error: string
  }