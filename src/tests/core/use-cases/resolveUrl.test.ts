import { ResolveUrlUseCase } from '../../../../src/core/use-cases/resolveUrl';
import { IUrlRepository } from '../../../../src/core/ports/IUrlRepository';
import { Url } from '../../../../src/core/entities/Url';

const mockUrlRepository: jest.Mocked<IUrlRepository> = {
  save: jest.fn(),
  findByCode: jest.fn(),
  codeExists: jest.fn(),
};

describe('ResolveUrl Use Case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the long URL if the code exists', async () => {
    const shortCode = 'abc1234';
    const longUrl = 'https://www.google.com';
    const urlEntity = new Url(shortCode, longUrl);
    mockUrlRepository.findByCode.mockResolvedValue(urlEntity);

    const useCase = new ResolveUrlUseCase(mockUrlRepository);

    const result = await useCase.execute(shortCode);

    expect(result).toBe(longUrl);
    expect(mockUrlRepository.findByCode).toHaveBeenCalledWith(shortCode);
    expect(mockUrlRepository.findByCode).toHaveBeenCalledTimes(1);
  });

  it('should return null if the code does not exist', async () => {
    const shortCode = 'nonexist';
    mockUrlRepository.findByCode.mockResolvedValue(null);

    const useCase = new ResolveUrlUseCase(mockUrlRepository);

    const result = await useCase.execute(shortCode);

    expect(result).toBeNull();
    expect(mockUrlRepository.findByCode).toHaveBeenCalledWith(shortCode);
  });
});
