import { LoginUseCase } from '../../app/application/auth/login.usecase';
import { IUserRepo } from '../../app/domain/users/user.repo.port';
import bcrypt from 'bcrypt';

describe('[unit] LoginUseCase', () => {
  it('lanza UNAUTHORIZED si usuario no existe', async () => {
    const repo: IUserRepo = {
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest.fn() as any
    };

    const uc = new LoginUseCase(repo);
    await expect(uc.execute({ email: 'a@a.com', password: 'x' }))
      .rejects.toThrow(/UNAUTHORIZED|Invalid credentials/i);
  });

  it('retorna token si credenciales válidas', async () => {
    const passwordHash = await bcrypt.hash('123456', 10);
    const repo: IUserRepo = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 'u1', name: 'Test', email: 't@t.com', passwordHash
      }),
      create: jest.fn() as any
    };

    const uc = new LoginUseCase(repo);
    const res = await uc.execute({ email: 't@t.com', password: '123456' });

    expect(res.user.email).toBe('t@t.com');
    expect(typeof res.token).toBe('string');
  });
});
