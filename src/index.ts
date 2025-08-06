import { ResolveUrlUseCase } from './core/use-cases/resolveUrl';
import { ShortenUrlUseCase } from './core/use-cases/shortenUrl';
import { InMemoryUrlRepository } from './infrastructure/repositories/InMemoryUrlRepository';
import { generateRandomCode } from './infrastructure/utils/codeGenerator';
import { IUrlRepository } from './core/ports/IUrlRepository';

export class UrlShortener {
  private shortenUrlUseCase: ShortenUrlUseCase;
  private resolveUrlUseCase: ResolveUrlUseCase;

  constructor(urlRepository?: IUrlRepository) {
    const repo = urlRepository || new InMemoryUrlRepository();

    this.shortenUrlUseCase = new ShortenUrlUseCase(repo, generateRandomCode);
    this.resolveUrlUseCase = new ResolveUrlUseCase(repo);
  }

  /**
   * Verilen uzun bir URL'yi kısaltır.
   * @param longUrl Kısaltılacak URL.
   * @returns {Promise<string>} Oluşturulan kısa kod.
   */
  public async shorten(longUrl: string): Promise<string> {
    return this.shortenUrlUseCase.execute(longUrl);
  }

  /**
   * Verilen kısa kodu orijinal URL'ye çözer.
   * @param code Çözülecek kısa kod.
   * @returns {Promise<string | null>} Orijinal URL veya bulunamazsa null.
   */
  public async resolve(code: string): Promise<string | null> {
    return this.resolveUrlUseCase.execute(code);
  }
}
