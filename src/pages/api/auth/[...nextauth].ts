import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { useService } from '@hooks/useService';
import { IAuthService } from '@service/modules/common/auth/interface';
import { SERVICE } from '@service/ids';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'login',
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const authService = useService<IAuthService>(SERVICE.Auth);
          return await authService.login(credentials);
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    signIn: async (params) => {
      const { user } = params;
      return !!user;
    },
    jwt: async (params) => {
      const { token, user } = params;
      if (user) token.user = user as any;
      return token;
    },
    session: async (params) => {
      const { session, token } = params;
      const { user, ...other } = token;
      if (token) session.user = user;
      if (token) session.token = other;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
