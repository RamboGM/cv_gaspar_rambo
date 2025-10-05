import { useLanguage } from "../hooks/useLanguage";

const cardClasses =
  "flex h-full flex-col justify-between rounded-3xl border border-[rgba(148,163,184,0.2)] bg-[rgba(15,23,42,0.6)] p-6 backdrop-blur";

const primaryButtonClasses =
  "inline-flex items-center justify-center rounded-full bg-[#22d3ee] px-5 py-2 text-sm font-semibold text-[#0f172a] shadow-[0_12px_30px_rgba(34,211,238,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[rgba(34,211,238,0.9)]";

export default function Certifications() {
  const { content } = useLanguage();
  const { certifications } = content;

  if (!certifications.items.length) {
    return null;
  }

  return (
    <section id="licencias-certificaciones" className="scroll-mt-24 py-20">
      <div>
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
            {certifications.heading}
          </span>
        </h2>
        <div className="mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-transparent" />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {certifications.items.map((item) => (
          <article key={item.title} className={cardClasses}>
            <div>
              <h3 className="text-xl font-semibold text-[#f8fafc]">{item.title}</h3>
              <p className="mt-2 text-sm text-[rgba(255,255,255,0.7)]">
                <span className="font-semibold text-[#22d3ee]">{item.issuer}</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[rgba(255,255,255,0.4)]">
                {item.issueDate}
              </p>
              {item.credentialId ? (
                <p className="mt-2 text-xs text-[rgba(255,255,255,0.6)]">{item.credentialId}</p>
              ) : null}
              {item.tags && item.tags.length ? (
                <ul className="mt-4 flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-wide text-[rgba(255,255,255,0.7)]">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] px-3 py-1"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="mt-6">
              <a
                href={item.resource.href}
                className={primaryButtonClasses}
                download={item.resource.download}
              >
                {item.resource.label}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
