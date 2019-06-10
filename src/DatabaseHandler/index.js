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
        return generic.chain().find({ peer }).limit(limit).data()
    }
}

module.exports = new DatabaseHandler();