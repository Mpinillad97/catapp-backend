import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { router } from './app/routes';
import { errorMiddleware } from './app/middlewares/error.middleware';
import { connectMongo } from './app/infrastructure/db/mongoose';

async function bootstrap() {
    await connectMongo();
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api', router);

  app.use(errorMiddleware);

  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start app', err);
  process.exit(1);
});
