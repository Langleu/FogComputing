const loki = require('lokijs');

class DatabaseHandler {
    constructor() {
        this.db = new loki('fog.db');

        this.db.addCollection('humidity');
        this.db.addCollection('temperature');
        this.db.addCollection('illuminance');
    }

    insert = (collection, value, time, peer) => {
        let generic = this.db.getCollection(collection);
        generic.insert({ value, time, peer });
    }

    receive = (collection, peer, limit) => {
        let generic = this.db.getCollection(collection);
        let data = generic.chain().find({ peer }).simplesort('time', true).limit(limit).data();
        return data.reverse();
    }
}

module.exports = new DatabaseHandler();