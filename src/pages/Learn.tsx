import { motion } from "framer-motion";
import { Lock, CheckCircle2, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import StreakInfo from "@/components/StreakInfo";

const levels = [
  {
    level: 1,
    title: "Chào hỏi cơ bản",
    lessons: [
      { id: 1, word: "Xin chào", emoji: "👋", status: "completed" },
      { id: 2, word: "Cảm ơn", emoji: "🙏", status: "completed" },
      { id: 3, word: "Xin lỗi", emoji: "😔", status: "current" },
      { id: 4, word: "Làm ơn", emoji: "🤲", status: "locked" },
      { id: 5, word: "Tạm biệt", emoji: "✋", status: "locked" },
    ],
  },
  {
    level: 2,
    title: "Giao tiếp hàng ngày",
    lessons: [
      { id: 6, word: "Có", emoji: "👍", status: "locked" },
      { id: 7, word: "Không", emoji: "👎", status: "locked" },
      { id: 8, word: "Giúp đỡ", emoji: "🆘", status: "locked" },
      { id: 9, word: "Nước", emoji: "💧", status: "locked" },
      { id: 10, word: "Thức ăn", emoji: "🍕", status: "locked" },
    ],
  },
  {
    level: 3,
    title: "Cảm xúc",
    lessons: [
      { id: 11, word: "Vui vẻ", emoji: "😊", status: "locked" },
      { id: 12, word: "Buồn bã", emoji: "😢", status: "locked" },
      { id: 13, word: "Giận dữ", emoji: "😠", status: "locked" },
      { id: 14, word: "Yêu thương", emoji: "❤️", status: "locked" },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Learn = () => {
  return (
    <div className="min-h-screen bg-background py-6 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Lộ trình học tập</h1>
            <p className="text-muted-foreground font-body text-base mt-1">Làm chủ ngôn ngữ ký hiệu từng bước một</p>
          </motion.div>

          <div className="space-y-12">
            {levels.map((level, li) => (
              <motion.div key={level.level} {...fadeUp} transition={{ duration: 0.5, delay: 0.1 + li * 0.1 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-base font-bold shadow-lg">
                    {level.level}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{level.title}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {level.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={lesson.status !== "locked" ? `/learn/${lesson.id}` : "#"}
                      className={cn(lesson.status === "locked" && "pointer-events-none")}
                    >
                      <Card
                        className={cn(
                          "border transition-all duration-300 hover:shadow-md h-full",
                          lesson.status === "current" && "border-primary shadow-[var(--shadow-soft)] ring-1 ring-primary/20",
                          lesson.status === "locked" && "opacity-50",
                          lesson.status === "completed" && "bg-accent/50"
                        )}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-3xl shadow-sm">
                            {lesson.emoji}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-foreground">{lesson.word}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {lesson.status === "completed" ? "Đã hoàn thành" : lesson.status === "current" ? "Đang học" : "Chưa mở khóa"}
                            </p>
                          </div>
                          {lesson.status === "completed" && <CheckCircle2 className="w-5 h-5 text-primary" />}
                          {lesson.status === "current" && <ChevronRight className="w-5 h-5 text-primary" />}
                          {lesson.status === "locked" && <Lock className="w-4 h-4 text-muted-foreground" />}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Streak Info */}
        <div className="lg:col-span-4 sticky top-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-bold text-foreground mb-4">Thông tin của bạn</h2>
            <StreakInfo />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
