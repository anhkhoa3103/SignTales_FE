import { NavLink } from "react-router-dom";
import { Home, BookOpen, Gamepad2, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/learn", icon: BookOpen, label: "Learn" },
  { to: "/practice", icon: Gamepad2, label: "Practice" },
  { to: "/community", icon: Users, label: "Community" },
  { to: "/profile", icon: User, label: "Profile" },
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
