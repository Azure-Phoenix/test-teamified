"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Team", href: "#team" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10"
        style={{
          backgroundColor: scrolled ? "var(--bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background-color 0.4s ease, border-color 0.4s ease",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "var(--fg)" }}>
            Playground<span style={{ color: "var(--accent)" }}>.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
              style={{ color: "var(--muted)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-medium rounded-full transition-all duration-200"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Work With Us
            </a>
            <button
              className="md:hidden"
              onClick={() => setOpen(true)}
              style={{ color: "var(--fg)" }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col p-8"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-sm font-bold tracking-[0.2em] uppercase">
                Playground<span style={{ color: "var(--accent)" }}>.</span>
              </span>
              <button onClick={() => setOpen(false)} style={{ color: "var(--fg)" }}>
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  onClick={() => setOpen(false)}
                  className="text-4xl font-light"
                  style={{ color: "var(--fg)" }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-medium rounded-full"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                Work With Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
