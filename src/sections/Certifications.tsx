import Section from "../components/Section";
import { useLanguage } from "../hooks/useLanguage";

export default function Certifications() {
  const { content } = useLanguage();
  const { certifications } = content;

  if (!certifications.items.length) {
    return null;
  }

  return (
    <Section id="licencias-certificaciones" index="04" title={certifications.heading} band>
      <div className="grid gap-5 md:grid-cols-2">
        {certifications.items.map((item) => (
          <article key={item.title} className="surface-card flex h-full flex-col justify-between p-6">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {item.issuer}
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug md:text-xl">{item.title}</h3>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--text-3)]">
                {item.issueDate}
              </p>
              {item.credentialId ? (
                <p className="mt-2 break-words text-xs text-[var(--text-3)]">{item.credentialId}</p>
              ) : null}
              {item.tags?.length ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="mt-8 border-t border-[var(--border)] pt-4">
              <a href={item.resource.href} className="link-quiet" download={item.resource.download}>
                {item.resource.label} ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
