const router = require('express').Router();
const db = require('./../../../DatabaseHandler/index');
const temperature = db.addCollection('temperature');

router.get('/temperature', (req, res, next) => {
    res.send(temperature.chain().find().data());
});

module.exports = router;
