import { Url } from '../entities/Url';
import { IUrlRepository } from '../ports/IUrlRepository';

export class ShortenUrlUseCase {
  constructor(
    private readonly urlRepository: IUrlRepository,
    private readonly codeGenerator: () => string,
  ) {}

  public async execute(longUrl: string): Promise<string> {
    let shortCode;
    do {
      shortCode = this.codeGenerator();
    } while (await this.urlRepository.codeExists(shortCode));

    const url = new Url(shortCode, longUrl);
    await this.urlRepository.save(url);

    return url.id;
  }
}
