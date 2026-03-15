import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Zap, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Memory game data
const memoryPairs = [
  { sign: "👋", meaning: "Hello" },
  { sign: "🙏", meaning: "Thank you" },
  { sign: "😔", meaning: "Sorry" },
  { sign: "❤️", meaning: "Love" },
  { sign: "👍", meaning: "Yes" },
  { sign: "✋", meaning: "Goodbye" },
];

type MemoryCard = { id: number; content: string; type: "sign" | "meaning"; pairId: number; flipped: boolean; matched: boolean };

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const speedQuizSigns = [
  { sign: "👋", answer: "Hello", options: ["Hello", "Goodbye", "Sorry"] },
  { sign: "🙏", answer: "Thank you", options: ["Please", "Thank you", "Help"] },
  { sign: "❤️", answer: "Love", options: ["Love", "Happy", "Friend"] },
  { sign: "👍", answer: "Yes", options: ["No", "Yes", "Maybe"] },
  { sign: "😔", answer: "Sorry", options: ["Sad", "Sorry", "Angry"] },
];

const leaderboard = [
  { name: "Alex", score: 980, avatar: "🧑" },
  { name: "Maya", score: 920, avatar: "👩" },
  { name: "Jordan", score: 850, avatar: "🧑‍🦱" },
  { name: "Sam", score: 800, avatar: "👨" },
  { name: "You", score: 0, avatar: "⭐" },
];

const MiniGames = () => {
  const [game, setGame] = useState<"menu" | "memory" | "speed">("menu");

  return (
    <div className="min-h-screen bg-background section-padding py-6 md:pt-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-extrabold text-foreground">Mini Games</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">Learn through play</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {game === "menu" && (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setGame("memory")}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                    <Gamepad2 className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Sign Memory Game</p>
                    <p className="text-sm text-muted-foreground">Match signs with their meanings</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setGame("speed")}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gradient-secondary flex items-center justify-center">
                    <Zap className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Speed Quiz</p>
                    <p className="text-sm text-muted-foreground">Guess the sign within 3 seconds</p>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <h2 className="text-lg font-bold text-foreground pt-4">Leaderboard</h2>
              <Card>
                <CardContent className="p-4 space-y-3">
                  {leaderboard.map((user, i) => (
                    <div key={user.name} className="flex items-center gap-3">
                      <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                      <span className="text-xl">{user.avatar}</span>
                      <span className="flex-1 font-semibold text-foreground text-sm">{user.name}</span>
                      <span className="text-sm font-bold text-primary">{user.score}</span>
                    </div>
                  ))}
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
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>← Back</Button>
        <p className="text-sm font-semibold text-foreground">Matches: {matches}/{memoryPairs.length}</p>
      </div>

      {won ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-6xl">🎉</p>
          <h2 className="text-2xl font-extrabold text-foreground">You Won!</h2>
          <Button onClick={onBack}>Back to Games</Button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlip(card.id)}
              className={cn(
                "aspect-square rounded-2xl flex items-center justify-center cursor-pointer text-lg font-bold transition-all duration-300",
                card.matched
                  ? "bg-primary/20 text-primary"
                  : flipped.includes(card.id)
                  ? "bg-card border-2 border-primary text-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {card.matched || flipped.includes(card.id) ? (
                <span className={card.type === "sign" ? "text-3xl" : "text-sm"}>{card.content}</span>
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
        <h2 className="text-2xl font-extrabold text-foreground">Speed Quiz Done!</h2>
        <p className="text-lg text-muted-foreground">Score: <span className="text-primary font-bold">{score}</span></p>
        <Button onClick={onBack}>Back to Games</Button>
      </motion.div>
    );
  }

  return (
    <motion.div key="speed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>← Back</Button>
        <p className="text-sm font-semibold text-primary">Score: {score}</p>
      </div>

      <div className="text-center">
        <motion.div
          key={qi}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl mb-4"
        >
          {q.sign}
        </motion.div>
        <div className={cn(
          "text-4xl font-extrabold",
          timer <= 1 ? "text-destructive" : "text-foreground"
        )}>
          {timer}
        </div>
        <p className="text-sm text-muted-foreground mt-1">seconds left</p>
      </div>

      <div className="space-y-3">
        {q.options.map((opt) => (
          <Button
            key={opt}
            variant="outline"
            size="lg"
            className={cn(
              "w-full text-base",
              answered && opt === q.answer && "border-primary bg-primary/10 text-primary",
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
