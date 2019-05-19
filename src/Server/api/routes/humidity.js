const router = require('express').Router();
const mServer = require('./../../../MessageHandler/index').mServer;

router.get('/humidity', (req, res, next) => {
    res.send(mServer.returnHumidity());
});

module.exports = router;
