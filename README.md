## Forum App

This is a forum app devloped as part of Microsoft Engage Mentorship

Checkout the live [demo](https://orange-mushroom-0ff15c510.azurestaticapps.net/)

### Installation

To deploy locally, here are the steps

```
git clone https://github.com/Chethan2k1/forum.git
npm i
npm start
```

This would start a development sever on port 3000 locally, to create a build for the react app run `npm run buid` in addition to previous commands

The API endpoint is hardcoded to [https://forum-backend.azurewebsites.net](https://forum-backend.azurewebsites.net) which runs the code that can be found in this [repo](https://github.com/Chethan2k1/forum-backend), the locally running react app would be using this as the backend endpoint

In order to run own instance of backend endpoint, here are the steps

1. Copy the `.env.example` to `.env` and configure the variables mentioned in there
2. Similarly copy the `config.example.json` to `config.json` and configure the variables, this is completely necessary since the ORM wouldn't work without this config file

Finally to run the server,

```
npm i
npm run dbdrop # drops the db if it already exists
npm run dbcreate # creates the db in the database
npm run migrate # runs the migrations to setup the database
npm start
```

This would start a `NODE_ENV` environment server locally and for this to be used as endpoint, replace the https://forum-backend.azurewebsites.net with `http://localhost:${port}` and bam everything is set!
