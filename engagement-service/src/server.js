const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const errorMiddleware = require('./middleware/error.middleware');
const Infrastructure = require('./config/initInfrastructure'); 

const port = process.env.PORT || 4200;
const infra = Infrastructure;

async function startHttp() {
  try {
    // Initialize Redis, RabbitMQ, DB
    await infra.init({ syncDBModels: true });

    // Start HTTP server
    const srv = app.listen(port, () => {
      console.log(`Auth HTTP service running on port ${port}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down HTTP server...');
      srv.close(async () => {
        await infra.redisClient?.quit();
        await infra.amqpConn?.close();
        await infra.db?.close();
        console.log('Infrastructure closed gracefully');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (err) {
    console.error('Failed to start HTTP server', err);
    process.exit(1);
  }
}

startHttp();
