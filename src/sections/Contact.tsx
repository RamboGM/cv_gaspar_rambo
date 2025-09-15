export default function Contact() {
  const email = "tu-email@ejemplo.com"; // TODO: reemplazar
  const subject = encodeURIComponent("Consulta desde tu CV web");
  const body = encodeURIComponent("Hola Gaspar, me gustaría contactarte por...");
  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <section id="contacto" className="scroll-mt-24 py-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Contacto</h2>
          <p className="mt-4 text-neutral-300">¿Tenés un proyecto, integración o idea en mente? Hablemos.</p>
          <a href={mailto} className="mt-6 inline-block rounded-lg bg-white text-neutral-900 px-5 py-2.5 font-medium hover:bg-neutral-200 transition-colors">
            Escribime por mail
          </a>
          <p className="mt-3 text-sm text-neutral-400">También podés descargar mi CV en PDF desde el menú.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <form onSubmit={(e) => { e.preventDefault(); window.location.href = mailto; }} className="space-y-3">
            <input className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2" placeholder="Tu nombre" />
            <input className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2" placeholder="Tu email" />
            <textarea className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 h-28" placeholder="Tu mensaje" />
            <button className="rounded-lg bg-white text-neutral-900 px-4 py-2 font-medium hover:bg-neutral-200 transition-colors">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
}

