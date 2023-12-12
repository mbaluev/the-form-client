# The-Form

## How to use

Install it and run:

```sh
yarn
yarn dev
```

## The idea behind

The project uses :

1. [TypeScript](https://www.typescriptlang.org/)
2. [Next.js](https://github.com/vercel/next.js), which is a framework for server-rendered React apps
3. [MaterialUI](https://mui.com/) `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5
4. [Docker](https://www.docker.com/)

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine
2. Build your container: `docker build -t the-form-client .`
3. Run your container: `docker run --env-file .env.production -dp 127.0.0.1:80:80 the-form-client`

You can view your images created with `docker images`

### In existing projects

To add support for Docker to an existing project, just copy the `Dockerfile` into the root of the project and add the following to the `next.config.js` file:

```js
// next.config.js
module.exports = {
  // ... rest of the configuration.
  experimental: {
    outputStandalone: true,
  },
}
```

## SSH keygen & copy

#### MacOs:

1. `cd ~/.ssh && ssh-keygen`
2. `cat id_rsa.pub | pbcopy`