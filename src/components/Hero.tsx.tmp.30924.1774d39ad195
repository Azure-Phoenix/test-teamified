"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";

const words = ["Design.", "Motion.", "Brand.", "Change."];

function FloatingOrb({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: "var(--accent)",
        filter: "blur(80px)",
        opacity: 0.12,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.08, 0.18, 0.08],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function TickerWord() {
  return (
    <div className="overflow-hidden h-[1em] inline-block">
      <motion.div
        animate={{ y: words.map((_, i) => `-${i * 100}%`) }}
        transition={{
          duration: words.length * 1.8,
          repeat: Infinity,
          ease: "linear",
          times: words.map((_, i) => i / words.length),
        }}
      >
        {[...words, words[0]].map((w, i) => (
          <div key={i} style={{ lineHeight: "1", height: "1em" }}>
            {w}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) * 0.02);
      mouseY.set((e.clientY - cy) * 0.02);
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
      {/* Background orbs */}
      <FloatingOrb x="10%" y="20%" size={400} delay={0} />
      <FloatingOrb x="60%" y="50%" size={300} delay={2} />
      <FloatingOrb x="80%" y="10%" size={200} delay={4} />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.3,
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.3em] uppercase mb-8"
          style={{ color: "var(--accent)" }}
        >
          Sydney — Est. 2019
        </motion.p>

        {/* Main headline */}
        <motion.h1
          style={{ x: springX, y: springY }}
          className="text-[clamp(3rem,10vw,9rem)] font-light leading-none tracking-tight mb-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Where
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block italic"
            style={{ color: "var(--accent)" }}
          >
            change
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            happens.
          </motion.span>
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-base md:text-lg max-w-md leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Design-led branding and communications studio. We make work that moves you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center gap-2 text-sm tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
          >
            <span>We do</span>
            <span
              className="text-lg font-medium inline-block min-w-[120px]"
              style={{ color: "var(--fg)" }}
            >
              <TickerWord />
            </span>
          </motion.div>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex items-center gap-6 mt-12"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            See our work
            <ArrowDown
              size={14}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
          <a
            href="#contact"
            className="text-sm tracking-widest uppercase underline underline-offset-4 transition-colors"
            style={{ color: "var(--muted)" }}
          >
            Start a project
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--muted)" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
