const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const dotenv = require('dotenv');
const authService = require('./src/services/authService');

dotenv.config();

const PROTO_PATH = path.resolve(__dirname, './src/auth.proto');
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const authPackage = grpcObject.auth;

const server = new grpc.Server();

// Capture unhandled errors
process.on('uncaughtException', (err) => {
  console.error('uncaughtException in process:', err?.stack || err);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection in process:', reason);
});

// Register services
server.addService(authPackage.AuthService.service, {
  Signup: async (call, callback) => {
    try {
      const { email, password } = call.request;
      const result = await authService.signup(email, password);
      callback(null, result);
    } catch (err) {
      console.error('gRPC Signup error', err);
      callback(null, { message: 'Internal error' });
    }
  },
  Login: async (call, callback) => {
    try {
      const { email, password } = call.request;
      const result = await authService.login(email, password);
      callback(null, result);
    } catch (err) {
      console.error('gRPC Login error', err);
      callback(null, { message: 'Internal error' });
    }
  },
  VerifyToken: async (call, callback) => {
    try {
      const { token } = call.request;
      const result = await authService.verifyToken(token);
      callback(null, result);
    } catch (err) {
      console.error('gRPC VerifyToken error', err);
      callback(null, { isValid: false });
    }
  }
});

async function start() {
  try {
    // Connect to Redis, RabbitMQ, etc.
    await authService.initInfrastructure();

    const bindAddr = process.env.GRPC_BIND || '0.0.0.0:50051';

    // Promisify bindAsync
    const port = await new Promise((resolve, reject) => {
      server.bindAsync(bindAddr, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) reject(err);
        else resolve(port);
      });
    });

    console.log('✅ Auth gRPC server running at %s (port %d)', bindAddr, port);

    // Attach signal listeners for graceful shutdown
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (err) {
    console.error('❌ Failed to start gRPC server:', err);
    process.exit(1);
  }
}

let shuttingDown = false;
async function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;

  console.trace('shutdown() called - stacktrace for why shutdown invoked');
  console.log('Shutting down gRPC server...');
  try {
    server.forceShutdown();
    await authService.shutdown();
  } catch (e) {
    console.warn('Error during shutdown', e);
  }
  process.exit(0);
}

start();
