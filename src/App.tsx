import { useCallback, useRef } from "react";
import type { MutableRefObject } from "react";

import Navbar from "./components/Navbar";
import FloatingWhatsappButton from "./components/FloatingWhatsappButton";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import Hero from "./sections/Hero";
import Contact from "./sections/Contact";
import About from "./sections/About";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import { projectsByLanguage } from "./data/projects";
import { jobsByLanguage } from "./data/experience";
import { LanguageProvider } from "./contexts/LanguageProvider";
import { useLanguage } from "./hooks/useLanguage";
import type { Language } from "./types/language";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import BudgetPage from "./pages/BudgetPage";
import { budgets } from "./data/budgets";

const CV_FILES: Record<Language, { path: string; filename: string }> = {
  es: {
    path: "/documents/cv-gaspar-rambo-es.pdf",
    filename: "cv-gaspar-rambo-es.pdf",
  },
  en: {
    path: "/documents/gaspar-rambo-resume-en.pdf",
    filename: "gaspar-rambo-resume-en.pdf",
  },
};

const BUDGETS_BASE_PATH = "/presupuestos";

const sanitizeSlug = (slug: string) => slug.replace(/\/+$/, "").replace(/^\/+/, "");

const getBudgetSlugFromPath = (pathname: string) => {
  const normalizedPath = pathname.toLowerCase();

  if (!normalizedPath.startsWith(BUDGETS_BASE_PATH)) {
    return null;
  }

  const slugPart = normalizedPath.slice(BUDGETS_BASE_PATH.length);
  const slug = sanitizeSlug(slugPart);

  return slug || null;
};

type AppContentProps = {
  pageRef: MutableRefObject<HTMLDivElement | null>;
  onDownloadCv: (language: Language) => void;
};

const BudgetNotFound = ({ slug }: { slug: string | null }) => (
  <div className="flex min-h-screen items-center justify-center bg-[#0f172a] px-4 text-[#f8fafc]">
    <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-[#38bdf8]">Presupuesto</p>
      <h1 className="mt-3 text-3xl font-bold">No encontrado</h1>
      <p className="mt-4 text-white/70">
        No existe un presupuesto registrado para
        {" "}
        <span className="font-semibold">
          {slug ? slug.replace(/-/g, " ") : "esta ruta"}
        </span>
        .
      </p>
      <p className="mt-2 text-white/60">
        Agrega una entrada en <code>src/data/budgets.ts</code> usando el slug deseado para generar una página personalizada.
      </p>
    </div>
  </div>
);

function AppContent({ pageRef, onDownloadCv }: AppContentProps) {
  const { language } = useLanguage();

  return (
    <div
      ref={pageRef}
      data-pdf-root
      className="relative min-h-screen overflow-hidden bg-[#0f172a] text-[#f1f5f9] antialiased"
    >
      <ParticleBackground />
      <FloatingWhatsappButton />
      <div className="relative z-10">
        <Navbar onDownloadCv={onDownloadCv} className="pdf-hide" />
        <main className="mx-auto max-w-6xl px-4">
          <Hero />
          <Contact />
          <About />
          <Education />
          <Certifications />
          <Projects items={projectsByLanguage[language]} />
          <Experience items={jobsByLanguage[language]} />
        </main>
        <Footer className="pdf-hide" />
      </div>
    </div>
  );
}

export default function App() {
  const budgetSlug =
    typeof window !== "undefined" ? getBudgetSlugFromPath(window.location.pathname) : null;
  const budgetData = budgetSlug ? budgets[budgetSlug] : null;

  if (budgetSlug) {
    if (budgetData) {
      return <BudgetPage data={budgetData} />;
    }

    return <BudgetNotFound slug={budgetSlug} />;
  }

  const pageRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadCv = useCallback((language: Language) => {
    if (typeof document === "undefined") {
      return;
    }

    const file = CV_FILES[language];

    if (!file) {
      return;
    }

    const link = document.createElement("a");
    link.href = file.path;
    link.download = file.filename;
    link.rel = "noopener";
    link.type = "application/pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <LanguageProvider>
      <AppContent pageRef={pageRef} onDownloadCv={handleDownloadCv} />
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
}
