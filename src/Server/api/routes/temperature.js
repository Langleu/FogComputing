const router = require('express').Router();
const db = require('./../../../DatabaseHandler/index');

/**
 * Temperature route that returns value depending on the limit and the id defined in the route.
 * @returns An array containg the last 100 objects that were previously inserted.
 */
router.get('/temperature', (req, res, next) => {
    let id = req.query.id;
    let limit = req.query.limit || 100;
    
    res.send(db.receive('temperature', id, limit));
});

module.exports = router;
