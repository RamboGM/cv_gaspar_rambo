import { Fragment, useEffect, useRef, useState } from "react";

import { useLanguage } from "../hooks/useLanguage";
import type { Language } from "../types/language";

type NavbarProps = {
  onDownloadCv?: (language: Language) => Promise<void> | void;
  className?: string;
};

const AVAILABLE_LANGUAGES: Language[] = ["en", "es"];

export default function Navbar({ onDownloadCv, className = "" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement | null>(null);
  const { content, language, setLanguage } = useLanguage();
  const navigationLinks = content.nav.links;

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const { style } = document.body;
    const previousOverflow = style.overflow;

    if (isMenuOpen) {
      style.overflow = "hidden";
    }

    return () => {
      style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((previous) => !previous);
  const handleNavigate = () => {
    setIsMenuOpen(false);
    setIsDownloadMenuOpen(false);
  };
  useEffect(() => {
    if (!isDownloadMenuOpen || typeof document === "undefined") {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        downloadMenuRef.current &&
        !downloadMenuRef.current.contains(event.target as Node)
      ) {
        setIsDownloadMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDownloadMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDownloadMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsDownloadMenuOpen(false);
    }
  }, [isMenuOpen]);

  const handleDownload = (languageCode: Language) => {
    onDownloadCv?.(languageCode);
    setIsDownloadMenuOpen(false);
    setIsMenuOpen(false);
  };

  const renderLanguageSwitcher = (className: string, separatorClass: string) => (
    <div className={className} aria-label={content.nav.languageSwitcherLabel}>
      {AVAILABLE_LANGUAGES.map((code, index) => (
        <Fragment key={code}>
          {index > 0 ? <span className={separatorClass}>|</span> : null}
          <button
            type="button"
            onClick={() => {
              if (language !== code) {
                setLanguage(code);
              }
            }}
            className={`tap-target inline-flex items-center px-2 py-1.5 text-[10px] font-bold transition-colors ${
              language === code
                ? "text-[var(--accent)]"
                : "text-[var(--text-3)] hover:text-[var(--text)]"
            }`}
          >
            {code.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(11,18,32,0.82)] backdrop-blur-xl ${className}`.trim()}
    >
      <nav className="mx-auto flex h-16 w-[min(100%-2.5rem,72rem)] items-center gap-4 text-sm md:text-base">
        <a href="#" className="relative flex min-w-0 flex-shrink items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg">
            <span className="absolute inset-0 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)]" />
            <span className="relative text-sm font-bold tracking-[0.15em] text-[var(--accent)]">GR</span>
          </span>
          <div className="leading-tight">
            <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--text-3)]">Portfolio</span>
            <span className="block text-base font-semibold text-[var(--text)] md:text-lg">Gaspar Rambo</span>
          </div>
        </a>
        <div className="ml-auto flex items-center gap-3">
          {onDownloadCv ? (
            <div ref={downloadMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsDownloadMenuOpen((previous) => !previous)}
                className="group inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text)] transition hover:border-[var(--accent-border)] hover:bg-[var(--surface-hover)] md:px-3 md:py-1.5"
                aria-haspopup="true"
                aria-expanded={isDownloadMenuOpen}
                aria-controls="download-menu"
              >
                <span className="transition-colors group-hover:text-white">{content.nav.download.idle}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`h-4 w-4 transition-transform ${
                    isDownloadMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path d="M6 8.5 10 12.5 14 8.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id="download-menu"
                role="menu"
                className={`absolute right-0 mt-2 w-64 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 text-sm text-[var(--text-2)] shadow-[0_18px_40px_rgba(2,6,18,0.6)] transition-all duration-200 ${
                  isDownloadMenuOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-3)]">
                  {content.nav.download.menuTitle}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload("es")}
                    className="inline-flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 font-medium text-[var(--text)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)]"
                  >
                    <span>{content.nav.download.spanish}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-3)]">PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload("en")}
                    className="inline-flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 font-medium text-[var(--text)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)]"
                  >
                    <span>{content.nav.download.english}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-3)]">PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={toggleMenu}
            className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-border)]"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? content.nav.closeMenuAria : content.nav.openMenuAria}
          >
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.3em] transition-all duration-300 ${
                isMenuOpen ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              {content.nav.menuLabel}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`absolute h-5 w-5 transition-all duration-300 ${
                isMenuOpen ? "scale-100 opacity-100" : "-rotate-45 scale-50 opacity-0"
              }`}
            >
              <path d="M6 6 18 18M18 6 6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 transition duration-500 ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-[rgba(5,9,17,0.72)] backdrop-blur-sm"
          onClick={handleNavigate}
          aria-hidden="true"
        />
        <div
          className={`absolute right-4 top-20 max-h-[calc(100vh-6rem)] w-[calc(100%-2rem)] max-w-sm origin-top-right overflow-y-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 shadow-[0_24px_60px_rgba(2,6,18,0.7)] transition-all duration-300 ${
            isMenuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-4 scale-95 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-3)]">
              {content.nav.exploreTitle}
            </p>
            {renderLanguageSwitcher(
              "flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]",
              "text-[var(--text-3)]"
            )}
          </div>
          <ul className="mt-6 space-y-1">
            {navigationLinks.map((item, i) => (
              <li key={item.href}>
                <a
                  className="group flex items-center justify-between gap-4 rounded-lg px-3 py-3 text-base font-medium text-[var(--text-2)] transition duration-200 hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                  href={item.href}
                  onClick={handleNavigate}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4 shrink-0 text-[var(--text-3)] transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
