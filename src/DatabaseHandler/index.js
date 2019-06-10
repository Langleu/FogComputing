const loki = require('lokijs');

/**
 * Abstraction for the Database, can be easily replaced with MongoDB or other non SQL DBs.
 */
class DatabaseHandler {
    
    /**
     * Initializes the database and created the available collections.
     */
    constructor() {
        this.db = new loki('fog.db');

        this.db.addCollection('humidity');
        this.db.addCollection('temperature');
        this.db.addCollection('illuminance');
    }

    /**
     * Handles insertions into the Database.
     * @param {string} collection Into which collection data shall be inserted.
     * @param {number} value Numeric value.
     * @param {number} time Numeric value in unix time format.
     * @param {string} peer Name of the peer that the data belongs to. 
     */
    insert = (collection, value, time, peer) => {
        let generic = this.db.getCollection(collection);
        generic.insert({ value, time, peer });
    }

    /**
     * Handles data retrievals from the Database.
     * @param {string} collection From which collection data shall be received.
     * @param {string} peer Name of the peer that the data belongs to.
     * @param {number} limit Numeric value to limit the amount of requested data.
     */
    receive = (collection, peer, limit) => {
        let generic = this.db.getCollection(collection);
        let data = generic.chain().find({ peer }).simplesort('time', true).limit(limit).data();
        return data.reverse();
    }
}

module.exports = new DatabaseHandler();