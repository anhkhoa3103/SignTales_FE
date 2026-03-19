import { useVSLConverter } from '../features/vsl/hooks/useVSLConverter';
import { useVideoQueue } from '../features/vsl/hooks/useVideoQueue';
import { VSLInput } from '../features/vsl/components/VSLInput';
import { VSLPhraseChips } from '../features/vsl/components/VSLPhraseChips';
import { VSLPlayer } from '../features/vsl/components/VSLPlayer';
import '../features/vsl/styles/vsl.css';

export default function VSLPage() {
  const { status, phrases, convert, reset } = useVSLConverter();
  const {
    currentItem,
    currentIndex,
    totalCount,
    playerStatus,
    play,
    pause,
    restart,
    onVideoEnded,
  } = useVideoQueue(phrases);

  // ✅ No floating JSX here — only hooks and plain JS

  const isLoading = status.status === 'loading';
  const errorMsg = status.status === 'error' ? status.message : null;

  function getActivePhraseIndex(): number {
    let count = 0;
    for (let i = 0; i < phrases.length; i++) {
      const phrase = phrases[i];
      const slots = phrase.videoUrl
        ? 1
        : phrase.fallbackWords.filter((w) => w.videoUrl !== null).length;
      count += slots;
      if (currentIndex < count) return i;
    }
    return phrases.length - 1;
  }

  return (
    <main className="vsl-page">
      <header className="vsl-page__header">
        <h1 className="vsl-page__title">Ngôn ngữ ký hiệu Việt Nam</h1>
        <p className="vsl-page__subtitle">
          Nhập câu tiếng Việt để chuyển đổi sang VSL
        </p>
      </header>

      <section className="vsl-page__section">
        <VSLInput onSubmit={convert} isLoading={isLoading} />
      </section>

      {errorMsg && (
        <div className="vsl-page__error" role="alert">
          <strong>Lỗi:</strong> {errorMsg}
          <button className="vsl-page__error-dismiss" onClick={reset}>✕</button>
        </div>
      )}

      {isLoading && (
        <div className="vsl-page__loading" role="status">
          <span className="vsl-page__spinner" />
          Đang phân tích ngữ pháp VSL...
        </div>
      )}

      {phrases.length > 0 && (
        <>
          <section className="vsl-page__section">
            <VSLPhraseChips
              phrases={phrases}
              activeIndex={getActivePhraseIndex()}
            />
          </section>

          <section className="vsl-page__section">
            <VSLPlayer
              currentItem={currentItem}
              currentIndex={currentIndex}
              totalCount={totalCount}
              playerStatus={playerStatus}
              onVideoEnded={onVideoEnded}
              onPlay={play}
              onPause={pause}
              onRestart={restart}
            />
          </section>
        </>
      )}
    </main>
  );
}
