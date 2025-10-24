// ensamblado de dependencias 
import { CatApiAxiosClient } from './infrastructure/cats/catapi.axios';
import { GetBreedsUseCase } from './application/cats/get-breeds.usecase';
import { GetBreedByIdUseCase } from './application/cats/get-breed-by-id.usecase';
import { SearchBreedsUseCase } from './application/cats/search-breeds.usecase';
import { GetImagesByBreedUseCase } from './application/cats/get-images-by-breed.usecase';

import { UserRepoMongoose } from './infrastructure/users/user.repo.mongoose';
import { RegisterUseCase } from './application/auth/register.usecase';
import { LoginUseCase } from './application/auth/login.usecase';

const catapi = new CatApiAxiosClient();
const usersRepo = new UserRepoMongoose();

export const services = {
  cats: {
    getBreeds: new GetBreedsUseCase(catapi),
    getBreedById: new GetBreedByIdUseCase(catapi),
    searchBreeds: new SearchBreedsUseCase(catapi),
    getImagesByBreed: new GetImagesByBreedUseCase(catapi),
  },
  auth: {
    register: new RegisterUseCase(usersRepo),
    login: new LoginUseCase(usersRepo),
  }
};
