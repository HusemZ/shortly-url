import { IUrlRepository } from '../ports/IUrlRepository';

export class ResolveUrlUseCase {
  constructor(private readonly urlRepository: IUrlRepository) {}

  public async execute(code: string): Promise<string | null> {
    const url = await this.urlRepository.findByCode(code);
    return url ? url.longUrl : null;
  }
}
