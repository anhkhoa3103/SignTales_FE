import { motion } from "framer-motion";
import { History, ListCheck, ChevronRight, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import storyIcon from "@/assets/story.png";
import gameIcon from "@/assets/game.png";

const practiceModes = [
  {
    title: "Truyện (Stories)",
    description: "Học qua các tình huống thực tế",
    imageIcon: storyIcon,
    tag: "50% Miễn phí",
    color: "bg-blue-500",
    to: "/practice/stories",
  },
  {
    title: "Ôn tập lỗi sai",
    description: "Luyện lại các bài học bạn từng làm sai",
    icon: History,
    tag: "Gói Thành Viên",
    color: "bg-amber-500",
    isPremium: true,
    to: "/practice/mistakes",
  },
  {
    title: "Tất cả từ vựng",
    description: "Luyện tập tất cả các từ bạn đã học",
    icon: ListCheck,
    color: "bg-emerald-500",
    to: "/practice/words",
  },
  {
    title: "Trò chơi nhỏ",
    description: "Vừa học vừa chơi cực kỳ thú vị",
    imageIcon: gameIcon,
    color: "bg-purple-500",
    to: "/games",
  },
];

const Practice = () => {
  return (
    <div className="min-h-screen bg-background py-6 px-4 md:px-0">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Luyện tập</h1>
          <p className="text-muted-foreground font-body text-base mt-1">
            Nâng cao kỹ năng ngôn ngữ ký hiệu của bạn qua nhiều hình thức đa dạng.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceModes.map((mode, index) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={mode.to}>
                <Card className="group border-2 border-primary/5 hover:border-primary/20 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="flex h-full">
                      <div className={`${mode.color} w-3 flex-shrink-0`} />
                      <div className="p-6 flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-2xl ${mode.color}/10 flex items-center justify-center`}>
                            {mode.imageIcon ? (
                              <img
                                src={mode.imageIcon}
                                alt={mode.title}
                                className="w-7 h-7 object-contain"
                              />
                            ) : mode.icon ? (
                              <mode.icon className={`w-7 h-7 ${mode.color.replace("bg-", "text-")}`} />
                            ) : null}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-foreground">{mode.title}</h3>
                              {mode.tag && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  {mode.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground font-body line-clamp-1">
                              {mode.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {mode.isPremium ? (
                            <Lock className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bonus Section for Motivation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-primary/5 border border-primary/10 rounded-3xl p-8 text-center space-y-4"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <img
              src={gameIcon}
              alt="Trò chơi"
              className="w-8 h-8 object-contain"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Bạn đã sẵn sàng thử thách?</h3>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Luyện tập mỗi ngày giúp bạn ghi nhớ ký hiệu nhanh hơn gấp 2 lần. Bắt đầu ngay nhé!
            </p>
          </div>

          <Button className="rounded-xl font-bold px-8 shadow-lg shadow-primary/20" size="lg">
            Bắt đầu ngẫu nhiên
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Practice;