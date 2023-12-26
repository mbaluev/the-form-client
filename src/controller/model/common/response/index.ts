export interface IResponseListDTO<T> {
  success: boolean;
  message?: string;
  data?: T[];
}

export interface IResponseItemDTO<T> {
  success: boolean;
  message?: string;
  changes?: any;
  data?: T;
}
