import {
    createConversationHandler,
    listConversationHandler,
} from '@/controllers/conversation.controller';
import { attachAuthenticatedUser } from '@/middleware/authenticated-user';
import {
    createConversationSchema,
    listConversationsQuerySchema,
} from '@/validation/conversation.schema';
import { conversationIdParamsSchema } from '@/validation/shared.schema';
import { validateRequest } from '@chatapp/common';
import { Router } from 'express';

export const conversationRouter: Router = Router();

conversationRouter.use(attachAuthenticatedUser);

conversationRouter.post(
    '/',
    validateRequest({ body: createConversationSchema }),
    createConversationHandler,
);

conversationRouter.get(
    '/',
    validateRequest({ query: listConversationsQuerySchema }),
    listConversationHandler,
);