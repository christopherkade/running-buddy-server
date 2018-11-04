# Running Buddy - Server

## Introduction

This is the backend (API) of the project **Running Buddy**. You can find the frontend part here: `https://github.com/christopherkade/running-buddy-client`.  
This backend is build on `NodeJS` using the `koa-smart` framework based on `Koajs2` (`https://github.com/ysocorp/koa-smart`).

## Prerequisites

In order to deploy **Running Buddy - Server** you need to have `mysql` installed and running and you need to adapt the configuration to match your `mysql` instance in `src/config/config.json` and have `yarn` installed.  
Then you need to copy the file `.env.example` as `.env` in root directory and chang the value of `JWT_SECRET` to a secure and long password (it is the password that will be use to create and verify the JWT tokens).

## Deployement instructions

Do the following :

- Use the command: `yarn`

Then:

### For development environment

- Use the command: `sequelize db:create`
- Use the command: `sequelize db:migrate`

## For production environment

- Use the command: `sequelize db:create --env=production`
- Use the command: `sequelize db:migrate --env=production`

  _Please note that there is no seeds at all, so you need to create entries in db by yourself._

## How to use

To launch the server you need to do the following:

For development environment:

- Use the command: `yarn dev`

For production environment:

- Use the command: `yarn build-prod`
- Use the command: `yarn prod`

The server is now accessible locally on `http://localhost:3000`
