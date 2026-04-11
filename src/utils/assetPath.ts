// Prefix asset paths with the basePath so they work on GitHub Pages sub-paths.
// NEXT_PUBLIC_BASE_PATH is injected at build time by the GitHub Actions workflow.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const assetPath = (path: string) => `${base}${path}`;

export const relicImg = (filename: string) =>
  assetPath(`/images/relics/${filename}`);
