import { motion } from "framer-motion";
import { Heart, BookOpen, Users, Sparkles, ArrowRight, HandHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "Học dễ hiểu",
    description: "Các bài học được thiết kế ngắn gọn, trực quan và phù hợp cho người mới bắt đầu làm quen với ngôn ngữ ký hiệu.",
  },
  {
    icon: Users,
    title: "Kết nối cộng đồng",
    description: "Không chỉ học ký hiệu, bạn còn có thể khám phá cộng đồng, chia sẻ trải nghiệm và lan tỏa sự thấu hiểu.",
  },
  {
    icon: Sparkles,
    title: "Trải nghiệm thú vị",
    description: "Kết hợp bài học, luyện tập và trò chơi nhỏ để việc học trở nên sinh động và duy trì động lực mỗi ngày.",
  },
];

const values = [
  "Tôn trọng sự khác biệt trong giao tiếp",
  "Khuyến khích học tập thông qua thực hành",
  "Tạo môi trường thân thiện, tích cực và dễ tiếp cận",
  "Lan tỏa nhận thức về ngôn ngữ ký hiệu trong cộng đồng",
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="min-h-screen bg-background py-6 px-4 md:px-0">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden border border-primary/10 bg-card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-10 flex flex-col justify-center space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-bold w-fit">
                <HandHeart className="w-4 h-4" />
                Giới thiệu về SignTales
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
                  Học ngôn ngữ ký hiệu theo cách gần gũi và truyền cảm hứng.
                </h1>
                <p className="text-base md:text-lg text-muted-foreground font-body leading-8">
                  SignTales là nền tảng hỗ trợ học ngôn ngữ ký hiệu thông qua bài học trực quan,
                  luyện tập tương tác và các hoạt động cộng đồng. Chúng tôi mong muốn giúp việc
                  tiếp cận ngôn ngữ ký hiệu trở nên dễ dàng hơn, tự nhiên hơn và gần gũi hơn với mọi người.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/learn">
                  <Button size="lg" className="rounded-xl font-bold px-8">
                    Bắt đầu học
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button variant="outline" size="lg" className="rounded-xl font-bold px-8">
                    Khám phá cộng đồng
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-primary/5 p-8 md:p-10 flex items-center justify-center">
              <div className="w-full max-w-md rounded-3xl bg-background shadow-xl border border-primary/10 p-8 space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground">Sứ mệnh của chúng tôi</h2>
                <p className="text-muted-foreground leading-7 font-body">
                  Xây dựng một không gian học tập nơi mọi người có thể hiểu hơn về ngôn ngữ ký hiệu,
                  rút ngắn khoảng cách giao tiếp và góp phần tạo nên một cộng đồng bao dung hơn.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-foreground">Vì sao chọn SignTales?</h2>
            <p className="text-muted-foreground font-body">
              Chúng tôi tập trung vào trải nghiệm học tập đơn giản, thực tế và dễ duy trì lâu dài.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
              >
                <Card className="h-full rounded-3xl border-primary/10 hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-7 font-body">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="rounded-3xl border-primary/10">
            <CardContent className="p-7 space-y-4">
              <h2 className="text-2xl font-extrabold text-foreground">Giá trị cốt lõi</h2>
              <div className="space-y-3">
                {values.map((value) => (
                  <div key={value} className="flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-muted-foreground leading-7 font-body">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-primary/10 bg-primary/5">
            <CardContent className="p-7 space-y-4">
              <h2 className="text-2xl font-extrabold text-foreground">Dành cho ai?</h2>
              <p className="text-muted-foreground leading-7 font-body">
                SignTales phù hợp với người mới bắt đầu, học sinh, sinh viên, giáo viên,
                phụ huynh và bất kỳ ai muốn tìm hiểu thêm về ngôn ngữ ký hiệu để giao tiếp tốt hơn
                với cộng đồng người Điếc và người khiếm thính.
              </p>

              <div className="rounded-2xl bg-background p-5 border border-primary/10">
                <p className="text-sm text-foreground font-semibold leading-7">
                  Chúng tôi tin rằng một cử chỉ đúng lúc có thể mở ra sự thấu hiểu lớn hơn rất nhiều lời nói.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-10 text-center space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold">Sẵn sàng bắt đầu hành trình của bạn?</h2>
          <p className="max-w-2xl mx-auto text-primary-foreground/90 leading-7 font-body">
            Hãy bắt đầu với những ký hiệu cơ bản, luyện tập mỗi ngày và từng bước xây dựng khả năng giao tiếp tự tin hơn.
          </p>
          <Link to="/learn">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-xl font-bold px-8 text-primary hover:opacity-95"
            >
              Khám phá bài học
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
