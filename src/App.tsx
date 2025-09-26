import { useCallback, useRef } from "react";
import type { MutableRefObject } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import { projectsByLanguage } from "./data/projects";
import { jobsByLanguage } from "./data/experience";
import { LanguageProvider } from "./contexts/LanguageProvider";
import { useLanguage } from "./hooks/useLanguage";

type JsPDFInstance = {
  internal: { pageSize: { getWidth: () => number; getHeight: () => number } };
  addImage: (...parameters: unknown[]) => void;
  addPage: () => void;
  save: (filename: string) => void;
};

type JsPDFConstructor = new (...parameters: unknown[]) => JsPDFInstance;

const UNSUPPORTED_COLOR_FUNCTION_PATTERN = /(color-mix|oklch|oklab)\s*\(/i;

const containsUnsupportedColorSyntax = (value: string) =>
  UNSUPPORTED_COLOR_FUNCTION_PATTERN.test(value);

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

const resolveUnsupportedColor = (targetDocument: Document, property: string, value: string) => {
  try {
    const resolver = targetDocument.createElement("span");
    resolver.style.setProperty(property, value);
    const parent = targetDocument.body ?? targetDocument.documentElement;
    parent?.appendChild(resolver);
    const computedStyle = targetDocument.defaultView?.getComputedStyle(resolver);
    const resolved = computedStyle?.getPropertyValue(property) ?? "";
    resolver.remove();

    if (resolved && resolved.trim() !== "" && !containsUnsupportedColorSyntax(resolved)) {
      return resolved.trim();
    }
  } catch {
    /* ignore */
  }

  return undefined;
};

const stripUnsupportedColorFunctions = (value: string) => {
  const pattern = /((?:color-mix|oklch|oklab)\s*\()/gi;
  let result = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const appendReplacement = (start: number, end: number) => {
    result += value.slice(lastIndex, start);
    result += "rgba(0, 0, 0, 0)";
    lastIndex = end;
  };

  while ((match = pattern.exec(value)) !== null) {
    const start = match.index;
    let end = pattern.lastIndex;
    let depth = 1;

    while (end < value.length && depth > 0) {
      const character = value[end];

      if (character === "(") {
        depth += 1;
      } else if (character === ")") {
        depth -= 1;
      }

      end += 1;
    }

    appendReplacement(start, end);
    pattern.lastIndex = end;
  }

  result += value.slice(lastIndex);

  return result;
};

const applySafeFallback = (rule: CSSRule, targetDocument: Document) => {
  if (rule.type !== CSSRule.STYLE_RULE) {
    return;
  }

  const styleRule = rule as CSSStyleRule;
  const { style } = styleRule;
  const properties = Array.from({ length: style.length }, (_, index) => style.item(index));

  for (const property of properties) {
    const value = style.getPropertyValue(property);

    if (!value || !containsUnsupportedColorSyntax(value)) {
      continue;
    }

    const fallback = resolveUnsupportedColor(targetDocument, property, value);

    if (fallback) {
      style.setProperty(property, fallback, style.getPropertyPriority(property));
      continue;
    }

    const sanitized = stripUnsupportedColorFunctions(value);

    if (sanitized !== value) {
      style.setProperty(property, sanitized, style.getPropertyPriority(property));
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

const sanitizeRuleContainer = (container: RuleContainer, targetDocument: Document) => {
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
      sanitizeRuleContainer(rule, targetDocument);
    }

    if (rule.type === CSSRule.STYLE_RULE) {
      applySafeFallback(rule, targetDocument);
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
    sanitizeRuleContainer(sheet, targetDocument);
  }
};

type AppContentProps = {
  pageRef: MutableRefObject<HTMLDivElement | null>;
  onDownloadCv: () => Promise<void>;
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
      <div className="relative z-10">
        <Navbar onDownloadCv={onDownloadCv} />
        <main className="mx-auto max-w-6xl px-4">
          <Hero />
          <About />
          <Projects items={projectsByLanguage[language]} />
          <Experience items={jobsByLanguage[language]} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadCv = useCallback(async () => {
    if (!pageRef.current) {
      return;
    }

    const element = pageRef.current;
    const [html2canvasModule, jsPDFModule] = (await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ])) as [typeof import("html2canvas"), typeof import("jspdf")];
    const html2canvas = html2canvasModule.default;
    const JsPDFConstructor =
      (jsPDFModule as unknown as { jsPDF?: JsPDFConstructor }).jsPDF ??
      (jsPDFModule as unknown as { default: JsPDFConstructor }).default;

    if (!JsPDFConstructor) {
      throw new Error("No se pudo cargar el generador de PDF");
    }
    const scale = Math.min(
      Math.max(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2),
      3,
    );

    const canvas = await html2canvas(
      element,
      {
        background: "#0f172a",
        useCORS: true,
        imageTimeout: 0,
        scale,
        onclone: (clonedDocument: HTMLDocument) => {
          removeUnsupportedColorFunctions(clonedDocument);
          const root = clonedDocument.querySelector("[data-pdf-root]") as HTMLElement | null;
          if (root) {
            root.classList.add("pdf-export");
          }
          clonedDocument
            .querySelectorAll("canvas")
            .forEach((canvasElement) => canvasElement.remove());
        },
      } as Parameters<typeof html2canvas>[1] & { scale: number },
    );

    const imageData = canvas.toDataURL("image/jpeg", 0.92);
    const pdf = new JsPDFConstructor({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imageData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imageData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("cv-gaspar-rambo.pdf");
  }, []);

  return (
    <LanguageProvider>
      <AppContent pageRef={pageRef} onDownloadCv={handleDownloadCv} />
    </LanguageProvider>
  );
}

