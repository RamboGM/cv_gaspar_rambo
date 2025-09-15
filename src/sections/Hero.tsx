export default function Hero() {
  return (
    <section className="relative pt-20 md:pt-24">
      <div className="mt-16 md:mt-20">
        <div className="rounded-[2.75rem] bg-gradient-to-r from-[#f43f5e] via-[#fb7185] to-[#8b5cf6] p-[1px] shadow-[0_40px_120px_rgba(244,63,94,0.18)]">
          <div className="relative overflow-hidden rounded-[2.7rem] bg-[rgba(15,23,42,0.8)] px-6 py-16 md:px-14 md:py-20">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#f43f5e]/25 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-[#8b5cf6]/20 blur-[120px]" aria-hidden="true" />
            <div className="relative grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)]">
              <div className="space-y-6 text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#facc15]/50 bg-[#facc15]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-[#facc15]">
                  Portfolio · CV
                </span>
                <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                  <span className="bg-gradient-to-r from-[#facc15] via-[#f43f5e] to-[#8b5cf6] bg-clip-text text-transparent">
                    Gaspar Rambo
                  </span>
                </h1>
                <p className="max-w-xl text-lg text-white/70 md:text-xl">
                  Desarrollador web especializado en integraciones y comercio electrónico. Conecto plataformas como Tienda
                  Nube y WooCommerce para crear experiencias de compra memorables.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#proyectos"
                    className="rounded-full bg-[#10b981] px-6 py-2.5 text-sm font-semibold text-[#022c22] shadow-[0_20px_60px_rgba(16,185,129,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[#0ea371]"
                  >
                    Ver proyectos
                  </a>
                  <a
                    href="https://github.com/RamboGM"
                    target="_blank"
                    className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white/80 transition-all hover:-translate-y-0.5 hover:border-[#facc15]/70 hover:text-[#f1f5f9]"
                    rel="noopener"
                  >
                    GitHub
                  </a>
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#facc15]" />
                    Integraciones & Automatizaciones
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#f43f5e]" />
                    E-commerce a medida
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" />
                    Experiencias centradas en el usuario
                  </div>
                </div>
              </div>
              <div className="mx-auto w-48 sm:w-56 md:w-full">
                <div className="hexagon-frame">
                  <div className="hexagon-border">
                    <div className="hero-avatar">
                      <span>Tu foto</span>
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

