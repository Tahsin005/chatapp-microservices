import { login, refreshTokens, register, revokeRefreshToken } from '@/services/auth.service';
import { LoginInput, RegisterInput, RefreshInput, RevokeInput } from '@/types/auth';
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

export const refreshHandler: RequestHandler = asyncHandler(async (req, res) => {
    const payload = req.body as RefreshInput;
    if (!payload.refreshToken) {
        throw new HttpError(400, 'refreshToken is required');
    }
    const tokens = await refreshTokens(payload);
    res.json(tokens);
});

export const revokeHandler: RequestHandler = asyncHandler(async (req, res) => {
    const payload = req.body as RevokeInput;
    if (!payload.userId) {
        throw new HttpError(400, 'userId is required');
    }
    await revokeRefreshToken(payload);
    res.status(204).send();
});
