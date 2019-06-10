const zmq = require('zeromq');
const config = require('./../../config');
const logger = require('./../../Logger');

let qSock = null;

class MessageClient {
    constructor() {
        this.sock = zmq.socket('dealer');
        this.sock.identity = config.identity;
        this.sock.connect(`tcp://${config.app.backendIp}:${config.app.port}`);
        logger.info(`Message Client connected to port ${config.app.port}`);
        qSock = this.sock;

        this.sendMessage('pong', this.sock.identity);

        // can't convert to es6
        this.sock.on('message', function onMessage() {
            let args = Array.apply(null, arguments);
            let topic = args[0].toString('utf8');

            if (topic == 'ping')
                qSock.send(['pong', '']);

            logger.verbose(`[${Date.now()}]received a message related to:`, 'containing message:', args[1].toString('utf8'));
        });
    }

    sendMessage(topic, message) {
        logger.verbose(`Sending following message: ${this.sock.identity} - ${message}.`);
        this.sock.send([topic, message]);
    }
}

module.exports = MessageClient