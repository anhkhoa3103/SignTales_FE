import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Eye, Hand, Gamepad2 } from "lucide-react";

const cards = [
  {
    icon: Eye,
    title: "Quan sát",
    description: "Học các ký hiệu bằng cách xem những minh họa trực quan rõ ràng.",
  },
  {
    icon: Hand,
    title: "Luyện tập",
    description: "Thực hành từng cử chỉ theo từng bước.",
  },
  {
    icon: Gamepad2,
    title: "Vui chơi",
    description: "Học nhanh hơn với các trò chơi nhỏ thú vị.",
  },
];

const HowItWorksSection = () => {
  const { ref, isInView } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-32 bg-muted section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-foreground text-center mb-16"
        >
          Cách hoạt động
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="bg-card rounded-3xl p-10 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <card.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground font-body">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;