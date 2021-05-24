# my-car

### description
This is a simple demo app with a list of a car.
Everyone can see the list of car and the comments, but only a connected user can comment a car and can update and delete its own comments.

### Stacks:
* client: React, Redux, TypeScript
* server: Node, Express
* database: MongoDB
* webservice: REST

To run the code in local machine, run the following commands
```
cd server && npm run dev
cd client && yarn start
```

### list of commands

```
    "start": "node ./dist/index.js", // start the production ready app
    "build:start": "npm run build:server && npm start", // build then start the app
    "dev": "nodemon --exec babel-node ./index.js", // for development environment
    "build:server": "npm run clean && npm run build-babel", // build and compile the server cod
    "clean": "rm -rf dist && mkdir dist", // remove then create the build directory
    "build-babel": "babel . --out-dir dist --ignore node_modules,copyBuilds.js", // transpile the es6 codes to es5
    "copy": "node copyBuilds.js", // copy the client build to the server directory
    "build:client": "cd ../client && npm run build", // build the client react app from the server
    "deploy": "npm run build:client && cd ../server && npm run build:server && npm run copy" // build the production ready app
```


