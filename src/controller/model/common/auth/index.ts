export interface IAuthResponse {
  success: boolean;
  token?: string;
}

export interface IAccountDTO {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
  salt?: string;
  active?: boolean;
  paid?: boolean;
  admin?: boolean;
  createdAt: string;
  updatedAt: string;
}
