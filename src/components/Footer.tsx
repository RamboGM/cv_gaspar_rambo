export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-white/60 md:flex-row">
        <p>
          © {new Date().getFullYear()} Gaspar Rambo — Hecho con React + Tailwind
        </p>
        <div className="flex items-center gap-4">
          <a className="transition-colors hover:text-[#10b981]" href="#contacto">
            Contacto
          </a>
          <a className="transition-colors hover:text-[#f43f5e]" href="https://github.com/RamboGM" target="_blank" rel="noopener">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
