import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-sign.jpg";
import { useAuth } from "@/hooks/useAuth";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <img
        src={heroImg}
        alt="Người đang sử dụng ngôn ngữ ký hiệu"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.15] mb-6"
        >
          Giao tiếp không chỉ
          <br className="hidden md:block" />
          là lời nói.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-base md:text-lg lg:text-xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Đôi khi chỉ một cử chỉ cũng đủ để truyền tải mọi điều.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
            <Button variant="hero" size="xl">
              {isAuthenticated ? "Vào học ngay" : "Bắt đầu học"}
            </Button>
          </Link>

          <a href="#how-it-works">
            <Button variant="heroOutline" size="xl">
              Xem cách hoạt động
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;