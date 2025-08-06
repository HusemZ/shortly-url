import { Url } from '../entities/Url';

export interface IUrlRepository {
  save(url: Url): Promise<void>;
  findByCode(code: string): Promise<Url | null>;
  codeExists(code: string): Promise<boolean>;
}
