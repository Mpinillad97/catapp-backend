import { ICatApiClient } from '../../domain/cats/catapi.port';

export class GetBreedByIdUseCase {
  constructor(private catapi: ICatApiClient) {}
  execute(breedId: string) { return this.catapi.getBreedById(breedId); }
}
