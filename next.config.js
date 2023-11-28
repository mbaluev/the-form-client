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
    REACT_HOST_DOCKER_INTERNAL: process.env.REACT_HOST_DOCKER_INTERNAL,
    NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
  },
  images: {
    domains: [
      // 'lh3.googleusercontent.com',
      // 'scontent.fdps8-1.fna.fbcdn.net',
      // 'platform-lookaside.fbsbx.com',
      // 'media-exp1.licdn.com',
    ],
  },
};
