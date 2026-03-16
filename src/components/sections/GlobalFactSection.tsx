import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import signingPerson from "@/assets/signing-person.jpg";

const GlobalFactSection = () => {
  const { ref, isInView } = useScrollReveal(0.3);

  return (
    <section ref={ref} className="min-h-screen flex items-center bg-muted section-padding">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Khoảng <span className="text-primary">70 triệu</span> người dùng ngôn ngữ ký hiệu trên toàn thế giới.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src={signingPerson}
            alt="Person signing"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalFactSection;
