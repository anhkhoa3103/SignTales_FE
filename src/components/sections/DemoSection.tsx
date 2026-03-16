import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import helloSign from "@/assets/hello-sign.jpg";

const DemoSection = () => {
  const { ref, isInView } = useScrollReveal(0.3);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section ref={ref} className="py-32 bg-background section-padding">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block gradient-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6 font-display">
            Ví dụ ký hiệu
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
            "Xin chào"
          </h2>
          <p className="text-muted-foreground mb-8 font-body">
            Một cái vẫy tay đơn giản từ bên cạnh trán, hướng ra phía trước — đây là ký hiệu phổ biến cho lời chào.
          </p>
          <Button
            variant="default"
            size="lg"
            onClick={() => setShowDemo(!showDemo)}
          >
            {showDemo ? "Ẩn ký hiệu" : "Thử ký hiệu này"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src={helloSign}
              alt="Minh họa ký hiệu xin chào"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
          {showDemo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-foreground/80 rounded-3xl flex items-center justify-center"
            >
              <div className="text-center text-primary-foreground">
                <p className="text-6xl mb-4">👋</p>
                <p className="text-2xl font-bold font-display">Vẫy tay từ trán ra phía trước!</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;