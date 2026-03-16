import { motion } from "framer-motion";
import { Flame, Trophy, Clock, ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const categories = [
  { name: "Cuộc sống hằng ngày", emoji: "🏠", signs: 12, color: "from-primary to-orange-400" },
  { name: "Cảm xúc", emoji: "😊", signs: 8, color: "from-secondary to-purple-400" },
  { name: "Bạn bè", emoji: "🤝", signs: 10, color: "from-pink-500 to-rose-400" },
  { name: "Trường học", emoji: "📚", signs: 15, color: "from-emerald-500 to-green-400" },
  { name: "Hội thoại", emoji: "💬", signs: 20, color: "from-blue-500 to-cyan-400" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background section-padding py-6 md:pt-20">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Tiêu đề */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Chào mừng bạn quay lại! 👋</h1>
            <p className="text-muted-foreground font-body text-sm mt-1">Hãy tiếp tục phát huy thật tốt nhé</p>
          </div>
          <Link to="/profile">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              S
            </div>
          </Link>
        </motion.div>

        {/* Thống kê */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-3 gap-3">
          <Card className="bg-accent border-none">
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">7</p>
              <p className="text-xs text-muted-foreground">Ngày duy trì</p>
            </CardContent>
          </Card>
          <Card className="bg-accent border-none">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Dấu hiệu đã học</p>
            </CardContent>
          </Card>
          <Card className="bg-accent border-none">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold text-foreground">2.5h</p>
              <p className="text-xs text-muted-foreground">Tổng thời gian</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tiến độ */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Mục tiêu hằng ngày</p>
            <p className="text-xs text-muted-foreground">6/10 phút</p>
          </div>
          <Progress value={60} className="h-3 bg-muted" />
        </motion.div>

        {/* Tiếp tục học */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-lg font-bold text-foreground mb-3">Tiếp tục học</h2>
          <Link to="/learn/1">
            <Card className="bg-card border hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-3xl">
                  👋
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">Chào hỏi cơ bản</p>
                  <p className="text-sm text-muted-foreground">Bài học 3 trên 8</p>
                  <Progress value={37} className="h-1.5 mt-2 bg-muted" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Dấu hiệu trong ngày */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }}>
          <h2 className="text-lg font-bold text-foreground mb-3">
            <Sparkles className="w-5 h-5 inline mr-1 text-primary" />
            Dấu hiệu trong ngày
          </h2>
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
            <CardContent className="p-6 text-center">
              <p className="text-5xl mb-3">🤟</p>
              <p className="text-xl font-bold text-foreground">Anh yêu em</p>
              <p className="text-sm text-muted-foreground mt-1">Duỗi ngón cái, ngón trỏ và ngón út</p>
              <Button variant="default" size="sm" className="mt-4">
                Học dấu hiệu này
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danh mục bài học */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
          <h2 className="text-lg font-bold text-foreground mb-3">Danh mục bài học</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <Link key={cat.name} to="/learn">
                <Card className="bg-card border hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <p className="text-3xl mb-2">{cat.emoji}</p>
                    <p className="font-bold text-foreground text-sm">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.signs} dấu hiệu</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;