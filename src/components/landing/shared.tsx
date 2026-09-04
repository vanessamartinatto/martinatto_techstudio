"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  label,
  title,
  center = false,
}: {
  label: string;
  title: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-sky-600 md:text-sm">
        {"// "}
        {label}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
