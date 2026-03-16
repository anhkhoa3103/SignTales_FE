import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  PlayCircle, 
  Newspaper, 
  Lightbulb, 
  MessageSquare, 
  Heart, 
  Share2, 
  Bookmark,
  ChevronRight,
  X
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const shortVideos = [
  { id: 5, title: "Tự hào Việt Nam", views: "10.5k", thumbnail: "🇻🇳", author: "SignTales", video: "/Short Video/vnam.mp4" },
  { id: 6, title: "Chào hỏi cơ bản", views: "5.2k", thumbnail: "👋", author: "Học cùng An", video: "/Short Video/hello.mp4" },
  { id: 1, title: "Ký hiệu 'Cảm ơn'", views: "1.2k", thumbnail: "👋", author: "Học cùng An" },
  { id: 2, title: "Tên bảng chữ cái", views: "850", thumbnail: "🤟", author: "SignTales Team" },
  { id: 3, title: "Hỏi thăm sức khỏe", views: "2.1k", thumbnail: "😊", author: "Minh Trang" },
  { id: 4, title: "Số đếm 1-10", views: "3.4k", thumbnail: "🔢", author: "Thầy Bình" },
];

const newsAndBlogs = [
  {
    id: 1,
    category: "Tin tức",
    title: "Sự kiện kết nối cộng đồng người khiếm thính 2024",
    excerpt: "Hơn 500 người đã tham gia buổi workshop về ngôn ngữ ký hiệu tại TP.HCM...",
    date: "12 Th05",
    author: "Ban Biên Tập",
    image: "📰",
  },
  {
    id: 2,
    category: "Kinh nghiệm",
    title: "5 Mẹo nhỏ giúp ghi nhớ ký hiệu nhanh hơn",
    excerpt: "Làm thế nào để nhớ được hàng trăm ký hiệu mà không bị nhầm lẫn? Hãy xem ngay...",
    date: "10 Th05",
    author: "Phương Linh",
    image: "💡",
  },
];

const experiences = [
  {
    id: 1,
    user: "Hoàng Long",
    avatar: "🧑",
    content: "Lần đầu tiên mình dùng ngôn ngữ ký hiệu để gọi món tại quán cà phê của người khiếm thính. Cảm giác thật tuyệt vời!",
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    user: "Minh Anh",
    avatar: "👩",
    content: "Mọi người ơi, có ai biết ký hiệu của từ 'Hạnh phúc' trong ASL khác gì với VSL không ạ? Mình đang hơi bối rối.",
    likes: 45,
    comments: 32,
  },
];

import { cn } from "@/lib/utils";

