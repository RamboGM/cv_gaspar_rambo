import Section from "../components/Section";
import type { Job } from "../data/experience";
import { useLanguage } from "../hooks/useLanguage";

export default function Experience({ items }: { items: Job[] }) {
  const { content } = useLanguage();

  return (
    <Section id="experiencia" index="07" title={content.experience.heading}>
      <ol className="relative space-y-12 border-l border-[var(--border)] pl-6 md:pl-8">
        {items.map((j, i) => (
          <li key={i} className="relative">
            <span
              className="absolute -left-[1.8rem] top-1.5 block h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-base)] md:-left-[2.3rem]"
              aria-hidden="true"
            />
            <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {j.period}
            </p>
            <h3 className="mt-2 text-xl font-semibold md:text-2xl">{j.role}</h3>
            <p className="mt-1 text-sm font-medium text-[var(--text-3)] md:text-base">{j.company}</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-2)] md:text-base">
              {j.summary}
            </p>
            {j.achievements?.length ? (
              <ul className="mt-5 space-y-2.5">
                {j.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="flex max-w-3xl items-start gap-3 text-sm leading-relaxed text-[var(--text-2)]"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                      aria-hidden="true"
                    />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {j.stack?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {j.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
