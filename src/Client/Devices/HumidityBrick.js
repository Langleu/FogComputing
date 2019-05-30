const Tinkerforge = require('tinkerforge');

class HumidityBrick {
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;

        this.UID = uID;
        const h = new Tinkerforge.BrickletHumidityV2(this.UID, this.ipcon); // Create device object
        const humidityDb = db.addCollection('humidity');

        setInterval(() => { 
            h.getHumidity((humidity) => {
                mClient.sendMessage('humidity', humidity);
                humidityDb.insert({
                    value: humidity,
                    time: Date.now(),
                    peer: 'local'
                });
                console.log('Humidity: ' + humidity/100.0 + ' %RH');
            });
        }, 500);        
    }
}

module.exports = HumidityBrick;