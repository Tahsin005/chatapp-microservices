import { env } from '@/config/env';
import { createServiceProxy } from '@/utils/proxy';
import type { Router } from 'express';

export const registerRoutes = (app: Router) => {
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok', service: 'gateway-service' });
    });

    app.use('/auth', createServiceProxy(env.AUTH_SERVICE_URL, '/auth'));
};
