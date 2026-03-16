import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Gauge, Repeat, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import helloSign from "@/assets/hello-sign.jpg";

const lessonData: Record<string, { word: string; meaning: string; example: string; emoji: string; video?: string; description?: string }> = {
  "1": { 
    word: "Xin chào", 
    meaning: "Lời chào khi gặp ai đó", 
    example: "Xin chào! Rất vui được gặp bạn.", 
    emoji: "👋",
    video: "/Tutorial video/7625741221388.mp4",
    description: '"Xin chào" thường được thể hiện bằng cách giơ một hoặc hai tay lên (lòng bàn tay hướng về phía trước hoặc hơi nghiêng) và vẫy nhẹ, tương tự động tác vẫy tay chào thông thường, thường kèm theo nụ cười thân thiện.'
  },
  "2": { 
    word: "Cảm ơn", 
    meaning: "Lời bày tỏ sự biết ơn", 
    example: "Cảm ơn bạn đã giúp mình.", 
    emoji: "🙏" 
  },
  "3": { 
    word: "Xin lỗi", 
    meaning: "Lời xin lỗi khi mắc lỗi", 
    example: "Mình xin lỗi vì đã đến muộn.", 
    emoji: "😔",
    video: "/Tutorial video/7625741213414.mp4",
    description: '"xin lỗi" thường được thể hiện bằng cách nắm nhẹ bàn tay lại, úp xuống, đặt trước ngực và xoay nhẹ nhàng. Ký hiệu này kết hợp với biểu cảm gương mặt chân thành (nhíu mày nhẹ, ánh mắt hối lỗi) để thể hiện sự hối hận và cầu mong được tha thứ.'
  },
};

const LessonDetail = () => {
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const lesson = lessonData[id || "1"] || lessonData["1"];

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const toggleSlowMotion = () => {
    const newSpeed = playbackSpeed === 1 ? 0.5 : 1;
    setPlaybackSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  return (
    <div className="min-h-screen bg-background section-padding py-6 md:pt-20">
      <div className="max-w-3xl mx-auto">
        {/* Tiêu đề */}
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
            <p className="text-sm text-muted-foreground">Bài học {id}</p>
            <Progress value={50} className="h-2 mt-1 bg-muted" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video / Hình ảnh */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Card className="overflow-hidden border-none shadow-xl bg-muted aspect-square flex items-center justify-center">
              {lesson.video ? (
                <video
                  ref={videoRef}
                  src={lesson.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={helloSign}
                  alt={`Ký hiệu cho từ ${lesson.word}`}
                  className="w-full h-full object-cover"
                />
              )}
            </Card>

            {/* Hướng dẫn thực hiện */}
            {lesson.description && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/5 border border-primary/10 rounded-2xl p-4"
              >
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Hướng dẫn thực hiện</p>
                <p className="text-sm text-foreground font-body leading-relaxed italic">
                  {lesson.description}
                </p>
              </motion.div>
            )}

            <div className="flex gap-2 mt-2 justify-center">
              <Button variant="outline" size="sm" className="gap-1" onClick={handleReplay}>
                <RotateCcw className="w-4 h-4" /> Phát lại
              </Button>
              <Button 
                variant={playbackSpeed === 0.5 ? "secondary" : "outline"} 
                size="sm" 
                className="gap-1" 
                onClick={toggleSlowMotion}
              >
                <Gauge className="w-4 h-4" /> Chuyển động chậm
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Repeat className="w-4 h-4" /> Lặp lại
              </Button>
            </div>
          </motion.div>

          {/* Chi tiết */}
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
                <p className="text-sm font-semibold text-accent-foreground mb-1">Ý nghĩa</p>
                <p className="text-foreground font-body">{lesson.meaning}</p>
              </CardContent>
            </Card>

            <Card className="bg-muted border-none">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground mb-1">Ví dụ</p>
                <p className="text-muted-foreground font-body italic">"{lesson.example}"</p>
              </CardContent>
            </Card>

            <div className="space-y-3 pt-4">
              <Link to="/practice">
                <Button variant="default" size="lg" className="w-full">
                  Luyện tập ký hiệu này
                </Button>
              </Link>
              <Link to={`/learn/${Number(id || 1) + 1}`}>
                <Button variant="outline" size="lg" className="w-full gap-2 mt-2">
                  Bài học tiếp theo <ChevronRight className="w-4 h-4" />
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