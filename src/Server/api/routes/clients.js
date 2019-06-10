const router = require('express').Router();
const mServer = require('./../../../MessageHandler/index').mServer;

/**
 * Client route that returns all connected and previously connected clients.
 * @returns An array containing all clients.
 */
router.get('/clients', (req, res, next) => {
    if (process.env.NODE_ENV == 'client')
        res.send([{
            readable: 'local',
            online: true
        }]);
    res.send(mServer.returnConnectedClients());
});

module.exports = router;
