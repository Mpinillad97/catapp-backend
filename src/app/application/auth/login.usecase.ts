import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepo } from '../../domain/users/user.repo.port';
import { env } from '../../../config/env';
import { AppError } from '../../shared/app-error';

export class LoginUseCase {
  constructor(private users: IUserRepo) {}

  async execute(input: { email: string; password: string }) {
    const user = await this.users.findByEmail(input.email);
    if (!user) {
      throw new AppError('Invalid credentials', 401, 'UNAUTHORIZED');
    }

    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) {
      throw new AppError('Invalid credentials', 401, 'UNAUTHORIZED');
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, { expiresIn: '2h' });
    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }
}
