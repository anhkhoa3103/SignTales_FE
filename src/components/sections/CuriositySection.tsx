import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CuriositySection = () => {
  const { ref, isInView } = useScrollReveal(0.5);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-background">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground text-center px-6"
      >
        Did you know?
      </motion.h2>
    </section>
  );
};

export default CuriositySection;
