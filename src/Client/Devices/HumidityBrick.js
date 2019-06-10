const Tinkerforge = require('tinkerforge');
const logger = require('./../../Logger');

/**
 * Humidity Brick based on V2 of the API.
 */
class HumidityBrick {

    /**
     * Constructor for the Humidity Brick,
     * @param {object} ipcon The connection to the Tinkerforge API.
     * @param {MessageClient} mClient MessageClient to handle messages towards the Server.
     * @param {string} uID Identifier of the specific Brick that we want to talk to.
     * @param {DatabaseHandler} db DatabaseHandler to locally save entries in case we want a Frontend.
     */
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;
        this.UID = uID;
        
        const h = new Tinkerforge.BrickletHumidityV2(this.UID, this.ipcon); // Create device object

        /**
         * Callback is currently not working with fake Device.
         * Workaround ask every second for an update and send it to the Server.
         */
        setInterval(() => { 
            h.getHumidity((humidity) => {
                mClient.sendMessage('humidity', JSON.stringify({ value: humidity, time: Date.now() }));
                db.insert('humidity', humidity, Date.now(), 'local');

                logger.verbose('Humidity: ' + humidity/100.0 + ' %RH');
            });
        }, 1000);        
    }
}

module.exports = HumidityBrick;