const Tinkerforge = require('tinkerforge');
const db = require('./../DatabaseHandler/index');
const HOST = 'localhost';
const PORT = 4225;

const TempBrick = require('./Devices/TempBrick');
const HumidityBrick = require('./Devices/HumidityBrick');
const AmbientLightBrick = require('./Devices/AmbientLightBrick');

const mClient = require('./../MessageHandler/index').mClient;

const ipcon = new Tinkerforge.IPConnection();

ipcon.connect(HOST, PORT,
    (error) => {
        console.log('Tinkerforge is currently not reachable - Error: ' + error);
    }
);

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED, () => {
    new TempBrick(ipcon, mClient, 'dFs', db);
    new HumidityBrick(ipcon, mClient, 'deY', db);
    new AmbientLightBrick(ipcon, mClient, 'avN', db);
});