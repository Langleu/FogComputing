const Tinkerforge = require('tinkerforge');
const logger = require('./../../Logger');

class TempBrick {
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;
        this.UID = uID;
        const t = new Tinkerforge.BrickletTemperature(this.UID, this.ipcon); // Create device object
        
        // workaround for mock device
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