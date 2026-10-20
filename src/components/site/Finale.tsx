import { ArrowUpRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { SUPPORT_LINKS } from "@/data/history";
import { Reveal } from "./Reveal";
import { Trident } from "./Header";

async function share() {
  const url = window.location.origin + import.meta.env.BASE_URL;
  const data = { title: "Історія України — факти з джерелами", url };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success("Посилання скопійовано", { description: "Поділіться правдою про історію України." });
  } catch {
    toast.error("Не вдалося поділитися. Скопіюйте адресу з рядка браузера.");
  }
}

export default function Finale() {
  return (
    <section id="finale" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(229,169,60,0.12), transparent 70%)" }}
      />
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="space-y-8">
          <Trident className="h-14 w-11 animate-float-slow text-gold" />
          <blockquote
            data-testid="finale-quote"
            className="font-heading text-2xl leading-snug font-medium italic sm:text-4xl"
          >
            «Для українців, на відміну від ворога, цінна не територія, а свобода та гідність. І поки існує у
            світі хоча б один українець — у ворога немає шансів».
          </blockquote>
          <p data-testid="finale-glory" className="gold-text animate-shimmer font-heading text-5xl font-bold sm:text-7xl">
            Слава Україні!
          </p>
          <button
            type="button"
            data-testid="share-btn"
            onClick={share}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-5 text-sm transition-colors duration-200 hover:border-gold/60 hover:text-gold-soft"
          >
            <Share2 className="h-4 w-4" /> Поділитися сайтом
          </button>
        </Reveal>

        <Reveal className="mt-20">
          <div
            id="support"
            data-testid="support-banner"
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-blue-500/30"
            style={{ background: "linear-gradient(135deg, rgba(20,50,95,0.95), rgba(15,23,42,0.98))" }}
          >
            <div className="space-y-3 p-6 sm:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-200">Підтримати Україну</p>
              <h2 className="text-2xl font-semibold sm:text-3xl">Росія веде війну проти України. Допоможіть боронити свободу.</h2>
              <p className="max-w-2xl text-blue-100/80">
                Обирайте перевірені офіційні фонди та рахунки — кожен внесок наближає перемогу.
              </p>
            </div>
            <div className="grid gap-px bg-blue-500/20 sm:grid-cols-2">
              {SUPPORT_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`support-link-${s.id}`}
                  className="group flex items-start justify-between gap-4 bg-[#0F1D36] p-5 transition-colors duration-200 hover:bg-[#13274A] sm:p-6"
                >
                  <span>
                    <span className="block font-semibold text-yellow-300">{s.name}</span>
                    <span className="mt-1 block text-sm text-blue-100/75">{s.note}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-yellow-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
            <div className="h-2 bg-[#FFD500]" />
          </div>
        </Reveal>
      </div>

      <footer data-testid="site-footer" className="mx-auto mt-24 max-w-7xl border-t border-line px-5 pt-8 text-sm text-muted-foreground sm:px-8">
        <p>
          © Андрій Тимченко.
        </p>
      </footer>
    </section>
  );
}
