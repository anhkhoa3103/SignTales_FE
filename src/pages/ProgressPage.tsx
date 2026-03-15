import { motion } from "framer-motion";
import { Flame, Clock, BookOpen, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stats = [
  { icon: BookOpen, label: "Signs Learned", value: "24", color: "text-primary" },
  { icon: Flame, label: "Day Streak", value: "7", color: "text-primary" },
  { icon: Clock, label: "Learning Time", value: "2.5h", color: "text-primary" },
  { icon: Award, label: "Achievements", value: "5", color: "text-primary" },
];

const achievements = [
  { title: "First Sign", desc: "Learned your first sign", emoji: "🌟", earned: true },
  { title: "7 Day Streak", desc: "Practiced 7 days in a row", emoji: "🔥", earned: true },
  { title: "Quick Learner", desc: "Completed 5 lessons in one day", emoji: "⚡", earned: true },
  { title: "50 Signs Learned", desc: "Master 50 different signs", emoji: "🏆", earned: false, progress: 48 },
  { title: "Sign Master", desc: "Complete all basic levels", emoji: "👑", earned: false, progress: 20 },
  { title: "Social Star", desc: "Get 10 likes on a post", emoji: "⭐", earned: true },
  { title: "Game Champion", desc: "Score 1000 in Speed Quiz", emoji: "🎮", earned: false, progress: 65 },
  { title: "Helping Hand", desc: "Help 5 community members", emoji: "🤝", earned: true },
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
          <h1 className="text-2xl font-extrabold text-foreground">Your Progress</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">Track your learning journey</p>
        </motion.div>

        {/* Stats grid */}
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

        {/* Weekly activity */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
          <h2 className="text-lg font-bold text-foreground mb-3">This Week</h2>
          <Card className="border-none bg-card shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-end gap-2 justify-between h-24">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
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

        {/* Achievements */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-lg font-bold text-foreground mb-3">Achievements</h2>
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
                    <p className="text-xs text-primary font-semibold mt-2">✓ Earned</p>
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
