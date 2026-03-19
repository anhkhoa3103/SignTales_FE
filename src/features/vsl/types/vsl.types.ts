// ─── Core domain types ───────────────────────────────────────────────

export interface VSLPhrase {
  id: string;           // unique key for React lists
  text: string;         // normalized uppercase, e.g. "ĐI HỌC"
  videoUrl: string | null;  // null = no video found
  fallbackWords: VSLWord[]; // used when videoUrl is null
}

export interface VSLWord {
  text: string;         // e.g. "ĐI"
  videoUrl: string | null;
}

// ─── AI layer ────────────────────────────────────────────────────────

export interface VSLConversionResult {
  originalSentence: string;
  phrases: string[];    // raw output from AI: ["HÔM NAY", "TÔI", "ĐI HỌC"]
}

export type VSLConversionStatus =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; result: VSLConversionResult }
  | { status: 'error'; message: string };

// ─── Video layer ──────────────────────────────────────────────────────
export interface VideoQueueItem {
  phraseId: string;
  phraseText: string;
  videoUrl: string; // no longer nullable
}

export type VideoPlayerStatus = 'idle' | 'playing' | 'paused' | 'ended';