const router = require('express').Router();
const db = require('./../../../DatabaseHandler/index');

router.get('/temperature', (req, res, next) => {
    let id = req.query.id;
    let limit = req.query.limit || 100;
    
    res.send(db.receive('temperature', id, limit));
});

module.exports = router;
