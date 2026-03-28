import type { CSSProperties } from "react";

import { useLanguage } from "../hooks/useLanguage";

// Define aquí la ruta de la imagen (por ejemplo, "/hero-photo.png") una vez que la subas manualmente
const heroAvatarImage = new URL("../pic_0231.png", import.meta.url).href

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
          <div className="glass-card relative overflow-hidden rounded-[2.7rem] px-6 py-16 md:px-14 md:py-20">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[rgba(255,255,255,0.03)] blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-[rgba(56,189,248,0.05)] blur-[120px]" aria-hidden="true" />
            <div className="relative grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)]">
              <div className="space-y-6 text-left">
                <span className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[rgba(255,255,255,0.6)]">
                  {heroCopy.badge}
                </span>
                <h1 className="animate-fade-in text-4xl font-extrabold leading-tight md:text-6xl">
                  <span className="text-gradient">
                    Gaspar Rambo
                  </span>
                </h1>
                <p className="animate-fade-in delay-100 text-xl font-semibold text-[rgba(255,255,255,0.9)] md:text-2xl">{heroCopy.title}</p>
                <p className="animate-fade-in delay-200 max-w-xl text-lg text-[rgba(255,255,255,0.8)] md:text-xl">{heroCopy.description}</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#proyectos"
                    className="rounded-lg bg-[#ffffff] px-6 py-2.5 text-sm font-bold text-[#000000] shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition-all hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.9)]"
                  >
                    {heroCopy.primaryCta}
                  </a>
                  <a
                    href="https://github.com/RamboGM"
                    target="_blank"
                    className="rounded-lg border border-[rgba(255,255,255,0.2)] px-6 py-2.5 text-sm font-bold text-[#ffffff] transition-all hover:-translate-y-0.5 hover:border-[rgba(56,189,248,0.6)]"
                    rel="noopener"
                  >
                    {heroCopy.secondaryCta}
                  </a>
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-[rgba(255,255,255,0.6)]">
                  {heroCopy.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
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

