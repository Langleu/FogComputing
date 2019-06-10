const Tinkerforge = require('tinkerforge');

class HumidityBrick {
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;

        this.UID = uID;
        const h = new Tinkerforge.BrickletHumidityV2(this.UID, this.ipcon); // Create device object

        setInterval(() => { 
            h.getHumidity((humidity) => {
                mClient.sendMessage('humidity', humidity);
                db.insert('humidity', humidity, Date.now(), 'local');

                console.log('Humidity: ' + humidity/100.0 + ' %RH');
            });
        }, 1000);        
    }
}

module.exports = HumidityBrick;