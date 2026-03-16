import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Zap, Trophy, RotateCcw, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Dữ liệu trò chơi ghi nhớ
const memoryPairs = [
  { sign: "👋", meaning: "Xin chào" },
  { sign: "🙏", meaning: "Cảm ơn" },
  { sign: "😔", meaning: "Xin lỗi" },
  { sign: "❤️", meaning: "Yêu" },
  { sign: "👍", meaning: "Đúng" },

  { sign: "✋", meaning: "Tạm biệt" },
];

type MemoryCard = {
  id: number;
  content: string;
  type: "sign" | "meaning";
  pairId: number;
  flipped: boolean;
  matched: boolean;
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const speedQuizSigns = [
  { sign: "👋", answer: "Xin chào", options: ["Xin chào", "Tạm biệt", "Xin lỗi"] },
  { sign: "🙏", answer: "Cảm ơn", options: ["Làm ơn", "Cảm ơn", "Giúp đỡ"] },
  { sign: "❤️", answer: "Yêu", options: ["Yêu", "Vui vẻ", "Bạn bè"] },
  { sign: "👍", answer: "Đúng", options: ["Sai", "Đúng", "Có lẽ"] },
  { sign: "😔", answer: "Xin lỗi", options: ["Buồn", "Xin lỗi", "Giận dữ"] },
];

const leaderboard = [
  { name: "Alex", score: 980, avatar: "🧑" },
  { name: "Maya", score: 920, avatar: "👩" },
  { name: "Jordan", score: 850, avatar: "🧑‍🦱" },
  { name: "Sam", score: 800, avatar: "👨" },
  { name: "Bạn", score: 0, avatar: "⭐" },
];

const MiniGames = () => {
  const [game, setGame] = useState<"menu" | "memory" | "speed">("menu");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-6 px-4 md:px-0">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => game === "menu" ? navigate("/practice") : setGame("menu")}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl font-extrabold text-foreground">Trò chơi nhỏ</h1>
            <p className="text-muted-foreground font-body text-sm mt-1">Học tập qua các trò chơi thú vị</p>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {game === "menu" && (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow rounded-2xl border-2 border-primary/5 hover:border-primary/20" onClick={() => setGame("memory")}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Gamepad2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Ghi nhớ ký hiệu</p>
                    <p className="text-sm text-muted-foreground">Ghép cặp ký hiệu với ý nghĩa tương ứng</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow rounded-2xl border-2 border-secondary/5 hover:border-secondary/20" onClick={() => setGame("speed")}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Thử thách tốc độ</p>
                    <p className="text-sm text-muted-foreground">Đoán ký hiệu trong vòng 3 giây</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {game === "memory" && <MemoryGame onBack={() => setGame("menu")} />}
          {game === "speed" && <SpeedQuiz onBack={() => setGame("menu")} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

function MemoryGame({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    const allCards: MemoryCard[] = shuffleArray(
      memoryPairs.flatMap((p, i) => [
        { id: i * 2, content: p.sign, type: "sign" as const, pairId: i, flipped: false, matched: false },
        { id: i * 2 + 1, content: p.meaning, type: "meaning" as const, pairId: i, flipped: false, matched: false },
      ])
    );
    setCards(allCards);
  }, []);

  const handleFlip = useCallback((id: number) => {
    setFlipped((prev) => {
      if (prev.length >= 2) return prev;
      const card = cards.find((c) => c.id === id);
      if (!card || card.matched || prev.includes(id)) return prev;
      const next = [...prev, id];
      if (next.length === 2) {
        const [a, b] = next.map((fid) => cards.find((c) => c.id === fid)!);
        if (a.pairId === b.pairId) {
          setTimeout(() => {
            setCards((cs) => cs.map((c) => (c.pairId === a.pairId ? { ...c, matched: true } : c)));
            setMatches((m) => m + 1);
            setFlipped([]);
          }, 500);
        } else {
          setTimeout(() => setFlipped([]), 800);
        }
      }
      return next;
    });
  }, [cards]);

  const won = matches === memoryPairs.length;

  return (
    <motion.div key="memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl">
        <p className="text-sm font-bold text-foreground">Số cặp đã ghép: {matches}/{memoryPairs.length}</p>
        <Button variant="ghost" size="sm" onClick={onBack} className="font-bold">Thoát</Button>

      </div>

      {won ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-6xl animate-bounce">🎉</p>
          <h2 className="text-2xl font-extrabold text-foreground">Tuyệt vời! Bạn đã thắng</h2>
          <Button onClick={onBack} className="rounded-xl font-bold px-8">Quay lại</Button>

        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlip(card.id)}
              className={cn(
                "aspect-square rounded-2xl flex items-center justify-center cursor-pointer text-lg font-bold transition-all duration-300 shadow-sm",
                card.matched
                  ? "bg-primary text-white"
                  : flipped.includes(card.id)
                  ? "bg-card border-2 border-primary text-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {card.matched || flipped.includes(card.id) ? (
                <span className={card.type === "sign" ? "text-3xl" : "text-sm text-center px-2"}>{card.content}</span>
              ) : (
                "?"
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function SpeedQuiz({ onBack }: { onBack: () => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(3);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  const q = speedQuizSigns[qi];

  useEffect(() => {
    if (answered || done) return;
    if (timer <= 0) {
      setAnswered(true);
      setTimeout(() => nextQ(), 1000);
      return;
    }
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, answered, done]);

  const nextQ = () => {
    if (qi < speedQuizSigns.length - 1) {
      setQi((i) => i + 1);
      setTimer(3);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  const handleAnswer = (opt: string) => {
    if (answered) return;
    setAnswered(true);
    if (opt === q.answer) setScore((s) => s + timer * 100);
    setTimeout(() => nextQ(), 800);
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 space-y-4">
        <p className="text-6xl">⚡</p>
        <h2 className="text-2xl font-extrabold text-foreground">Hoàn thành thử thách!</h2>
        <p className="text-lg text-muted-foreground">Điểm số: <span className="text-primary font-bold">{score}</span></p>
        <Button onClick={onBack} className="rounded-xl font-bold px-8">Quay lại</Button>
      </motion.div>
    );
  }

  return (
    <motion.div key="speed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl">
        <p className="text-sm font-bold text-primary">Điểm: {score}</p>
        <Button variant="ghost" size="sm" onClick={onBack} className="font-bold">Thoát</Button>
      </div>

      <div className="text-center py-8">
        <motion.div
          key={qi}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl mb-6"
        >
          {q.sign}
        </motion.div>
        <div className={cn(
          "text-5xl font-black transition-colors",
          timer <= 1 ? "text-destructive animate-pulse" : "text-foreground"
        )}>
          {timer}
        </div>
        <p className="text-sm text-muted-foreground mt-2 font-medium">giây còn lại</p>
      </div>

      <div className="space-y-3">
        {q.options.map((opt) => (
          <Button
            key={opt}
            variant="outline"
            size="xl"
            className={cn(
              "w-full text-lg font-bold rounded-2xl border-2 transition-all",
              answered && opt === q.answer && "border-primary bg-primary/10 text-primary shadow-sm",
              answered && opt !== q.answer && "opacity-50"
            )}
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}

export default MiniGames;