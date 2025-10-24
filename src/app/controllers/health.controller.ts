import { Request, Response } from 'express';

export class HealthController {
  static status(_req: Request, res: Response) {
    res.json({ ok: true, service: 'catapp-api' });
  }
}
