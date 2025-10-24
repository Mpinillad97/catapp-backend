import { GetBreedsUseCase } from '../../app/application/cats/get-breeds.usecase';
import { ICatApiClient } from '../../app/domain/cats/catapi.port';

describe('[unit] GetBreedsUseCase', () => {
  it('retorna la lista desde el puerto', async () => {
    const mockPort: ICatApiClient = {
      listBreeds: jest.fn().mockResolvedValue([{ id: 'abys', name: 'Abyssinian' }]),
      getBreedById: jest.fn(),
      searchBreeds: jest.fn(),
      imagesByBreed: jest.fn()
    };

    const uc = new GetBreedsUseCase(mockPort);
    const res = await uc.execute();

    expect(res).toHaveLength(1);
    expect(res[0]).toMatchObject({ id: 'abys' });
    expect(mockPort.listBreeds).toHaveBeenCalled();
  });
});
