const Tinkerforge = require('tinkerforge');

class TempBrick {
    constructor(ipcon, mClient, uID) {
        this.ipcon = ipcon;
        this.mClient = mClient;
        this.UID = uID;
        const t = new Tinkerforge.BrickletTemperature(this.UID, this.ipcon); // Create device object

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
                console.log('Temperature: ' + temperature/100.0 + ' °C');
            });
        }, 500);        
    }
}

module.exports = TempBrick;