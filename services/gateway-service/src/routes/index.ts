import { env } from '@/config/env';
import { authProxyService } from '@/services/auth-proxy.service';
import type { Router } from 'express';
import { authRouter } from '@/routes/auth.routes';

export const registerRoutes = (app: Router) => {
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok', service: 'gateway-service' });
    });

    app.use('/auth', authRouter);
};
