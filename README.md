# Running Buddy - Server

## How to deploy

In order to deploy the _Running Buddy - Server_ you need to have a mysql database configured as described in `src/config/config.json` or to adapt the file to match yours.  
You also need to have `yarn` installed.

### Installation instructions

Run the following commands :  
`yarn`  
`sequelize db:migrate`  
Please note that there is no seeds at all, so you need to create entries in db by yourself.

## How to launch the server

To launch the server in development mode:  
`yarn dev`  
To lauche the server in production mode:  
`yarn build-prod`

The server is now accessible locally on `http://localhost:3000`
