export interface IUserDTO {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
  active?: boolean;
  paid?: boolean;
  admin?: boolean;
}
