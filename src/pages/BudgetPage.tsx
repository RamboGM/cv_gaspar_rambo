import FloatingWhatsappButton from "../components/FloatingWhatsappButton";
import AmbientBackground from "../components/AmbientBackground";
import type { Budget } from "../types/budget";

type BudgetPageProps = {
  data: Budget;
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] p-4 text-sm sm:text-base">
    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-3)]">
      {label}
    </span>
    <span className="font-semibold text-[var(--text)]">{value}</span>
  </div>
);

export default function BudgetPage({ data }: BudgetPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden px-5 py-12">
      <AmbientBackground />
      <FloatingWhatsappButton />
      <div className="relative z-10">
        <div className="surface-card mx-auto flex w-full max-w-4xl flex-col gap-10 p-6 sm:p-9">
          <header className="flex flex-col gap-3 text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Presupuesto digital
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">{data.title}</h1>
          </header>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem label="Cliente" value={data.client} />
            <InfoItem label="Desarrollador" value={data.developer} />
            <InfoItem label="Fecha" value={data.date} />
            <InfoItem label="Validez" value={data.validity} />
          </section>

          <section className="rounded-xl border border-[var(--border)] p-6">
            <h2 className="mb-5 text-lg font-semibold">Resumen del Proyecto</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem label="Tipo de proyecto" value={data.summary.projectType} />
              <InfoItem label="Valor total" value={data.summary.totalValue} />
              <InfoItem label="Plazo estimado" value={data.summary.estimatedTimeline} />
              <InfoItem label="Pago" value={data.summary.paymentSchedule} />
            </div>
          </section>

          <section className="flex flex-col gap-6">
            {data.sections.map((section) => (
              <article key={section.title} className="rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                {section.description && (
                  <p className="mt-3 leading-relaxed">{section.description}</p>
                )}
                {section.items && (
                  <ul className="mt-4 space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[var(--text-2)]">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>

          <footer className="rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] p-6 text-center text-[var(--text-2)]">
            <p>
              Gaspar Maximiliano Rambo <span className="font-semibold">| Apps & Web Developer</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
