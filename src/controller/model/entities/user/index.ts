export interface IUserDTO {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password?: string | null;
  salt?: string | null;
  active?: boolean | null;
  paid?: boolean | null;
  admin?: boolean | null;
  createdAt: string;
  updatedAt: string;
}
