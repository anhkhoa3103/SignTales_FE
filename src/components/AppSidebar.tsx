import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import homeIcon from "@/assets/home.png";
import learnIcon from "@/assets/learn.png";
import practiceIcon from "@/assets/practice.png";
import exploreIcon from "@/assets/explore.png";
import leaderboardIcon from "@/assets/leaderboard.png";
import progressIcon from "@/assets/progress.png";
import profileIcon from "@/assets/profile.png";

const navItems = [
  { to: "/dashboard", icon: homeIcon, label: "Trang Chính" },
  { to: "/learn", icon: learnIcon, label: "Học tập" },
  { to: "/practice", icon: practiceIcon, label: "Luyện tập" },
  { to: "/explore", icon: exploreIcon, label: "Khám phá" },
  { to: "/leaderboard", icon: leaderboardIcon, label: "Bảng xếp hạng" },
  { to: "/progress", icon: progressIcon, label: "Tiến độ" },
  { to: "/profile", icon: profileIcon, label: "Cá nhân" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="py-6 px-4">
        <Link
          to="/"
          className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-extrabold">S</span>
          </div>

          <span className="font-display text-xl font-extrabold text-primary group-data-[collapsible=icon]:hidden">
            SignTales
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Menu chính
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.to}
                    tooltip={item.label}
                    className="py-6"
                  >
                    <Link to={item.to} className="flex items-center gap-3">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-5 h-5 object-contain shrink-0"
                      />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}