export type Breed = {
  id: string;
  name: string;
  temperament?: string;
  origin?: string;
  intelligence?: number;
  description?: string;
  wikipedia_url?: string;
};

export type CatImage = {
  id: string;
  url: string;
  breeds?: Breed[];
};
