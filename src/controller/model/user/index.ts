export interface IUserDTO {
  id: string;
  username: string;
  password?: string;
  active: boolean;
  paid: boolean;
}
