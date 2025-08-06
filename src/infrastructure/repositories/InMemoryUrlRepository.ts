import { Url } from '../../core/entities/Url';
import { IUrlRepository } from '../../core/ports/IUrlRepository';

export class InMemoryUrlRepository implements IUrlRepository {
  private readonly urls = new Map<string, Url>();

  async save(url: Url): Promise<void> {
    this.urls.set(url.id, url);
  }

  async findByCode(code: string): Promise<Url | null> {
    return this.urls.get(code) || null;
  }

  async codeExists(code: string): Promise<boolean> {
    return this.urls.has(code);
  }
}
