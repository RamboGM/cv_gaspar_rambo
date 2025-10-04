import { useLanguage } from "../hooks/useLanguage";

const primaryButtonClasses =
  "rounded-full bg-[#ec4899] px-6 py-2.5 text-sm font-semibold text-[#0f172a] shadow-[0_20px_60px_rgba(236,72,153,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[rgba(236,72,153,0.9)]";

export default function Education() {
  const { content } = useLanguage();
  const educationCopy = content.education;

  return (
    <section id="formacion-academica" className="scroll-mt-24 py-20">
      <div>
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
            {educationCopy.heading}
          </span>
        </h2>
        <div className="mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-transparent" />
      </div>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-[rgba(255,255,255,0.7)] md:text-lg">
        {educationCopy.description}
      </p>
      {educationCopy.highlights.length ? (
        <ul className="mt-8 flex flex-wrap gap-2 text-sm text-[rgba(255,255,255,0.7)]">
          {educationCopy.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.1)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#f1f5f9]"
            >
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={educationCopy.transcriptLink}
          className={`inline-flex items-center gap-2 ${primaryButtonClasses}`}
          download
        >
          {educationCopy.transcriptCta}
        </a>
        {educationCopy.transcriptNote ? (
          <p className="text-xs uppercase tracking-[0.3em] text-[rgba(255,255,255,0.4)]">
            {educationCopy.transcriptNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
