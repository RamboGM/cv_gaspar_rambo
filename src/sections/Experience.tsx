import type { Job } from "../data/experience";

export default function Experience({ items }: { items: Job[] }) {
  return (
    <section id="experiencia" className="scroll-mt-24 py-20">
      <div>
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
            Experiencia
          </span>
        </h2>
        <div className="mt-3 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#6366f1] to-transparent" />
      </div>
      <ol className="relative mt-10 space-y-10 border-l border-white/10 pl-6">
        {items.map((j, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-6 top-2 block h-5 w-5 rounded-full bg-gradient-to-br from-[#ec4899] via-[#6366f1] to-[#22d3ee] shadow-[0_0_25px_rgba(99,102,241,0.4)]" />
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#f1f5f9]">
                  {j.role} · <span className="font-medium text-white/70">{j.company}</span>
                </h3>
                <p className="text-sm text-white/70 md:text-base">{j.summary}</p>
                {j.stack?.length ? (
                  <ul className="mt-2 flex flex-wrap gap-2 text-xs text-white/60">
                    {j.stack.map((s) => (
                      <li key={s} className="rounded-full border border-white/10 bg-[rgba(15,23,42,0.8)] px-2 py-0.5">
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <span className="text-xs font-medium uppercase tracking-widest text-white/50 md:text-sm">{j.period}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
