import type { CSSProperties } from "react";

import { useLanguage } from "../hooks/useLanguage";

// Define aquí la ruta de la imagen (por ejemplo, "/hero-photo.png") una vez que la subas manualmente
const heroAvatarImage = new URL("../pic_01.png", import.meta.url).href

export default function Hero() {
  const hasAvatarImage = heroAvatarImage.trim().length > 0;
  const heroAvatarStyles = hasAvatarImage
    ? ({ "--hero-avatar-image": `url(${heroAvatarImage})` } as CSSProperties)
    : undefined;
  const { content } = useLanguage();
  const heroCopy = content.hero;

  return (
    <section className="relative pt-20 md:pt-24">
      <div className="mt-16 md:mt-20">
        <div className="rounded-[2.75rem] bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] p-[1px] shadow-[0_40px_120px_rgba(34,211,238,0.18)]">
          <div className="relative overflow-hidden rounded-[2.7rem] bg-[rgba(15,23,42,0.85)] px-6 py-16 md:px-14 md:py-20">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#ec4899]/20 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-[#22d3ee]/20 blur-[120px]" aria-hidden="true" />
            <div className="relative grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)]">
              <div className="space-y-6 text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/40 bg-[#22d3ee]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[#22d3ee]">
                  {heroCopy.badge}
                </span>
                <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                  <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
                    Gaspar Rambo
                  </span>
                </h1>
                <p className="text-xl font-semibold text-white/80 md:text-2xl">{heroCopy.title}</p>
                <p className="max-w-xl text-lg text-white/70 md:text-xl">{heroCopy.description}</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#proyectos"
                    className="rounded-full bg-[#ec4899] px-6 py-2.5 text-sm font-semibold text-[#0f172a] shadow-[0_20px_60px_rgba(236,72,153,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[#ec4899]/90"
                  >
                    {heroCopy.primaryCta}
                  </a>
                  <a
                    href="https://github.com/RamboGM"
                    target="_blank"
                    className="rounded-full border border-[#6366f1]/60 px-6 py-2.5 text-sm font-semibold text-white/80 transition-all hover:-translate-y-0.5 hover:border-[#22d3ee]/80 hover:text-[#f1f5f9]"
                    rel="noopener"
                  >
                    {heroCopy.secondaryCta}
                  </a>
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-white/60">
                  {heroCopy.highlights.map((item, index) => (
                    <div key={item} className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          ["bg-[#22d3ee]", "bg-[#ec4899]", "bg-[#6366f1]"][index] ?? "bg-[#22d3ee]"
                        }`}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mx-auto w-48 sm:w-56 md:w-full">
                <div className="hexagon-frame">
                  <div className="hexagon-border">
                    <div
                      className={`hero-avatar${hasAvatarImage ? " hero-avatar--with-image" : ""}`}
                      style={heroAvatarStyles}
                    >
                      <span>{heroCopy.avatarFallback}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

