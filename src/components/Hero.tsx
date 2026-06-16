"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";

const disciplines = ["Design.", "Motion.", "Brand.", "Strategy.", "Change."];

// Fix: y keyframes must match number of children (disciplines.length + 1 for the looping clone)
function TickerWord() {
  const count = disciplines.length;
  // keyframes: 0%, -100%, -200%, -300%, -400% for 5 items → 5 keyframe values
  const yKeyframes = disciplines.map((_, i) => `-${i * 100}%`);
  // times must have same length as y keyframes
  const times = disciplines.map((_, i) => i / count);

  return (
    <span className="relative overflow-hidden inline-block" style={{ height: "1.1em", verticalAlign: "bottom" }}>
      <motion.span
        className="flex flex-col"
        animate={{ y: yKeyframes }}
        transition={{
          duration: count * 2,
          repeat: Infinity,
          ease: "linear",
          times,
          repeatType: "loop",
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {[...disciplines, disciplines[0]].map((w, i) => (
          <span
            key={i}
            style={{ height: "1.1em", lineHeight: "1.1", display: "block", whiteSpace: "nowrap" }}
          >
            {w}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function FloatingOrb({
  x,
  y,
  size,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: "var(--accent)",
        filter: "blur(100px)",
        opacity: 0.08,
      }}
      animate={{ scale: [1, 1.4, 1], opacity: [0.06, 0.14, 0.06] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) * 0.015);
      mouseY.set((e.clientY - cy) * 0.015);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Soft background orbs */}
      <FloatingOrb x="5%" y="15%" size={500} delay={0} />
      <FloatingOrb x="65%" y="55%" size={350} delay={2.5} />
      <FloatingOrb x="75%" y="5%" size={250} delay={4.5} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.25,
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto w-full"
      >
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs tracking-[0.35em] uppercase mb-6"
          style={{ color: "var(--accent)" }}
        >
          Sydney — Design-Led Studio
        </motion.p>

        {/* HELLO greeting — matches original site's opening word */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-[clamp(1rem,2vw,1.25rem)] tracking-[0.2em] uppercase font-light mb-2"
          style={{ color: "var(--muted)" }}
        >
          Hello
        </motion.p>

        {/* Main headline with subtle mouse parallax */}
        <motion.h1
          style={{ x: springX, y: springY }}
          className="text-[clamp(3.5rem,10vw,9.5rem)] font-light leading-[0.95] tracking-tight mb-10"
        >
          {["Where", "change", "happens."].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`block ${i === 1 ? "italic" : ""}`}
              style={i === 1 ? { color: "var(--accent)" } : undefined}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Body copy — matches original verbatim */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="text-sm md:text-base max-w-lg leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            We&apos;re a design-led branding and communications studio. Designers, writers, 3D and motion
            artists, data scientists, social media experts and strategists.{" "}
            <span style={{ color: "var(--fg)" }}>We make work that moves you.</span>
          </motion.p>

          {/* Discipline ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center gap-3 text-sm shrink-0"
            style={{ color: "var(--muted)" }}
          >
            <span className="tracking-widest uppercase text-xs">We do</span>
            <span
              className="text-base font-medium min-w-[110px]"
              style={{ color: "var(--fg)" }}
            >
              <TickerWord />
            </span>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-wrap items-center gap-4 mt-12"
        >
          <a
            href="#capabilities"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-80"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            Here&apos;s what we can do
            <ArrowDown
              size={13}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
          <a
            href="#work"
            className="text-sm tracking-widest uppercase underline underline-offset-4"
            style={{ color: "var(--muted)" }}
          >
            See our work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--muted)" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} />
        </motion.div>
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
