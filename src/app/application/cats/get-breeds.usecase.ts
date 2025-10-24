import { ICatApiClient } from '../../domain/cats/catapi.port';

export class GetBreedsUseCase {
  constructor(private catapi: ICatApiClient) {}
  execute() { return this.catapi.listBreeds(); }
}
