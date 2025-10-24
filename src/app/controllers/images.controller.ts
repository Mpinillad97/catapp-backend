import { Request, Response } from 'express';
import { CatApiAxiosClient } from '../infrastructure/cats/catapi.axios';
import { GetImagesByBreedUseCase } from '../application/cats/get-images-by-breed.usecase';

const catapi = new CatApiAxiosClient();

export class ImagesController {
    static async byBreed(req: Request, res: Response) {
        const { breed_id, limit } = (req as any).validated;
        const uc = new GetImagesByBreedUseCase(catapi);
        res.json(await uc.execute(breed_id, limit));
    }
}
