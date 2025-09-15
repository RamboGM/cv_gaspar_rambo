export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} Gaspar Rambo — Hecho con React + Tailwind
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a className="hover:text-white transition-colors" href="#contacto">Contacto</a>
          <a className="hover:text-white transition-colors" href="https://github.com/RamboGM" target="_blank">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

