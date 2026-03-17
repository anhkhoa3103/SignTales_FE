import { NavLink } from "react-router-dom";
import { Home, BookOpen, Gamepad2, Users, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", icon: Home, label: "Trang Chính" },
  { to: "/learn", icon: BookOpen, label: "Học tập" },
  { to: "/practice", icon: Gamepad2, label: "Luyện tập" },
  { to: "/explore", icon: Users, label: "Khám phá" },
  { to: "/leaderboard", icon: Trophy, label: "BXH" },
  { 
    to: "/profile", 
    icon: "/profile picture/z7630111933759_2f66afa9ffd139109946c5980f448bd7.jpg", 
    label: "Cá nhân",
    isImage: true 
  },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="flex items-center justify-around md:justify-center md:gap-8 max-w-2xl mx-auto h-16">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors duration-200 text-muted-foreground",
                isActive && "text-primary"
              )
            }
          >
            {item.isImage ? (
              <img 
                src={item.icon as string} 
                alt={item.label} 
                className="w-6 h-6 rounded-full object-cover" 
              />
            ) : (
              <item.icon className="w-5 h-5" />
            )}
            <span className="text-[15px] font-body font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
