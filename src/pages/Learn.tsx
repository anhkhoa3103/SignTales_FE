import { motion } from "framer-motion";
import { Lock, CheckCircle2, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
    title: "Biểu đạt hằng ngày",
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
      { id: 11, word: "Vui", emoji: "😊", status: "locked" },
      { id: 12, word: "Buồn", emoji: "😢", status: "locked" },
      { id: 13, word: "Giận dữ", emoji: "😠", status: "locked" },
      { id: 14, word: "Yêu", emoji: "❤️", status: "locked" },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Learn = () => {
  return (
    <div className="min-h-screen bg-background section-padding py-6 md:pt-20">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-extrabold text-foreground">Lộ trình học</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">Chinh phục ngôn ngữ ký hiệu từng bước một</p>
        </motion.div>

        {levels.map((level, li) => (
          <motion.div key={level.level} {...fadeUp} transition={{ duration: 0.5, delay: 0.1 + li * 0.1 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                {level.level}
              </div>
              <h2 className="text-lg font-bold text-foreground">{level.title}</h2>
            </div>

            <div className="space-y-2">
              {level.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={lesson.status !== "locked" ? `/learn/${lesson.id}` : "#"}
                  className={cn(lesson.status === "locked" && "pointer-events-none")}
                >
                  <Card
                    className={cn(
                      "border transition-all duration-200",
                      lesson.status === "current" && "border-primary shadow-[var(--shadow-soft)]",
                      lesson.status === "locked" && "opacity-50",
                      lesson.status === "completed" && "bg-accent/50"
                    )}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <span className="text-2xl">{lesson.emoji}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{lesson.word}</p>
                        <p className="text-xs text-muted-foreground">
                          {lesson.status === "completed"
                            ? "Đã hoàn thành"
                            : lesson.status === "current"
                            ? "Đang học"
                            : "Đã khóa"}
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
  );
};

export default Learn;