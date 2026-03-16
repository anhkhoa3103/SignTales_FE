import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import twoSigning from "@/assets/two-signing.jpg";
import signingVideo from "@/assets/7627744746597.mp4";
const InsightSection = () => {
  const { ref, isInView } = useScrollReveal(0.3);

  return (
    <section ref={ref} className="min-h-screen flex items-center bg-background section-padding">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-lg order-2 md:order-1"
        >
          <video
            src={signingVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[600px] md:h-[700px] lg:h-[800px] object-cover"
          ></video>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 md:order-2"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Nhưng rất ít người thực sự <span className="text-secondary">hiểu</span> chúng.
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightSection;
