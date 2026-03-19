import { useState, useRef, useCallback, useEffect } from 'react';
import { flattenToQueue } from '../services/videoMapper';
import type { VSLPhrase, VideoQueueItem, VideoPlayerStatus } from '../types/vsl.types';

const MISSING_VIDEO_DELAY_MS = 1500;

interface UseVideoQueueReturn {
  currentItem: VideoQueueItem | null;
  currentIndex: number;
  totalCount: number;
  playerStatus: VideoPlayerStatus;
  play: () => void;
  pause: () => void;
  restart: () => void;
  onVideoEnded: () => void;
}

export function useVideoQueue(phrases: VSLPhrase[]): UseVideoQueueReturn {
  // Stable queue — only recompute when phrase IDs actually change
  const queueRef = useRef<VideoQueueItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerStatus, setPlayerStatus] = useState<VideoPlayerStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isStartedRef = useRef(false);

  // Build a stable identity key from phrase ids + videoUrls
  const phraseKey = phrases
    .map((p) => p.id + (p.videoUrl ?? 'x') + p.fallbackWords.map((w) => w.videoUrl ?? 'x').join(''))
    .join('|');

  const prevPhraseKey = useRef('');

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  // Recompute queue only when phrases truly changed
  if (phraseKey !== prevPhraseKey.current) {
    prevPhraseKey.current = phraseKey;
    queueRef.current = flattenToQueue(phrases);
  }

  const queue = queueRef.current;

  const advance = useCallback(() => {
    clearTimer();
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= queueRef.current.length) {
        setPlayerStatus('ended');
        return prev;
      }
      return next;
    });
  }, []);

  // Reset + autoplay when phrases change
  useEffect(() => {
    if (phraseKey === '') return;
    if (!isStartedRef.current && phrases.length === 0) return;

    clearTimer();
    isStartedRef.current = true;
    setCurrentIndex(0);
    setPlayerStatus(queueRef.current.length > 0 ? 'playing' : 'idle');
  }, [phraseKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle null slots — start delay timer when landing on a missing video
  useEffect(() => {
    clearTimer();

    const item = queueRef.current[currentIndex];
    if (!item) return;
    if (item.videoUrl !== null) return; // real video — <video onEnded> handles advance
    if (playerStatus !== 'playing') return;

    console.log('[VSL] Missing video for:', item.phraseText, '— waiting 1.5s');

    timerRef.current = setTimeout(() => {
      advance();
    }, MISSING_VIDEO_DELAY_MS);

    return clearTimer;
  }, [currentIndex, playerStatus, advance]);

  useEffect(() => () => clearTimer(), []);

  const onVideoEnded = useCallback(() => advance(), [advance]);
  const play = useCallback(() => setPlayerStatus('playing'), []);
  const pause = useCallback(() => {
    clearTimer();
    setPlayerStatus('paused');
  }, []);
  const restart = useCallback(() => {
    clearTimer();
    setCurrentIndex(0);
    setPlayerStatus(queueRef.current.length > 0 ? 'playing' : 'idle');
  }, []);

  return {
    currentItem: queue[currentIndex] ?? null,
    currentIndex,
    totalCount: queue.length,
    playerStatus,
    play,
    pause,
    restart,
    onVideoEnded,
  };
}