import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, TriangleAlert, MessageCircleQuestion } from "lucide-react";
import { CENTURIES, STATUS_LABELS, TIMELINE } from "@/data/history";
import type { FactStatus, TimelineEvent } from "@/data/history";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./Reveal";

const STATUS_STYLE: Record<FactStatus, string> = {
  verified: "border-emerald-700/50 bg-emerald-950/50 text-emerald-300",
  debated: "border-amber-700/50 bg-[#3B2807] text-gold-soft",
  "needs-check": "border-red-800/50 bg-red-950/50 text-red-300",
};

function StatusBadge({ status, testId }: { status: FactStatus; testId: string }) {
  const Icon = status === "verified" ? ShieldCheck : status === "debated" ? MessageCircleQuestion : TriangleAlert;
  return (
    <span
      data-testid={testId}
      className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", STATUS_STYLE[status])}
    >
      <Icon className="h-3.5 w-3.5" />
      {STATUS_LABELS[status]}
    </span>
  );
}

function EventDetails({
  ev,
  index,
  onStep,
}: {
  ev: TimelineEvent;
  index: number;
  onStep: (i: number) => void;
}) {
  const [sourcesOpen, setSourcesOpen] = useState(true);
  return (
    <motion.div
      key="details"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      className="overflow-hidden"
    >
      <div data-testid={`timeline-event-details-${ev.id}`} className="space-y-6 border-t border-line pt-6">
        <div className={cn("grid gap-6", ev.image && "md:grid-cols-5")}>
          <div className={cn("space-y-4 text-[15px] leading-relaxed text-slate-300", ev.image && "md:col-span-3")}>
            {ev.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {ev.image && (
            <figure className="overflow-hidden rounded-xl border border-line md:col-span-2">
              <img
                src={ev.image.src}
                alt={ev.image.alt}
                loading="lazy"
                data-testid={`timeline-event-image-${ev.id}`}
                className="h-48 w-full object-cover md:h-full"
              />
            </figure>
          )}
        </div>

        {ev.statusNote && (
          <div
            data-testid={`timeline-status-note-${ev.id}`}
            className="flex gap-3 rounded-lg border border-amber-800/40 bg-[#3B2807]/40 p-4 text-sm text-gold-soft"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{ev.statusNote}</p>
          </div>
        )}

        <div className="rounded-xl border border-line bg-[#1A2232]">
          <button
            type="button"
            data-testid={`timeline-source-btn-${ev.id}`}
            aria-expanded={sourcesOpen}
            aria-label="Розгорнути джерела"
            onClick={() => setSourcesOpen((v) => !v)}
            className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-3 text-left focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          >
            <span className="flex items-center gap-2 font-heading text-base font-semibold">
              <BookOpen className="h-4 w-4 text-gold" /> Джерела
              <span className="font-mono text-xs text-muted-foreground">({ev.sources.length})</span>
            </span>
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", sourcesOpen && "rotate-180")} />
          </button>
          <AnimatePresence initial={false}>
            {sourcesOpen && (
              <motion.ol
                data-testid={`timeline-sources-list-${ev.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-t border-line"
              >
                {ev.sources.map((s, i) => (
                  <li key={s.url} className="border-l-2 border-sky-500/60 px-4 py-3 not-last:border-b not-last:border-b-line">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`timeline-source-link-${ev.id}-${i}`}
                      className="group flex items-start justify-between gap-3 text-sm"
                    >
                      <span>
                        <span className="text-foreground transition-colors duration-200 group-hover:text-amber-300">
                          {s.title}
                        </span>
                        <span className="block text-xs text-muted-foreground">{s.publisher}</span>
                      </span>
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-amber-300" />
                    </a>
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            data-testid="timeline-prev-btn"
            aria-label="Попередня подія"
            disabled={index === 0}
            onClick={() => onStep(index - 1)}
            className="inline-flex h-11 items-center gap-1.5 rounded-md border border-line px-4 text-sm transition-colors duration-200 hover:border-gold/60 hover:text-gold-soft disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Попередня
          </button>
          <span data-testid="timeline-step-counter" className="font-mono text-xs text-muted-foreground">
            {index + 1} / {TIMELINE.length}
          </span>
          <button
            type="button"
            data-testid="timeline-next-btn"
            aria-label="Наступна подія"
            disabled={index === TIMELINE.length - 1}
            onClick={() => onStep(index + 1)}
            className="inline-flex h-11 items-center gap-1.5 rounded-md border border-line px-4 text-sm transition-colors duration-200 hover:border-gold/60 hover:text-gold-soft disabled:pointer-events-none disabled:opacity-40"
          >
            Наступна <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const [active, setActive] = useState<number | null>(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const activeCentury = active === null ? null : TIMELINE[active].century;

  const goTo = (i: number) => {
    setActive(i);
    window.setTimeout(() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" }), 380);
  };

  return (
    <section id="timeline" className="relative border-t border-line/60 bg-[#0D1118] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Зала II · Хронограф"
          title="Тисячоліття в семи подіях"
          lead="Розгорніть подію, щоб прочитати повний текст і перевірити джерела. Позначки показують, де факт підтверджено, а де тривають наукові дискусії."
          testId="timeline-title"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Перейти до століття
              </p>
              <div
                data-testid="timeline-century-nav"
                className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
              >
                {CENTURIES.map((c) => {
                  const idx = TIMELINE.findIndex((e) => e.century === c);
                  const on = activeCentury === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      data-testid={`timeline-century-${idx}`}
                      onClick={() => goTo(idx)}
                      className={cn(
                        "min-h-11 shrink-0 rounded-md border px-4 py-2 text-left font-mono text-sm transition-[color,background-color,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none",
                        on
                          ? "border-gold/70 bg-gold/10 text-gold-soft"
                          : "border-line text-muted-foreground hover:border-gold/40 hover:text-foreground",
                      )}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <ol className="relative space-y-5 lg:col-span-9">
            <span className="absolute top-2 bottom-2 left-[19px] w-px bg-gradient-to-b from-gold/60 via-line to-line sm:left-[23px]" />
            {TIMELINE.map((ev, i) => {
              const open = active === i;
              return (
                <li
                  key={ev.id}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="relative scroll-mt-24 pl-12 sm:pl-16"
                >
                  <span
                    className={cn(
                      "absolute top-6 left-[12px] h-4 w-4 rounded-full border-2 transition-[background-color,transform] duration-300 sm:left-[16px]",
                      open ? "scale-125 border-gold bg-gold" : "border-gold/70 bg-museum",
                    )}
                  />
                  <Reveal delay={Math.min(i * 0.04, 0.2)}>
                    <article
                      data-testid={`timeline-event-card-${ev.id}`}
                      className={cn(
                        "rounded-2xl border bg-exhibit p-5 transition-[border-color,box-shadow,transform] duration-300 sm:p-7",
                        open
                          ? "border-gold/50 shadow-[0_10px_40px_rgba(229,169,60,0.08)]"
                          : "border-line hover:-translate-y-0.5 hover:border-gold/30",
                      )}
                    >
                      <button
                        type="button"
                        data-testid={`timeline-event-toggle-${ev.id}`}
                        aria-expanded={open}
                        onClick={() => setActive(open ? null : i)}
                        className="block w-full text-left focus-visible:outline-none"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-sm font-bold text-gold">{ev.year}</span>
                          <StatusBadge status={ev.status} testId={`timeline-status-${ev.id}`} />
                        </div>
                        <div className="mt-3 flex items-start justify-between gap-4">
                          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{ev.title}</h3>
                          <ChevronDown
                            className={cn(
                              "mt-1.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                              open && "rotate-180 text-gold",
                            )}
                          />
                        </div>
                        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{ev.summary}</p>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <div className="mt-6">
                            <EventDetails ev={ev} index={i} onStep={goTo} />
                          </div>
                        )}
                      </AnimatePresence>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
