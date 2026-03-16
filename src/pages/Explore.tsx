import { motion } from "framer-motion";
import { 
  Search, 
  PlayCircle, 
  Newspaper, 
  Lightbulb, 
  MessageSquare, 
  Heart, 
  Share2, 
  Bookmark,
  ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const shortVideos = [
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

const Explore = () => {
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

          <TabsContent value="all" className="space-y-12 m-0">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {shortVideos.map((video) => (
                  <Card key={video.id} className="group border-none bg-card hover:bg-muted/50 transition-all cursor-pointer overflow-hidden rounded-2xl shadow-sm">
                    <CardContent className="p-0">
                      <div className="aspect-[9/16] bg-primary/10 flex items-center justify-center text-5xl relative">
                        {video.thumbnail}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <PlayCircle className="w-12 h-12 text-white fill-white/20" />
                        </div>
                        <Badge variant="secondary" className="absolute bottom-3 right-3 text-[10px] font-bold">
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
        </Tabs>

        {/* Floating Action Button for Posting */}
        <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-50">
          <Button className="w-14 h-14 rounded-full shadow-2xl shadow-primary/40 gradient-primary flex items-center justify-center p-0">
            <MessageSquare className="w-6 h-6 text-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
