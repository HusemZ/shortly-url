import { ShortenUrlUseCase } from '../../../../src/core/use-cases/shortenUrl';
import { IUrlRepository } from '../../../../src/core/ports/IUrlRepository';
import { Url } from '../../../../src/core/entities/Url';

const mockUrlRepository: jest.Mocked<IUrlRepository> = {
  save: jest.fn(),
  findByCode: jest.fn(),
  codeExists: jest.fn(),
};

const mockCodeGenerator = jest.fn();

describe('ShortenUrl Use Case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create and save a new short URL', async () => {
    const longUrl = 'https://www.google.com';
    const expectedCode = 'abc1234';
    mockUrlRepository.codeExists.mockResolvedValue(false);
    mockCodeGenerator.mockReturnValue(expectedCode);

    const useCase = new ShortenUrlUseCase(mockUrlRepository, mockCodeGenerator);

    const shortCode = await useCase.execute(longUrl);

    expect(shortCode).toBe(expectedCode);
    expect(mockUrlRepository.save).toHaveBeenCalledTimes(1);
    expect(mockUrlRepository.save).toHaveBeenCalledWith(expect.any(Url));
    const savedUrl = mockUrlRepository.save.mock.calls[0][0] as Url;
    expect(savedUrl.longUrl).toBe(longUrl);
    expect(savedUrl.id).toBe(expectedCode);
  });

  it('should generate a new code if the first one already exists', async () => {
    const longUrl = 'https://www.google.com';
    const existingCode = 'exist12';
    const newCode = 'new4567';

    mockUrlRepository.codeExists
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);

    mockCodeGenerator
      .mockReturnValueOnce(existingCode)
      .mockReturnValueOnce(newCode);

    const useCase = new ShortenUrlUseCase(mockUrlRepository, mockCodeGenerator);

    const shortCode = await useCase.execute(longUrl);

    expect(shortCode).toBe(newCode);
    expect(mockCodeGenerator).toHaveBeenCalledTimes(2);
    expect(mockUrlRepository.codeExists).toHaveBeenCalledTimes(2);
    expect(mockUrlRepository.save).toHaveBeenCalledWith(expect.any(Url));
  });
});
