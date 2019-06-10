const Tinkerforge = require('tinkerforge');
const logger = require('./../../Logger');

/**
 * Temperature Brick based on V1 of the API.
 */
class TempBrick {

    /**
     * Constructor for the Temperature Brick,
     * @param {object} ipcon The connection to the Tinkerforge API.
     * @param {MessageClient} mClient MessageClient to handle messages towards the Server.
     * @param {string} uID Identifier of the specific Brick that we want to talk to.
     * @param {DatabaseHandler} db DatabaseHandler to locally save entries in case we want a Frontend.
     */
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;
        this.UID = uID;
        
        const t = new Tinkerforge.BrickletTemperature(this.UID, this.ipcon); // Create device object
        
        /**
         * Callback is currently not working with fake Device.
         * Workaround ask every second for an update and send it to the Server.
         */
        setInterval(() => {
            t.getTemperature((temperature) => {
                mClient.sendMessage('temperature', JSON.stringify({ value: temperature, time: Date.now() }));
                db.insert('temperature', temperature, Date.now(), 'local');

                logger.verbose('Temperature: ' + temperature / 100.0 + ' °C');
            });
        }, 1000);
    }
}

module.exports = TempBrick;