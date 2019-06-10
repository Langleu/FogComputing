const config = require('./src/config');

require('./src/MessageHandler/index');

if (config.type == 'client') {
    require('./src/Client/tinkerforge');
    if (config.app.frontend)
        require('./src/Server/server');
} else
    require('./src/Server/server');