import type { Project } from "../data/projects";

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="mt-2 text-neutral-300">{p.description}</p>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-300">
        {p.tech.map((t) => (
          <li key={t} className="rounded-full border border-white/10 px-2 py-0.5 bg-neutral-900">{t}</li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-4 text-sm">
        {p.repo && (
          <a href={p.repo} target="_blank" className="text-pink-300 hover:text-pink-200 underline underline-offset-4">Repo</a>
        )}
        {p.demo && (
          <a href={p.demo} target="_blank" className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4">Demo</a>
        )}
      </div>
    </article>
  );
}

export default function Projects({ items }: { items: Project[] }) {
  return (
    <section id="proyectos" className="scroll-mt-24 py-20">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl md:text-4xl font-bold">Proyectos</h2>
        <a href="https://github.com/RamboGM" target="_blank" className="text-sm text-neutral-300 hover:text-white transition-colors">
          Ver más en GitHub →
        </a>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, i) => (<ProjectCard key={i} p={p} />))}
      </div>
    </section>
  );
}

