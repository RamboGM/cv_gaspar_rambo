import { useLanguage } from "../hooks/useLanguage";

const heroAvatarImage = new URL("../pic_0231.png", import.meta.url).href;

export default function Hero() {
  const { content } = useLanguage();
  const heroCopy = content.hero;
  const avatarUrl = heroAvatarImage.trim().length > 0 ? heroAvatarImage : null;

  return (
    <section className="section !border-t-0 !pt-16 md:!pt-24">
      <div className="section__inner">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(200px,300px)] md:gap-16">
          <div className="max-w-2xl">
            <span className="chip chip--accent">{heroCopy.badge}</span>

            <h1 className="animate-fade-in mt-6 text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em]">
              Gaspar Rambo
            </h1>

            <p className="animate-fade-in mt-4 text-lg font-medium leading-snug text-[var(--accent)] md:text-2xl">
              {heroCopy.title}
            </p>

            <p className="animate-fade-in mt-6 text-base leading-relaxed text-[var(--text-2)] md:text-lg">
              {heroCopy.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#proyectos" className="btn btn--primary">
                {heroCopy.primaryCta}
              </a>
              <a
                href="https://github.com/RamboGM"
                target="_blank"
                className="btn btn--ghost"
                rel="noopener"
              >
                {heroCopy.secondaryCta}
              </a>
            </div>

            <ul className="mt-10 flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {heroCopy.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-3)]">
                  <span
                    className="h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="order-first md:order-last">
            <div className="bento-frame mx-auto md:ml-auto md:mr-0">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Gaspar Rambo" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-center text-2xl font-bold uppercase tracking-widest text-[var(--text-3)]">
                  {heroCopy.avatarFallback}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
