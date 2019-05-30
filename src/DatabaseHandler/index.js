const loki = require('lokijs');
const db = new loki('fog.db');

module.exports = db;