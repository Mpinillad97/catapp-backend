import { UserModel } from './user.model';
import { IUserRepo } from '../../domain/users/user.repo.port';
import { User } from '../../domain/users/user.types';

export class UserRepoMongoose implements IUserRepo {
  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      passwordHash: doc.passwordHash,
      createdAt: doc.createdAt ?? undefined,
      updatedAt: doc.updatedAt ?? undefined
    };
  }

  async create(data: { name: string; email: string; passwordHash: string }): Promise<User> {
    const doc = await UserModel.create(data);
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      passwordHash: doc.passwordHash,
      createdAt: doc.createdAt ?? undefined,
      updatedAt: doc.updatedAt ?? undefined
    };
  }
}
