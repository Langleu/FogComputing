const router = require('express').Router();
const db = require('./../../../DatabaseHandler/index');

router.get('/humidity', (req, res, next) => {
    let id = req.query.id;
    let limit = req.query.limit || 100;
    
    res.send(db.receive('humidity', id, limit));
});

module.exports = router;
