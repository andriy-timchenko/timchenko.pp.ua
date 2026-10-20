import { useState } from "react";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { IMAGES } from "@/data/history";
import { Reveal, SectionHeading } from "./Reveal";

const EXHIBITS = [
  {
    id: "kyiv-moscow",
    src: IMAGES.kyivMoscow,
    title: "Київ і Москва: порівняння",
    caption:
      "Поки в Києві X–XII ст. зводили кам'яні собори, на місці майбутньої Москви були ліси та болота.",
    width: 680,
    height: 489,
  },
  {
    id: "muscovy-1471",
    src: IMAGES.muscovy1471,
    title: "Московія у 1471 році",
    caption:
      "Московське князівство в другій половині XV ст. — ще до того, як воно присвоїло собі назву «Росія».",
    width: 680,
    height: 380,
  },
];

const ROWS = [
  { kyiv: "482 р. — традиційна дата заснування", moscow: "1147 р. — перша згадка в літописі" },
  { kyiv: "989–996 рр. — Десятинна церква, перший кам'яний храм", moscow: "1156 р. — перші дерев'яні укріплення" },
  { kyiv: "XI ст. — Софія Київська, бібліотека Ярослава Мудрого", moscow: "XIV ст. — піднесення як столиці удільного князівства" },
  { kyiv: "1051 р. — заснування Києво-Печерської лаври", moscow: "1721 р. — проголошення Російської імперії" },
];

export default function Comparison() {
  const [open, setOpen] = useState<(typeof EXHIBITS)[number] | null>(null);

  return (
    <section id="comparison" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Зала III · Порівняння"
          title="Київ і Москва: хто кому старший"
          lead="Київ був столицею Русі за сотні років до першої згадки про Москву. Порівняйте ключові віхи та історичні карти."
          testId="comparison-title"
        />

        <div data-testid="comparison-gallery" className="mt-12 grid gap-6 md:grid-cols-12">
          {EXHIBITS.map((ex, i) => (
            <Reveal key={ex.id} delay={i * 0.1} className={i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-16"}>
              <figure className="group overflow-hidden rounded-2xl border border-line bg-exhibit">
                <button
                  type="button"
                  data-testid={`comparison-open-${ex.id}`}
                  aria-label={`Збільшити: ${ex.title}`}
                  onClick={() => setOpen(ex)}
                  className="relative block w-full overflow-hidden bg-black/40 p-3"
                >
                  <img
                    src={ex.src}
                    alt={ex.title}
                    width={ex.width}
                    height={ex.height}
                    loading="lazy"
                    className="h-auto w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-museum/80 text-gold-soft opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </button>
                <figcaption className="space-y-1.5 p-5">
                  <h3 data-testid={`comparison-caption-${ex.id}`} className="text-xl font-semibold">
                    {ex.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{ex.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div data-testid="comparison-table" className="overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-2 bg-panel">
              <p className="border-r border-line px-5 py-4 font-heading text-lg font-semibold text-gold-soft">Київ</p>
              <p className="px-5 py-4 font-heading text-lg font-semibold text-muted-foreground">Москва</p>
            </div>
            {ROWS.map((r, i) => (
              <div key={i} data-testid={`comparison-row-${i}`} className="grid grid-cols-2 border-t border-line text-sm">
                <p className="border-r border-line px-5 py-4 leading-relaxed text-foreground">{r.kyiv}</p>
                <p className="px-5 py-4 leading-relaxed text-muted-foreground">{r.moscow}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent data-testid="comparison-lightbox" className="max-w-4xl border-line bg-exhibit sm:max-w-4xl">
          {open && (
            <>
              <DialogTitle className="font-heading text-xl">{open.title}</DialogTitle>
              <DialogDescription>{open.caption}</DialogDescription>
              <img src={open.src} alt={open.title} className="max-h-[70vh] w-full rounded-lg object-contain" />
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
