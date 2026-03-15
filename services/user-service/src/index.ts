import { env } from '@/config/env';
import { createApp } from '@/app';
import { createServer } from 'http';
import { logger } from '@/utils/logger';
import { closeDatabase, initializeDatabase } from '@/db';
import { closeMessaging, initMessaging } from '@/messaging/event-publisher';
import { startAuthEventConsumer, stopAuthEventConsume } from '@/messaging/auth-consumer';

const main = async () => {
  try {
        await initializeDatabase();
        await initMessaging();
        await startAuthEventConsumer();
        
        const app = createApp();
        const server = createServer(app);

        const port = env.USER_SERVICE_PORT;

        server.listen(port, () => {
            logger.info({ port }, 'User service is running');
        });

        const shutdown = () => {
        logger.info('Shutting down user service...');
        Promise.all([closeDatabase(), stopAuthEventConsume(), closeMessaging()])
            .catch((error: unknown) => {
                logger.error({ error }, 'Error during shutdown tasks');
            })
            .finally(() => {
                server.close(() => process.exit(0));
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        logger.error({ error }, 'Failed to start user service');
        process.exit(1);
    }
};

void main();
