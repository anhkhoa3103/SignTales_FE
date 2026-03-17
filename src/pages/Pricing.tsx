import { motion } from "framer-motion";
import { Check, Shield, Star, Building2, Zap, ArrowLeft, Users, Monitor, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Gói BASIC",
    price: "Miễn phí",
    description: "Khám phá và làm quen với ngôn ngữ ký hiệu",
    features: [
      "Thư viện ký hiệu cơ bản (Chào hỏi, Cảm ơn, ...)",
      "Video học short-form (30-60s) chuẩn Gen Z",
      "Học các chủ đề giao tiếp cơ bản",
      "Tham gia challenge cộng đồng & TikTok hashtag",
      "Trải nghiệm AI Avatar (Bản demo giới hạn)",
    ],
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    buttonText: "Đang sử dụng",
    variant: "outline" as const,
  },
  {
    name: "Gói PRO",
    price: "149.000đ",
    period: "/tháng",
    description: "Lộ trình bài bản để làm chủ ngôn ngữ ký hiệu",
    features: [
      "Lộ trình học Structured Path (Cơ bản → Nâng cao)",
      "Thư viện 100+ bài học không giới hạn",
      "AI Avatar nâng cao (Đổi góc nhìn, Tốc độ)",
      "Bài tập tương tác & Quiz nhận diện AI",
      "Theo dõi tiến độ, Streak & Gamification",
      "Học qua câu chuyện (Story-based Learning)",
    ],
    icon: Star,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    popular: true,
    buttonText: "Nâng cấp ngay",
    variant: "default" as const,
  },
  {
    name: "Gói BUSINESS",
    price: "499.000đ",
    period: "/người/tháng",
    description: "Giải pháp đào tạo cho tổ chức & doanh nghiệp",
    features: [
      "Quản lý nhiều người dùng & Phân nhóm học tập",
      "Dashboard quản lý tiến độ & Báo cáo chi tiết",
      "Nội dung tùy chỉnh theo ngành (Y tế, Dịch vụ...)",
      "Workshop & Training online/ trực tiếp ở trung tâm",
      "Khẳng định giá trị cộng đồng (Branding & CSR)",
    ],
    icon: Building2,
    color: "text-primary",
    bgColor: "bg-primary/5",
    buttonText: "Liên hệ tư vấn",
    variant: "outline" as const,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background section-padding py-10 md:pt-24 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-extrabold text-foreground">Gói học tập</h1>
        </div>

        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-foreground"
          >
            Chọn lộ trình phù hợp với bạn
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg font-body"
          >
            Đầu tư vào bản thân ngay hôm nay để xóa bỏ rào cản ngôn ngữ và kết nối cộng đồng.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Phổ biến nhất
                  </span>
                </div>
              )}
              <Card className={`flex flex-col w-full ${plan.popular ? "border-primary border-2 shadow-2xl scale-105 z-20 bg-card" : "border-border shadow-md"}`}>
                <CardHeader className="space-y-4">
                  <div className={`${plan.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                    <plan.icon className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-sm font-body mt-1 min-h-[40px]">{plan.description}</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-sm font-medium">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 flex-1">
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="mt-1 bg-primary/10 rounded-full p-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/80 font-medium leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button className="w-full font-bold h-12 text-md shadow-sm" variant={plan.variant}>
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-24 space-y-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold">Tại sao nên chọn SignTales?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-accent/30 p-6 rounded-3xl space-y-3 text-center border border-transparent hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold">Động tác chuẩn xác</p>
              <p className="text-xs text-muted-foreground">Ký hiệu được kiểm duyệt bởi chuyên gia ngôn ngữ.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-accent/30 p-6 rounded-3xl space-y-3 text-center border border-transparent hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold">Học mọi lúc, mọi nơi</p>
              <p className="text-xs text-muted-foreground">Đồng bộ tiến độ trên tất cả các thiết bị của bạn.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-accent/30 p-6 rounded-3xl space-y-3 text-center border border-transparent hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold">Cộng đồng lớn mạnh</p>
              <p className="text-xs text-muted-foreground">Giao lưu và luyện tập cùng hàng ngàn người học khác.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-accent/30 p-6 rounded-3xl space-y-3 text-center border border-transparent hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold">Giá trị nhân văn</p>
              <p className="text-xs text-muted-foreground">Góp phần xây dựng một xã hội hòa nhập hơn.</p>
            </motion.div>
          </div>
        </div>

        {/* Business Team Package Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-[2rem] p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-black text-foreground">Gói Team Doanh nghiệp</h3>
              <p className="text-muted-foreground max-w-xl">
                Bạn muốn đào tạo cho đội ngũ lớn? Chúng tôi có các gói linh hoạt từ 5 - 20 triệu/tháng với đầy đủ công cụ quản lý chuyên nghiệp.
              </p>
            </div>
            <Button size="lg" className="rounded-2xl font-bold px-8 h-14 text-lg">
              Nhận báo giá ngay
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
