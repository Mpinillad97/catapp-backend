import bcrypt from 'bcrypt';
import { IUserRepo } from '../../domain/users/user.repo.port';
import { AppError } from '../../shared/app-error';

export class RegisterUseCase {
  constructor(private users: IUserRepo) {}

  async execute(input: { name: string; email: string; password: string }) {
    const exists = await this.users.findByEmail(input.email);
    if (exists) {
      throw new AppError('Email already registered', 409, 'EMAIL_TAKEN');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const created = await this.users.create({ name: input.name, email: input.email, passwordHash });

    return { id: created.id, name: created.name, email: created.email };
  }
}
