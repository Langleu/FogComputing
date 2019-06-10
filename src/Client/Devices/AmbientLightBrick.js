const Tinkerforge = require('tinkerforge');
const logger = require('./../../Logger');

/**
 * AmbientLight Brick based on V3 of the API.
 */
class AmbientLightBrick {

    /**
     * Constructor for the Ambient Brick,
     * @param {object} ipcon The connection to the Tinkerforge API.
     * @param {MessageClient} mClient MessageClient to handle messages towards the Server.
     * @param {string} uID Identifier of the specific Brick that we want to talk to.
     * @param {DatabaseHandler} db DatabaseHandler to locally save entries in case we want a Frontend.
     */
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;
        this.UID = uID;
        
        const l = new Tinkerforge.BrickletAmbientLightV3(this.UID, this.ipcon); // Create device object

        /**
         * Callback is currently not working with fake Device.
         * Workaround ask every second for an update and send it to the Server.
         */
        setInterval(() => { 
            l.getIlluminance((illuminance) => {
                mClient.sendMessage('illuminance', JSON.stringify({ value: illuminance, time: Date.now() }));
                db.insert('illuminance', illuminance, Date.now(), 'local');

                logger.verbose('Illuminance: ' + illuminance/100.0 + ' lx');
            });
        }, 1000);        
    }
}

module.exports = AmbientLightBrick;