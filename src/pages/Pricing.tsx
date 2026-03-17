import { motion } from "framer-motion";
import { Check, Shield, Star, Building2, Zap, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free Basic",
    price: "0đ",
    description: "Bắt đầu hành trình học tập của bạn",
    features: [
      "Tất cả các ký hiệu cơ bản",
      "Truy cập lộ trình học tập chính",
      "Luyện tập hàng ngày",
      "Hỗ trợ cộng đồng",
    ],
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    buttonText: "Đang sử dụng",
    variant: "outline" as const,
  },
  {
    name: "Pro Premium",
    price: "99.000đ",
    period: "/tháng",
    description: "Dành cho cá nhân muốn học tập chuyên sâu",
    features: [
      "Không quảng cáo",
      "Tất cả chức năng Premium",
      "Ôn tập lỗi sai thông minh",
      "Học qua truyện (Full stories)",
    ],
    icon: Star,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    popular: true,
    buttonText: "Nâng cấp ngay",
    variant: "default" as const,
  },
  {
    name: "Business",
    price: "Liên hệ",
    description: "Giải pháp cho trung tâm và tổ chức",
    features: [
      "Tất cả chức năng Premium",
      "Khóa học độc quyền từ trung tâm",
      "Quản lý lộ trình cho học viên",
      "Báo cáo tiến độ chi tiết",
      "Hỗ trợ ưu tiên 24/7",
      "Tích hợp API",
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
    <div className="min-h-screen bg-background section-padding py-10 md:pt-24">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-extrabold text-foreground">Gói học tập</h1>
        </div>

        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-black text-foreground">Chọn lộ trình phù hợp với bạn</h2>
          <p className="text-muted-foreground text-lg font-body">
            Đầu tư vào bản thân ngay hôm nay để làm chủ ngôn ngữ ký hiệu một cách nhanh chóng và hiệu quả nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Phổ biến nhất
                  </span>
                </div>
              )}
              <Card className={plan.popular ? "border-primary border-2 shadow-xl scale-105" : "border-border shadow-md"}>
                <CardHeader className="space-y-4">
                  <div className={`${plan.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                    <plan.icon className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-sm font-body mt-1">{plan.description}</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-sm font-medium">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="mt-1 bg-primary/10 rounded-full p-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/80 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full font-bold h-12 text-md" variant={plan.variant}>
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-accent/30 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h3 className="text-2xl font-bold">Tại sao nên nâng cấp gói học?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mx-auto shadow-sm">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold">An toàn & Bảo mật</p>
              <p className="text-xs text-muted-foreground">Thanh toán an toàn qua nhiều cổng kết nối.</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mx-auto shadow-sm">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold">Tiết kiệm thời gian</p>
              <p className="text-xs text-muted-foreground">Lộ trình được tối ưu hóa giúp bạn học nhanh hơn.</p>
            </div>
            {/* Add more benefits if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
