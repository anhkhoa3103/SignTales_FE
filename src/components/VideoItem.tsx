import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";

const ShortVideo = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.7
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView && !isPaused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, isPaused]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <div 
      ref={ref} 
      className="h-full w-full snap-start relative cursor-pointer group overflow-hidden bg-black/60 flex items-center justify-center"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        className="h-full w-full object-contain"
      />
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortVideo;