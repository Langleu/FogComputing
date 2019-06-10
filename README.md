# FogComputing

An application built for the fog computing use case using NodeJs and ZeroMQ.

The documentation can be found [here](https://langleu.github.io/FogComputing/).

## Getting Started

### Prerequisites

```
NodeJs >= v12
```
```
Docker
```

### Start

#### Install Packages
```
npm i
```

#### Server
```
npm run server
```

#### Client
```
npm run client
```
```
docker run -p 4225:4225 -it langleu/tfstubserver
```

#### Environment Variables
Please look at [config.js](./src/config.js) for a better overview and understanding.
- PORT
- BACKEND_IP
- NODE_ENV
- FRONTEND_PORT
- VERBOSE
- BASE_URL
- FRONTEND
- IDENTITY