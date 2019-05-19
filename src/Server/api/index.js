const express = require('express');
const mServer = require('./../../MessageHandler/index').mServer;

const app = express();

app.use(require('./routes/temperature'));
app.use(require('./routes/humidity'));
app.use(require('./routes/clients'));

module.exports = {
    path: '/api/v1',
    handler: app
}, mServer;