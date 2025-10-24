import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 3000),
  catApiUrl: process.env.CAT_API_URL ?? 'https://api.thecatapi.com/v1',
  catApiKey: process.env.CAT_API_KEY ?? '',
  mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/catapp',
  jwtSecret: process.env.JWT_SECRET ?? 'change_me'
};
