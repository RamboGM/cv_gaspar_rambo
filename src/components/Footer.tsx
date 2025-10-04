import { useLanguage } from "../hooks/useLanguage";

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  const { content } = useLanguage();
  const footerCopy = content.footer;

  return (
    <footer className={`mt-20 border-t border-[rgba(255,255,255,0.1)] ${className}`.trim()}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-[rgba(255,255,255,0.6)] md:flex-row">
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
