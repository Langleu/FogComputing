const Tinkerforge = require('tinkerforge');

class HumidityBrick {
    constructor(ipcon, mClient, uID) {
        this.ipcon = ipcon;
        this.mClient = mClient;

        this.UID = uID;
        const h = new Tinkerforge.BrickletHumidityV2(this.UID, this.ipcon); // Create device object

        setInterval(() => { 
            h.getHumidity((humidity) => {
                mClient.sendMessage('humidity', humidity);
                console.log('Humidity: ' + humidity/100.0 + ' %RH');
            });
        }, 500);        
    }
}

module.exports = HumidityBrick;