"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Real team leaders from playgroundstudio.com.au/team
const leaders = [
  {
    name: "Sally Dobell",
    role: "Owner & Director",
    initials: "SD",
    color: "#c8b49a",
  },
  {
    name: "Olivia Finlayson",
    role: "Head of Creative",
    initials: "OF",
    color: "#9aad9f",
  },
  {
    name: "Millie Romanin",
    role: "Managing Director",
    initials: "MR",
    color: "#a098ba",
  },
];

const values = [
  {
    label: "Design-led thinking",
    desc: "Every decision — strategic or executional — is guided by design-led thinking and original storytelling.",
  },
  {
    label: "Research-first",
    desc: "Everything draws from thoroughly researched and highly considered brand strategy before a single pixel is placed.",
  },
  {
    label: "Full-spectrum",
    desc: "From insights through to film — 20+ talented creatives, strategists and specialists under one roof.",
  },
  {
    label: "Work that moves you",
    desc: "We don't just deliver — we push for work that resonates, endures, and genuinely moves the people who see it.",
  },
];

export default function Team() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true });

  return (
    <section id="team" className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Team
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none"
            >
              Fiercely{" "}
              <span className="italic" style={{ color: "var(--accent)" }}>
                passionate
              </span>
              <br />
              people.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              A team of fiercely passionate people, led by the three you see here — with 20+ talented
              creatives, finance and account service experts, and Harvey, our studio hound.
            </motion.p>
          </div>
        </div>

        {/* Leadership cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          {leaders.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              {/* Avatar — placeholder with initials until real photos are added */}
              <div
                className="relative aspect-[3/4] rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: member.color }}
              >
                <span className="text-5xl font-light text-white/70 select-none">
                  {member.initials}
                </span>
                {/* Subtle hover shine */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)",
                  }}
                />
              </div>

              <h3 className="font-medium text-base" style={{ color: "var(--fg)" }}>
                {member.name}
              </h3>
              <p className="text-sm mt-0.5" style={{ color: "var(--accent)" }}>
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Culture / values block */}
        <div
          ref={valuesRef}
          className="rounded-3xl p-8 md:p-12"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={valuesInView ? { opacity: 1 } : {}}
            className="text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: "var(--accent)" }}
          >
            How We Work
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 24 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <h4 className="text-base font-medium mb-2" style={{ color: "var(--fg)" }}>
                  {v.label}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Join us call-out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={valuesInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 pt-8 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "var(--accent)" }}>
                Work With Us
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                We&apos;re always keen to meet new people. If you&apos;ve got skills, smarts and drive — reach out.
              </p>
            </div>
            <a
              href="mailto:hello@playgroundstudio.com.au?subject=Talent Enquiry"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase font-medium border transition-colors duration-200"
              style={{ borderColor: "var(--fg)", color: "var(--fg)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--fg)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)";
              }}
            >
              Send your CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
