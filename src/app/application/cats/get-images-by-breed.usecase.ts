import { ICatApiClient } from '../../domain/cats/catapi.port';

export class GetImagesByBreedUseCase {
  constructor(private catapi: ICatApiClient) {}
  execute(breedId: string, limit = 10) { return this.catapi.imagesByBreed(breedId, limit); }
}
