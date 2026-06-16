"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Capability", href: "#capabilities" },
  { label: "Team", href: "#team" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer
      className="px-6 md:px-10 pt-16 pb-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Large CTA */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--muted)" }}
          >
            Ready to start?
          </p>
          <a
            href="mailto:hello@playgroundstudio.com.au"
            className="group inline-flex items-end gap-4 text-[clamp(2rem,6vw,5.5rem)] font-light leading-none transition-colors duration-300 hover:text-[color:var(--accent)]"
            style={{ color: "var(--fg)" }}
          >
            Let&apos;s work together
            <ArrowUpRight
              className="mb-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              size={36}
            />
          </a>
        </motion.div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Brand + copyright */}
          <div>
            <p
              className="text-sm font-bold tracking-[0.2em] uppercase mb-1"
              style={{ color: "var(--fg)" }}
            >
              Playground Studio
            </p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              © PLAYGROUND STUDIO {new Date().getFullYear()}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs tracking-widest uppercase transition-colors"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social — text links matching original site style */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/_PLAYGROUNDSTUDIO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/playground-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              LinkedIn
            </a>
            <a
              href="/privacy-policy"
              className="text-xs tracking-widest uppercase transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              Privacy
            </a>
          </div>
        </div>

        {/* Acknowledgement — correct Country for South Melbourne */}
        <p
          className="text-[11px] mt-8 leading-relaxed max-w-2xl"
          style={{ color: "var(--muted)" }}
        >
          Playground Studio acknowledges the Boon Wurrung people of the Kulin Nation as the
          traditional custodians of the land on which we work. We pay our respects to Elders past,
          present and emerging.
        </p>
      </div>
    </footer>
  );
}
