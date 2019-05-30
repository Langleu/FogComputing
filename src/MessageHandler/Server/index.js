const zmq = require('zeromq');
const config = require('./../../config');
const db = require('./../../DatabaseHandler/index');
const _ = require('lodash');

let identity;
let connectedClients = [];

let humidity, temperature;

class MessageServer {

    constructor() {
        this.sock = zmq.socket('router');
        this.sock.bindSync(`tcp://*:${config.app.port}`);
        this.sock.setsockopt(zmq.ZMQ_ROUTER_MANDATORY, 1);
        console.log(`Server listening on port ${config.app.port}`);

        humidity = db.addCollection('humidity');
        temperature = db.addCollection('temperature');

        this.startListening(this.sock);
    }

    sendMessage(id = identity, topic, message) {
        console.log(`Sending following message: ${message}.`);
        this.sock.send([id, topic, message]);
    }

    startListening(sock) {
        // can't convert to es6
        this.sock.on('message', function onMessage() {
            let args = Array.apply(null, arguments);
            identity = args[0];

            let value = args[2].toString('utf8');
            let topic = args[1].toString('utf8');

            switch (topic) {
                case 'humidity':
                    humidity.insert({
                        value: value,
                        time: Date.now(),
                        peer: identity.toString('utf8')
                    })
                    break;
                case 'temperature':
                    temperature.insert({
                        value: value,
                        time: Date.now(),
                        peer: identity.toString('utf8')
                    })
                    break;
                case 'pong':
                    if (!_.some(connectedClients, { readable: identity.toString('utf8') })) {
                        setInterval(() => {
                            let index = _.findIndex(connectedClients, { readable: identity.toString('utf8')});
                            //console.log(Date.now() - connectedClients[index].lastMessage);
                            //connectedClients[index].lastMessage = Date.now();
                            sock.send([identity, 'ping', 'server'], null, function (err) {
                                // TODO: create own queue
                                if (err != undefined)
                                    connectedClients[index].online = false;
                                else
                                    connectedClients[index].online = true;
                            });
                        }, 5000);
                    }
                    connectedClients.push({
                        buffer: identity,
                        readable: identity.toString('utf8')
                    });
                    connectedClients = _.uniqBy(connectedClients, 'readable');
                    break;
                default:
                    console.log('error');
            }

            console.log(`received a message related to: ${topic} - containing message: ${value}`);
        });
    }

    returnHumidity() {
        return humidity.chain().find().data();
    }

    returnTemperature() {
        return temperature.chain().find().data();
    }

    returnConnectedClients() {
        return connectedClients;
    }
}

module.exports = MessageServer;