import { useEffect, useRef } from 'react';
import type { VideoQueueItem, VideoPlayerStatus } from '../types/vsl.types';

interface VSLPlayerProps {
    currentItem: VideoQueueItem | null;
    currentIndex: number;
    totalCount: number;
    playerStatus: VideoPlayerStatus;
    onVideoEnded: () => void;
    onPlay: () => void;
    onPause: () => void;
    onRestart: () => void;
}

export function VSLPlayer({
    currentItem,
    currentIndex,
    totalCount,
    playerStatus,
    onVideoEnded,
    onPlay,
    onPause,
    onRestart,
}: VSLPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Reload + play whenever index changes — even if URL is the same (e.g. two UNKNOWN.mp4 in a row)
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !currentItem?.videoUrl) return;

        video.src = currentItem.videoUrl;
        video.load();
        if (playerStatus === 'playing') {
            video.play().catch(() => { });
        }
    }, [currentIndex]); // ← key: track INDEX not URL

    // Sync play/pause without reloading
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !currentItem?.videoUrl) return;

        if (playerStatus === 'playing') {
            video.play().catch(() => { });
        } else if (playerStatus === 'paused') {
            video.pause();
        }
    }, [playerStatus]);

    if (totalCount === 0) return null;

    const progress = ((currentIndex + 1) / totalCount) * 100;

    return (
        <div className="vsl-player">
            <div className="vsl-player__screen">
                <video
                    ref={videoRef}
                    className="vsl-player__video"
                    onEnded={onVideoEnded}
                    onError={() => {
                        if (videoRef.current) {
                            videoRef.current.src = 'public/tutorial-video/UNKNOWN.mp4';
                            videoRef.current.load();
                            if (playerStatus === 'playing') {
                                videoRef.current.play().catch(() => { });
                            }
                        }
                    }}
                    playsInline
                />
            </div>

            <div className="vsl-player__progress-track">
                <div
                    className="vsl-player__progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="vsl-player__controls">
                <span className="vsl-player__counter">
                    {currentIndex + 1} / {totalCount}
                </span>

                {playerStatus === 'ended' ? (
                    <button className="vsl-player__btn" onClick={onRestart}>↺ Phát lại</button>
                ) : playerStatus === 'playing' ? (
                    <button className="vsl-player__btn" onClick={onPause}>⏸ Tạm dừng</button>
                ) : (
                    <button className="vsl-player__btn" onClick={onPlay}>▶ Tiếp tục</button>
                )}

                <button className="vsl-player__btn vsl-player__btn--ghost" onClick={onRestart}>
                    ↺ Đầu
                </button>
            </div>
        </div>
    );
}