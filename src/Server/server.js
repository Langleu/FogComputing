const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./../config');
const logger = require('./../Logger');

const {
  Nuxt,
  Builder
} = require('nuxt-edge');

// requires the nuxt config
let nuxtConfig = require('./nuxt.config');
nuxtConfig.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(nuxtConfig);

if (nuxtConfig.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

app.use(nuxt.render);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

/**
 * Starts the server which includes Frontend and Backend.
 * Backend is a simple express REST API.
 * Frontend is based on Nuxt.js which is an abstraction layer of Vue.js.
 */
app.listen(config.app.frontendPort, () => {
  logger.info(`Frontend listening on port ${config.app.frontendPort}`);
});