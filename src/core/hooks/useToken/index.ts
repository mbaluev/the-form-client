import { HttpMethod } from '@infrastructure/const';

export const useToken = async (refreshToken?: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CORE_URL}/api/auth/token`,
      {
        method: HttpMethod.POST,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken};`,
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data?.token || null;
    }
  } catch (err) {
    return null;
  }
  return null;
};
