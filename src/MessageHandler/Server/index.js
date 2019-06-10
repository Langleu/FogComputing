const zmq = require('zeromq');
const config = require('./../../config');
const db = require('./../../DatabaseHandler/index');
const _ = require('lodash');
const logger = require('./../../Logger');

let identity;
let connectedClients = [];

let humidity, temperature;

class MessageServer {

    constructor() {
        this.sock = zmq.socket('router');
        this.sock.bindSync(`tcp://*:${config.app.port}`);
        this.sock.setsockopt(zmq.ZMQ_ROUTER_MANDATORY, 1);
        logger.info(`Message Server listening on port ${config.app.port}`);

        this.startListening(this.sock);
    }

    sendMessage = (id = identity, topic, message) => {
        logger.verbose(`Sending following message: ${message}.`);
        this.sock.send([id, topic, message]);
    }

    startListening = (sock) => {
        // can't convert to es6
        this.sock.on('message', function onMessage() {
            let args = Array.apply(null, arguments);
            identity = args[0];
            let identityReadable = identity.toString('utf8');

            let value = args[2].toString('utf8');
            let topic = args[1].toString('utf8');

            if (!_.some(connectedClients, { readable: identityReadable }))
                sock.send([identity, 'ping', 'server']);

            switch (topic) {
                case 'humidity':
                    value = JSON.parse(value);
                    db.insert('humidity', value.value, value.time, identityReadable);
                    break;
                case 'temperature':
                    value = JSON.parse(value);
                    db.insert('temperature', value.value, value.time, identityReadable);
                    break;
                case 'illuminance':
                    value = JSON.parse(value);
                    db.insert('illuminance', value.value, value.time, identityReadable);
                    break;
                case 'pong':
                    if (!_.some(connectedClients, { readable: identityReadable })) {
                        setInterval(() => {
                            let index = _.findIndex(connectedClients, { readable: identityReadable });
                            
                            sock.send([identity, 'ping', 'server'], null, function (err) {
                                if (err != undefined)
                                    connectedClients[index].online = false;
                                else
                                    connectedClients[index].online = true;
                            });
                        }, 5000);
                    }
                    connectedClients.push({
                        key: connectedClients.length,
                        buffer: identity,
                        readable: identityReadable
                    });
                    connectedClients = _.uniqBy(connectedClients, 'readable');
                    break;
                default:
                    logger.error('error');
            }

            logger.verbose(`received a message related to: ${topic} - containing message: ${value}`);
        });
    }

    returnConnectedClients = () => {
        return connectedClients;
    }
}

module.exports = MessageServer;