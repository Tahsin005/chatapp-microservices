import { env } from "@/config/env";
import { createApp } from "@/app";
import { logger } from '@/utils/logger';
import { createServer } from 'http';
import { closeDatabase, connectToDatabase } from "@/db/sequilize";


const main = async () => {
    try {
        await connectToDatabase();
        const app = createApp();
        const server = createServer(app);

        const port = env.AUTH_SERVICE_PORT;

        server.listen(port, () => {
            logger.info({ port }, 'Auth service is running');
        });

        const shutdown = () => {
            logger.info('Shutting down auth service...');

            Promise.all([closeDatabase()])
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
        logger.error({ error }, 'Failed to start auth service');
        process.exit(1);
    }
};

void main();