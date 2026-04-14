'use client';

import { createContext, useContext } from 'react';

const PactImagesContext = createContext<string[]>([]);

export function PactImagesProvider({
  children,
  images,
}: {
  readonly children: React.ReactNode;
  readonly images: string[];
}) {
  return <PactImagesContext.Provider value={images}>{children}</PactImagesContext.Provider>;
}

export function usePactImages(): string[] {
  return useContext(PactImagesContext);
}
