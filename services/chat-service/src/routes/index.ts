import type { Router } from 'express';


export const registerRoutes = (app: Router) => {
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok', service: 'chat-service' });
    });
};
