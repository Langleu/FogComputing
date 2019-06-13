const env = process.env.NODE_ENV;

/**
 * Client related confiog
 */
const client = {
 type: 'client',
 app: {
   port: process.env.PORT || 3000,
   backendIp: process.env.BACKEND_IP || '127.0.0.1',
   frontendPort: process.env.FRONTEND_PORT || 8080,
   frontend: process.env.FRONTEND || false,
   database: process.env.DATABASE || true
 },
 identity: process.env.IDENTITY || `peer-${Math.random().toString(36).substr(2, 9)}`,
 verbose: process.env.VERBOSE || false
};

/**
 * Server related config
 */
const server = {
 type: 'server',
 app: {
   port: process.env.PORT || 3000,
   frontendPort: process.env.FRONTEND_PORT || 8080
  },
 verbose: process.env.VERBOSE || false
};

/**
 * Creates an object so it easier accessible via the environment variable
 */
const config = {
 client,
 server
};

module.exports = config[env];
