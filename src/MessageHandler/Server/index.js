const zmq = require('zeromq');
const config = require('./../../config');
const db = require('./../../DatabaseHandler/index');
const _ = require('lodash');
const logger = require('./../../Logger');

let identity;
/** Array to save all connected clients. */
let connectedClients = [];

/**
 * Messaging Class for the Server component.
 */
class MessageServer {

   /**
   * Constructor for the MessageServer.
   * @property {object} sock Defines the router socket that represents the type of communication that can be handled.
   */
    constructor() {
        /** Describes the kind of socket. In this case a router socket. */
        this.sock = zmq.socket('router');
        this.sock.bindSync(`tcp://*:${config.app.port}`);
        this.sock.setsockopt(zmq.ZMQ_ROUTER_MANDATORY, 1);
        logger.info(`Message Server listening on port ${config.app.port}`);

        this.startListening(this.sock);
    }

    /**
     * Sends a message to a specific peer.
     * @param {string} id Identity of the socket to talk back to a specific peer.
     * @param {string} topic The related topic that the message will be about.
     * @param {string} message Actual message content.
     */
    sendMessage = (id = identity, topic, message) => {
        logger.verbose(`Sending following message: ${message}.`);
        this.sock.send([id, topic, message]);
    }

    /**
     * Listens to incoming events on the socket.
     * @param {sock} sock The global socket that the Server will be listening on.
     */
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
                    /**
                     * Handles the currently connected clients and whether they are still connected
                     */
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

    /**
     * @return {Array} Method that returns all currently connected clients as array.
     */
    returnConnectedClients = () => {
        return connectedClients;
    }
}

module.exports = MessageServer;