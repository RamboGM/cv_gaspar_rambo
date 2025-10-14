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

type AppContentProps = {
  pageRef: MutableRefObject<HTMLDivElement | null>;
  onDownloadCv: (language: Language) => void;
};

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
