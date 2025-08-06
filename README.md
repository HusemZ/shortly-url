# Kisa-Link-TS

TypeScript ile yazılmış, Clean Architecture prensiplerine uygun, profesyonel ve test edilebilir bir URL kısaltıcı paketi.

Bu paket, uzun URL'leri kısa, benzersiz kodlara dönüştürmenizi ve daha sonra bu kodları orijinal URL'lere geri çözmenizi sağlar.

## Özellikler

- **TypeScript:** Tamamen TypeScript ile yazılmıştır, bu da tip güvenliği ve daha iyi bir geliştirici deneyimi sunar.
- **Clean Architecture:** İş mantığı, altyapıdan tamamen ayrılmıştır. Bu, kodun test edilmesini ve bakımını kolaylaştırır.
- **Bağımlılıksız Çekirdek:** Çekirdek mantık, herhangi bir veritabanı veya framework'e bağımlı değildir.
- **Test Edilebilir:** %100 test edilebilir olacak şekilde tasarlanmıştır. Jest ile birim testleri içerir.
- **Esnek:** Varsayılan olarak hafızada (in-memory) çalışır, ancak kendi veritabanı implementasyonunuzu (örn: Redis, MongoDB) kolayca entegre edebilirsiniz.

## Kurulum

npm veya yarn kullanarak paketi projenize ekleyin:

```bash
npm install @ifuzzer/shortly-url
```

```bash
yarn add @ifuzzer/shortly-url
```

## Kullanım

Paketi projenize dahil etmek ve kullanmak oldukça basittir.

```typescript
import { UrlShortener } from '@ifuzzer/shortly-url';

async function main() {
  // Yeni bir kısaltıcı nesnesi oluşturun
  const shortener = new UrlShortener();

  // 1. Bir URL'yi kısaltın
  const longURL =
    '[https://tr.wikipedia.org/wiki/Anasayfa](https://tr.wikipedia.org/wiki/Anasayfa)';
  const shortCode = await shortener.shorten(longURL);

  console.log(`URL Kısaltıldı: ${longURL} -> ${shortCode}`);
  // Örnek Çıktı: URL Kısaltıldı: [https://tr.wikipedia.org/wiki/Anasayfa](https://tr.wikipedia.org/wiki/Anasayfa) -> aB1xZ9c

  // 2. Kısa kodu orijinal URL'ye çözün
  const originalURL = await shortener.resolve(shortCode);

  if (originalURL) {
    console.log(`Kod Çözüldü: ${shortCode} -> ${originalURL}`);
    // Çıktı: Kod Çözüldü: aB1xZ9c -> [https://tr.wikipedia.org/wiki/Anasayfa](https://tr.wikipedia.org/wiki/Anasayfa)
  }

  // 3. Var olmayan bir kodu çözmeyi deneyin
  const nonExistent = await shortener.resolve('olmayankod');
  console.log(`Var olmayan kodun sonucu: ${nonExistent}`);
  // Çıktı: Var olmayan kodun sonucu: null
}

main();
```

## Geliştirme

Bu repoyu klonladıktan sonra bağımlılıkları yükleyin:

```bash
npm install
```

### Kullanılabilir Script'ler

- `npm run build`: `src` klasöründeki TypeScript kodunu `dist` klasörüne derler.
- `npm test`: Projedeki tüm testleri çalıştırır.
- `npm run lint`: Kod stilini ve potansiyel hataları kontrol eder.
- `npm run format`: Prettier kullanarak kod formatını düzenler.
