import { motion } from "framer-motion";
import { Settings, ChevronRight, BookOpen, Trophy, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: BookOpen, label: "Learning History", to: "/progress" },
  { icon: Trophy, label: "Achievements", to: "/progress" },
  { icon: Star, label: "Saved Signs", to: "/learn" },
  { icon: Settings, label: "Settings", to: "#" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-background section-padding py-6 md:pt-20">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile header */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center">
          <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-4xl font-bold mx-auto mb-4">
            S
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Student</h1>
          <p className="text-muted-foreground text-sm font-body">Beginner · Level 1</p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Signs</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">7</p>
              <p className="text-xs text-muted-foreground">Streak</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground">Badges</p>
            </div>
          </div>
        </motion.div>

        {/* Earned badges */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="text-lg font-bold text-foreground mb-3">Badges</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["🌟", "🔥", "⚡", "⭐", "🤝"].map((badge, i) => (
              <div key={i} className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-2xl flex-shrink-0">
                {badge}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.label} to={item.to}>
              <Card className="border hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="flex-1 font-semibold text-foreground text-sm">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="pt-4">
          <Button variant="outline" className="w-full text-muted-foreground">
            Log Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
