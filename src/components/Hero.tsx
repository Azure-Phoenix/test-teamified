"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";

const disciplines = ["Design.", "Motion.", "Brand.", "Strategy.", "Change."];
const longestDiscipline = disciplines.reduce((a, b) => (a.length > b.length ? a : b));

function TickerWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % disciplines.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block">
      <span className="invisible whitespace-nowrap">{longestDiscipline}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 flex items-center whitespace-nowrap"
        >
          {disciplines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── Cloud + smoke shader ─────────────────────────────────────────────────────

const VS = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FS = `
precision highp float;
uniform float uTime;
uniform vec2  uRes;
uniform float uDark;   // 1.0 = dark mode, 0.0 = light mode

mat2 rot2(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i),               hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0,1.0)), hash21(i + vec2(1.0,1.0)), f.x),
    f.y
  );
}

// Standard fbm — wispy smoke tendrils
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 7; i++) {
    v += a * noise(p);
    p  = rot2(0.42) * p * 2.05;
    a *= 0.50;
  }
  return v;
}

// Billow fbm — puffy, rounded cloud masses
float billow(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    float n = noise(p) * 2.0 - 1.0;
    v += a * (1.0 - abs(n));   // abs inversion creates billowing peaks
    p  = rot2(0.30) * p * 2.0;
    a *= 0.55;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  uv.y = 1.0 - uv.y;

  float t     = uTime * 0.22;
  vec2  drift = vec2(t * 0.04, -t * 0.07);

  // domain warp: two layers of fbm distort the space
  vec2 q = vec2(
    fbm(uv * 1.3 + drift),
    fbm(uv * 1.3 + vec2(4.1, 2.3) + drift)
  );
  vec2 r = vec2(
    fbm(uv * 1.1 + 0.9 * q + vec2(1.7, 9.2) + drift * 1.3),
    fbm(uv * 1.1 + 0.9 * q + vec2(8.3, 2.8) + drift * 1.1)
  );

  // cloud mass (puffy) + smoke wisps (fine)
  float cloud = billow(uv * 1.0 + 0.5 * q + drift * 0.6);
  float wisp  = fbm(uv  * 2.8 + 1.4 * r + drift * 1.5 + t * 0.08);

  // blend: clouds are dominant form, wisps trail off them
  float density = cloud * 0.62 + wisp * 0.38;

  // --- Theme-aware palette ---
  vec3 cloudLight_dark  = vec3(0.90, 0.88, 0.85);
  vec3 smokeMid_dark    = vec3(0.62, 0.60, 0.57);
  vec3 deep_dark        = vec3(0.30, 0.28, 0.25);

  vec3 cloudLight_light = vec3(0.22, 0.20, 0.18);
  vec3 smokeMid_light   = vec3(0.40, 0.38, 0.35);
  vec3 deep_light       = vec3(0.58, 0.55, 0.52);

  vec3 cCloud  = mix(cloudLight_light, cloudLight_dark, uDark);
  vec3 cSmoke  = mix(smokeMid_light,   smokeMid_dark,   uDark);
  vec3 cDeep   = mix(deep_light,       deep_dark,       uDark);
  vec3 cAccent = vec3(0.91, 0.27, 0.04);

  vec3 col = mix(cDeep,  cSmoke, clamp(density * 1.5,        0.0, 1.0));
  col      = mix(col,    cCloud, clamp(cloud   * 2.2 - 0.4,  0.0, 1.0));
  col      = mix(col, cAccent, clamp((1.0 - cloud) * length(q) * 0.14, 0.0, 1.0));

  // --- Natural organic mask ---
  // Use low-freq noise to wobble the left boundary so it's never a hard
  // geometric line — gives cloud tendrils an irregular, organic edge.
  // The LEFT side (text area) stays protected: smoke only really lives
  // in the right 50-55% of the hero so it never competes with text.
  float boundaryNoise = fbm(vec2(uv.y * 1.8 + t * 0.06, t * 0.04)) * 0.10;
  float sideFade = smoothstep(0.40 - boundaryNoise, 0.68 - boundaryNoise, uv.x);

  // Soft vertical fade — smoke thins near very top/bottom edges only
  float vert = smoothstep(0.0, 0.10, uv.y) * smoothstep(0.0, 0.10, 1.0 - uv.y);

  // Let the noise density itself define the organic cloud shape —
  // no geometric cone, the fbm blobs are the shape.
  float alpha = clamp(density * 0.72, 0.0, 1.0) * sideFade * vert;

  gl_FragColor = vec4(col, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (
      canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false }) ??
      canvas.getContext("experimental-webgl", { alpha: true, premultipliedAlpha: false })
    ) as WebGLRenderingContext | null;
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes  = gl.getUniformLocation(prog, "uRes");
    const uDark = gl.getUniformLocation(prog, "uDark");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const draw = () => {
      const isDark = document.documentElement.classList.contains("dark") ? 1.0 : 0.0;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uDark, isDark);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ─── Floating orb ─────────────────────────────────────────────────────────────

function FloatingOrb({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: size, height: size,
        background: "var(--accent)",
        filter: "blur(100px)",
        opacity: 0.06,
      }}
      animate={{ scale: [1, 1.4, 1], opacity: [0.04, 0.1, 0.04] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
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
      {/* Background layers */}
      <FloatingOrb x="5%" y="15%" size={500} delay={0} />
      <FloatingOrb x="65%" y="55%" size={350} delay={2.5} />
      <FloatingOrb x="75%" y="5%" size={250} delay={4.5} />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      {/* Smoke shader — full hero canvas, fades in from right */}
      <SmokeCanvas />

      {/* Text content */}
      <motion.div
        style={{ y, opacity, position: "relative", zIndex: 2 }}
        className="relative px-6 md:px-10 max-w-7xl mx-auto w-full"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs tracking-[0.35em] uppercase mb-6"
          style={{ color: "var(--accent)" }}
        >
          Sydney — Design-Led Studio
        </motion.p>

        {/* Hello */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-[clamp(1rem,2vw,1.25rem)] tracking-[0.2em] uppercase font-light mb-2"
          style={{ color: "var(--muted)" }}
        >
          Hello
        </motion.p>

        {/* Headline */}
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
          {/* Body copy */}
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

          {/* Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center gap-3 text-sm shrink-0"
            style={{ color: "var(--muted)" }}
          >
            <span className="tracking-widest uppercase text-xs">We do</span>
            <span className="text-base font-medium" style={{ color: "var(--fg)" }}>
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
            <ArrowDown size={13} className="transition-transform duration-300 group-hover:translate-y-1" />
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
        style={{ color: "var(--muted)", zIndex: 2 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={15} />
        </motion.div>
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
