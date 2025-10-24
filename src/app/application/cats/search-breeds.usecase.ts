import { ICatApiClient } from '../../domain/cats/catapi.port';

export class SearchBreedsUseCase {
  constructor(private catapi: ICatApiClient) {}
  execute(query: string) { return this.catapi.searchBreeds(query); }
}
