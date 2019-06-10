/**
 * Tinkerforge Builder, that handles one single connection to the Tinkerforge API.
 * Creates sub modules to connect to specific Bricks.
 */
const Tinkerforge = require('tinkerforge');
const logger = require('./../Logger');
const db = require('./../DatabaseHandler/index');
const mClient = require('./../MessageHandler/index').mClient;

// The different kinds of Bricks that are available.
const TempBrick = require('./Devices/TempBrick');
const HumidityBrick = require('./Devices/HumidityBrick');
const AmbientLightBrick = require('./Devices/AmbientLightBrick');

// Connection values for Tinkerforge.
const HOST = 'localhost';
const PORT = 4225;
const ipcon = new Tinkerforge.IPConnection();

ipcon.connect(HOST, PORT,
    (error) => {
        logger.error('Tinkerforge is currently not reachable - Error: ' + error);
    }
);

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED, () => {
    new TempBrick(ipcon, mClient, 'dFs', db);
    new HumidityBrick(ipcon, mClient, 'deY', db);
    new AmbientLightBrick(ipcon, mClient, 'avN', db);
});