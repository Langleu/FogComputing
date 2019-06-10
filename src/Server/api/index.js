const express = require('express');
const mServer = require('./../../MessageHandler/index').mServer;

const app = express();

/**
 * Defines all routes that shall be made accessible.
 */
app.use(require('./routes/temperature'));
app.use(require('./routes/humidity'));
app.use(require('./routes/clients'));
app.use(require('./routes/illuminance'));

module.exports = {
    path: '/api/v1',
    handler: app
}, mServer;