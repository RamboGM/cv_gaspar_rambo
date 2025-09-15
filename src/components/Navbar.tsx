export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(15,23,42,0.6)] backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#" className="text-lg font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-[#facc15] via-[#f43f5e] to-[#8b5cf6] bg-clip-text text-transparent">
            Gaspar Rambo
          </span>
        </a>
        <ul className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <li>
            <a className="transition-colors hover:text-[#f1f5f9]" href="#sobre-mi">
              Sobre mí
            </a>
          </li>
          <li>
            <a className="transition-colors hover:text-[#f1f5f9]" href="#proyectos">
              Proyectos
            </a>
          </li>
          <li>
            <a className="transition-colors hover:text-[#f1f5f9]" href="#experiencia">
              Experiencia
            </a>
          </li>
          <li>
            <a className="transition-colors hover:text-[#f1f5f9]" href="#contacto">
              Contacto
            </a>
          </li>
          <li>
            <a
              className="rounded-full bg-[#10b981] px-4 py-1.5 font-medium text-[#022c22] shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[#0ea371]"
              href="/cv.pdf"
              target="_blank"
              rel="noopener"
            >
              Descargar CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

