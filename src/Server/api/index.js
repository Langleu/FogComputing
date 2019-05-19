const express = require('express');
const mServer = require('./../../MessageHandler/index').mServer;

const app = express();

app.use(require('./routes/temperature'))

module.exports = {
    path: '/api/v1',
    handler: app
}, mServer;