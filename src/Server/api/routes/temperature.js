const router = require('express').Router();
const db = require('./../../../DatabaseHandler/index');
const temperature = db.addCollection('temperature');

router.get('/temperature', (req, res, next) => {
    let id = req.query.id;
    let limit = req.query.limit || 100;
    
    res.send(temperature.chain().find({ peer: id }).limit(limit).data());
});

module.exports = router;
