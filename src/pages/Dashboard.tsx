import { motion } from "framer-motion";
import { ChevronRight, Lightbulb, BookOpen, Trophy, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const categories = [
  { name: "Cuộc sống hàng ngày", emoji: "🏠", signs: 12, color: "from-primary to-orange-400" },
  { name: "Cảm xúc", emoji: "😊", signs: 8, color: "from-secondary to-purple-400" },
  { name: "Bạn bè", emoji: "🤝", signs: 10, color: "from-pink-500 to-rose-400" },
  { name: "Trường học", emoji: "📚", signs: 15, color: "from-emerald-500 to-green-400" },
  { name: "Giao tiếp", emoji: "💬", signs: 20, color: "from-blue-500 to-cyan-400" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background py-6 px-4 md:px-0">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Chào mừng quay trở lại! 👋</h1>
            <p className="text-muted-foreground font-body text-base mt-1">Cùng ôn tập và học thêm các ký hiệu mới nào.</p>

          </div>
          <Link to="/profile" className="hidden sm:block">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg hover:scale-105 transition-transform">
              S
            </div>
          </Link>
        </motion.div> 

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Continue Learning - Main Action */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Tiếp tục bài học
              </h2>
              <Link to="/learn" className="text-sm font-semibold text-primary hover:underline">Xem tất cả</Link>
            </div>
            <Link to="/learn/1">
              <Card className="bg-card border-2 border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden rounded-3xl">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-48 bg-primary/5 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                      👋
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">Cơ bản</span>
                        <span className="text-sm font-medium text-muted-foreground">Bài 3 / 8</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground mb-4">Chào hỏi cơ bản</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-muted-foreground">
                          <span>Tiến độ</span>
                          <span>37%</span>
                        </div>
                        <Progress value={37} className="h-2.5 bg-muted shadow-inner" />
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center px-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Daily Goal & Streak Summary */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Mục tiêu hôm nay
            </h2>
            <Card className="rounded-3xl border-none bg-accent/50 shadow-inner">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Điểm kinh nghiệm</p>
                        <p className="text-2xl font-black text-primary">450 XP</p>
                      </div>
                   </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-foreground">Thời gian học</span>
                    <span className="text-muted-foreground">6 / 10 phút</span>
                  </div>
                  <Progress value={60} className="h-3 bg-background" />
                </div>
                <Button className="w-full rounded-xl font-bold shadow-md" variant="default">Nhận thưởng</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Daily Sign & Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Daily Sign */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="lg:col-span-4 space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ký hiệu hôm nay
            </h2>
            <Card className="bg-accent/30 border-2 border-primary/10 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-24 h-24 rounded-3xl bg-background shadow-xl flex items-center justify-center text-6xl mb-6 ring-4 ring-primary/5">
                  🤟
                </div>
                <p className="text-2xl font-black text-foreground">Tôi yêu bạn</p>
                <p className="text-sm text-muted-foreground mt-2 font-body max-w-[200px]">
                  Mở ngón cái, ngón trỏ và ngón út
                </p>
                <Button variant="outline" className="mt-6 w-full rounded-xl border-2 font-bold hover:bg-primary hover:text-white transition-all">
                  Học ký hiệu này
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Categories */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="lg:col-span-8 space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Chủ đề học tập
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link key={cat.name} to="/learn">
                  <Card className="bg-card border-2 border-transparent hover:border-primary/20 hover:shadow-md transition-all duration-300 cursor-pointer rounded-2xl h-full group">
                    <CardContent className="p-5 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-4xl mb-3 group-hover:scale-110 transition-transform">
                        {cat.emoji}
                      </div>
                      <p className="font-bold text-foreground text-sm line-clamp-1">{cat.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">{cat.signs} ký hiệu</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;