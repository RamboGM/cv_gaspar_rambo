export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(15,23,42,0.8)] backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#" className="text-lg font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-[#ec4899] via-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
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
              className="rounded-full bg-[#22d3ee] px-4 py-1.5 font-medium text-[#0f172a] shadow-[0_10px_30px_rgba(34,211,238,0.3)] transition-transform hover:-translate-y-0.5 hover:bg-[#22d3ee]/90"
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

