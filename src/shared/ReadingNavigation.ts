import { createContext, useContext } from 'react';
import type { ReadingAnchorId } from './navigation';

export const ReadingNavigation = createContext<((id: ReadingAnchorId) => void) | null>(null);

export function useReadingNavigation() {
  const navigate = useContext(ReadingNavigation);
  if (!navigate) throw new Error('Reading navigation provider is missing.');
  return navigate;
}
