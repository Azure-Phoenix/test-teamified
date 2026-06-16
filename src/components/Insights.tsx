"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    id: 1,
    category: "Design Thinking",
    title: "Why your brand needs to move — literally",
    excerpt:
      "Static logos are a thing of the past. We break down why motion is now a core brand asset, not an afterthought.",
    date: "12 June 2025",
    readTime: "5 min read",
    color: "#1a1916",
  },
  {
    id: 2,
    category: "Strategy",
    title: "The anatomy of a brief that actually works",
    excerpt:
      "After hundreds of projects, we've learned what separates a brief that unlocks great work from one that kills it.",
    date: "28 May 2025",
    readTime: "4 min read",
    color: "#8a6fa0",
  },
  {
    id: 3,
    category: "Culture",
    title: "How we built a studio people actually want to work in",
    excerpt:
      "The intentional choices — big and small — that shape how Playground operates day to day.",
    date: "10 May 2025",
    readTime: "6 min read",
    color: "#8aad9f",
  },
];

export default function Insights() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true });

  return (
    <section
      id="insights"
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Insights
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none"
            >
              Ideas worth
              <br />
              <span className="italic" style={{ color: "var(--accent)" }}>
                sharing.
              </span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            href="#"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase pb-0.5 border-b self-start md:self-auto"
            style={{ color: "var(--fg)", borderColor: "var(--border)" }}
          >
            All articles <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              {/* Colour block */}
              <div
                className="relative aspect-[16/9] rounded-xl mb-5 overflow-hidden flex items-end p-5"
                style={{ backgroundColor: post.color }}
              >
                <span
                  className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm"
                >
                  {post.category}
                </span>
                <motion.div
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
                  whileHover={{ scale: 1.15 }}
                >
                  <ArrowUpRight size={14} />
                </motion.div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {post.date}
                </span>
                <span style={{ color: "var(--border)" }}>·</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {post.readTime}
                </span>
              </div>

              <h3
                className="text-lg font-medium leading-snug mb-2 group-hover:underline underline-offset-4 transition-all"
                style={{ color: "var(--fg)" }}
              >
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
