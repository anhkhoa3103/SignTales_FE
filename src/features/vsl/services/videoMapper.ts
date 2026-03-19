import type { VSLPhrase, VSLWord, VideoQueueItem } from '../types/vsl.types';

// ─── Naming convention ────────────────────────────────────────────────
//
// "HÔM NAY"  → /videos/HOM_NAY.mp4
// "ĐI HỌC"   → /videos/DI_HOC.mp4
// "TÔI"      → /videos/TOI.mp4
//
// Rules:
// 1. Remove Vietnamese diacritics
// 2. Replace spaces with underscores
// 3. Uppercase
// 4. All videos live in /public/tutorial-video

const VIDEO_BASE_PATH = 'public/tutorial-video';
const VIDEO_EXTENSION = '.mp4';
const FALLBACK_VIDEO = 'public/tutorial-video/UNKNOWN.mp4';
// ─── Diacritic removal map ────────────────────────────────────────────

const DIACRITIC_MAP: Record<string, string> = {
    à: 'a', á: 'a', â: 'a', ã: 'a', ä: 'a', å: 'a',
    ă: 'a', ắ: 'a', ặ: 'a', ằ: 'a', ẳ: 'a', ẵ: 'a',
    ấ: 'a', ầ: 'a', ẩ: 'a', ẫ: 'a', ậ: 'a', ạ: 'a',
    è: 'e', é: 'e', ê: 'e', ë: 'e',
    ế: 'e', ề: 'e', ể: 'e', ễ: 'e', ệ: 'e',
    ì: 'i', í: 'i', î: 'i', ï: 'i',
    ò: 'o', ó: 'o', ô: 'o', õ: 'o', ö: 'o', ọ: 'o',
    ố: 'o', ồ: 'o', ổ: 'o', ỗ: 'o', ộ: 'o',
    ơ: 'o', ớ: 'o', ờ: 'o', ở: 'o', ỡ: 'o', ợ: 'o',
    ù: 'u', ú: 'u', û: 'u', ü: 'u',
    ư: 'u', ứ: 'u', ừ: 'u', ử: 'u', ữ: 'u', ự: 'u',
    ỳ: 'y', ý: 'y', ỷ: 'y', ỹ: 'y', ỵ: 'y',
    đ: 'd',
    // Uppercase variants
    À: 'A', Á: 'A', Â: 'A', Ã: 'A', Ä: 'A', Å: 'A',
    Ă: 'A', Ắ: 'A', Ặ: 'A', Ằ: 'A', Ẳ: 'A', Ẵ: 'A',
    Ấ: 'A', Ầ: 'A', Ẩ: 'A', Ẫ: 'A', Ậ: 'A', Ạ: 'A',
    È: 'E', É: 'E', Ê: 'E', Ë: 'E',
    Ế: 'E', Ề: 'E', Ể: 'E', Ễ: 'E', Ệ: 'E',
    Ì: 'I', Í: 'I', Î: 'I', Ï: 'I',
    Ò: 'O', Ó: 'O', Ô: 'O', Õ: 'O', Ö: 'O', Ọ: 'O',
    Ố: 'O', Ồ: 'O', Ổ: 'O', Ỗ: 'O', Ộ: 'O',
    Ơ: 'O', Ớ: 'O', Ờ: 'O', Ở: 'O', Ỡ: 'O', Ợ: 'O',
    Ù: 'U', Ú: 'U', Û: 'U', Ü: 'U',
    Ư: 'U', Ứ: 'U', Ừ: 'U', Ử: 'U', Ữ: 'U', Ự: 'U',
    Ỳ: 'Y', Ý: 'Y', Ỷ: 'Y', Ỹ: 'Y', Ỵ: 'Y',
    Đ: 'D',
};

// ─── Helpers ──────────────────────────────────────────────────────────

export function normalizeToFilename(phrase: string): string {
    return phrase
        .split('')
        .map((char) => DIACRITIC_MAP[char] ?? char)
        .join('')
        .toUpperCase()
        .replace(/\s+/g, '_')        // spaces → underscores
        .replace(/[^A-Z0-9_]/g, ''); // strip anything unexpected
}

export function buildVideoUrl(phrase: string): string {
    const filename = normalizeToFilename(phrase);
    return `${VIDEO_BASE_PATH}/${filename}${VIDEO_EXTENSION}`;
}

// ─── Video existence check ────────────────────────────────────────────
//
// We can't use fs.exists in the browser.
// Strategy: attempt a HEAD request — fast, no body downloaded.
// Returns true if server responds 200.

export async function videoExists(url: string): Promise<boolean> {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok;
    } catch {
        return false;
    }
}

// ─── Single phrase resolver ───────────────────────────────────────────

async function resolvePhrase(
    text: string,
    index: number,
): Promise<VSLPhrase> {
    const phraseUrl = buildVideoUrl(text);
    const exists = await videoExists(phraseUrl);

    if (exists) {
        return {
            id: `phrase-${index}-${normalizeToFilename(text)}`,
            text,
            videoUrl: phraseUrl,
            fallbackWords: [],
        };
    }

    // Fallback: split into individual words and resolve each
    const words = text.split(/\s+/);
    const fallbackWords: VSLWord[] = await Promise.all(
        words.map(async (word): Promise<VSLWord> => {
            const wordUrl = buildVideoUrl(word);
            const wordExists = await videoExists(wordUrl);
            return {
                text: word,
                videoUrl: wordExists ? wordUrl : null,
            };
        }),
    );

    return {
        id: `phrase-${index}-${normalizeToFilename(text)}`,
        text,
        videoUrl: null,
        fallbackWords,
    };
}

// ─── Main mapper ──────────────────────────────────────────────────────
//
// Resolves all phrases concurrently — much faster than sequential await.

export async function mapPhrasesToVideos(
    phrases: string[],
): Promise<VSLPhrase[]> {
    return Promise.all(phrases.map((phrase, i) => resolvePhrase(phrase, i)));
}

// ─── Flatten to playable queue ────────────────────────────────────────
//
// Takes resolved VSLPhrase[] and returns only the URLs that actually
// exist — in order. This is what the video player consumes.
export function flattenToQueue(phrases: VSLPhrase[]): VideoQueueItem[] {
  const items: VideoQueueItem[] = [];

  for (const phrase of phrases) {
    if (phrase.videoUrl) {
      items.push({
        phraseId: phrase.id,
        phraseText: phrase.text,
        videoUrl: phrase.videoUrl,
      });
      continue;
    }

    // Fallback words first — if any word has a video, use it
    const wordItems: VideoQueueItem[] = phrase.fallbackWords.map((word) => ({
      phraseId: phrase.id,
      phraseText: word.text,
      videoUrl: word.videoUrl ?? FALLBACK_VIDEO, // word missing → UNKNOWN
    }));

    if (wordItems.length > 0) {
      items.push(...wordItems);
    } else {
      // No fallback words at all → UNKNOWN
      items.push({
        phraseId: phrase.id,
        phraseText: phrase.text,
        videoUrl: FALLBACK_VIDEO,
      });
    }
  }

  return items;
}