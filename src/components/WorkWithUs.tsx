"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, MapPin, Mail, Phone } from "lucide-react";

const steps = [
  {
    id: 1,
    question: "What are you looking for?",
    type: "choice" as const,
    options: [
      { label: "Insights & Strategy", icon: "◈" },
      { label: "Creative & Branding", icon: "✦" },
      { label: "Digital & Social", icon: "⊕" },
      { label: "3D, Motion & Video", icon: "◎" },
      { label: "Something else", icon: "?" },
    ],
  },
  {
    id: 2,
    question: "What's your timeline?",
    type: "choice" as const,
    options: [
      { label: "ASAP — I needed this yesterday", icon: "⚡" },
      { label: "Within 1–2 months", icon: "→" },
      { label: "3–6 months out", icon: "◷" },
      { label: "Still in early planning", icon: "○" },
    ],
  },
  {
    id: 3,
    question: "Tell us about your project",
    type: "text" as const,
    placeholder:
      "Tell us what you're building, who it's for, and what success looks like for you...",
  },
  {
    id: 4,
    question: "How do we reach you?",
    type: "contact" as const,
    fields: [
      { name: "name", label: "Your name", placeholder: "Jane Smith", required: true },
      { name: "email", label: "Email address", placeholder: "jane@company.com", required: true },
      { name: "company", label: "Company / Organisation", placeholder: "Acme Co.", required: false },
    ],
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
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

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setStep((s) => Math.min(Math.max(s + dir, 0), steps.length - 1));
  };

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectOption = (label: string) => {
    setAnswers((a) => ({ ...a, [current.id]: label }));
    if (step < steps.length - 1) {
      // Cancel any pending advance so rapid clicks don't stack up go(1) calls
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => go(1), 220);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnswers((a) => ({ ...a, [current.id]: contactValues }));
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Contact
          </p>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none">
            Let&apos;s make
            <br />
            <span className="italic" style={{ color: "var(--accent)" }}>
              something great.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
          {/* Left — real contact info + description */}
          <div>
            <p className="text-sm leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
              If you&apos;re a business owner with a burning question about your brand or strategy, or you
              simply want to know more about what we do and how we do it, don&apos;t hesitate to get in
              touch.
            </p>

            <div className="space-y-5 mb-10">
              <a
                href="https://maps.google.com/?q=23+Union+Street,+South+Melbourne+VIC+3205"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 transition-colors"
                  style={{ color: "var(--accent)" }}
                />
                <span
                  className="text-sm leading-relaxed group-hover:underline underline-offset-4"
                  style={{ color: "var(--fg)" }}
                >
                  23 Union Street
                  <br />
                  South Melbourne 3205 VIC
                </span>
              </a>
              <a
                href="mailto:hello@playgroundstudio.com.au"
                className="flex items-center gap-3 group"
              >
                <Mail size={15} className="shrink-0" style={{ color: "var(--accent)" }} />
                <span
                  className="text-sm group-hover:underline underline-offset-4"
                  style={{ color: "var(--fg)" }}
                >
                  hello@playgroundstudio.com.au
                </span>
              </a>
              <a href="tel:+61419248668" className="flex items-center gap-3 group">
                <Phone size={15} className="shrink-0" style={{ color: "var(--accent)" }} />
                <span
                  className="text-sm group-hover:underline underline-offset-4"
                  style={{ color: "var(--fg)" }}
                >
                  +61 419 248 668
                </span>
              </a>
            </div>

            <div className="pt-8 border-t" style={{ borderColor: "var(--border)" }}>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "var(--accent)" }}
              >
                Join the team
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                We&apos;re always keen to meet new people and welcome fresh talent. If you&apos;ve got skills,
                smarts and drive, send us your CV and/or portfolio.
              </p>
              <a
                href="mailto:hello@playgroundstudio.com.au?subject=Talent Enquiry"
                className="text-sm tracking-widest uppercase underline underline-offset-4"
                style={{ color: "var(--fg)" }}
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Right — animated multi-step enquiry form */}
          <div
            className="rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{ backgroundColor: "var(--surface)" }}
          >
            <AnimatePresence mode="wait" custom={direction}>
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
                    transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <Check size={28} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-light mb-3" style={{ color: "var(--fg)" }}>
                    Message sent!
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted)" }}>
                    Thanks for reaching out. We&apos;ll be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Step progress dots */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "var(--muted)" }}
                    >
                      {step + 1} / {steps.length}
                    </span>
                    <div className="flex gap-1.5">
                      {steps.map((_, i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full transition-all duration-400"
                          style={{
                            width: i === step ? 20 : 6,
                            backgroundColor:
                              i <= step ? "var(--accent)" : "var(--border)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <h3
                    className="text-xl md:text-2xl font-light mb-6"
                    style={{ color: "var(--fg)" }}
                  >
                    {current.question}
                  </h3>

                  {/* Choice step */}
                  {current.type === "choice" && (
                    <div className="space-y-2.5">
                      {current.options?.map((opt) => {
                        const selected = answers[current.id] === opt.label;
                        return (
                          <button
                            key={opt.label}
                            onClick={() => selectOption(opt.label)}
                            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all duration-200"
                            style={{
                              borderColor: selected ? "var(--accent)" : "var(--border)",
                              backgroundColor: selected ? "var(--accent)" : "transparent",
                              color: selected ? "#fff" : "var(--fg)",
                            }}
                          >
                            <span className="w-5 text-center text-base leading-none">
                              {opt.icon}
                            </span>
                            <span className="text-sm flex-1">{opt.label}</span>
                            {selected && <Check size={13} />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Text step */}
                  {current.type === "text" && (
                    <textarea
                      value={textValue}
                      onChange={(e) => {
                        setTextValue(e.target.value);
                        setAnswers((a) => ({ ...a, [current.id]: e.target.value }));
                      }}
                      placeholder={current.placeholder}
                      rows={5}
                      className="w-full rounded-xl border px-4 py-3 text-sm resize-none outline-none transition-all"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "var(--bg)",
                        color: "var(--fg)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  )}

                  {/* Contact step */}
                  {current.type === "contact" && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {current.fields?.map((field) => (
                        <div key={field.name}>
                          <label
                            className="block text-[11px] tracking-widest uppercase mb-1.5"
                            style={{ color: "var(--muted)" }}
                          >
                            {field.label}
                            {field.required && (
                              <span style={{ color: "var(--accent)" }}> *</span>
                            )}
                          </label>
                          <input
                            type={field.name === "email" ? "email" : "text"}
                            placeholder={field.placeholder}
                            required={field.required}
                            value={contactValues[field.name] ?? ""}
                            onChange={(e) =>
                              setContactValues((v) => ({
                                ...v,
                                [field.name]: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                            style={{
                              borderColor: "var(--border)",
                              backgroundColor: "var(--bg)",
                              color: "var(--fg)",
                            }}
                            onFocus={(e) =>
                              (e.currentTarget.style.borderColor = "var(--accent)")
                            }
                            onBlur={(e) =>
                              (e.currentTarget.style.borderColor = "var(--border)")
                            }
                          />
                        </div>
                      ))}
                      <button
                        type="submit"
                        className="w-full mt-2 py-3.5 rounded-xl text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                      >
                        Send Enquiry <ArrowRight size={13} />
                      </button>
                      <div className="flex justify-between mt-8">
                        <button
                          type="button"
                          onClick={() => go(-1)}
                          className="flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity"
                          style={{ color: "var(--muted)" }}
                        >
                          <ArrowLeft size={13} /> Back
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Prev / Next navigation (hidden on contact step which has its own submit) */}
                  {current.type !== "contact" && (
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => go(-1)}
                        disabled={step === 0}
                        className="flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity disabled:opacity-30"
                        style={{ color: "var(--muted)" }}
                      >
                        <ArrowLeft size={13} /> Back
                      </button>
                      <button
                        onClick={() => go(1)}
                        className="flex items-center gap-2 text-xs tracking-widest uppercase"
                        style={{ color: answers[current.id] ? "var(--fg)" : "var(--muted)" }}
                      >
                        Next <ArrowRight size={13} />
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
