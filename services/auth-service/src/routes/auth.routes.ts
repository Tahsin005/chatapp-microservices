import { Router } from 'express';
import { validateRequest } from '@chatapp/common';
import { loginSchema, registerSchema } from '@/routes/auth.schema';
import { loginHandler, registerHandler } from '@/controllers/auth.controller';

export const authRouter: Router = Router();

authRouter.post('/register', validateRequest({ body: registerSchema.shape.body }), registerHandler);
authRouter.post('/login', validateRequest({ body: loginSchema.shape.body }), loginHandler);
