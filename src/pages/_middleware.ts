import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Jwt } from '@utils/jwt';
import cookie from '@utils/cookie';
import { ROUTER_CONST_SCHOOL } from '@app/settings/routerConst/school';
import { ROLES } from '@app/settings/roles';
import { ROUTER_CONST_DEV } from '@app/settings/routerConst/dev';
import { isAccess } from '@ui/permission/permissionWrapper';
import { useToken } from '@hooks/useToken';

const getClaimRoles = (token?: string) => {
  let claimRoles;
  if (token) {
    claimRoles = new Jwt(token).decodedClaims?.roles as string[];
  } else {
    claimRoles = [ROLES.NONE];
  }
  return claimRoles;
};

const handleRoute = (
  nextPath?: string,
  token?: string,
  refreshToken?: string,
  claimRoles?: string[]
) => {
  for (const key in ROUTER_CONST_SCHOOL) {
    if (nextPath === ROUTER_CONST_SCHOOL[key].path) {
      const routeRoles = ROUTER_CONST_SCHOOL[key].roles || [];
      const routeAccess = isAccess(claimRoles, routeRoles);
      if (token && refreshToken && !routeAccess) {
        return ROUTER_CONST_SCHOOL.ERROR403.path;
      }
      if (!routeAccess) {
        return ROUTER_CONST_SCHOOL.LOGIN.path;
      }
    }
  }
  for (const key in ROUTER_CONST_DEV) {
    const path = ROUTER_CONST_DEV[key].path;
    if (nextPath === path && process.env.NODE_ENV !== 'development') {
      return ROUTER_CONST_SCHOOL.HOME.path;
    }
  }
  return undefined;
};

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  const nextPath = request.page.name;
  if (nextPath) {
    const refreshToken = request.cookies[cookie.names.refreshToken];
    const token = await useToken(refreshToken);
    const claimRoles = getClaimRoles(token);
    const url = handleRoute(nextPath, token, refreshToken, claimRoles);
    if (url) response = NextResponse.rewrite(new URL(url, request.url));
    if (token) {
      response.headers.set(
        'set-cookie',
        `${cookie.names.token}=${token}; Max-Age=${cookie.options.maxAge}; Path=/;`
      );
    }
    if (!token || !refreshToken) {
      response.clearCookie('token');
      response.clearCookie('refreshToken');
    }
  }
  return response;
}
