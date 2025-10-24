import { z } from 'zod';

export const BreedIdParams = z.object({ breed_id: z.string().min(1) });
export const SearchQuery   = z.object({ query: z.string().default('') });
export const ImagesQuery   = z.object({
  breed_id: z.string().min(1),
  limit: z.coerce.number().int().positive().max(50).default(10)
});
