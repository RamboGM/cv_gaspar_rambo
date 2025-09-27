import type { Project } from "../data/projects";
import { useLanguage } from "../hooks/useLanguage";

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-6 backdrop-blur-sm transition-all hover:border-[rgba(34,211,238,0.5)] hover:bg-[rgba(34,211,238,0.1)]">
      <div className="pointer-events-none absolute -right-10 top-1/3 h-32 w-32 rounded-full bg-[rgba(99,102,241,0.2)] blur-3xl transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:-translate-y-4" />
      <h3 className="text-lg font-semibold text-[#f1f5f9]">{p.title}</h3>
      <p className="mt-2 text-sm text-[rgba(255,255,255,0.7)]">{p.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2 text-xs text-[rgba(255,255,255,0.6)]">
        {p.tech.map((t) => (
          <li key={t} className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.8)] px-2 py-0.5">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center gap-4 text-sm">
        {p.repo && (
          <a
            href={p.repo}
            target="_blank"
            className="font-medium text-[#22d3ee] transition-colors hover:text-[rgba(34,211,238,0.7)]"
            rel="noopener"
          >
            Repo
          </a>
        )}
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            className="font-medium text-[#ec4899] transition-colors hover:text-[rgba(236,72,153,0.8)]"
            rel="noopener"
          >
            Demo
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects({ items }: { items: Project[] }) {
  const { content } = useLanguage();
  const projectsCopy = content.projects;

  return (
    <section id="proyectos" className="scroll-mt-24 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
              {projectsCopy.heading}
            </span>
          </h2>
          <p className="mt-2 text-sm text-[rgba(255,255,255,0.6)] md:text-base">{projectsCopy.subtitle}</p>
        </div>
        <a
          href="https://github.com/RamboGM"
          target="_blank"
          className="text-sm font-medium text-[rgba(255,255,255,0.7)] transition-colors hover:text-[#22d3ee]"
          rel="noopener"
        >
          {projectsCopy.viewMore}
        </a>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <ProjectCard key={i} p={p} />
        ))}
      </div>
    </section>
  );
}
