import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ProductSection = () => {
  const { ref, isInView } = useScrollReveal(0.4);

  return (
    <section ref={ref} className="min-h-[80vh] flex items-center justify-center bg-background section-padding py-32">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block gradient-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold mb-8 font-display">
            Introducing SignSpeak
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-6xl font-Arial font-bold text-foreground mb-6"
        >
          Một cách mới để học ngôn ngữ ký hiệu.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground font-body"
        >
          Bài học ngắn, học tập trực quan, và luyện tập tương tác.
        </motion.p>
      </div>
    </section>
  );
};

export default ProductSection;
