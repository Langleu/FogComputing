const router = require('express').Router();
const mServer = require('./../../../MessageHandler/index').mServer;

router.get('/clients', (req, res, next) => {
    res.send(mServer.returnConnectedClients());
});

module.exports = router;
