import { useEffect, useState } from "react";

import { useLanguage } from "../hooks/useLanguage";

const WHATSAPP_LINK =
  "https://wa.me/542804342550?text=Hola%20Gaspar%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20tener%20m%C3%A1s%20informaci%C3%B3n.";

export default function FloatingWhatsappButton() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { content } = useLanguage();
  const whatsappCopy = content.floatingWhatsapp;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsMounted(true);
    }, 30000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isMounted]);

  const containerBaseClasses =
    "fixed right-0 top-1/2 z-40 -translate-y-1/2 transform transition-all duration-500 ease-out";

  const containerStateClasses = isVisible
    ? "translate-x-0 opacity-100"
    : "pointer-events-none translate-x-full opacity-0";

  return (
    <div
      aria-live="polite"
      className={`${containerBaseClasses} ${containerStateClasses}`}
      role="complementary"
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex min-h-[110px] items-center justify-center rounded-l-3xl border border-white/20 bg-[#25D366] px-2 py-4 text-[#0f172a] shadow-[0_18px_40px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:translate-x-1 hover:bg-[#1ebe5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
        aria-label={whatsappCopy.ariaLabel}
      >
        <span className="sr-only">{whatsappCopy.ariaLabel}</span>
        <svg
          aria-hidden="true"
          className="absolute -top-3 right-1 h-5 w-5 text-[#0f172a] drop-shadow-sm"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M16.008 4C9.388 4 4 9.086 4 15.477c0 2.77.98 5.32 2.624 7.352L4 28l5.336-1.594A12.24 12.24 0 0 0 16.008 27C22.628 27 28 21.867 28 15.477 28 9.086 22.628 4 16.008 4Zm6.828 17.71c-.282.79-1.644 1.5-2.256 1.542-.59.04-1.3.057-2.094-.133-.482-.115-1.098-.357-1.898-.698-3.341-1.436-5.516-4.784-5.685-5.01-.167-.227-1.357-1.81-1.357-3.453 0-1.643.858-2.452 1.16-2.786.3-.333.66-.417.88-.417.22 0 .44.002.634.012.203.01.48-.078.75.573.282.68.962 2.35 1.047 2.522.083.173.14.38.028.607-.11.227-.166.37-.327.568-.162.197-.344.44-.49.59-.162.163-.33.34-.142.668.188.326.834 1.376 1.79 2.226 1.229 1.085 2.264 1.42 2.59 1.576.326.155.518.132.71-.08.192-.212.82-.96 1.038-1.29.218-.33.45-.277.75-.163.3.115 1.92.908 2.247 1.073.326.165.544.247.624.386.08.138.08.797-.202 1.585Z" />
        </svg>
        <span
          aria-hidden="true"
          className="text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {whatsappCopy.label}
        </span>
      </a>
    </div>
  );
}
