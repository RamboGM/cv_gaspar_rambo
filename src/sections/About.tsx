export default function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-24 py-20">
      <h2 className="text-3xl md:text-4xl font-bold">Sobre mí</h2>
      <p className="mt-4 text-neutral-300 leading-relaxed max-w-3xl">
        Soy desarrollador web con foco en <strong className="text-white">integraciones y e-commerce</strong>.
        Trabajo como partner de <strong className="text-white">Tienda Nube</strong> y desarrollo plugins / apps
        que conectan plataformas y mejoran la experiencia de compra.
      </p>
      <ul className="mt-6 flex flex-wrap gap-2 text-sm text-neutral-300">
        {["JavaScript","TypeScript","React","Node.js","Express","Python","PHP","WooCommerce"].map((t) => (
          <li key={t} className="rounded-full border border-white/10 px-3 py-1 bg-white/5">{t}</li>
        ))}
      </ul>
    </section>
  );
}

