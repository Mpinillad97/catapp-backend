import axios from 'axios';
import { env } from '../../../config/env';
import { ICatApiClient } from '../../domain/cats/catapi.port';
import { Breed, CatImage } from '../../domain/cats/cats.types';

export class CatApiAxiosClient implements ICatApiClient {
  private client = axios.create({
    baseURL: env.catApiUrl,
    headers: { 'x-api-key': env.catApiKey }
  });

  async listBreeds(): Promise<Breed[]> {
    const { data } = await this.client.get<Breed[]>('/breeds');
    return data;
  }

  async getBreedById(breedId: string): Promise<Breed | null> {
    const breeds = await this.listBreeds();
    return breeds.find((b) => b.id === breedId) ?? null;
  }

  async searchBreeds(query: string): Promise<Breed[]> {
    const { data } = await this.client.get<Breed[]>('/breeds/search', { params: { q: query } });
    return data;
  }

  async imagesByBreed(breedId: string, limit = 5): Promise<CatImage[]> {
    const { data } = await this.client.get<CatImage[]>('/images/search', {
      params: { breed_ids: breedId, limit }
    });
    return data;
  }
}
