import type { VSLPhrase } from '../types/vsl.types';

interface VSLPhraseChipsProps {
  phrases: VSLPhrase[];
  activeIndex: number; // highlights the currently playing phrase
}

export function VSLPhraseChips({ phrases, activeIndex }: VSLPhraseChipsProps) {
  if (phrases.length === 0) return null;

  return (
    <div className="vsl-chips">
      <p className="vsl-chips__label">Thứ tự ký hiệu VSL:</p>
      <div className="vsl-chips__list">
        {phrases.map((phrase, i) => {
          const hasVideo =
            phrase.videoUrl !== null ||
            phrase.fallbackWords.some((w) => w.videoUrl !== null);

          return (
            <span
              key={phrase.id}
              className={[
                'vsl-chips__chip',
                i === activeIndex ? 'vsl-chips__chip--active' : '',
                !hasVideo ? 'vsl-chips__chip--missing' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {phrase.text}
              {/* Show fallback indicator if using individual words */}
              {phrase.videoUrl === null && hasVideo && (
                <span className="vsl-chips__fallback" title="Dùng từng từ riêng lẻ">
                  *
                </span>
              )}
              {!hasVideo && (
                <span className="vsl-chips__missing-badge" title="Không tìm thấy video">
                  !
                </span>
              )}
            </span>
          );
        })}
      </div>
      <p className="vsl-chips__legend">
        <span>* dùng từng từ riêng lẻ</span>
        <span className="vsl-chips__legend-dot vsl-chips__legend-dot--missing" />
        <span>! chưa có video</span>
      </p>
    </div>
  );
}