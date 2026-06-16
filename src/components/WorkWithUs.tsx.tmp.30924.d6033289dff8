"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

const steps = [
  {
    id: 1,
    question: "What are you looking for?",
    type: "choice" as const,
    options: [
      { label: "Brand Identity", icon: "✦" },
      { label: "Motion & 3D", icon: "◎" },
      { label: "Communications", icon: "✉" },
      { label: "Digital & Social", icon: "⊕" },
      { label: "Something else", icon: "?" },
    ],
  },
  {
    id: 2,
    question: "What's your timeline?",
    type: "choice" as const,
    options: [
      { label: "ASAP — I need this yesterday", icon: "⚡" },
      { label: "Within 1–2 months", icon: "📅" },
      { label: "3–6 months out", icon: "🗓" },
      { label: "Still in early planning", icon: "💭" },
    ],
  },
  {
    id: 3,
    question: "Tell us about your project",
    type: "text" as const,
    placeholder:
      "Describe what you're building, who it's for, and what success looks like...",
  },
  {
    id: 4,
    question: "How do we reach you?",
    type: "contact" as const,
    fields: [
      { name: "name", label: "Your name", placeholder: "Alex Smith" },
      { name: "email", label: "Email address", placeholder: "alex@company.com" },
      { name: "company", label: "Company / Organisation", placeholder: "Acme Co." },
    ],
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function WorkWithUs() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [contactValues, setContactValues] = useState<Record<string, string>>({});

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setStep((s) => Math.min(Math.max(s + dir, 0), steps.length - 1));
  };

  const selectOption = (label: string) => {
    setAnswers((a) => ({ ...a, [current.id]: label }));
    if (step < steps.length - 1) {
      setTimeout(() => go(1), 200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnswers((a) => ({ ...a, [current.id]: contactValues }));
    setSubmitted(true);
  };

  const sectionRef = useRef(null);

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--accent)" }}>
            Work With Us
          </p>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none">
            Let's make
            <br />
            <span className="italic" style={{ color: "var(--accent)" }}>
              something great.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
          {/* Left — info */}
          <div>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              We take on a select number of projects at a time to ensure every client gets our full
              attention. Tell us what you're working on and we'll be in touch within 24 hours.
            </p>
            <div className="space-y-4">
              {[
                "Brand strategy & identity",
                "Motion & 3D production",
                "Campaign communications",
                "Digital & social media",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <Check size={10} className="text-white" />
                  </div>
                  <span className="text-sm" style={{ color: "var(--fg)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
                Or reach us directly
              </p>
              <a
                href="mailto:hello@playgroundstudio.com.au"
                className="text-sm hover:underline underline-offset-4 transition-all"
                style={{ color: "var(--fg)" }}
              >
                hello@playgroundstudio.com.au
              </a>
            </div>
          </div>

          {/* Right — multi-step form */}
          <div
            className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{ backgroundColor: "var(--surface)" }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <Check size={28} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-light mb-3" style={{ color: "var(--fg)" }}>
                    We've got it!
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    Thanks for reaching out. Expect to hear from us within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
                      Step {step + 1} of {steps.length}
                    </span>
                    <div className="flex gap-1">
                      {steps.map((_, i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full transition-all duration-500"
                          style={{
                            width: i === step ? 24 : 8,
                            backgroundColor: i <= step ? "var(--accent)" : "var(--border)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-light mb-6" style={{ color: "var(--fg)" }}>
                    {current.question}
                  </h3>

                  {/* Choice step */}
                  {current.type === "choice" && (
                    <div className="space-y-3">
                      {current.options?.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => selectOption(opt.label)}
                          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all duration-200"
                          style={{
                            borderColor: answers[current.id] === opt.label ? "var(--accent)" : "var(--border)",
                            backgroundColor: answers[current.id] === opt.label ? "var(--accent)" : "transparent",
                            color: answers[current.id] === opt.label ? "#fff" : "var(--fg)",
                          }}
                        >
                          <span className="w-6 text-center">{opt.icon}</span>
                          <span className="text-sm">{opt.label}</span>
                          {answers[current.id] === opt.label && (
                            <Check size={14} className="ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Text step */}
                  {current.type === "text" && (
                    <div>
                      <textarea
                        value={textValue}
                        onChange={(e) => {
                          setTextValue(e.target.value);
                          setAnswers((a) => ({ ...a, [current.id]: e.target.value }));
                        }}
                        placeholder={current.placeholder}
                        rows={5}
                        className="w-full rounded-xl border px-4 py-3 text-sm resize-none outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor: "var(--bg)",
                          color: "var(--fg)",
                        }}
                      />
                    </div>
                  )}

                  {/* Contact step */}
                  {current.type === "contact" && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {current.fields?.map((field) => (
                        <div key={field.name}>
                          <label
                            className="block text-xs tracking-wide uppercase mb-1.5"
                            style={{ color: "var(--muted)" }}
                          >
                            {field.label}
                          </label>
                          <input
                            type={field.name === "email" ? "email" : "text"}
                            placeholder={field.placeholder}
                            required={field.name !== "company"}
                            value={contactValues[field.name] ?? ""}
                            onChange={(e) =>
                              setContactValues((v) => ({ ...v, [field.name]: e.target.value }))
                            }
                            className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 transition-all"
                            style={{
                              borderColor: "var(--border)",
                              backgroundColor: "var(--bg)",
                              color: "var(--fg)",
                            }}
                          />
                        </div>
                      ))}
                      <button
                        type="submit"
                        className="w-full mt-2 py-3.5 rounded-xl text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 transition-all"
                        style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                      >
                        Send It <ArrowRight size={14} />
                      </button>
                    </form>
                  )}

                  {/* Navigation */}
                  {current.type !== "contact" && (
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => go(-1)}
                        disabled={step === 0}
                        className="flex items-center gap-2 text-sm transition-opacity disabled:opacity-30"
                        style={{ color: "var(--muted)" }}
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button
                        onClick={() => go(1)}
                        className="flex items-center gap-2 text-sm transition-colors"
                        style={{ color: answers[current.id] ? "var(--fg)" : "var(--muted)" }}
                      >
                        {step === steps.length - 1 ? "Review" : "Next"} <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
