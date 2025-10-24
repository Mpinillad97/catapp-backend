import { Request, Response } from 'express';
import { CatApiAxiosClient } from '../infrastructure/cats/catapi.axios';
import { GetBreedsUseCase } from '../application/cats/get-breeds.usecase';
import { GetBreedByIdUseCase } from '../application/cats/get-breed-by-id.usecase';
import { SearchBreedsUseCase } from '../application/cats/search-breeds.usecase';

const catapi = new CatApiAxiosClient();

export class CatsController {
    static async listBreeds(_req: Request, res: Response) {
        const uc = new GetBreedsUseCase(catapi);
        res.json(await uc.execute());
    }

    static async getBreed(req: Request, res: Response) {
        const { breed_id } = (req as any).validated;
        const uc = new GetBreedByIdUseCase(catapi);
        const breed = await uc.execute(breed_id);
        if (!breed) return res.status(404).json({ message: 'Breed not found' });
        res.json(breed);
    }

    static async search(req: Request, res: Response) {
        const { query } = (req as any).validated;
        const uc = new SearchBreedsUseCase(catapi);
        res.json(await uc.execute(query));
    }
}
