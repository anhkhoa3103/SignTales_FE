import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import signingPerson from "@/assets/signing-person.jpg";

const quizQuestions = [
  {
    sign: "👋",
    image: signingPerson,
    question: "What does this sign mean?",
    options: ["Hello", "Sorry", "Thank you", "Goodbye"],
    correct: 0,
  },
  {
    sign: "🙏",
    image: signingPerson,
    question: "What does this sign mean?",
    options: ["Please", "Thank you", "Help", "Yes"],
    correct: 1,
  },
  {
    sign: "❤️",
    image: signingPerson,
    question: "What does this sign mean?",
    options: ["Friend", "Family", "Love", "Happy"],
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
    <div className="min-h-screen bg-background section-padding py-6 md:pt-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-extrabold text-foreground">Practice</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">Test your sign language knowledge</p>
        </motion.div>

        {/* Mode tabs */}
        <div className="flex gap-2">
          <Button
            variant={mode === "choice" ? "default" : "outline"}
            size="sm"
            onClick={() => { setMode("choice"); reset(); }}
          >
            Multiple Choice
          </Button>
          <Button
            variant={mode === "gesture" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("gesture")}
          >
            Gesture Practice
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {mode === "choice" && !finished && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* Progress */}
              <div className="flex gap-1">
                {quizQuestions.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      i < qi ? "bg-primary" : i === qi ? "bg-primary/50" : "bg-muted"
                    )}
                  />
                ))}
              </div>

              <Card className="overflow-hidden border-none shadow-lg">
                <img src={q.image} alt="Sign demonstration" className="w-full h-48 object-cover" />
              </Card>

              <p className="text-lg font-bold text-foreground text-center">{q.question}</p>

              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className={cn(
                      "h-14 text-base font-semibold transition-all",
                      selected === i && i === q.correct && "border-primary bg-primary/10 text-primary",
                      selected === i && i !== q.correct && "border-destructive bg-destructive/10 text-destructive",
                      selected !== null && i === q.correct && selected !== i && "border-primary/50"
                    )}
                    onClick={() => handleSelect(i)}
                  >
                    {opt}
                    {selected !== null && i === q.correct && <CheckCircle2 className="w-4 h-4 ml-1" />}
                    {selected === i && i !== q.correct && <XCircle className="w-4 h-4 ml-1" />}
                  </Button>
                ))}
              </div>

              {selected !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Button onClick={handleNext} className="w-full gap-2" size="lg">
                    {qi < quizQuestions.length - 1 ? "Next Question" : "See Results"} <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {mode === "choice" && finished && (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-8">
              <p className="text-6xl">🎉</p>
              <h2 className="text-2xl font-extrabold text-foreground">Quiz Complete!</h2>
              <p className="text-lg text-muted-foreground">
                You got <span className="text-primary font-bold">{score}</span> out of <span className="font-bold">{quizQuestions.length}</span> correct
              </p>
              <Button onClick={reset} size="lg">Try Again</Button>
            </motion.div>
          )}

          {mode === "gesture" && (
            <motion.div key="gesture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <Card className="bg-muted border-none">
                <CardContent className="p-8 text-center space-y-4">
                  <p className="text-5xl mb-2">👋</p>
                  <p className="font-bold text-foreground text-lg">Try copying this gesture: Hello</p>
                  <p className="text-sm text-muted-foreground">Wave your open hand side to side</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-border">
                <CardContent className="p-12 text-center space-y-4">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground font-body">Camera Preview</p>
                  <p className="text-xs text-muted-foreground">Position yourself in front of the camera and try the gesture</p>
                  <Button variant="default" size="lg">
                    Start Camera
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Practice;
