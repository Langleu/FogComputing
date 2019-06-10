const Tinkerforge = require('tinkerforge');
const logger = require('./../../Logger');

class AmbientLightBrick {
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;

        this.UID = uID;
        const l = new Tinkerforge.BrickletAmbientLightV3(this.UID, this.ipcon); // Create device object

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