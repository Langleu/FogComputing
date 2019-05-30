const router = require('express').Router();
const db = require('./../../../DatabaseHandler/index');
const humidity = db.addCollection('humidity');

router.get('/humidity', (req, res, next) => {
    let id = req.query.id;
    let limit = req.query.limit || 100;
    
    res.send(humidity.chain().find({ peer: id }).limit(limit).data());
});

module.exports = router;
