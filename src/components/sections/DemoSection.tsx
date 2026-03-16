import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import helloSignVideo from "../../../public/Tutorial video/7625741221388.mp4";

const DemoSection = () => {
  const { ref, isInView } = useScrollReveal(0.3);

  return (
    <section ref={ref} className="py-32 bg-background section-padding">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* LEFT */}
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
            Một cái vẫy tay từ bên cạnh trán hướng ra phía trước — đây là ký hiệu phổ biến cho lời chào.
          </p>

          <Button
            size="lg"
            onClick={() => window.location.href = "/onboarding"}
          >
            Học nhiều hơn
          </Button>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <video
              src={helloSignVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DemoSection;