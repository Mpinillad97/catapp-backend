import { Router } from 'express';
import { CatsController } from '../controllers/cats.controller';
import { ImagesController } from '../controllers/images.controller';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { BreedIdParams, SearchQuery, ImagesQuery } from '../controllers/cats.schemas';

export const router = Router();

// Health
router.get('/health', (_req, res) => res.json({ ok: true, service: 'catapp-api' }));

// Cats
router.get('/breeds', CatsController.listBreeds);
router.get('/breeds/search', validate(SearchQuery, 'query'), CatsController.search);
router.get('/breeds/:breed_id', validate(BreedIdParams, 'params'), CatsController.getBreed);

// Images
router.get('/imagesbybreedid', validate(ImagesQuery, 'query'), ImagesController.byBreed);

// Users 
router.get('/register', AuthController.registerGet);
router.get('/login', AuthController.loginGet);

// Ruta protegida 
router.get('/me', authMiddleware, AuthController.me);
