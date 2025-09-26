import { useLanguage } from "../hooks/useLanguage";

export default function About() {
  const { content } = useLanguage();
  const aboutCopy = content.about;

  return (
    <section id="sobre-mi" className="scroll-mt-24 py-20">
      <div>
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
            {aboutCopy.heading}
          </span>
        </h2>
        <div className="mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-transparent" />
      </div>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
        {aboutCopy.description}
      </p>
      <ul className="mt-8 flex flex-wrap gap-2 text-sm text-white/70">
        {aboutCopy.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#f1f5f9]"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
