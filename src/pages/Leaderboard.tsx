import { motion } from "framer-motion";
import { Trophy, Medal, Award, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const leaderboard = [
  { name: "Nguyễn Văn An", score: 2850, avatar: "👨‍🎓", rank: 1, streak: 15 },
  { name: "Trần Thị Bình", score: 2620, avatar: "👩‍🏫", rank: 2, streak: 12 },
  { name: "Lê Văn Cường", score: 2400, avatar: "👨‍💻", rank: 3, streak: 10 },
  { name: "Phạm Minh Đức", score: 2150, avatar: "👨‍🔬", rank: 4, streak: 8 },
  { name: "Bạn (Học viên)", score: 1850, avatar: "⭐", rank: 5, streak: 7, isUser: true },
  { name: "Hoàng Gia Huy", score: 1700, avatar: "👨‍🎨", rank: 6, streak: 5 },
  { name: "Vũ Phương Linh", score: 1550, avatar: "👩‍⚕️", rank: 7, streak: 4 },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background py-6 px-4 md:px-0">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Bảng xếp hạng</h1>
          <p className="text-muted-foreground font-body">Cùng thi đua học tập với các học viên khác!</p>
        </motion.div>

        {/* Top 3 Visuals */}
        <div className="flex items-end justify-center gap-4 pt-12 pb-8">
          {/* Rank 2 */}
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-3xl mb-1">{leaderboard[1].avatar}</div>
            <div className="w-16 h-24 bg-muted rounded-t-2xl flex items-center justify-center relative">
              <span className="text-2xl font-black text-muted-foreground/30">2</span>
              <Medal className="absolute -top-3 w-8 h-8 text-slate-400" />
            </div>
            <p className="font-bold text-xs max-w-[80px] text-center">{leaderboard[1].name.split(' ').pop()}</p>
          </motion.div>

          {/* Rank 1 */}
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-4xl mb-2">{leaderboard[0].avatar}</div>
            <div className="w-20 h-32 bg-primary/20 rounded-t-2xl flex items-center justify-center relative border-x-2 border-t-2 border-primary/20">
              <span className="text-4xl font-black text-primary/30">1</span>
              <Trophy className="absolute -top-4 w-10 h-10 text-yellow-500" />
            </div>
            <p className="font-bold text-sm max-w-[80px] text-center">{leaderboard[0].name.split(' ').pop()}</p>
          </motion.div>

          {/* Rank 3 */}
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-3xl mb-1">{leaderboard[2].avatar}</div>
            <div className="w-16 h-20 bg-muted rounded-t-2xl flex items-center justify-center relative">
              <span className="text-2xl font-black text-muted-foreground/30">3</span>
              <Award className="absolute -top-3 w-8 h-8 text-orange-400" />
            </div>
            <p className="font-bold text-xs max-w-[80px] text-center">{leaderboard[2].name.split(' ').pop()}</p>
          </motion.div>
        </div>

        {/* Full List */}
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn(
                "border-none shadow-sm rounded-2xl transition-all",
                user.isUser ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-card hover:bg-muted/50"
              )}>
                <CardContent className="p-4 flex items-center gap-4">
                  <span className={cn(
                    "w-8 font-black text-lg",
                    user.isUser ? "text-primary-foreground" : "text-muted-foreground"
                  )}>
                    {user.rank}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-xl shadow-inner">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm md:text-base">{user.name}</p>
                    <p className={cn(
                      "text-[10px] md:text-xs font-medium uppercase tracking-wider",
                      user.isUser ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      Chuỗi học: {user.streak} ngày
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg">{user.score.toLocaleString()}</p>
                    <p className={cn(
                      "text-[10px] uppercase font-bold",
                      user.isUser ? "text-primary-foreground/80" : "text-primary"
                    )}>XP</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
