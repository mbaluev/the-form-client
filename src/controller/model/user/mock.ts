import { IUserDTO } from '@model/user/index';

export const MOCK_USERS: IUserDTO[] = [
  {
    id: '1',
    username: 'user1@user.com',
    active: true,
    paid: true,
  },
  {
    id: '2',
    username: 'user2@user.com',
    active: false,
    paid: true,
  },
];
