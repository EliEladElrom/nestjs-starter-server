## Description

The dedicated back end for the nextjs-starter-server project.

![main](https://github.com/EliEladElrom/nextjs-starter-server/workflows/main/badge.svg)

## Technologies Leveraged

- Eslint
- Husky
- Jest
- NestJS
- nestjs-pino
- Node
- Passport
- Prettier
- TypeScript
- Webpack (to enable Hot Module Replacement)

## Prerequisites & Package Management

Dependencies for this project are managed via `npm`. Ensure you have npm and Node installed. This project uses Node `v14.17.3` (LTS) and npm `v7.19.1`.

If you are on a unix based system, you can use `nvm` to install specific node versions using `nvm install 14.17.3`, followed by `nvm alias default 14.17.3`.

## Local Setup

- Clone this repository
- Setup the environment variables

For a reference of available environment variables, see the `.env.sample` file. The environment variables are:

| Variable          | Description                               |
| ----------------- | ----------------------------------------- |
| `NESTJS_PORT`     | Server port for NestJS                    |
| `PINO_LOG_LEVEL`  | Property for desired pinojs logging level |
| `NODE_ENV`        | Specifies the environment                 |

## Installation

```bash
$ npm install
```

## Running the server

During local development, it is recommended that you run the `npm run start:dev` command to take advantage of Hot Module Replacement, as well as the automatic TypeScript generation. This allows you to avoid having to re-run the build command after you make a change to see the latest version of the application.

The default NESTJS_PORT provided in the `.env.sample` file points to port `8000`. You can navigate to `localhost:8000/api` to verify that the server is running properly.

```bash
# development
$ npm run start

# watch mode with HMR
$ npm run dev

# production mode
$ npm run start:prod
```

## Running the tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## NestJS CLI

Due to the fact that we are using the NestJS framework to build out the server-side application, it is recommended to install the NestJS CLI so that you can quickly generate new resources, controllers, etc. after becoming familiar with the NestJS API. To install the NestJS CLI globally, run the following command `npm install -g @nestjs/cli`.

For example, to quickly spin up a new resource or controller, you can use the following commands within the appropriate pod directory (i.e `src/podName`).

Generate a controller class:

```bash
nest g controller <insert-controller-name-here>
```

Generate a resource:

```bash
nest g resource <insert-resource-name-here>
```

For more information on the NestJS CLI and its available commands, please refer to the [documentation](https://docs.nestjs.com/cli/usages).

## Swagger API Documentation

If you are using the `development` environment as your env `NODE_ENV`, you can view the Swagger UI at `http://localhost:<NESTJS_PORT>/api`. If you'd like to view the JSON format of the API documentation, you can go to `http://localhost:<NESTJS_PORT>/api-json`.

For more information on how the `SwaggerModule` is used in NestJS, please refer to the [documentation](https://docs.nestjs.com/openapi/types-and-parameters).

## Automatic TypeScript Generation

If you are using the `npm run start:dev` command, this project automatically generates TypeScript definitions using the `openapi-typescript` package.

We are generating the OpenAPI JSON schema file using the `@nestjs/swagger` package. The JSON file outputs to the `./swagger` directory and automatically updates based on changes to NestJS Controllers, DTOs, and Entitys. Once this `api.json` file changes, we automatically generate the `types.ts` file present in the `./generated-typescript` directory.

For more information on `openapi-typescript`, please refer to the [documentation](https://github.com/drwpow/openapi-typescript).

Note: if you are not using the `start:dev` command, you need to manually run the `npm run generate-types` command.

Note: We are using `lint-staged` on this project. As a result, we don't necessarily need to have `prettier` configured in our respective editors. lint-staged will take care of any auto formatting for you via the Husky pre-commit hook.
