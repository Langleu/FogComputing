const config = require('./src/config');

require('./src/MessageHandler/index');

if (config.type == 'client') {
    require('./src/Client/tinkerforge');
    //require('./src/Server/server'); // modular local frontend
} else
    require('./src/Server/server');