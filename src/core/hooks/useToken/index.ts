import { HttpMethod } from '@infrastructure/const';
import * as process from 'process';

export const useToken = async (refreshToken?: string) => {
  try {
    const dev = process.env.NODE_ENV === 'development';
    const baseUrl = dev
      ? process.env.REACT_APP_CORE_URL
      : process.env.REACT_HOST_DOCKER_INTERNAL;
    const response = await fetch(`${baseUrl}/api/auth/refreshToken`, {
      method: HttpMethod.POST,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken};`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data?.token || null;
    }
  } catch (err) {
    return null;
  }
  return null;
};
