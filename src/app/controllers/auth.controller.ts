import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { UserRepoMongoose } from '../infrastructure/users/user.repo.mongoose';
import { RegisterUseCase } from '../application/auth/register.usecase';
import { LoginUseCase } from '../application/auth/login.usecase';
import { AppError } from '../shared/app-error';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const usersRepo = new UserRepoMongoose();

export class AuthController {
  static async registerGet(req: Request, res: Response, next: NextFunction) {
    try {
      const input = registerSchema.parse({
        name: req.query.name,
        email: req.query.email,
        password: req.query.password
      });
      const uc = new RegisterUseCase(usersRepo);
      const data = await uc.execute(input);
      return res.status(201).json(data);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return next(new AppError('Invalid input', 400, 'VALIDATION_ERROR'));
      }
      return next(e);
    }
  }

  static async loginGet(req: Request, res: Response) {
    try {
      const input = loginSchema.parse({
        email: req.query.email,
        password: req.query.password
      });
      const uc = new LoginUseCase(usersRepo);
      const data = await uc.execute(input);
      return res.json(data);
    } catch (e: any) {
      if (e.message === 'UNAUTHORIZED') return res.status(401).json({ message: 'Invalid credentials' });
      return res.status(400).json({ message: 'Invalid input' });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const input = registerSchema.parse(req.body);
      const uc = new RegisterUseCase(usersRepo);
      const data = await uc.execute(input);
      return res.status(201).json(data);
    } catch (e: any) {
      if (e.message === 'EMAIL_TAKEN') return res.status(409).json({ message: 'Email already registered' });
      return res.status(400).json({ message: 'Invalid input' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const input = loginSchema.parse(req.body);
      const uc = new LoginUseCase(usersRepo);
      const data = await uc.execute(input);
      return res.json(data);
    } catch (e: any) {
      if (e.message === 'UNAUTHORIZED') return res.status(401).json({ message: 'Invalid credentials' });
      return res.status(400).json({ message: 'Invalid input' });
    }
  }

  static async me(req: Request, res: Response) {
    return res.json({ user: (req as any).user });
  }
}
