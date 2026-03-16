import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, XCircle, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import signingPerson from "@/assets/signing-person.jpg";
import StreakInfo from "@/components/StreakInfo";

const quizQuestions = [
  {
    sign: "👋",
    image: signingPerson,
    question: "Ký hiệu này có nghĩa là gì?",
    options: ["Xin chào", "Xin lỗi", "Cảm ơn", "Tạm biệt"],
    correct: 0,
  },
  {
    sign: "🙏",
    image: signingPerson,
    question: "Ký hiệu này có nghĩa là gì?",
    options: ["Làm ơn", "Cảm ơn", "Giúp đỡ", "Có"],
    correct: 1,
  },
  {
    sign: "❤️",
    image: signingPerson,
    question: "Ký hiệu này có nghĩa là gì?",
    options: ["Bạn bè", "Gia đình", "Yêu thương", "Hạnh phúc"],
    correct: 2,
  },
];

const Practice = () => {
  const [mode, setMode] = useState<"choice" | "gesture">("choice");
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[qi];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (qi < quizQuestions.length - 1) {
      setQi((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setQi(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-background py-6 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Luyện tập</h1>
            <p className="text-muted-foreground font-body text-base mt-1">Kiểm tra kiến thức ngôn ngữ ký hiệu của bạn</p>
          </motion.div>

          {/* Mode tabs */}
          <div className="flex p-1 bg-muted rounded-xl w-fit">
            <Button
              variant={mode === "choice" ? "secondary" : "ghost"}
              size="sm"
              className={cn("rounded-lg px-6", mode === "choice" && "shadow-sm bg-background")}
              onClick={() => { setMode("choice"); reset(); }}
            >
              Trắc nghiệm
            </Button>
            <Button
              variant={mode === "gesture" ? "secondary" : "ghost"}
              size="sm"
              className={cn("rounded-lg px-6", mode === "gesture" && "shadow-sm bg-background")}
              onClick={() => setMode("gesture")}
            >
              Luyện cử chỉ
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {mode === "choice" && !finished && (
              <motion.div key="quiz" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
                {/* Progress */}
                <div className="flex gap-2">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-2 flex-1 rounded-full transition-all duration-300",
                        i < qi ? "bg-primary" : i === qi ? "bg-primary/40 ring-2 ring-primary/20" : "bg-muted"
                      )}
                    />
                  ))}
                </div>

                <Card className="overflow-hidden border-none shadow-xl bg-card">
                  <div className="relative aspect-video max-h-[400px] overflow-hidden">
                    <img src={q.image} alt="Sign demonstration" className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-2xl shadow-sm border border-border/50">
                      {q.sign}
                    </div>
                  </div>
                  <CardContent className="p-8 text-center space-y-6">
                    <p className="text-2xl font-bold text-foreground">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {q.options.map((opt, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          className={cn(
                            "h-16 text-lg font-bold transition-all duration-300 rounded-2xl border-2",
                            selected === i && i === q.correct && "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]",
                            selected === i && i !== q.correct && "border-destructive bg-destructive/10 text-destructive",
                            selected !== null && i === q.correct && selected !== i && "border-primary/50",
                            selected === null && "hover:border-primary/50 hover:bg-primary/5"
                          )}
                          onClick={() => handleSelect(i)}
                        >
                          <span className="flex-1">{opt}</span>
                          {selected !== null && i === q.correct && <CheckCircle2 className="w-6 h-6 ml-2 shrink-0" />}
                          {selected === i && i !== q.correct && <XCircle className="w-6 h-6 ml-2 shrink-0" />}
                        </Button>
                      ))}
                    </div>

                    {selected !== null && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                        <Button onClick={handleNext} className="w-full h-14 text-lg font-bold gap-2 rounded-2xl shadow-lg" size="lg">
                          {qi < quizQuestions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"} <ChevronRight className="w-5 h-5" />
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {mode === "choice" && finished && (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 py-12">
                <div className="relative inline-block">
                   <div className="text-8xl animate-bounce">🎉</div>
                   <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold text-foreground">Hoàn thành bài tập!</h2>
                  <p className="text-xl text-muted-foreground font-body">
                    Bạn đã trả lời đúng <span className="text-primary font-bold text-2xl">{score}</span> trên <span className="font-bold text-2xl">{quizQuestions.length}</span> câu
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={reset} size="xl" className="rounded-2xl px-12 font-bold shadow-lg">Làm lại</Button>
                  <Button variant="outline" size="xl" className="rounded-2xl px-12 font-bold border-2">Quay lại bài học</Button>
                </div>
              </motion.div>
            )}

            {mode === "gesture" && (
              <motion.div key="gesture" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="space-y-8">
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none shadow-sm">
                  <CardContent className="p-10 text-center space-y-4">
                    <p className="text-7xl mb-4">👋</p>
                    <p className="font-extrabold text-foreground text-2xl">Hãy thử bắt chước: Xin chào</p>
                    <p className="text-lg text-muted-foreground font-body">Vẫy bàn tay mở của bạn sang hai bên</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-border bg-card/50 backdrop-blur-sm rounded-3xl">
                  <CardContent className="p-16 text-center space-y-6">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">Xem trước Camera</h3>
                      <p className="text-muted-foreground font-body max-w-sm mx-auto">Hãy đứng trước camera và thực hiện ký hiệu để hệ thống AI nhận diện</p>
                    </div>
                    <Button variant="default" size="xl" className="rounded-2xl px-12 font-bold shadow-lg">
                      Bắt đầu Camera
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
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

export default Practice;
