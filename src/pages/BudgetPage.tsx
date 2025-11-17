import FloatingWhatsappButton from "../components/FloatingWhatsappButton";
import ParticleBackground from "../components/ParticleBackground";
import type { Budget } from "../types/budget";

type BudgetPageProps = {
  data: Budget;
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-4 text-sm sm:text-base">
    <span className="text-white/60">{label}</span>
    <span className="font-semibold text-white">{value}</span>
  </div>
);

export default function BudgetPage({ data }: BudgetPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] px-4 py-10 text-[#f8fafc]">
      <ParticleBackground />
      <FloatingWhatsappButton />
      <div className="relative z-10">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <header className="flex flex-col gap-2 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#38bdf8]">Presupuesto digital</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{data.title}</h1>
          </header>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem label="Cliente" value={data.client} />
            <InfoItem label="Desarrollador" value={data.developer} />
            <InfoItem label="Fecha" value={data.date} />
            <InfoItem label="Validez" value={data.validity} />
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#0b1221]/70 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Resumen del Proyecto</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem label="Tipo de proyecto" value={data.summary.projectType} />
              <InfoItem label="Valor total" value={data.summary.totalValue} />
              <InfoItem label="Plazo estimado" value={data.summary.estimatedTimeline} />
              <InfoItem label="Pago" value={data.summary.paymentSchedule} />
            </div>
          </section>

          <section className="flex flex-col gap-6">
            {data.sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-white/10 bg-[#0b1221]/70 p-6">
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                {section.description && (
                  <p className="mt-3 text-white/80 leading-relaxed">{section.description}</p>
                )}
                {section.items && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>

          <footer className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/80">
            <p>
              Gaspar Maximiliano Rambo <span className="font-semibold">| Apps & Web Developer</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
