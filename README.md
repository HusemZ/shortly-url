# Shortly-Url

A professional, testable URL shortener package written in TypeScript following Clean Architecture principles.

This package allows you to convert long URLs into short, unique codes and later resolve those codes back to the original URLs.

## Features

- **TypeScript:** Fully written in TypeScript, offering type safety and a better developer experience.
- **Clean Architecture:** Business logic is completely decoupled from infrastructure, making the code easier to test and maintain.
- **Dependency-Free Core:** Core logic is independent of any database or framework.
- **Testable:** Designed to be 100% testable. Includes unit tests using Jest.
- **Flexible:** Runs in-memory by default, but you can easily integrate your own storage implementation (e.g., Redis, MongoDB).

## Installation

Add the package to your project using npm or yarn:

```bash
npm install @ifuzzer/shortly-url
```

```bash
yarn add @ifuzzer/shortly-url
```

## Usage

Using the package is simple and straightforward.

```typescript
import { UrlShortener } from '@ifuzzer/shortly-url';

async function main() {
  // Create a new shortener instance
  const shortener = new UrlShortener();

  // 1. Shorten a URL
  const longURL = 'https://tr.wikipedia.org/wiki/Anasayfa';
  const shortCode = await shortener.shorten(longURL);

  console.log(`URL Shortened: ${longURL} -> ${shortCode}`);
  // Example Output: URL Shortened: https://tr.wikipedia.org/wiki/Anasayfa -> aB1xZ9c

  // 2. Resolve the short code back to the original URL
  const originalURL = await shortener.resolve(shortCode);

  if (originalURL) {
    console.log(`Code Resolved: ${shortCode} -> ${originalURL}`);
    // Output: Code Resolved: aB1xZ9c -> https://tr.wikipedia.org/wiki/Anasayfa
  }

  // 3. Try resolving a non-existent code
  const nonExistent = await shortener.resolve('nonexistentcode');
  console.log(`Non-existent code result: ${nonExistent}`);
  // Output: Non-existent code result: null
}

main();
```

## Development

After cloning the repo, install the dependencies:

```bash
npm install
```

### Available Scripts

- `npm run build`: Compiles the TypeScript code in the `src` folder into the `dist` folder.
- `npm test`: Runs all tests in the project.
- `npm run lint`: Checks code style and potential issues.
- `npm run format`: Formats the code using Prettier.
