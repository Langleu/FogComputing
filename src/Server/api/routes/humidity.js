const router = require('express').Router();
const db = require('./../../../DatabaseHandler/index');
const humidity = db.addCollection('humidity');

router.get('/humidity', (req, res, next) => {
    res.send(humidity.chain().find().data());
});

module.exports = router;
