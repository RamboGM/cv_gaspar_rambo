import { Fragment, useEffect, useState } from "react";

import { useLanguage } from "../hooks/useLanguage";
import type { Language } from "../types/language";

type NavbarProps = {
  onDownloadCv?: () => Promise<void> | void;
};

const AVAILABLE_LANGUAGES: Language[] = ["en", "es"];

export default function Navbar({ onDownloadCv }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
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
  const handleNavigate = () => setIsMenuOpen(false);
  const handleDownload = async () => {
    if (!onDownloadCv) {
      return;
    }

    setIsDownloading(true);

    try {
      await onDownloadCv();
    } finally {
      setIsDownloading(false);
    }
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
              language === code ? "text-[#22d3ee]" : "hover:text-white/80"
            }`}
          >
            {code.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(15,23,42,0.85)] backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#" className="relative flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl">
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#22d3ee] via-[#6366f1] to-[#ec4899] opacity-90" />
            <span
              aria-hidden="true"
              className="absolute -inset-[18px] rounded-[32px] bg-gradient-to-br from-[#22d3ee]/30 via-[#6366f1]/20 to-transparent blur-2xl"
            />
            <span className="absolute inset-[2px] rounded-[18px] bg-[#0f172a]/90" />
            <span className="relative text-base font-semibold tracking-[0.2em] text-[#e0f2fe]">GR</span>
          </span>
          <div className="leading-tight">
            <span className="text-[11px] uppercase tracking-[0.5em] text-[#38bdf8]/70">Portfolio</span>
            <span className="block text-lg font-semibold text-white">Gaspar Rambo</span>
          </div>
        </a>

        <ul className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-sm text-white/70 shadow-[0_18px_40px_rgba(56,189,248,0.25)] backdrop-blur md:flex">
          {navigationLinks.map((item) => (
            <li key={item.href}>
              <a
                className="group relative inline-flex items-center overflow-hidden rounded-full px-4 py-2 font-medium transition-colors duration-300 hover:text-white"
                href={item.href}
              >
                <span className="absolute inset-0 scale-75 rounded-full bg-gradient-to-r from-[#22d3ee]/10 via-[#6366f1]/10 to-transparent opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
          <li>{renderLanguageSwitcher("flex items-center gap-1 rounded-full border border-white/10 bg-[#0f172a]/40 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60", "text-white/30")}</li>
          <li>
            <button
              type="button"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#22d3ee] via-[#6366f1] to-[#ec4899] px-4 py-2 font-medium text-[#0f172a] shadow-[0_16px_32px_rgba(99,102,241,0.35)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <span className="relative">
                {isDownloading ? content.nav.download.loading : content.nav.download.idle}
              </span>
            </button>
          </li>
        </ul>

        <button
          type="button"
          onClick={toggleMenu}
          className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#818cf8] to-[#f472b6] text-slate-900 shadow-[0_18px_40px_rgba(56,189,248,0.4)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]/60 focus:ring-offset-2 focus:ring-offset-[#0f172a] md:hidden"
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
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          onClick={handleNavigate}
          aria-hidden="true"
        />
        <div
          className={`absolute right-4 top-24 w-[calc(100%-2rem)] max-w-xs origin-top-right overflow-hidden rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.95)] p-6 shadow-[0_24px_60px_rgba(8,47,73,0.45)] transition-all duration-500 ${
            isMenuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-4 scale-95 opacity-0"
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute -top-20 -right-16 h-48 w-48 rounded-full bg-[#38bdf8]/40 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-24 -left-12 h-52 w-52 rounded-full bg-[#f472b6]/30 blur-3xl"
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">{content.nav.exploreTitle}</p>
              {renderLanguageSwitcher(
                "flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60",
                "text-white/30"
              )}
            </div>
            <ul className="mt-6 space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <a
                    className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3 text-base font-medium text-white/80 transition duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
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
                      className="h-4 w-4 -rotate-45 text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-0"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#22d3ee] via-[#6366f1] to-[#ec4899] px-4 py-3 font-semibold text-[#0f172a] shadow-[0_18px_40px_rgba(99,102,241,0.35)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80"
              onClick={async () => {
                await handleDownload();
                handleNavigate();
              }}
              disabled={isDownloading}
            >
              {isDownloading ? content.nav.download.loading : content.nav.download.idle}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
