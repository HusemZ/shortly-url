export class Url {
  public readonly id: string;
  public readonly longUrl: string;
  public readonly createdAt: Date;

  constructor(id: string, longUrl: string) {
    if (!Url.isValidUrl(longUrl)) {
      throw new Error('Invalid URL format');
    }
    this.id = id;
    this.longUrl = longUrl;
    this.createdAt = new Date();
  }

  private static isValidUrl(url: string): boolean {
    try {
      // eslint-disable-next-line no-new
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
}
