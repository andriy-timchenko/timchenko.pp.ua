import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { AREA, IMAGES } from "@/data/history";

const fmt = (n: number) => n.toLocaleString("uk-UA");

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduce]);
  return value;
}

function AreaBar({
  label,
  value,
  max,
  tone,
  testId,
  start,
}: {
  label: string;
  value: string;
  max: number;
  tone: string;
  testId: string;
  start: boolean;
}) {
  return (
    <div className="space-y-2" data-testid={testId}>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-panel">
        <motion.div
          className={`h-full rounded-full ${tone}`}
          initial={{ width: 0 }}
          animate={{ width: start ? `${max}%` : 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const rusMax = useCountUp(AREA.rusMax, inView);
  const ua = useCountUp(AREA.ukraine, inView);
  const ratio = (AREA.rusMax / AREA.ukraine).toFixed(1).replace(".", ",");

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% -10%, rgba(229,169,60,0.16), rgba(11,14,20,0) 70%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <motion.div
          className="space-y-8 lg:col-span-6 lg:pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1
            data-testid="hero-title"
            className="text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Русь — це <span className="gold-text animate-shimmer italic">Київ</span>.
            <br />
            Історія України
            <br />
            мовою джерел.
          </h1>
          <p data-testid="hero-lead" className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Факти про справжні витоки держави, її культуру та європейське коріння. До кожної події в
            хронології додано літописи й енциклопедичні джерела, а спірні твердження чесно позначено.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#timeline"
              data-testid="hero-timeline-btn"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-gold px-6 font-semibold text-black transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(229,169,60,0.25)]"
            >
              Відкрити хронологію <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#comparison"
              data-testid="hero-comparison-btn"
              className="inline-flex h-12 items-center rounded-md border border-line px-6 text-foreground transition-colors duration-200 hover:border-gold/60 hover:text-gold-soft"
            >
              Київ і Москва
            </a>
          </div>
        </motion.div>

        <motion.div
          id="territory"
          ref={ref}
          data-testid="area-comparison-card"
          className="relative lg:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gold/5 blur-2xl" />
          <figure className="overflow-hidden rounded-2xl border border-line bg-exhibit shadow-2xl">
            <div className="group relative overflow-hidden">
              <img
                src={IMAGES.map}
                alt="Карта Київської Русі від Чорного до Балтійського моря"
                width={1475}
                height={1200}
                data-testid="hero-map-image"
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-exhibit via-exhibit/10 to-transparent" />
              <figcaption className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-soft">
                Київська Русь, XI–XII ст.
              </figcaption>
            </div>
            <div className="space-y-6 p-6 sm:p-7">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Площа Київської Русі</p>
                  <p data-testid="area-rus-value" className="font-heading text-3xl font-semibold sm:text-4xl">
                    до {fmt(rusMax)} <span className="text-lg text-muted-foreground">км²</span>
                  </p>
                </div>
                <span
                  data-testid="area-ratio-badge"
                  className="rounded-full border border-amber-700/50 bg-[#3B2807] px-3 py-1 font-mono text-xs text-gold-soft"
                >
                  ≈ у {ratio} раза більша за сучасну Україну
                </span>
              </div>
              <div className="space-y-4">
                <AreaBar
                  label="Київська Русь (макс.)"
                  value={`${fmt(AREA.rusMin)} — ${fmt(AREA.rusMax)} км²`}
                  max={100}
                  tone="bg-gradient-to-r from-amber-700 to-gold"
                  testId="area-bar-rus"
                  start={inView}
                />
                <AreaBar
                  label="Сучасна Україна"
                  value={`${fmt(ua)} км²`}
                  max={(AREA.ukraine / AREA.rusMax) * 100}
                  tone="bg-gradient-to-r from-sky-600 to-azure"
                  testId="area-bar-ukraine"
                  start={inView}
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Держава простягалася від Чорного моря до Балтійського та Білого морів. Площу наведено за
                різними оцінками для періоду найбільшого розширення.
              </p>
            </div>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
