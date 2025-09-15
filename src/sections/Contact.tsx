export default function Contact() {
  const email = "tu-email@ejemplo.com"; // TODO: reemplazar
  const subject = encodeURIComponent("Consulta desde tu CV web");
  const body = encodeURIComponent("Hola Gaspar, me gustaría contactarte por...");
  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <section id="contacto" className="scroll-mt-24 py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
                Contacto
              </span>
            </h2>
            <div className="mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#22d3ee] to-transparent" />
          </div>
          <p className="text-base text-white/70 md:text-lg">
            ¿Tenés un proyecto, integración o idea en mente? Hablemos y diseñemos una solución a medida.
          </p>
          <a
            href={mailto}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#22d3ee] px-6 py-2.5 text-sm font-semibold text-[#0f172a] shadow-[0_18px_48px_rgba(34,211,238,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[#22d3ee]/90"
          >
            Escribime por mail
          </a>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Descargá mi CV desde el menú principal</p>
        </div>
        <div className="relative rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.8)] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.55)]">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#ec4899]/25 blur-3xl" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto;
            }}
            className="relative space-y-4"
          >
            <input
              className="w-full rounded-2xl border border-white/10 bg-[rgba(11,20,37,0.8)] px-4 py-3 text-sm text-[#f1f5f9] placeholder:text-white/40 focus:border-[#22d3ee] focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/40"
              placeholder="Tu nombre"
            />
            <input
              className="w-full rounded-2xl border border-white/10 bg-[rgba(11,20,37,0.8)] px-4 py-3 text-sm text-[#f1f5f9] placeholder:text-white/40 focus:border-[#22d3ee] focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/40"
              placeholder="Tu email"
              type="email"
            />
            <textarea
              className="h-32 w-full rounded-2xl border border-white/10 bg-[rgba(11,20,37,0.8)] px-4 py-3 text-sm text-[#f1f5f9] placeholder:text-white/40 focus:border-[#ec4899] focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
              placeholder="Tu mensaje"
            />
            <button
              className="w-full rounded-full bg-[#ec4899] px-4 py-3 text-sm font-semibold text-[#0f172a] transition-transform hover:-translate-y-0.5 hover:bg-[#ec4899]/90"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
