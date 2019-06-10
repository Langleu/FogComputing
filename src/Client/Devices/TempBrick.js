const Tinkerforge = require('tinkerforge');

class TempBrick {
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;
        this.UID = uID;
        const t = new Tinkerforge.BrickletTemperature(this.UID, this.ipcon); // Create device object
        
        // workaround for mock device
        setInterval(() => {
            t.getTemperature((temperature) => {
                mClient.sendMessage('temperature', temperature);
                db.insert('temperature', temperature, Date.now(), 'local');

                console.log('Temperature: ' + temperature / 100.0 + ' °C');
            });
        }, 1000);
    }
}

module.exports = TempBrick;