import { IUserDTO } from '@model/user/index';

export const MOCK_USERS: IUserDTO[] = [
  {
    id: '1',
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'user1@user.com',
    active: true,
    paid: true,
    admin: false,
  },
  {
    id: '2',
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'user2@user.com',
    active: true,
    paid: false,
    admin: true,
  },
];
