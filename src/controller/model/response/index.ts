export interface IResponseListDTO<T> {
  status: string;
  error?: string;
  data?: T[];
}

export interface IResponseItemDTO<T> {
  status: string;
  error?: string;
  data?: T;
  changes?: any;
  deleted?: boolean;
}
