import React from "react";
import type { Project } from "../data/projects";
import { useLanguage } from "../hooks/useLanguage";

function ProjectCard({ p }: { p: Project }) {
  const [showDetails, setShowDetails] = React.useState(false);
  const { language } = useLanguage();

  return (
    <article className="group glass-card relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-[rgba(34,211,238,0.4)]">
      <div className="pointer-events-none absolute -right-10 top-1/3 h-32 w-32 rounded-full bg-[rgba(99,102,241,0.15)] blur-3xl transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:-translate-y-4" />
      
      <div className="flex-1">
        <h3 className="text-xl font-bold text-[#f8fafc] group-hover:text-[#22d3ee] transition-colors">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[rgba(248,250,252,0.8)]">{p.description}</p>
        
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li key={t} className="rounded-md border border-[rgba(255,255,255,0.05)] bg-[#0f172a] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[rgba(34,211,238,0.8)]">
              {t}
            </li>
          ))}
        </ul>

        {showDetails && (
          <div className="mt-6 animate-fade-in space-y-4 border-t border-[rgba(255,255,255,0.1)] pt-6">
            {p.architecture && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#ec4899]">{language === 'es' ? 'Arquitectura' : 'Architecture'}</h4>
                <p className="mt-2 text-xs leading-relaxed text-[rgba(248,250,252,0.7)]">{p.architecture}</p>
              </div>
            )}
            {p.keyChallenges && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#6366f1]">{language === 'es' ? 'Retos Clave' : 'Key Challenges'}</h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-[rgba(248,250,252,0.7)]">
                  {p.keyChallenges.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-4">
          {p.repo && (
            <a href={p.repo} target="_blank" className="text-xs font-bold uppercase tracking-widest text-[#22d3ee] hover:text-white transition-colors" rel="noopener">
              Repo
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" className="text-xs font-bold uppercase tracking-widest text-[#ec4899] hover:text-white transition-colors" rel="noopener">
              Demo
            </a>
          )}
        </div>
        
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
        >
          {showDetails ? (language === 'es' ? 'Cerrar' : 'Close') : (language === 'es' ? '+ Detalles' : '+ Details')}
        </button>
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
            <span className="text-gradient">
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
