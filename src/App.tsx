import { useCallback, useRef } from "react";
import type { jsPDFOptions } from "jspdf";
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

const containsUnsupportedColorSyntax = (value: string) => value.includes("color-mix(");

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

const resolveColorMix = (targetDocument: Document, value: string) => {
  try {
    const resolver = targetDocument.createElement("span");
    resolver.style.color = value;
    const parent = targetDocument.body ?? targetDocument.documentElement;
    parent?.appendChild(resolver);
    const resolved = targetDocument.defaultView?.getComputedStyle(resolver).color;
    resolver.remove();

    if (resolved && resolved !== "") {
      return resolved;
    }
  } catch {
    /* ignore */
  }

  return undefined;
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

    const fallback = resolveColorMix(targetDocument, value);

    if (!fallback) {
      continue;
    }

    style.setProperty(property, fallback, style.getPropertyPriority(property));
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
    const { jsPDF } = jsPDFModule;
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
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    } as jsPDFOptions);
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
    <div
      ref={pageRef}
      data-pdf-root
      className="relative min-h-screen overflow-hidden bg-[#0f172a] text-[#f1f5f9] antialiased"
    >
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar onDownloadCv={handleDownloadCv} />
        <main className="mx-auto max-w-6xl px-4">
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

