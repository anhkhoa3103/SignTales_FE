import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Gauge, Repeat, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "react-router-dom";
import helloSign from "@/assets/hello-sign.jpg";

const lessonData: Record<string, { word: string; meaning: string; example: string; emoji: string }> = {
  "1": { word: "Hello", meaning: "Xin chào / Hi", example: "Hello! Nice to meet you.", emoji: "👋" },
  "2": { word: "Thank You", meaning: "Cảm ơn / Thanks", example: "Thank you for helping me.", emoji: "🙏" },
  "3": { word: "Sorry", meaning: "Xin lỗi / Apologies", example: "I'm sorry for being late.", emoji: "😔" },
};

const LessonDetail = () => {
  const { id } = useParams();
  const lesson = lessonData[id || "1"] || lessonData["1"];

  return (
    <div className="min-h-screen bg-background section-padding py-6 md:pt-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <Link to="/learn">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Lesson {id}</p>
            <Progress value={50} className="h-2 mt-1 bg-muted" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video / Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <img
                src={helloSign}
                alt={`Sign for ${lesson.word}`}
                className="w-full aspect-square object-cover"
              />
            </Card>
            <div className="flex gap-2 mt-4 justify-center">
              <Button variant="outline" size="sm" className="gap-1">
                <RotateCcw className="w-4 h-4" /> Replay
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Gauge className="w-4 h-4" /> Slow Motion
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Repeat className="w-4 h-4" /> Loop
              </Button>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="text-5xl mb-3">{lesson.emoji}</p>
              <h1 className="text-3xl font-extrabold text-foreground">{lesson.word}</h1>
            </div>

            <Card className="bg-accent border-none">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-accent-foreground mb-1">Meaning</p>
                <p className="text-foreground font-body">{lesson.meaning}</p>
              </CardContent>
            </Card>

            <Card className="bg-muted border-none">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground mb-1">Example</p>
                <p className="text-muted-foreground font-body italic">"{lesson.example}"</p>
              </CardContent>
            </Card>

            <div className="space-y-3 pt-4">
              <Link to="/practice">
                <Button variant="default" size="lg" className="w-full">
                  Practice This Sign
                </Button>
              </Link>
              <Link to={`/learn/${Number(id || 1) + 1}`}>
                <Button variant="outline" size="lg" className="w-full gap-2 mt-2">
                  Next Lesson <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
