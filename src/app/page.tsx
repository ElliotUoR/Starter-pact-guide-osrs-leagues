import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { PactImagesProvider } from '@/context/PactImagesContext';
import ClientPage from './ClientPage';

export default async function GuidePage() {
  const pactsDir = join(process.cwd(), 'public/images/pacts');
  const allFiles = await readdir(pactsDir);
  const pactImages = allFiles.filter((f) => f.endsWith('.png')).sort((a, b) => a.localeCompare(b));

  return (
    <PactImagesProvider images={pactImages}>
      <ClientPage />
    </PactImagesProvider>
  );
}
