import { useState, useCallback } from 'react';
import { convertToVSL } from '../services/vslConverter';
import { mapPhrasesToVideos } from '../services/videoMapper';
import type { VSLConversionStatus, VSLPhrase } from '../types/vsl.types';

// Read API key from env — never hardcode
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;

interface UseVSLConverterReturn {
  status: VSLConversionStatus;
  phrases: VSLPhrase[];
  convert: (sentence: string) => Promise<void>;
  reset: () => void;
}

export function useVSLConverter(): UseVSLConverterReturn {
  const [status, setStatus] = useState<VSLConversionStatus>({ status: 'idle' });
  const [phrases, setPhrases] = useState<VSLPhrase[]>([]);

  const convert = useCallback(async (sentence: string) => {
    if (!sentence.trim()) return;

    setStatus({ status: 'loading' });
    setPhrases([]);

    try {
      // Step 1: AI converts sentence → VSL phrase strings
      const result = await convertToVSL(sentence, API_KEY);

      // Step 2: Resolve each phrase to a video URL (with fallback)
      const resolved = await mapPhrasesToVideos(result.phrases);

      setPhrases(resolved);
      setStatus({ status: 'success', result });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatus({ status: 'error', message });
    }
  }, []);

  const reset = useCallback(() => {
    setStatus({ status: 'idle' });
    setPhrases([]);
  }, []);

  return { status, phrases, convert, reset };
}