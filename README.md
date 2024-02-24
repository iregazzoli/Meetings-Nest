## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with Docker

```bash
# Build Docker Image
$ docker-compose up --build

# Run the app with Docker in development mode. The -d flag is optional and runs the containers in the background.
$ npm run docker:dev

# Stop the app with Docker
$ docker-compose down
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# e2e tests with Docker
$ npm run docker:test

# test coverage
$ npm run test:cov
```

## Running migrations with TypeORM

```bash
# Create a new migration
$ npm run typeorm migration:create -n <migration-name>

# Run migrations
$ npm run typeorm migration:run

# Revert migrations
$ npm run typeorm migration:revert
```
