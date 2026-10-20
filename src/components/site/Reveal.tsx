import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  testId,
}: {
  kicker: string;
  title: string;
  lead?: string;
  testId: string;
}) {
  return (
    <Reveal className="max-w-3xl space-y-4">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">{kicker}</p>
      <h2 data-testid={testId} className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>}
    </Reveal>
  );
}
