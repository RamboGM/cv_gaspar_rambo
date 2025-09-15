export default function Hero() {
  return (
    <section className="pt-16 md:pt-20">
      <div className="mt-16 md:mt-24 rounded-3xl bg-gradient-to-r from-pink-500 to-indigo-500 p-[1px]">
        <div className="rounded-3xl bg-neutral-950/90 px-6 py-16 md:px-12 md:py-24">
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-neutral-300">Portfolio / CV</p>
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold">Gaspar Rambo</h1>
            <p className="mt-4 text-lg md:text-xl text-neutral-300">
              Desarrollador Web · Integraciones & E-commerce (Tienda Nube, WooCommerce)
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="#proyectos" className="rounded-lg bg-white text-neutral-900 px-5 py-2.5 font-medium hover:bg-neutral-200 transition-colors">
                Ver proyectos
              </a>
              <a href="https://github.com/RamboGM" target="_blank" className="rounded-lg bg-white/10 text-white px-5 py-2.5 font-medium hover:bg-white/20 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

