const router = require('express').Router();
const db = require('./../../../DatabaseHandler/index');

/**
 * Humidity route that returns value depending on the limit and the id defined in the route.
 * @returns An array containg the last 100 objects that were previously inserted.
 */
router.get('/humidity', (req, res, next) => {
    let id = req.query.id;
    let limit = req.query.limit || 100;
    
    res.send(db.receive('humidity', id, limit));
});

module.exports = router;
