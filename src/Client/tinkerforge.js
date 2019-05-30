const Tinkerforge = require('tinkerforge');
const db = require('./../DatabaseHandler/index');
const HOST = 'localhost';
const PORT = 4225;

const TempBrick = require('./Devices/TempBrick');
const HumidityBrick = require('./Devices/HumidityBrick');

const mClient = require('./../MessageHandler/index').mClient;

const ipcon = new Tinkerforge.IPConnection();

ipcon.connect(HOST, PORT,
    (error) => {
        console.log('Error: ' + error);
    }
);

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED, () => {
    new TempBrick(ipcon, mClient, '6Ct7da', db);
    new HumidityBrick(ipcon, mClient, '62DrY6', db);
});