import Section from "../components/Section";
import { useLanguage } from "../hooks/useLanguage";

export default function About() {
  const { content } = useLanguage();
  const aboutCopy = content.about;

  return (
    <Section id="sobre-mi" index="02" title={aboutCopy.heading} band>
      <p className="max-w-3xl text-base leading-relaxed text-[var(--text-2)] md:text-lg">
        {aboutCopy.description}
      </p>
      <ul className="mt-10 flex flex-wrap gap-2">
        {aboutCopy.skills.map((skill) => (
          <li key={skill} className="chip">
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  );
}
