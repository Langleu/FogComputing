const Tinkerforge = require('tinkerforge');
const logger = require('./../../Logger');

class HumidityBrick {
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;

        this.UID = uID;
        const h = new Tinkerforge.BrickletHumidityV2(this.UID, this.ipcon); // Create device object

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