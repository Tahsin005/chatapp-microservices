import { userRepository } from '@/repositories/user.repository';
import type { UserRepository } from '@/repositories/user.repository';

import type { CreateUserInput, User } from '@/types/user';

import { sequelize } from '@/db';
import { AuthUserRegisteredPayload, HttpError } from '@chatapp/common';

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
}

export const userService = new UserService(userRepository);
