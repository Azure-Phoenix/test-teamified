"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Hope & Autumn",
    category: "Brand Identity",
    year: "2024",
    description: "A luxury lifestyle brand rooted in warmth and authenticity.",
    image: "https://www.datocms-assets.com/105312/1771977143-h-a_hoarding1_web.jpg",
  },
  {
    id: 2,
    title: "Seren Row",
    category: "Brand Identity + Web",
    year: "2024",
    description: "Serene residential development branding for modern living.",
    image: "https://www.datocms-assets.com/105312/1760189483-52.jpg",
  },
  {
    id: 3,
    title: "REVL",
    category: "Motion + Campaign",
    year: "2023",
    description: "High-energy campaign for a disruptive fitness brand.",
    image: "https://www.datocms-assets.com/105312/1760188650-bfrevl1.jpg",
  },
  {
    id: 4,
    title: "Champagne Problems",
    category: "Visual Identity",
    year: "2023",
    description: "Playful premium packaging for a boutique wine brand.",
    image: "https://www.datocms-assets.com/105312/1760190240-champagne-problems8.jpg",
  },
  {
    id: 5,
    title: "State Library Exchange",
    category: "Communications",
    year: "2023",
    description: "Cultural communications for the State Library of NSW.",
    image: "https://www.datocms-assets.com/105312/1720758151-o_1i0i8eluepav109q1j571ebd1biaf.jpg",
  },
  {
    id: 6,
    title: "Skinstitut",
    category: "Digital + Social",
    year: "2022",
    description: "Award-winning digital refresh for Australia's leading skincare clinic.",
    image: "https://www.datocms-assets.com/105312/1692413877-skinstitut.jpg",
  },
  {
    id: 7,
    title: "Sports Tech College",
    category: "Brand Identity",
    year: "2023",
    description: "Building a bold identity for Australia's premier sports tech institution.",
    image: "https://www.datocms-assets.com/105312/1695358032-01.jpg",
  },
  {
    id: 8,
    title: "Gami",
    category: "Brand + Retail",
    year: "2023",
    description: "A vibrant brand world for a beloved Korean fried chicken restaurant.",
    image: "https://www.datocms-assets.com/105312/1696499861-pg_gami.jpg",
  },
  {
    id: 9,
    title: "Terence Tan Neurosurgeon",
    category: "Brand Identity",
    year: "2024",
    description: "Precision and trust — a personal brand for a leading neurosurgeon.",
    image: "https://www.datocms-assets.com/105312/1721270647-tt2.png",
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
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 bg-[var(--surface)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          <p className="text-white text-sm text-center px-6 mb-4">{project.description}</p>
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/80">
            View Project <ArrowUpRight size={12} />
          </div>
        </motion.div>

        {/* Arrow chip */}
        <motion.div
          animate={{ x: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <ArrowUpRight size={16} className="text-black" />
        </motion.div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium" style={{ color: "var(--fg)" }}>
            {project.title}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
            {project.category}
          </p>
        </div>
        <span className="text-sm tabular-nums" style={{ color: "var(--muted)" }}>
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
        {/* Header */}
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
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
            href="https://playgroundstudio.com.au/work"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase pb-0.5 border-b self-start"
            style={{ color: "var(--fg)", borderColor: "var(--border)" }}
          >
            View all projects <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
