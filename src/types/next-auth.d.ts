import { IUserDTO } from '@model/entities/user';
import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    token?: JWT;
    user?: User;
  }

  type User = IUserDTO;
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    token: string;
    user?: User;
  }
}
