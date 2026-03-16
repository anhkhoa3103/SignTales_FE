import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Học tập", href: "#learn" },
  { label: "Cộng đồng", href: "#community" },
  { label: "Giới thiệu", href: "#about" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 section-padding py-5 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/50">
      <Link to="/" className="font-display text-2xl font-extrabold text-primary">
        SignTales
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Đăng nhập
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">
              Đăng ký
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile toggle */}
      <div className="flex items-center gap-3 md:hidden">
        <Link to="/login">
          <Button variant="ghost" size="sm" className="px-3">
            Đăng nhập
          </Button>
        </Link>
        <Link to="/signup">
          <Button size="sm" className="px-3">
            Đăng ký
          </Button>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="text-foreground ml-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border section-padding py-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
