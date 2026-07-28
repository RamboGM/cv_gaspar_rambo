import type { WordpressSite } from "../data/wordpress";
import { useLanguage } from "../hooks/useLanguage";

const displayUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/+$/, "");

export default function WordPress({ items }: { items: WordpressSite[] }) {
  const { content } = useLanguage();
  const copy = content.wordpress;

  return (
    <section id="wordpress" className="scroll-mt-24 py-20">
      <div>
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="text-gradient">{copy.heading}</span>
        </h2>
        <p className="mt-2 text-sm text-[rgba(255,255,255,0.6)] md:text-base">{copy.subtitle}</p>
      </div>

      <div className="glass-card mt-10 rounded-xl p-6 md:p-8">
        <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.7)] md:text-base">{copy.summary}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {copy.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[rgba(255,255,255,0.6)]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38bdf8]" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {items.length > 0 && (
        <>
          <h3 className="mt-12 text-lg font-semibold text-[#f1f5f9]">{copy.sitesHeading}</h3>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((site) => (
              <article
                key={site.url}
                className="group glass-card flex flex-col rounded-xl p-6 transition-all duration-300 hover:border-[rgba(255,255,255,0.2)]"
              >
                <div className="flex-1">
                  <h4 className="text-xl font-bold tracking-tight text-[#ffffff] transition-colors group-hover:text-[#38bdf8]">
                    {site.name}
                  </h4>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[rgba(255,255,255,0.5)]">
                    {site.role}
                  </p>

                  {site.scope.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {site.scope.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[rgba(255,255,255,0.6)]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366f1]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {site.stack.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {site.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[rgba(255,255,255,0.5)]"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 border-t border-[rgba(255,255,255,0.06)] pt-4">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.5)] transition-colors hover:text-[#38bdf8]"
                    title={displayUrl(site.url)}
                  >
                    {copy.visitLabel} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
