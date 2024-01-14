import { parse } from 'cookie';
import { GetServerSidePropsContext } from 'next';
import cookie from '@utils/cookie/index';

const getCookieResp = (cookieString: string | number | string[] | undefined, key: string) => {
  let cookieArr = cookieString || [];
  if (!Array.isArray(cookieArr)) cookieArr = [String(cookieArr)];
  const cook = cookieArr.find((c) => c.indexOf(key) >= 0);
  if (cook) return parse(cook)[key];
  return undefined;
};

export const getCookieToken = (context: GetServerSidePropsContext) => {
  const { req, res } = context;
  const { cookies } = req;
  const cookieString = res.getHeader('Set-Cookie') || [];
  const tokenResp = getCookieResp(cookieString, cookie.names.token);
  const tokenReq = cookies[cookie.names.token];
  return tokenResp || tokenReq;
};
