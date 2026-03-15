import { userRepository } from '@/repositories/user.repository';
import type { UserRepository } from '@/repositories/user.repository';

import type { CreateUserInput, User } from '@/types/user';

import { sequelize } from '@/db';
import { AuthUserRegisteredPayload, HttpError } from '@chatapp/common';
import { UniqueConstraintError } from 'sequelize';

class UserService {
    constructor(private readonly repository: UserRepository) {}

    async getUserById(id: string): Promise<User> {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new HttpError(404, 'User not found');
        }
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.repository.findAll();
    }

    async createUser(input: CreateUserInput): Promise<User> {
        try {
            const user = await this.repository.create(input);

            // TODO: publish user created event to message broker

            return user;
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new HttpError(409, 'User already exists');
            }
            throw error;
        }
    }

    async searchUsers(params: {
        query: string;
        limit?: number;
        excludeIds?: string[];
    }): Promise<User[]> {
        const query = params.query.trim();
        if (query.length === 0) {
            return [];
        }

        return this.repository.searchByQuery(query, {
            limit: params.limit,
            excludeIds: params.excludeIds,
        });
    }
}

export const userService = new UserService(userRepository);
