"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const capabilities = [
  {
    number: "01",
    title: "Brand Identity",
    description:
      "From naming and strategy through to visual identity systems. We build brands that are distinctive, flexible and built to last.",
    services: ["Strategy", "Naming", "Visual Identity", "Brand Guidelines", "Verbal Identity"],
  },
  {
    number: "02",
    title: "Motion & 3D",
    description:
      "We animate brands to life across every touchpoint. Broadcast, social, interactive — motion that communicates and captivates.",
    services: ["Brand Animation", "3D Visualisation", "Social Content", "Video Direction"],
  },
  {
    number: "03",
    title: "Communications",
    description:
      "Clear, compelling communications across every channel. We craft the right message for the right audience, every time.",
    services: ["Campaign Strategy", "Copywriting", "PR & Media", "Content Strategy"],
  },
  {
    number: "04",
    title: "Digital",
    description:
      "Data-driven digital experiences that connect with audiences and convert. Social, web and beyond.",
    services: ["Social Media", "Web Design", "Data Science", "Digital Advertising"],
  },
];

const stats = [
  { value: "5+", label: "Years in studio" },
  { value: "100+", label: "Projects delivered" },
  { value: "60+", label: "Brands elevated" },
  { value: "12", label: "Team members" },
];

function CapabilityRow({ cap, index }: { cap: (typeof capabilities)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t py-8 md:py-10 grid md:grid-cols-[80px_1fr_1fr] gap-6 items-start cursor-default"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="text-xs tracking-widest" style={{ color: "var(--muted)" }}>
        {cap.number}
      </span>
      <div>
        <h3
          className="text-2xl md:text-3xl font-light mb-3 transition-colors duration-300 group-hover:text-[var(--accent)]"
          style={{ color: "var(--fg)" }}
        >
          {cap.title}
        </h3>
        <p className="text-sm leading-relaxed max-w-sm" style={{ color: "var(--muted)" }}>
          {cap.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {cap.services.map((s) => (
          <span
            key={s}
            className="text-xs tracking-wide px-3 py-1.5 rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Capabilities() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <section
      id="capabilities"
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            What We Do
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none"
            >
              Here's what
              <br />
              <span className="italic" style={{ color: "var(--accent)" }}>
                we can do.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              We're designers, writers, 3D and motion artists, data scientists, social media experts
              and strategists — all under one roof.
            </motion.p>
          </div>
        </div>

        {/* Capabilities list */}
        <div>
          {capabilities.map((cap, i) => (
            <CapabilityRow key={cap.number} cap={cap} index={i} />
          ))}
          <div className="border-t" style={{ borderColor: "var(--border)" }} />
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className="text-[clamp(2.5rem,5vw,4rem)] font-light leading-none mb-2"
                style={{ color: "var(--accent)" }}
              >
                {stat.value}
              </div>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
