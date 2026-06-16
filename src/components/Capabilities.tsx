"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const capabilities = [
  {
    number: "01",
    title: "Insights & Strategy",
    description:
      "Everything we do draws from a thoroughly researched and highly considered brand strategy. We uncover what makes a brand truly distinctive — then build on it.",
    services: ["Brand Identity", "Brand Strategy", "Brand Architecture", "Brand Refresh & Evolution"],
  },
  {
    number: "02",
    title: "Creative",
    description:
      "Our work is renowned for the depth, quality and originality of its design-led thinking and storytelling. From identity to film — we make things that land.",
    services: [
      "Brand Identity & Guidelines",
      "Motion & Animation",
      "Art Direction",
      "Naming & Copywriting",
      "Packaging",
      "Wayfinding",
      "Film & Photography",
    ],
  },
  {
    number: "03",
    title: "Digital",
    description:
      "We craft insightful and highly detailed digital strategies focused on performance and optimisation. Beautiful experiences that convert.",
    services: ["Website Design & Development", "UI/UX", "Analytics & Reporting"],
  },
  {
    number: "04",
    title: "Data",
    description:
      "We use data to identify patterns of human behaviour, then apply those insights to shape smarter, more effective creative strategy.",
    services: ["Data Gathering", "Insights Generation", "Analytics & Reporting"],
  },
  {
    number: "05",
    title: "Social Media",
    description:
      "We transform clients' social media presence and performance into a highly focused and effective source of conversions — strategy through to execution.",
    services: [
      "Strategy & Creative",
      "Paid & Organic Social",
      "Launch & Activation",
      "Campaign Development",
    ],
  },
  {
    number: "06",
    title: "Communications",
    description:
      "We craft intelligent communication ecosystems that connect brands and audiences through the right message, at the right time, on the right channel.",
    services: [
      "CRM Strategy",
      "Email Marketing",
      "Automated Campaigns",
      "SMS",
      "Journey Mapping",
      "Database Management",
    ],
  },
  {
    number: "07",
    title: "3D & Motion",
    description:
      "Industry-leading 3D CGI animations and stills for product, architectural and branding projects. Plus AR/VR and interactive media.",
    services: ["3D CGI Animation & Stills", "Architectural Visualisation", "AR/VR", "Interactive Media"],
  },
  {
    number: "08",
    title: "Videography",
    description:
      "Brand, lifestyle, architectural and product films — cinematic storytelling that elevates every brand touchpoint.",
    services: ["Brand Films", "Lifestyle & Product", "Drone Cinematography", "Post-Production"],
  },
];

const stats = [
  { value: "20+", label: "Talented creatives" },
  { value: "100+", label: "Projects delivered" },
  { value: "8", label: "Studio capabilities" },
  { value: "1", label: "Studio hound (Harvey)" },
];

function CapabilityRow({ cap, index }: { cap: (typeof capabilities)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t py-8 md:py-10 grid md:grid-cols-[80px_1fr_1fr] gap-6 items-start cursor-default"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="text-xs tracking-widest pt-1" style={{ color: "var(--muted)" }}>
        {cap.number}
      </span>
      <div>
        <h3
          className="text-xl md:text-2xl font-light mb-3 transition-colors duration-300 group-hover:text-[color:var(--accent)]"
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
            className="text-[11px] tracking-wide px-3 py-1.5 rounded-full border"
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
            Capability
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none"
            >
              Here&apos;s what
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
              We&apos;re designers, writers, 3D and motion artists, data scientists, social media experts
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
