import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ShortVideo = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { ref, inView } = useInView({
    threshold: 0.7
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <div ref={ref} className="h-full w-full snap-start flex items-center justify-center">
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        className="h-full w-full object-cover md:object-contain"
      />
    </div>
  );
};

export default ShortVideo;