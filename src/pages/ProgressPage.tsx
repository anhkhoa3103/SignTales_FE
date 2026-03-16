import { motion } from "framer-motion";
import { Flame, Clock, BookOpen, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stats = [
  { icon: BookOpen, label: "Dấu hiệu đã học", value: "24", color: "text-primary" },
  { icon: Flame, label: "Chuỗi ngày học", value: "7", color: "text-primary" },
  { icon: Clock, label: "Thời gian học", value: "2.5h", color: "text-primary" },
  { icon: Award, label: "Thành tích", value: "5", color: "text-primary" },
];

const achievements = [
  { title: "Dấu hiệu đầu tiên", desc: "Bạn đã học dấu hiệu đầu tiên", emoji: "🌟", earned: true },
  { title: "Chuỗi 7 ngày", desc: "Luyện tập 7 ngày liên tiếp", emoji: "🔥", earned: true },
  { title: "Học nhanh", desc: "Hoàn thành 5 bài học trong một ngày", emoji: "⚡", earned: true },
  { title: "Học 50 dấu hiệu", desc: "Thành thạo 50 dấu hiệu khác nhau", emoji: "🏆", earned: false, progress: 48 },
  { title: "Bậc thầy ký hiệu", desc: "Hoàn thành tất cả cấp độ cơ bản", emoji: "👑", earned: false, progress: 20 },
  { title: "Ngôi sao cộng đồng", desc: "Nhận 10 lượt thích cho một bài đăng", emoji: "⭐", earned: true },
  { title: "Nhà vô địch trò chơi", desc: "Đạt 1000 điểm trong Trắc nghiệm nhanh", emoji: "🎮", earned: false, progress: 65 },
  { title: "Bàn tay giúp đỡ", desc: "Hỗ trợ 5 thành viên trong cộng đồng", emoji: "🤝", earned: true },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const ProgressPage = () => {
  return (
    <div className="min-h-screen bg-background section-padding py-6 md:pt-20">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-extrabold text-foreground">Tiến độ của bạn</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">Theo dõi hành trình học tập của bạn</p>
        </motion.div>

        {/* Lưới thống kê */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-accent border-none">
              <CardContent className="p-5 text-center">
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Hoạt động trong tuần */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
          <h2 className="text-lg font-bold text-foreground mb-3">Tuần này</h2>
          <Card className="border-none bg-card shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-end gap-2 justify-between h-24">
                {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, i) => {
                  const heights = [60, 80, 45, 90, 70, 30, 0];
                  return (
                    <div key={day} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className="w-full rounded-t-lg gradient-primary transition-all"
                        style={{ height: `${heights[i]}%`, opacity: heights[i] === 0 ? 0.2 : 1 }}
                      />
                      <span className="text-[10px] text-muted-foreground">{day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Thành tích */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-lg font-bold text-foreground mb-3">Thành tích</h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((ach) => (
              <Card
                key={ach.title}
                className={`border ${ach.earned ? "bg-card" : "bg-muted/50 opacity-70"}`}
              >
                <CardContent className="p-4">
                  <p className="text-3xl mb-2">{ach.emoji}</p>
                  <p className="font-bold text-foreground text-sm">{ach.title}</p>
                  <p className="text-xs text-muted-foreground">{ach.desc}</p>
                  {!ach.earned && ach.progress !== undefined && (
                    <Progress value={ach.progress} className="h-1.5 mt-2 bg-muted" />
                  )}
                  {ach.earned && (
                    <p className="text-xs text-primary font-semibold mt-2">✓ Đã đạt</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressPage;