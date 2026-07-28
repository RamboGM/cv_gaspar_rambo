import React from "react";
import Section from "../components/Section";
import type { Project } from "../data/projects";
import { useLanguage } from "../hooks/useLanguage";

function ProjectCard({ p }: { p: Project }) {
  const [showDetails, setShowDetails] = React.useState(false);
  const { language } = useLanguage();

  return (
    <article className="surface-card flex flex-col p-6">
      <div className="flex-1">
        <h3 className="text-lg font-semibold leading-snug md:text-xl">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-2)]">{p.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        {showDetails && (
          <div className="animate-fade-in mt-6 space-y-5 border-t border-[var(--border)] pt-6">
            {p.architecture && (
              <div>
                <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {language === "es" ? "Arquitectura" : "Architecture"}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">{p.architecture}</p>
              </div>
            )}
            {p.keyChallenges && (
              <div>
                <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {language === "es" ? "Retos clave" : "Key challenges"}
                </h4>
                <ul className="mt-2 space-y-2">
                  {p.keyChallenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-2)]">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                        aria-hidden="true"
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
        <div className="flex gap-5">
          {p.repo && (
            <a href={p.repo} target="_blank" className="link-quiet" rel="noopener">
              Repo ↗
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" className="link-quiet" rel="noopener">
              Demo ↗
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="link-quiet"
          aria-expanded={showDetails}
        >
          {showDetails
            ? language === "es"
              ? "Ocultar"
              : "Hide"
            : language === "es"
              ? "Detalles"
              : "Details"}
        </button>
      </div>
    </article>
  );
}

export default function Projects({ items }: { items: Project[] }) {
  const { content } = useLanguage();
  const projectsCopy = content.projects;

  return (
    <Section id="proyectos" index="05" title={projectsCopy.heading} subtitle={projectsCopy.subtitle}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <ProjectCard key={i} p={p} />
        ))}
      </div>
      <div className="mt-10">
        <a href="https://github.com/RamboGM" target="_blank" className="link-quiet" rel="noopener">
          {projectsCopy.viewMore}
        </a>
      </div>
    </Section>
  );
}
