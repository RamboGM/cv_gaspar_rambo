export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-neutral-950/80 border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">
          <span className="text-pink-400">Gaspar</span>{" "}
          <span className="text-indigo-400">Rambo</span>
        </a>
        <ul className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          <li><a className="hover:text-white transition-colors" href="#sobre-mi">Sobre mí</a></li>
          <li><a className="hover:text-white transition-colors" href="#proyectos">Proyectos</a></li>
          <li><a className="hover:text-white transition-colors" href="#experiencia">Experiencia</a></li>
          <li><a className="hover:text-white transition-colors" href="#contacto">Contacto</a></li>
          <li>
            <a className="rounded-lg bg-white text-neutral-900 px-3 py-1.5 font-medium hover:bg-neutral-200 transition-colors"
               href="/cv.pdf" target="_blank" rel="noopener">
              Descargar CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

