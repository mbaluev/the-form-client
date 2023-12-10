const MSAL_CLIENT_ID = `${process.env.MSAL_CLIENT_ID}`;
const MSAL_TENANT_NAME = `${process.env.MSAL_TENANT_NAME}`;
const MSAL_POLICY_NAME = `${process.env.MSAL_POLICY_NAME}`;
const MSAL_LOGIN_SCOPE = `${process.env.MSAL_LOGIN_SCOPE}`;

export const b2cScopes = [
  `https://${MSAL_TENANT_NAME}.onmicrosoft.com/${MSAL_LOGIN_SCOPE}`,
  'email',
  'openid',
  'profile',
  'offline_access',
];

/**
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: MSAL_POLICY_NAME,
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${MSAL_TENANT_NAME}.b2clogin.com/${MSAL_TENANT_NAME}.onmicrosoft.com/${MSAL_POLICY_NAME}`,
    },
  },
  authorityDomain: `${MSAL_TENANT_NAME}.b2clogin.com`,
};

/**
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    clientId: MSAL_CLIENT_ID,
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
    knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
    redirectUri: '/',
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

/**
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [...b2cScopes],
  prompt: 'select_account',
};
export const tokenRequest = {
  scopes: [...b2cScopes],
  forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
};
