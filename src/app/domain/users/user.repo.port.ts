import { User } from './user.types';

export interface IUserRepo {
  findByEmail(email: string): Promise<User | null>;
  create(data: { name: string; email: string; passwordHash: string }): Promise<User>;
}
