const Tinkerforge = require('tinkerforge');

class AmbientLightBrick {
    constructor(ipcon, mClient, uID, db) {
        this.ipcon = ipcon;
        this.mClient = mClient;

        this.UID = uID;
        const l = new Tinkerforge.BrickletAmbientLightV3(this.UID, this.ipcon); // Create device object

        setInterval(() => { 
            l.getIlluminance((illuminance) => {
                mClient.sendMessage('illuminance', illuminance);
                db.insert('illuminance', illuminance, Date.now(), 'local');

                console.log('Illuminance: ' + illuminance/100.0 + ' lx');
            });
        }, 1000);        
    }
}

module.exports = AmbientLightBrick;