const router = require('express').Router();
const db = require('./../../../DatabaseHandler/index');

router.get('/illuminance', (req, res, next) => {
    let id = req.query.id;
    let limit = req.query.limit || 100;
    
    res.send(db.receive('illuminance', id, limit));
});

module.exports = router;
