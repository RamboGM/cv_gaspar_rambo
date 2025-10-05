import { useEffect, useState } from "react";

const WHATSAPP_LINK =
  "https://wa.me/542804342550?text=Hola%20Gaspar%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20tener%20m%C3%A1s%20informaci%C3%B3n.";

export default function FloatingWhatsappButton() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    "fixed bottom-6 right-4 z-40 flex max-w-xs flex-col gap-3 rounded-3xl bg-[#128C7E]/95 p-4 text-white shadow-[0_20px_60px_rgba(18,140,126,0.35)] transition-all duration-500 ease-out sm:bottom-8 sm:right-8";

  const containerStateClasses = isVisible
    ? "translate-x-0 opacity-100"
    : "pointer-events-none translate-x-6 opacity-0";

  return (
    <aside
      aria-live="polite"
      className={`${containerBaseClasses} ${containerStateClasses}`}
      role="dialog"
    >
      <p className="text-sm font-semibold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        Si querés mayor información escribime
      </p>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-sm font-semibold text-[#0f172a] shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[#1ebe5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        aria-label="Abrir conversación de WhatsApp"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-[#0f172a]"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M16.008 4C9.388 4 4 9.086 4 15.477c0 2.77.98 5.32 2.624 7.352L4 28l5.336-1.594A12.24 12.24 0 0 0 16.008 27C22.628 27 28 21.867 28 15.477 28 9.086 22.628 4 16.008 4Zm6.828 17.71c-.282.79-1.644 1.5-2.256 1.542-.59.04-1.3.057-2.094-.133-.482-.115-1.098-.357-1.898-.698-3.341-1.436-5.516-4.784-5.685-5.01-.167-.227-1.357-1.81-1.357-3.453 0-1.643.858-2.452 1.16-2.786.3-.333.66-.417.88-.417.22 0 .44.002.634.012.203.01.48-.078.75.573.282.68.962 2.35 1.047 2.522.083.173.14.38.028.607-.11.227-.166.37-.327.568-.162.197-.344.44-.49.59-.162.163-.33.34-.142.668.188.326.834 1.376 1.79 2.226 1.229 1.085 2.264 1.42 2.59 1.576.326.155.518.132.71-.08.192-.212.82-.96 1.038-1.29.218-.33.45-.277.75-.163.3.115 1.92.908 2.247 1.073.326.165.544.247.624.386.08.138.08.797-.202 1.585Z" />
        </svg>
        Escribime por WhatsApp
      </a>
    </aside>
  );
}
