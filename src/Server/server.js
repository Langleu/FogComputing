const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./../config');
const logger = require('./../Logger');

const {
  Nuxt,
  Builder
} = require('nuxt-edge');

/** requires the nuxt config */
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

app.listen(config.app.frontendPort, () => {
  logger.info(`Frontend listening on port ${config.app.frontendPort}`);
});