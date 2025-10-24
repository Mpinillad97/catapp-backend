import type { ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

type Source = 'body' | 'query' | 'params';

export function validate(schema: ZodTypeAny, source: Source = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse((req as any)[source]);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Invalid input',
        issues: parsed.error.issues
      });
    }
    (req as any).validated = parsed.data;
    next();
  };
}
