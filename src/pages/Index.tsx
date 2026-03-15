import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import CuriositySection from "@/components/sections/CuriositySection";
import GlobalFactSection from "@/components/sections/GlobalFactSection";
import InsightSection from "@/components/sections/InsightSection";
import EmotionalSection from "@/components/sections/EmotionalSection";
import ProductSection from "@/components/sections/ProductSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import DemoSection from "@/components/sections/DemoSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CuriositySection />
      <GlobalFactSection />
      <InsightSection />
      <EmotionalSection />
      <ProductSection />
      <HowItWorksSection />
      <DemoSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
