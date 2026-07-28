import Section from "../components/Section";
import type { WordpressSite } from "../data/wordpress";
import { useLanguage } from "../hooks/useLanguage";

const displayUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/+$/, "");

export default function WordPress({ items }: { items: WordpressSite[] }) {
  const { content } = useLanguage();
  const copy = content.wordpress;

  return (
    <Section id="wordpress" index="06" title={copy.heading} subtitle={copy.subtitle} band>
      <p className="max-w-3xl text-base leading-relaxed text-[var(--text-2)] md:text-lg">
        {copy.summary}
      </p>

      <ul className="mt-8 grid gap-x-10 gap-y-3 md:grid-cols-2">
        {copy.highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-2)]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <>
          <h3 className="mt-14 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">
            {copy.sitesHeading}
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {items.map((site) => (
              <article key={site.url} className="surface-card flex flex-col p-6">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold md:text-xl">{site.name}</h4>
                  <p className="mt-1 text-sm text-[var(--text-3)]">{site.role}</p>

                  {site.scope.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {site.scope.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-2)]"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {site.stack.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {site.stack.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 border-t border-[var(--border)] pt-4">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet"
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
    </Section>
  );
}
