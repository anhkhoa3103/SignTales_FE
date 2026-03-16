import { Flame, Trophy, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StreakInfoProps {
  className?: string;
}

const StreakInfo = ({ className }: StreakInfoProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-3">
        <Card className="bg-accent border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">7</p>
              <p className="text-xs text-muted-foreground">Chuỗi ngày (Streak)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-accent border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Ký hiệu đã học</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-accent border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">2.5h</p>
              <p className="text-xs text-muted-foreground">Tổng thời gian</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Goal Progress */}
      <Card className="bg-card border shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Mục tiêu ngày</p>
            <p className="text-xs text-muted-foreground">6/10 phút</p>
          </div>
          <Progress value={60} className="h-2 bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
};

export default StreakInfo;
