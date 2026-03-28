import React from "react";
import type { Project } from "../data/projects";
import { useLanguage } from "../hooks/useLanguage";

function ProjectCard({ p }: { p: Project }) {
  const [showDetails, setShowDetails] = React.useState(false);
  const { language } = useLanguage();

  return (
    <article className="group glass-card relative flex flex-col overflow-hidden rounded-xl p-6 transition-all duration-300 hover:border-[rgba(255,255,255,0.2)]">
      <div className="flex-1">
        <h3 className="text-xl font-bold tracking-tight text-[#ffffff] group-hover:text-[#38bdf8] transition-colors">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[rgba(255,255,255,0.6)]">{p.description}</p>
        
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li key={t} className="rounded border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[rgba(255,255,255,0.5)]">
              {t}
            </li>
          ))}
        </ul>

        {showDetails && (
          <div className="mt-6 animate-fade-in space-y-4 border-t border-[rgba(255,255,255,0.06)] pt-6">
            {p.architecture && (
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">{language === 'es' ? 'Arquitectura' : 'Architecture'}</h4>
                <p className="mt-2 text-xs leading-relaxed text-[rgba(255,255,255,0.5)]">{p.architecture}</p>
              </div>
            )}
            {p.keyChallenges && (
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">{language === 'es' ? 'Retos Clave' : 'Key Challenges'}</h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-[rgba(255,255,255,0.5)]">
                  {p.keyChallenges.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-4">
        <div className="flex gap-4">
          {p.repo && (
            <a href={p.repo} target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.5)] hover:text-[#38bdf8] transition-colors" rel="noopener">
              Repo
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.5)] hover:text-[#38bdf8] transition-colors" rel="noopener">
              Demo
            </a>
          )}
        </div>
        
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.3)] hover:text-white transition-colors"
        >
          {showDetails ? (language === 'es' ? 'Ocultar' : 'Hide') : (language === 'es' ? 'Detalles' : 'Details')}
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
