# WALLET GraphQL API

---

## Table of Content

- [Getting Started](#getting-started)
  - [Helpful Documentation](#helpful-documentation)
  - [Setting Up a Local Environment](#setting-up-a-local-environment)
    - [Install prerequisites](#install-prerequisites)
    - [Setup your .env file](#setup-your-env-file)
    - [Deploy a local database](#deploy-a-local-database)
    - [Install dependenciesr](#install-dependencies)
    - [Populate seed](#populate-seeds)
    - [Run the server](#run-the-server)
  - [Build and deploy](#build-and-deploy)
    - [Build and deploy the container](#build-and-deploy-the-container)

---

## Getting Started

### Helpful Documentation

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [NestJS Documentation](https://docs.nestjs.com/)
- [MikroORM NestJS](https://docs.nestjs.com/recipes/mikroorm)

### Setting Up a Local Environment

#### Install prerequisites

- NodeJS Version Manager: [nvm](https://github.com/nvm-sh/nvm)
- [Yarn Package Manager](https://yarnpkg.com/getting-started/install)
- [Docker](https://docs.docker.com/get-docker/)

#### Setup your .env file

Copy the `.env.example` to `.env`, adjust variables if needed. This will setup your local environment with a predefined configuration. If you want to create your own `.env` file, you can copy [`.env.example`](.env.example) to get a blank starting point.

#### Deploy a local database

This has been simplified to a single line for easy starting with development, but the docker-compose file can be found in the [`.docker`](.docker) directory.

```sh
yarn docker_db
```

#### Install dependencies

```sh
yarn install
```

#### Populate seeds

```sh
yarn install
```

#### Run the server

Last steps! Just have to start the server.

```sh
yarn start_dev
```

---

## Build and deploy

### Build and deploy the container

```sh
yarn docker
```
