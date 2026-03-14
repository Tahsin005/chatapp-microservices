import { login, register } from '@/services/auth.service';
import { LoginInput, RegisterInput } from '@/types/auth';
import { asyncHandler, HttpError } from '@chatapp/common';
import { RequestHandler } from 'express';

export const registerHandler: RequestHandler = asyncHandler(async (req, res) => {
    const payload = req.body as RegisterInput;
    const tokens = await register(payload);
    res.status(201).json(tokens);
});

export const loginHandler: RequestHandler = asyncHandler(async (req, res) => {
    const payload = req.body as LoginInput;
    const tokens = await login(payload);
    res.json(tokens);
});