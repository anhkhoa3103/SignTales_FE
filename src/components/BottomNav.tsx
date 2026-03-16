import { NavLink } from "react-router-dom";
import { Home, BookOpen, Gamepad2, Users, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", icon: Home, label: "Trang Chính" },
  { to: "/learn", icon: BookOpen, label: "Học tập" },
  { to: "/practice", icon: Gamepad2, label: "Luyện tập" },
  { to: "/community", icon: Users, label: "Cộng đồng" },
  { to: "/leaderboard", icon: Trophy, label: "BXH" },
  { to: "/profile", icon: User, label: "Cá nhân" },
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
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium font-body">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
