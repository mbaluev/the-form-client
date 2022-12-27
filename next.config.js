module.exports = {
  reactStrictMode: true,
  sassOptions: {},
  webpack: (config) => {
    let oneOfRules = config.module.rules.find((x) => x.oneOf).oneOf;

    // remove the webpack rule to error on global css/scss
    oneOfRules = oneOfRules.filter(
      (x) => x.issuer || !x.use || x.use.loader !== 'error-loader'
    );

    // modify the webpack rule targeting only *.module.scss to target only *.scss
    const newScssRule = oneOfRules.find(
      (x) => x.test && x.test.toString() === /\.module\.(scss|sass)$/.toString()
    );
    newScssRule.test = /\.(scss|sass)$/;
    newScssRule.sideEffects = true;

    if (newScssRule.use[0].options.modules) {
      newScssRule.use[0].options.modules = false;
    }

    if (newScssRule.use[1].options.modules) {
      newScssRule.use[1].options.modules = false;
    }

    config.module.rules.splice(
      config.module.rules.findIndex((x) => x.oneOf),
      1,
      {
        oneOf: oneOfRules,
      }
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  experimental: {
    outputStandalone: true,
  },
  env: {
    REACT_APP_CORE_URL: process.env.REACT_APP_CORE_URL,
    MSAL_REDIRECT_URL: process.env.MSAL_REDIRECT_URL,
    OPEN_EXCHANGE_RATES_APP_ID: process.env.OPEN_EXCHANGE_RATES_APP_ID,
    TENANT_ID: process.env.TENANT_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    MS_CLIENT_ID: process.env.MS_CLIENT_ID,
    MS_CLIENT_SECRET: process.env.MS_CLIENT_SECRET,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'scontent.fdps8-1.fna.fbcdn.net',
      'platform-lookaside.fbsbx.com',
      'media-exp1.licdn.com',
    ],
  },
};
