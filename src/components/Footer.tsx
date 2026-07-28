import { useLanguage } from "../hooks/useLanguage";

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  const { content } = useLanguage();
  const footerCopy = content.footer;

  return (
    <footer className={`relative z-10 border-t border-[var(--border)] ${className}`.trim()}>
      <div className="mx-auto flex w-[min(100%-2.5rem,72rem)] flex-col items-center justify-between gap-4 py-10 text-sm text-[var(--text-3)] md:flex-row">
        <p>
          © {new Date().getFullYear()} Gaspar Rambo — {footerCopy.signature}
        </p>
        <div className="flex items-center gap-6">
          <a className="transition-colors hover:text-[var(--accent)]" href="#contacto">
            {footerCopy.contact}
          </a>
          <a
            className="transition-colors hover:text-[var(--accent)]"
            href="https://github.com/RamboGM"
            target="_blank"
            rel="noopener"
          >
            {footerCopy.github}
          </a>
        </div>
      </div>
    </footer>
  );
}
