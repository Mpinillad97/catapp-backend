import { Breed, CatImage } from './cats.types';

export interface ICatApiClient {
  listBreeds(): Promise<Breed[]>;
  getBreedById(breedId: string): Promise<Breed | null>;
  searchBreeds(query: string): Promise<Breed[]>;
  imagesByBreed(breedId: string, limit?: number): Promise<CatImage[]>;
}
