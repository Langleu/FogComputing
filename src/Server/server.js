const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./../config');
const mServer = require('./../MessageHandler/index').mServer;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('./api/index'));

app.get('/', (req, res) => {
  //mServer.sendMessage('test');
  res.send(mServer.returnHumidity());
});

app.listen(config.app.frontendPort, () => {
  console.log(`Frontend listening on port ${config.app.frontendPort}`);
});