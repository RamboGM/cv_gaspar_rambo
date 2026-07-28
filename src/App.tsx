import { useCallback, useRef } from "react";
import type { MutableRefObject } from "react";

import Navbar from "./components/Navbar";
import FloatingWhatsappButton from "./components/FloatingWhatsappButton";
import Footer from "./components/Footer";
import AmbientBackground from "./components/AmbientBackground";
import Hero from "./sections/Hero";
import Contact from "./sections/Contact";
import About from "./sections/About";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Projects from "./sections/Projects";
import WordPress from "./sections/WordPress";
import Experience from "./sections/Experience";
import { projectsByLanguage } from "./data/projects";
import { wordpressSitesByLanguage } from "./data/wordpress";
import { jobsByLanguage } from "./data/experience";
import { LanguageProvider } from "./contexts/LanguageProvider";
import { useLanguage } from "./hooks/useLanguage";
import type { Language } from "./types/language";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import BudgetPage from "./pages/BudgetPage";
import { budgets } from "./data/budgets";

import { generateAndDownloadPdf } from "./utils/generatePdf";
import { translations } from "./i18n/translations";

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
  <div className="flex min-h-screen items-center justify-center px-5">
    <div className="surface-card w-full max-w-xl p-8 text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
        Presupuesto
      </p>
      <h1 className="mt-3 text-3xl font-bold">No encontrado</h1>
      <p className="mt-4">
        No existe un presupuesto registrado para{" "}
        <span className="font-semibold text-[var(--text)]">
          {slug ? slug.replace(/-/g, " ") : "esta ruta"}
        </span>
        .
      </p>
      <p className="mt-2 text-sm text-[var(--text-3)]">
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
      className="relative min-h-screen overflow-x-hidden"
    >
      <AmbientBackground />
      <FloatingWhatsappButton />
      <div className="relative z-10">
        <Navbar onDownloadCv={onDownloadCv} className="pdf-hide" />
        <main>
          <Hero />
          <Contact />
          <About />
          <Education />
          <Certifications />
          <Projects items={projectsByLanguage[language]} />
          <WordPress items={wordpressSitesByLanguage[language]} />
          <Experience items={jobsByLanguage[language]} />
        </main>
        <Footer className="pdf-hide" />
      </div>
    </div>
  );
}

const heroAvatarImage = new URL("./pic_0231.png", import.meta.url).href;

export default function App() {
  const budgetSlug =
    typeof window !== "undefined" ? getBudgetSlugFromPath(window.location.pathname) : null;
  const budgetData = budgetSlug ? budgets[budgetSlug] : null;
  const pageRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadCv = useCallback(async (language: Language) => {
    const data = translations[language];
    const experience = jobsByLanguage[language];
    const projects = projectsByLanguage[language];
    const wordpressSites = wordpressSitesByLanguage[language];
    const filename = `cv-gaspar-rambo-${language}.pdf`;
    const avatarUrl = heroAvatarImage.trim().length > 0 ? heroAvatarImage : null;

    try {
      await generateAndDownloadPdf(data, experience, projects, wordpressSites, filename, avatarUrl);
    } catch (error) {
      alert("Error generating PDF. Please try again.");
    }
  }, []);

  const content = budgetSlug
    ? budgetData
      ? <BudgetPage data={budgetData} />
      : <BudgetNotFound slug={budgetSlug} />
    : <AppContent pageRef={pageRef} onDownloadCv={handleDownloadCv} />;

  return (
    <LanguageProvider>
      {content}
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
}
