import Section from "../components/Section";
import { useLanguage } from "../hooks/useLanguage";

export default function Education() {
  const { content } = useLanguage();
  const educationCopy = content.education;

  return (
    <Section id="formacion-academica" index="03" title={educationCopy.heading}>
      <p className="max-w-3xl text-base leading-relaxed text-[var(--text-2)] md:text-lg">
        {educationCopy.description}
      </p>
      {educationCopy.highlights.length ? (
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {educationCopy.highlights.map((highlight) => (
            <li key={highlight} className="chip chip--square whitespace-normal">
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-10">
        <a href={educationCopy.transcriptLink} className="btn btn--ghost" download>
          {educationCopy.transcriptCta}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 4v12m0 0 4-4m-4 4-4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </Section>
  );
}
