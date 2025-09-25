import { useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import { projects } from "./data/projects";
import { jobs } from "./data/experience";

const containsUnsupportedColorFunction = (cssText: string) =>
  cssText.includes("color-mix(") && /okl(?:ab|ch)/.test(cssText);

type RuleContainer =
  | CSSStyleSheet
  | (CSSRule & { cssRules?: CSSRuleList; deleteRule?: (index: number) => void });

const getCssRules = (container: RuleContainer) => {
  try {
    if ("cssRules" in container) {
      return container.cssRules ?? undefined;
    }
  } catch {
    return undefined;
  }

  return undefined;
};

const applySafeFallback = (rule: CSSRule) => {
  if (rule.type === CSSRule.STYLE_RULE) {
    try {
      (rule as CSSStyleRule).style.color = "rgba(148, 163, 184, 0.5)";
    } catch {
      /* ignore */
    }
  }
};

const isRuleContainer = (
  value: CSSRule | RuleContainer,
): value is RuleContainer & { cssRules: CSSRuleList; deleteRule?: (index: number) => void } =>
  Boolean(
    value &&
      typeof value === "object" &&
      "cssRules" in value &&
      (value as RuleContainer).cssRules !== undefined,
  );

const sanitizeRuleContainer = (container: RuleContainer) => {
  const rules = getCssRules(container);

  if (!rules) {
    return;
  }

  for (let index = rules.length - 1; index >= 0; index -= 1) {
    const rule = rules[index];

    if (!rule) {
      continue;
    }

    if (isRuleContainer(rule)) {
      sanitizeRuleContainer(rule);
    }

    if (containsUnsupportedColorFunction(rule.cssText)) {
      if ("deleteRule" in container && typeof container.deleteRule === "function") {
        try {
          container.deleteRule(index);
          continue;
        } catch {
          // Fall through to apply the safe fallback instead.
        }
      }

      applySafeFallback(rule);
    }
  }
};

const removeUnsupportedColorFunctions = (targetDocument: Document | null) => {
  if (!targetDocument) {
    return;
  }

  let styleSheets: RuleContainer[];

  try {
    styleSheets = Array.from(targetDocument.styleSheets) as RuleContainer[];
  } catch {
    return;
  }

  for (const sheet of styleSheets) {
    sanitizeRuleContainer(sheet);
  }
};

export default function App() {
  const mainRef = useRef<HTMLElement | null>(null);

  const handleDownloadCv = useCallback(async () => {
    if (!mainRef.current) {
      return;
    }

    const element = mainRef.current;
    const [{ default: html2canvas }, { default: JsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);
    const scale = Math.max(
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      2,
    );

    const canvas = await html2canvas(
      element,
      {
        background: "#0f172a",
        scale,
        onclone: (clonedDocument) => {
          removeUnsupportedColorFunctions(clonedDocument);
        },
      } as Parameters<typeof html2canvas>[1] & { scale: number },
    );

    const imageData = canvas.toDataURL("image/png");
    const pdf = new JsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imageData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imageData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("cv-gaspar-rambo.pdf");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] text-[#f1f5f9] antialiased">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar onDownloadCv={handleDownloadCv} />
        <main ref={mainRef} className="mx-auto max-w-6xl px-4">
          <Hero />
          <About />
          <Projects items={projects} />
          <Experience items={jobs} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

