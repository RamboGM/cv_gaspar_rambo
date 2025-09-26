import { useLanguage } from "../hooks/useLanguage";

export default function Footer() {
  const { content } = useLanguage();
  const footerCopy = content.footer;

  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-white/60 md:flex-row">
        <p>© {new Date().getFullYear()} Gaspar Rambo — {footerCopy.signature}</p>
        <div className="flex items-center gap-4">
          <a className="transition-colors hover:text-[#22d3ee]" href="#contacto">
            {footerCopy.contact}
          </a>
          <a className="transition-colors hover:text-[#ec4899]" href="https://github.com/RamboGM" target="_blank" rel="noopener">
            {footerCopy.github}
          </a>
        </div>
      </div>
    </footer>
  );
}
