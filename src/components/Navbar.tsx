import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto w-full px-6 md:px-8 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-extrabold text-primary">
          SignTales
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="default" size="sm">
                  Vào Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm">
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Nút mở menu trên mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2"
          aria-label="Bật/tắt menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-6">
              <ul className="flex flex-col gap-4 mb-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    <Button className="w-full">Vào Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">Đăng nhập</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      <Button className="w-full">Đăng ký</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;