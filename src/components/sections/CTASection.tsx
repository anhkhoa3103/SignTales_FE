import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const { ref, isInView } = useScrollReveal(0.4);

  return (
    <section ref={ref} className="min-h-[70vh] flex items-center justify-center gradient-primary section-padding py-32">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-4 leading-tight"
        >
          The world speaks in many ways.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-primary-foreground/80 mb-12 font-body"
        >
          Learn one more today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button variant="heroOutline" size="xl" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20">
            Start Learning Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
