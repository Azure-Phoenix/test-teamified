"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Hope & Autumn",
    category: "Brand Identity",
    year: "2024",
    tags: ["Branding", "Print", "Digital"],
    color: "#c8a882",
    description: "A luxury lifestyle brand rooted in warmth and authenticity.",
  },
  {
    id: 2,
    title: "Seren Row",
    category: "Brand Identity + Web",
    year: "2024",
    tags: ["Identity", "Web", "Art Direction"],
    color: "#8aad9f",
    description: "Serene residential development branding for modern living.",
  },
  {
    id: 3,
    title: "REVL",
    category: "Motion + Campaign",
    year: "2023",
    tags: ["Motion", "Campaign", "Social"],
    color: "#1a1916",
    description: "High-energy campaign for a disruptive fitness brand.",
  },
  {
    id: 4,
    title: "Champagne Problems",
    category: "Visual Identity",
    year: "2023",
    tags: ["Identity", "Packaging"],
    color: "#c9b55a",
    description: "Playful premium packaging for a boutique wine brand.",
  },
  {
    id: 5,
    title: "State Library Exchange",
    category: "Communications",
    year: "2023",
    tags: ["Strategy", "Communications", "Events"],
    color: "#8a6fa0",
    description: "Cultural communications for the State Library of NSW.",
  },
  {
    id: 6,
    title: "Skinstitut",
    category: "Digital + Social",
    year: "2022",
    tags: ["Digital", "Social", "Content"],
    color: "#d4927a",
    description: "Award-winning digital refresh for Australia's leading skincare clinic.",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      {/* Image placeholder with colour */}
      <div
        className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4"
        style={{ backgroundColor: project.color }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Hover reveal */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="text-center text-white px-6">
            <p className="text-sm mb-3">{project.description}</p>
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase">
              View Project <ArrowUpRight size={12} />
            </div>
          </div>
        </motion.div>

        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow indicator */}
        <motion.div
          animate={{ x: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <ArrowUpRight size={16} className="text-black" />
        </motion.div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium" style={{ color: "var(--fg)" }}>
            {project.title}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
            {project.category}
          </p>
        </div>
        <span className="text-sm" style={{ color: "var(--muted)" }}>
          {project.year}
        </span>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true });

  return (
    <section id="work" className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none"
            >
              Work that
              <br />
              <span className="italic" style={{ color: "var(--accent)" }}>
                moves you.
              </span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="#"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase pb-0.5 border-b"
            style={{ color: "var(--fg)", borderColor: "var(--border)" }}
          >
            View all projects <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
