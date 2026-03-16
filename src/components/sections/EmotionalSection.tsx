import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import emotionalSign from "@/assets/emotional-sign.jpg";

const EmotionalSection = () => {
  const { ref, isInView } = useScrollReveal(0.5);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={emotionalSign}
        alt="Sign language communication"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-Arial font-bold text-primary-foreground text-center max-w-4xl px-6 leading-tight"
      >
        Một cử chỉ có thể kết nối <span className="text-primary">hai thế giới.</span>
      </motion.h2>
    </section>
  );
};

export default EmotionalSection;