const Explore = () => {
  const [selectedShort, setSelectedShort] = useState<number | null>(null);
  const [likedShorts, setLikedShorts] = useState<Set<number>>(new Set());
  const [pausedVideos, setPausedVideos] = useState<Set<number>>(new Set());
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
  const [newComment, setNewComment] = useState("");

  const toggleLike = (id: number) => {
    setLikedShorts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleVideoPlayback = (id: number, videoElement: HTMLVideoElement) => {
    if (videoElement.paused) {
      videoElement.play();
      setPausedVideos(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      videoElement.pause();
      setPausedVideos(prev => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  };

  const handleAddComment = (id: number) => {
    if (!newComment.trim()) return;
    setCommentCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-background py-6 px-4 md:px-0">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header & Search */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Khám phá</h1>
            <p className="text-muted-foreground font-body">Tìm hiểu thêm về thế giới ngôn ngữ ký hiệu và cộng đồng.</p>
          </motion.div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Tìm kiếm video, tin tức, chia sẻ..." 
              className="pl-12 h-14 rounded-2xl border-2 border-primary/5 focus:border-primary/20 bg-card text-lg shadow-sm"
            />
          </div>
        </div>

        {/* Tabs for Categories */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="bg-muted/50 p-1 rounded-2xl flex w-fit overflow-x-auto">
            <TabsTrigger value="all" className="rounded-xl px-6">Tất cả</TabsTrigger>
            <TabsTrigger value="videos" className="rounded-xl px-6">Videos ngắn</TabsTrigger>
            <TabsTrigger value="news" className="rounded-xl px-6">Tin tức & Blog</TabsTrigger>
            <TabsTrigger value="share" className="rounded-xl px-6">Chia sẻ</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12 m-0 opacity-100 position-relative">
            {/* Short Videos Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-primary" /> Videos ngắn
                </h2>
                <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">
                  Xem thêm <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {shortVideos.map((video) => (
                  <Card 
                    key={video.id} 
                    onClick={() => setSelectedShort(video.id)}
                    className="min-w-[160px] md:min-w-[200px] group border-none bg-card hover:bg-muted/50 transition-all cursor-pointer overflow-hidden rounded-2xl shadow-sm flex-shrink-0"
                  >
                    <CardContent className="p-0">
                      <div className="aspect-[9/16] bg-primary/10 flex items-center justify-center text-5xl relative overflow-hidden">
                        {video.video ? (
                          <video 
                            src={video.video} 
                            className="w-full h-full object-cover"
                            muted
                            loop
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                        ) : (
                          video.thumbnail
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <PlayCircle className="w-12 h-12 text-white fill-white/20" />
                        </div>
                        <Badge variant="secondary" className="absolute bottom-3 right-3 text-[10px] font-bold bg-black/50 text-white border-none backdrop-blur-md">
                          {video.views} xem
                        </Badge>
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-sm text-foreground line-clamp-1">{video.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">@{video.author}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* News & Blog Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-emerald-500" /> Tin tức & Blog
                </h2>
                <Button variant="ghost" className="text-primary font-bold">Xem thêm</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsAndBlogs.map((item) => (
                  <Card key={item.id} className="border-none bg-card hover:shadow-md transition-all cursor-pointer rounded-3xl overflow-hidden shadow-sm">
                    <CardContent className="p-0 flex">
                      <div className="w-32 bg-emerald-50 flex items-center justify-center text-4xl border-r">
                        {item.image}
                      </div>
                      <div className="p-5 flex-1 space-y-2">
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-bold text-[10px]">
                          {item.category}
                        </Badge>
                        <h3 className="font-bold text-foreground leading-tight line-clamp-2">{item.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 font-body">{item.excerpt}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[10px] text-muted-foreground font-medium">{item.date}</span>
                          <span className="text-[10px] font-bold text-primary">Đọc tiếp</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Experience Sharing Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" /> Chia sẻ kinh nghiệm
                </h2>
                <Button variant="ghost" className="text-primary font-bold">Thảo luận</Button>
              </div>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <Card key={exp.id} className="border-none bg-card rounded-3xl shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl shrink-0">
                          {exp.avatar}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-foreground text-sm">{exp.user}</h4>
                            <Share2 className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-foreground font-body leading-relaxed">{exp.content}</p>
                          <div className="flex items-center gap-6 pt-2">
                            <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                              <Heart className="w-4 h-4" /> {exp.likes}
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                              <MessageSquare className="w-4 h-4" /> {exp.comments}
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                              <Bookmark className="w-4 h-4" /> Lưu
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6 m-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {shortVideos.map((video) => (
                <Card 
                  key={video.id} 
                  onClick={() => setSelectedShort(video.id)}
                  className="group border-none bg-card hover:bg-muted/50 transition-all cursor-pointer overflow-hidden rounded-2xl shadow-sm"
                >
                  <CardContent className="p-0">
                    <div className="aspect-[9/16] bg-primary/10 flex items-center justify-center text-5xl relative overflow-hidden">
                      {video.video ? (
                        <video 
                          src={video.video} 
                          className="w-full h-full object-cover"
                          muted
                          loop
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                        />
                      ) : (
                        video.thumbnail
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <PlayCircle className="w-12 h-12 text-white fill-white/20" />
                      </div>
                      <Badge variant="secondary" className="absolute bottom-3 right-3 text-[10px] font-bold bg-black/50 text-white border-none backdrop-blur-md">
                        {video.views} xem
                      </Badge>
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-base text-foreground line-clamp-1">{video.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">@{video.author}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Floating Action Button for Posting */}
        <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-50">
          <Button className="w-14 h-14 rounded-full shadow-2xl shadow-primary/40 gradient-primary flex items-center justify-center p-0">
            <MessageSquare className="w-6 h-6 text-primary-foreground" />
          </Button>
        </div>

        {/* Full Screen Shorts Player */}
        <AnimatePresence>
          {selectedShort !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-4"
            >
              <button 
                onClick={() => setSelectedShort(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white z-[120] bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="h-full md:h-[calc(100vh-2rem)] md:max-h-[800px] w-full max-w-[1000px] bg-black relative overflow-hidden md:rounded-[32px] shadow-2xl border-none md:border border-white/10 flex flex-col md:flex-row">
                <div className="flex-1 h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black relative">
                  {shortVideos.filter(v => v.video).map((v) => (
                    <div key={v.id} className="h-full w-full snap-start relative flex items-center justify-center group/video">
                      <video 
                        src={v.video} 
                        className="h-full w-full object-cover md:object-contain cursor-pointer"
                        autoPlay
                        loop
                        playsInline
                        onClick={(e) => toggleVideoPlayback(v.id, e.currentTarget)}
                      />
                      
                      {/* Play/Pause Overlay Indicator */}
                      <AnimatePresence>
                        {pausedVideos.has(v.id) && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                          >
                            <div className="w-20 h-20 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                              <PlayCircle className="w-12 h-12 text-white fill-white/20" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Mobile-only Overlay Info (Hidden on Desktop) */}
                      <div className="md:hidden absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white text-left z-20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl border border-white/10">👤</div>
                          <p className="font-bold text-lg">@{v.author}</p>
                          <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">Follow</Badge>
                        </div>
                        <p className="text-sm font-medium opacity-90 leading-relaxed max-w-[80%]">{v.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interaction Sidebar (Visible on Desktop, Bottom Sheet on Mobile) */}
                <div className="w-full md:w-[350px] bg-zinc-950 border-l border-white/10 flex flex-col h-[40%] md:h-full z-30">
                  <div className="p-6 border-b border-white/5 hidden md:block">
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
                    <div className="flex justify-around items-center py-4 border-y border-white/5 bg-white/5 rounded-2xl md:bg-transparent md:rounded-none md:border-x-0">
                      <div className="flex flex-col items-center gap-1.5">
                        <button 
                          onClick={() => toggleLike(selectedShort)}
                          className={cn(
                            "p-3.5 rounded-full transition-all active:scale-125 bg-white/5 hover:bg-white/10 border border-white/5",
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
                  <div className="p-4 bg-zinc-950 border-t border-white/10 md:p-6">
                    <div className="flex gap-3">
                      <Input 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Thêm bình luận..." 
                        className="h-12 bg-white/5 border-white/5 text-white placeholder:text-zinc-600 text-sm rounded-2xl focus-visible:ring-primary/40 focus-visible:border-primary/40 transition-all"
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Explore;
