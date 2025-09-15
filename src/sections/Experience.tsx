import type { Job } from "../data/experience";

export default function Experience({ items }: { items: Job[] }) {
  return (
    <section id="experiencia" className="scroll-mt-24 py-20">
      <h2 className="text-3xl md:text-4xl font-bold">Experiencia</h2>
      <ol className="mt-8 relative border-l border-white/10 pl-6 space-y-8">
        {items.map((j, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500"></span>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="font-semibold">{j.role} · <span className="text-neutral-300">{j.company}</span></h3>
                <p className="text-neutral-300 mt-1">{j.summary}</p>
                {j.stack?.length && (
                  <ul className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-300">
                    {j.stack.map((s) => (<li key={s} className="rounded-full border border-white/10 px-2 py-0.5 bg-white/5">{s}</li>))}
                  </ul>
                )}
              </div>
              <span className="text-sm text-neutral-400">{j.period}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

