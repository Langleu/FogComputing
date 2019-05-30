const Tinkerforge = require('tinkerforge');

class TempBrick {
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;
        this.UID = uID;
        const t = new Tinkerforge.BrickletTemperature(this.UID, this.ipcon); // Create device object
        const temperatureDb = db.addCollection('temperature');


        /** 
         * should work but doesn't work with current mock 
        t.setTemperatureCallbackPeriod(250);

        t.on(Tinkerforge.BrickletTemperature.CALLBACK_TEMPERATURE,

            (temperature) => {
                console.log('Temperature: ' + temperature/100.0 + ' °C');
            }
        );
        **/

        // workaround for mock device
        setInterval(() => {
            t.getTemperature((temperature) => {
                mClient.sendMessage('temperature', temperature);
                temperatureDb.insert({
                    value: temperature,
                    time: Date.now(),
                    peer: 'local'
                })
                console.log('Temperature: ' + temperature / 100.0 + ' °C');
            });
        }, 500);
    }
}

module.exports = TempBrick;