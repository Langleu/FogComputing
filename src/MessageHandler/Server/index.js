const zmq = require('zeromq');
const config = require('./../../config');
const loki = require('lokijs');
const db = new loki('fog.db');

let identity;
let connectedClients = [];

let humidity, temperature;

// TODO: add store for all clients
class MessageServer {

    constructor() {
        this.sock = zmq.socket('router');
        this.sock.bindSync(`tcp://*:${config.app.port}`);
        console.log(`Server listening on port ${config.app.port}`);

        humidity = db.addCollection('humidity');
        temperature = db.addCollection('temperature');

        this.startListening();
    }

    sendMessage(message) {
        console.log(`Sending following message: ${message}.`);
        this.sock.send([identity, '', message]);
    }

    startListening() {
        // can't convert to es6
        this.sock.on('message', function onMessage() {
            let args = Array.apply(null, arguments);
            identity = args[0];
            connectedClients.push(identity);

            let value = args[2].toString('utf8');
            let topic = args[1].toString('utf8');

            switch (topic) {
                case 'humidity':
                    humidity.insert({value: value, time: Date.now(), peer: identity.toString('utf8')})
                break;
                case 'temperature':
                    temperature.insert({value: value, time: Date.now(), peer: identity.toString('utf8')})
                break;
                default:
                    console.log('error');
            }

            console.log('received a message related to:', 'containing message:', args[2].toString('utf8'));
        });
    }

    returnHumidity() {
        return humidity.chain().find().data();
    }

    returnTemperature() {
        return temperature.chain().find().data();
    }
}

module.exports = MessageServer, connectedClients;