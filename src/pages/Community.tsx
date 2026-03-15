import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Trophy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const challenges = [
  { id: 1, title: 'Say "I Love You" in Sign Language', participants: 234, emoji: "🤟" },
  { id: 2, title: 'Sign your favorite emotion', participants: 156, emoji: "😊" },
  { id: 3, title: 'Spell your name in fingerspelling', participants: 89, emoji: "🤙" },
];

const posts = [
  {
    id: 1,
    user: "Maya",
    avatar: "👩",
    time: "2h ago",
    content: "Just learned how to sign 'Thank You'! This app makes it so easy 🙏",
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    user: "Jordan",
    avatar: "🧑‍🦱",
    time: "5h ago",
    content: "Day 14 streak! Can't believe how much I've learned. Who else is on a streak? 🔥",
    likes: 42,
    comments: 12,
  },
  {
    id: 3,
    user: "Sam",
    avatar: "👨",
    time: "1d ago",
    content: "Had a real conversation using sign language today with a deaf coworker. Feeling proud! ❤️",
    likes: 89,
    comments: 23,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Community = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background section-padding py-6 md:pt-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Community</h1>
            <p className="text-muted-foreground font-body text-sm mt-1">Learn together, grow together</p>
          </div>
          <Button variant="default" size="sm" className="gap-1">
            <Plus className="w-4 h-4" /> Post
          </Button>
        </motion.div>

        {/* Challenges */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="text-lg font-bold text-foreground mb-3">
            <Trophy className="w-5 h-5 inline mr-1 text-primary" /> Active Challenges
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
            {challenges.map((ch) => (
              <Card key={ch.id} className="min-w-[200px] bg-gradient-to-br from-primary/5 to-secondary/5 border-none flex-shrink-0">
                <CardContent className="p-4">
                  <p className="text-3xl mb-2">{ch.emoji}</p>
                  <p className="font-bold text-foreground text-sm">{ch.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{ch.participants} participants</p>
                  <Button variant="outline" size="sm" className="mt-3 w-full text-xs">
                    Join Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Feed */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Community Feed</h2>
          {posts.map((post) => (
            <Card key={post.id} className="border">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{post.avatar}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{post.user}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <p className="text-foreground font-body">{post.content}</p>
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? "fill-primary text-primary" : ""}`} />
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Community;
