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
            className={`transition-colors ${
              language === code ? "text-[#22d3ee]" : "hover:text-[rgba(255,255,255,0.8)]"
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
      className={`sticky top-0 z-50 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.85)] backdrop-blur ${className}`.trim()}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#" className="relative flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl">
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#22d3ee] via-[#6366f1] to-[#ec4899] opacity-90" />
            <span
              aria-hidden="true"
              className="absolute -inset-[18px] rounded-[32px] bg-gradient-to-br from-[rgba(34,211,238,0.3)] via-[rgba(99,102,241,0.2)] to-transparent blur-2xl"
            />
            <span className="absolute inset-[2px] rounded-[18px] bg-[rgba(15,23,42,0.9)]" />
            <span className="relative text-base font-semibold tracking-[0.2em] text-[#e0f2fe]">GR</span>
          </span>
          <div className="leading-tight">
            <span className="text-[11px] uppercase tracking-[0.5em] text-[rgba(56,189,248,0.7)]">Portfolio</span>
            <span className="block text-lg font-semibold text-white">Gaspar Rambo</span>
          </div>
        </a>

        <ul className="hidden flex-wrap items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-2 py-1 text-sm text-[rgba(255,255,255,0.7)] shadow-[0_18px_40px_rgba(56,189,248,0.25)] backdrop-blur md:flex">
          {navigationLinks.map((item) => (
            <li key={item.href}>
              <a
                className="group relative inline-flex items-center overflow-hidden whitespace-nowrap rounded-full px-4 py-2 font-medium transition-colors duration-300 hover:text-white"
                href={item.href}
              >
                <span className="absolute inset-0 scale-75 rounded-full bg-gradient-to-r from-[rgba(34,211,238,0.1)] via-[rgba(99,102,241,0.1)] to-transparent opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
          {onDownloadCv ? (
            <li className="relative">
              <div ref={downloadMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsDownloadMenuOpen((previous) => !previous)}
                  className="group inline-flex items-center gap-2 rounded-full border border-[rgba(34,211,238,0.45)] bg-[rgba(34,211,238,0.12)] px-4 py-2 font-medium text-[rgba(224,242,254,0.95)] shadow-[0_10px_28px_rgba(34,211,238,0.18)] transition hover:border-[rgba(34,211,238,0.7)] hover:bg-[rgba(34,211,238,0.18)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(34,211,238,0.6)]"
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
                  className={`absolute right-0 mt-2 w-64 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(15,23,42,0.96)] p-4 text-sm text-[rgba(255,255,255,0.85)] shadow-[0_18px_40px_rgba(8,47,73,0.45)] transition-all duration-200 ${
                    isDownloadMenuOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-[rgba(255,255,255,0.5)]">
                    {content.nav.download.menuTitle}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownload("es")}
                      className="inline-flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-3 py-2 font-medium text-white transition hover:border-[rgba(56,189,248,0.6)] hover:bg-[rgba(56,189,248,0.12)]"
                    >
                      <span>{content.nav.download.spanish}</span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.6)]">PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload("en")}
                      className="inline-flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-3 py-2 font-medium text-white transition hover:border-[rgba(56,189,248,0.6)] hover:bg-[rgba(56,189,248,0.12)]"
                    >
                      <span>{content.nav.download.english}</span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.6)]">PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ) : null}
          <li>
            {renderLanguageSwitcher(
              "flex items-center gap-1 whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.4)] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[rgba(255,255,255,0.6)]",
              "text-[rgba(255,255,255,0.3)]",
            )}
          </li>
        </ul>

        <button
          type="button"
          onClick={toggleMenu}
          className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#818cf8] to-[#f472b6] text-slate-900 shadow-[0_18px_40px_rgba(56,189,248,0.4)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(56,189,248,0.6)] md:hidden"
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
      </nav>

      <div
        className={`fixed inset-0 z-50 transition duration-500 ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } md:hidden`}
      >
        <div
          className="absolute inset-0 bg-[rgba(2,6,23,0.6)] backdrop-blur-sm"
          onClick={handleNavigate}
          aria-hidden="true"
        />
        <div
          className={`absolute right-4 top-24 w-[calc(100%-2rem)] max-w-xs origin-top-right overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.95)] p-6 shadow-[0_24px_60px_rgba(8,47,73,0.45)] transition-all duration-500 ${
            isMenuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-4 scale-95 opacity-0"
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute -top-20 -right-16 h-48 w-48 rounded-full bg-[rgba(56,189,248,0.4)] blur-3xl"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-24 -left-12 h-52 w-52 rounded-full bg-[rgba(244,114,182,0.3)] blur-3xl"
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.4em] text-[rgba(255,255,255,0.5)]">{content.nav.exploreTitle}</p>
              {renderLanguageSwitcher(
                "flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[rgba(255,255,255,0.6)]",
                "text-[rgba(255,255,255,0.3)]"
              )}
            </div>
            <ul className="mt-6 space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <a
                    className="group flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-base font-medium text-[rgba(255,255,255,0.8)] transition duration-300 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                    href={item.href}
                    onClick={handleNavigate}
                  >
                    <span>{item.label}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-4 w-4 -rotate-45 text-[rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-0"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              ))}
              {onDownloadCv ? (
                <li>
                  <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-[rgba(255,255,255,0.5)]">
                      {content.nav.download.menuTitle}
                    </p>
                    <div className="mt-3 space-y-2">
                      <button
                        type="button"
                        onClick={() => handleDownload("es")}
                        className="flex w-full items-center justify-between rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-sm font-medium text-white transition hover:border-[rgba(56,189,248,0.6)] hover:bg-[rgba(56,189,248,0.12)]"
                      >
                        <span>{content.nav.download.spanish}</span>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.6)]">PDF</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload("en")}
                        className="flex w-full items-center justify-between rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-sm font-medium text-white transition hover:border-[rgba(56,189,248,0.6)] hover:bg-[rgba(56,189,248,0.12)]"
                      >
                        <span>{content.nav.download.english}</span>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.6)]">PDF</span>
                      </button>
                    </div>
                  </div>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
