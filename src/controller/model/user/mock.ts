import { IUserDTO } from '@model/user/index';

export const MOCK_USERS: IUserDTO[] = [
  {
    id: '1',
    name: 'user1',
    email: 'user1@user.com',
    active: true,
    paid: true,
  },
  {
    id: '2',
    name: 'user2',
    email: 'user2@user.com',
    active: false,
    paid: true,
  },
];
