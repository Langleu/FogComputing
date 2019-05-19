const router = require('express').Router();
const mServer = require('./../../../MessageHandler/index').mServer;

router.get('/temperature', (req, res, next) => {
    res.send(mServer.returnTemperature());
});

module.exports = router;
