import { motion } from "framer-motion";
import { X, Heart, MessageSquare, Share2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ShortVideo from "./VideoItem";
import { cn } from "@/lib/utils";

interface ShortsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedShort: number | null;
  shortVideos: any[];
  likedShorts: Set<number>;
  toggleLike: (id: number) => void;
  commentCounts: Record<number, number>;
  newComment: string;
  setNewComment: (val: string) => void;
  handleAddComment: (id: number) => void;
}

const ShortsModal = ({
  isOpen,
  onClose,
  selectedShort,
  shortVideos,
  likedShorts,
  toggleLike,
  commentCounts,
  newComment,
  setNewComment,
  handleAddComment
}: ShortsModalProps) => {
  if (!isOpen || selectedShort === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-0 md:p-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white z-[120] bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors backdrop-blur-md border border-white/10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="h-full md:h-[calc(100vh-4rem)] md:max-h-[850px] w-full max-w-[850px] bg-transparent relative overflow-hidden md:rounded-[32px] shadow-2xl border-none flex flex-col md:flex-row">
        {/* Video Container */}
        <div className="w-full md:w-[calc(100%-380px)] h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black/60 relative">
          {shortVideos.filter(v => v.video).map((v) => (
            <div
              key={v.id}
              className="h-full w-full snap-start relative group/video"
            >
              <ShortVideo src={v.video} />

              {/* Mobile Overlay */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white text-left z-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl border border-white/10">👤</div>
                  <p className="font-bold text-lg">@{v.author}</p>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
                    Follow
                  </Badge>
                </div>
                <p className="text-sm font-medium opacity-90 leading-relaxed max-w-[80%]">
                  {v.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interaction Sidebar */}
        <div className="w-full md:w-[380px] bg-zinc-950/90 backdrop-blur-xl border-l border-white/10 flex flex-col h-[45%] md:h-full z-30">
          <div className="p-6 border-b border-white/10 hidden md:block">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl border border-white/10">👤</div>
              <div>
                <p className="font-bold text-white text-lg leading-none mb-1">SignTales Creator</p>
                <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase">2 Giờ Trước</p>
              </div>
            </div>
            <h3 className="font-bold text-white text-xl mb-3 tracking-tight">Hướng dẫn ký hiệu</h3>
            <p className="text-sm text-zinc-400 font-body leading-relaxed">
              Cùng học cách thực hiện các ký hiệu cơ bản một cách chính xác nhất. Đừng quên luyện tập mỗi ngày nhé!
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {/* Stats */}
            <div className="flex justify-around items-center py-4 border-y border-white/10 bg-white/5 rounded-2xl md:bg-transparent md:rounded-none md:border-x-0">
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={() => toggleLike(selectedShort)}
                  className={cn(
                    "p-3.5 rounded-full transition-all active:scale-125 bg-white/5 hover:bg-white/10 border border-white/10",
                    likedShorts.has(selectedShort) && "text-red-500 bg-red-500/10 border-red-500/20"
                  )}
                >
                  <Heart className={cn("w-6 h-6", likedShorts.has(selectedShort) && "fill-current")} />
                </button>
                <span className="text-[11px] font-bold text-zinc-400">{likedShorts.has(selectedShort) ? "1.2k" : "1.1k"}</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3.5 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 cursor-pointer border border-white/5">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-zinc-400">{(commentCounts[selectedShort] || 0) + 85}</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="p-3.5 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 cursor-pointer border border-white/5">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-zinc-400">Chia sẻ</span>
              </div>
            </div>

            {/* Fake Comments List */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Bình luận</p>
                <span className="text-[10px] text-zinc-600 font-bold">Mới nhất</span>
              </div>
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex-shrink-0 border border-white/5" />
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-white">Minh Anh</p>
                  <p className="text-xs text-zinc-400 leading-relaxed font-body">Video hướng dẫn rất dễ hiểu, cảm ơn team đã chia sẻ!</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex-shrink-0 border border-white/5" />
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-white">Hoàng Long</p>
                  <p className="text-xs text-zinc-400 leading-relaxed font-body">Mình đã học thuộc ký hiệu này chỉ sau 2 lần xem.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comment Input at Bottom of Sidebar */}
          <div className="p-4 bg-zinc-950/50 border-t border-white/10 md:p-6 backdrop-blur-sm">
            <div className="flex gap-3">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Thêm bình luận..."
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 text-sm rounded-2xl focus-visible:ring-primary/40 focus-visible:border-primary/40 transition-all"
              />
              <Button
                onClick={() => handleAddComment(selectedShort)}
                size="sm"
                className="h-12 w-12 rounded-2xl p-0 bg-primary hover:bg-primary/90 transition-all shrink-0 shadow-lg shadow-primary/20"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShortsModal;
