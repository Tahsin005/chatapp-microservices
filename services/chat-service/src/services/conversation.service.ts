import { HttpError } from '@chatapp/common';
import type {
  Conversation,
  ConversationFilter,
  ConversationSummary,
  CreateConversationInput,
} from '@/types/conversation';

import { conversationRepository } from '@/repositories/conversation.repository';

export const conversationService = {
    async createConversation(input: CreateConversationInput): Promise<Conversation> {
        const conversation = await conversationRepository.create(input);
        return conversation;
    }
};