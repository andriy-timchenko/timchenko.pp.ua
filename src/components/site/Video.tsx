import { useState } from "react";
import { Play } from "lucide-react";
import { VIDEO_ID } from "@/data/history";
import { Reveal, SectionHeading } from "./Reveal";

export default function Video() {
  const [play, setPlay] = useState(false);
  return (
    <section id="video" className="border-y border-line/60 bg-[#0D1118] py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <SectionHeading
            kicker="Зала IV · Відеолекторій"
            title="Історія України за 10 хвилин"
            lead="Стислий відеоогляд ключових подій — від давніх часів до сьогодення. Зручно для підготовки до НМТ."
            testId="video-title"
          />
          <Reveal>
            <p className="text-sm text-muted-foreground">
              Автор: YouTube-канал «імені Т.Г. Шевченка».
            </p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-8">
          <div
            data-testid="video-embed"
            className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-black shadow-2xl"
          >
            {play ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
                title="Історія України за 10 хвилин"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                data-testid="video-play-btn"
                aria-label="Відтворити відео"
                onClick={() => setPlay(true)}
                className="group absolute inset-0 h-full w-full"
              >
                <img
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                  alt="Обкладинка відео «Історія України за 10 хвилин»"
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition-[opacity,transform] duration-500 group-hover:scale-[1.02] group-hover:opacity-85"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold text-black shadow-[0_0_0_10px_rgba(229,169,60,0.2)] transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-8 w-8" fill="currentColor" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
