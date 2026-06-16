"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 350, damping: 30 });
  const y = useSpring(rawY, { stiffness: 350, damping: 30 });

  const rx = useSpring(rawX, { stiffness: 80, damping: 20 });
  const ry = useSpring(rawY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    window.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll("a, button, [role=button]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [visible, rawX, rawY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 0 : 6,
          height: hovering ? 0 : 6,
          backgroundColor: "var(--accent)",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderColor: "var(--accent)",
          opacity: visible ? (hovering ? 0.6 : 0.4) : 0,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
