import type { Project } from "../data/projects";

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#22d3ee]/50 hover:bg-[#22d3ee]/10">
      <div className="pointer-events-none absolute -right-10 top-1/3 h-32 w-32 rounded-full bg-[#6366f1]/20 blur-3xl transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:-translate-y-4" />
      <h3 className="text-lg font-semibold text-[#f1f5f9]">{p.title}</h3>
      <p className="mt-2 text-sm text-white/70">{p.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
        {p.tech.map((t) => (
          <li key={t} className="rounded-full border border-white/10 bg-[rgba(15,23,42,0.8)] px-2 py-0.5">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center gap-4 text-sm">
        {p.repo && (
          <a
            href={p.repo}
            target="_blank"
            className="font-medium text-[#22d3ee] transition-colors hover:text-[#22d3ee]/70"
            rel="noopener"
          >
            Repo
          </a>
        )}
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            className="font-medium text-[#ec4899] transition-colors hover:text-[#ec4899]/80"
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
  return (
    <section id="proyectos" className="scroll-mt-24 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
              Proyectos
            </span>
          </h2>
          <p className="mt-2 text-sm text-white/60 md:text-base">
            Selección de integraciones, plugins y automatizaciones que impulsan resultados.
          </p>
        </div>
        <a
          href="https://github.com/RamboGM"
          target="_blank"
          className="text-sm font-medium text-white/70 transition-colors hover:text-[#22d3ee]"
          rel="noopener"
        >
          Ver más en GitHub →
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
