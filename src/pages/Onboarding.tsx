import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const steps = [
  {
    question: "Why do you want to learn sign language?",
    options: [
      { label: "Curiosity", emoji: "🤔" },
      { label: "Communicate with deaf people", emoji: "🤝" },
      { label: "For school", emoji: "📚" },
      { label: "Just for fun", emoji: "🎉" },
    ],
  },
  {
    question: "What is your level?",
    options: [
      { label: "Beginner", emoji: "🌱" },
      { label: "Know a few signs", emoji: "✌️" },
      { label: "Intermediate", emoji: "💪" },
    ],
  },
  {
    question: "Daily learning goal?",
    options: [
      { label: "5 minutes per day", emoji: "⏱️" },
      { label: "10 minutes per day", emoji: "⏰" },
      { label: "Casual learning", emoji: "😎" },
    ],
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<(string | null)[]>([null, null, null]);
  const navigate = useNavigate();

  const select = (label: string) => {
    const next = [...selections];
    next[step] = label;
    setSelections(next);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const s = steps[step];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center section-padding">
      <div className="max-w-md w-full space-y-8">
        {/* Progress */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Step {step + 1} of {steps.length}</p>
              <h1 className="text-2xl font-extrabold text-foreground">{s.question}</h1>
            </div>

            <div className="space-y-3">
              {s.options.map((opt) => (
                <Card
                  key={opt.label}
                  onClick={() => select(opt.label)}
                  className={cn(
                    "cursor-pointer transition-all duration-200 border-2",
                    selections[step] === opt.label
                      ? "border-primary bg-primary/5 shadow-[var(--shadow-soft)]"
                      : "border-transparent hover:border-border"
                  )}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="font-semibold text-foreground">{opt.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!selections[step]}
              className="w-full"
              size="lg"
            >
              {step < steps.length - 1 ? "Continue" : "Start Learning"}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
