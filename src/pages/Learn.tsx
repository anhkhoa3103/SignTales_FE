import { motion } from "framer-motion";
import { Lock, CheckCircle2, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const levels = [
  {
    level: 1,
    title: "Basic Greetings",
    lessons: [
      { id: 1, word: "Hello", emoji: "👋", status: "completed" },
      { id: 2, word: "Thank You", emoji: "🙏", status: "completed" },
      { id: 3, word: "Sorry", emoji: "😔", status: "current" },
      { id: 4, word: "Please", emoji: "🤲", status: "locked" },
      { id: 5, word: "Goodbye", emoji: "✋", status: "locked" },
    ],
  },
  {
    level: 2,
    title: "Daily Expressions",
    lessons: [
      { id: 6, word: "Yes", emoji: "👍", status: "locked" },
      { id: 7, word: "No", emoji: "👎", status: "locked" },
      { id: 8, word: "Help", emoji: "🆘", status: "locked" },
      { id: 9, word: "Water", emoji: "💧", status: "locked" },
      { id: 10, word: "Food", emoji: "🍕", status: "locked" },
    ],
  },
  {
    level: 3,
    title: "Emotions",
    lessons: [
      { id: 11, word: "Happy", emoji: "😊", status: "locked" },
      { id: 12, word: "Sad", emoji: "😢", status: "locked" },
      { id: 13, word: "Angry", emoji: "😠", status: "locked" },
      { id: 14, word: "Love", emoji: "❤️", status: "locked" },
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
          <h1 className="text-2xl font-extrabold text-foreground">Learning Path</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">Master sign language step by step</p>
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
                          {lesson.status === "completed" ? "Completed" : lesson.status === "current" ? "In progress" : "Locked"}
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
