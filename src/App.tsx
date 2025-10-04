import { useCallback, useRef } from "react";
import type { MutableRefObject } from "react";
import type { Language } from "./types/language";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import { projectsByLanguage } from "./data/projects";
import { jobsByLanguage } from "./data/experience";
import { LanguageProvider } from "./contexts/LanguageProvider";
import { useLanguage } from "./hooks/useLanguage";

const UNSUPPORTED_COLOR_FUNCTION_PATTERN = /(color-mix|oklch|oklab)\s*\(/i;

const containsUnsupportedColorSyntax = (value: string) =>
  UNSUPPORTED_COLOR_FUNCTION_PATTERN.test(value);

const CV_FILENAME_BY_LANGUAGE: Record<Language, string> = {
  es: "cv-gaspar-rambo-es.pdf",
  en: "gaspar-rambo-resume-en.pdf",
};

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MM_TO_POINTS = 72 / 25.4;

const mmToPoints = (millimeters: number) => millimeters * MM_TO_POINTS;

const canvasToBlob = async (
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("No se pudo generar la imagen del CV"));
        }
      },
      type,
      quality,
    );
  });

const sliceCanvasIntoBlobs = async (
  canvas: HTMLCanvasElement,
  sliceHeight: number,
) => {
  const blobs: Blob[] = [];

  if (sliceHeight <= 0) {
    return blobs;
  }

  for (let offset = 0; offset < canvas.height; offset += sliceHeight) {
    const height = Math.min(sliceHeight, canvas.height - offset);
    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = height;
    const context = sliceCanvas.getContext("2d");

    if (!context) {
      throw new Error("No se pudo preparar el lienzo para el PDF");
    }

    context.drawImage(
      canvas,
      0,
      offset,
      canvas.width,
      height,
      0,
      0,
      canvas.width,
      height,
    );

    const blob = await canvasToBlob(sliceCanvas, "image/png", 1);
    blobs.push(blob);
  }

  return blobs;
};

type RuleContainer =
  | CSSStyleSheet
  | (CSSRule & { cssRules?: CSSRuleList; deleteRule?: (index: number) => void });

type InlineStyleMetadata = {
  type: "inline";
  element: Element | null;
};

type RuleStyleMetadata = {
  type: "rule";
  selectorText: string;
  styleSheetHref: string | null;
};

type StyleMetadata = InlineStyleMetadata | RuleStyleMetadata;

const summarizeCssSnippet = (value: string, maxLength = 140) => {
  const compact = value.replace(/\s+/g, " ").trim();

  if (compact.length <= maxLength) {
    return compact;
  }

  return `${compact.slice(0, maxLength - 1)}…`;
};

const logStyleElementSanitization = (
  element: HTMLStyleElement,
  action: "stripped" | "unmodified",
  originalValue: string,
  replacement?: string,
) => {
  if (typeof console === "undefined") {
    return;
  }

  const context = `style element ${describeElement(element)}`;
  const payload = {
    property: "<stylesheet>",
    originalValue: summarizeCssSnippet(originalValue),
    context,
    action,
    replacement: replacement ? summarizeCssSnippet(replacement) : null,
  };

  if (action === "unmodified") {
    console.error("[color-sanitizer] Failed to replace unsupported color", payload);
  } else {
    console.warn("[color-sanitizer] Stripped unsupported color function", payload);
  }
};

const describeElement = (element: Element | null) => {
  if (!element) {
    return "unknown element";
  }

  const tagName = element.tagName.toLowerCase();
  const id = "id" in element && element.id ? `#${element.id}` : "";
  const className =
    "classList" in element && element.classList.length
      ? `.${Array.from(element.classList).join(".")}`
      : "";

  return `${tagName}${id}${className}`;
};

const describeStyleMetadata = (metadata?: StyleMetadata) => {
  if (!metadata) {
    return "unknown source";
  }

  if (metadata.type === "inline") {
    return `inline style on ${describeElement(metadata.element)}`;
  }

  const selector = metadata.selectorText.trim() || "<empty selector>";
  const location = metadata.styleSheetHref ? metadata.styleSheetHref : "inline stylesheet";

  return `rule '${selector}' in ${location}`;
};

const logUnsupportedColor = (
  property: string,
  value: string,
  metadata: StyleMetadata | undefined,
  action: "resolved" | "stripped" | "unmodified",
  replacement?: string,
) => {
  if (typeof console === "undefined") {
    return;
  }

  const context = describeStyleMetadata(metadata);
  const payload = {
    property,
    originalValue: value,
    context,
    action,
    replacement: replacement ?? null,
  };

  if (action === "unmodified") {
    console.error("[color-sanitizer] Failed to replace unsupported color", payload);
  } else if (action === "resolved") {
    console.info("[color-sanitizer] Replaced unsupported color with computed value", payload);
  } else {
    console.warn("[color-sanitizer] Stripped unsupported color function", payload);
  }
};

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

const sanitizeStyleElementTextContent = (
  element: HTMLStyleElement,
  sanitizedSheets: WeakSet<CSSStyleSheet>,
) => {
  const sheet = element.sheet as CSSStyleSheet | null;

  if (sheet && sanitizedSheets.has(sheet)) {
    return;
  }

  const textContent = element.textContent ?? "";

  if (!textContent || !containsUnsupportedColorSyntax(textContent)) {
    return;
  }

  const sanitized = stripUnsupportedColorFunctions(textContent);

  if (sanitized === textContent) {
    logStyleElementSanitization(element, "unmodified", textContent);
    return;
  }

  element.textContent = sanitized;
  logStyleElementSanitization(element, "stripped", textContent, sanitized);
};

const sanitizeStyleDeclaration = (
  style: CSSStyleDeclaration | null | undefined,
  targetDocument: Document,
  metadata?: StyleMetadata,
) => {
  if (!style) {
    return;
  }

  const properties = Array.from({ length: style.length }, (_, index) => style.item(index));

  for (const property of properties) {
    if (!property) {
      continue;
    }

    const value = style.getPropertyValue(property);

    if (!value || !containsUnsupportedColorSyntax(value)) {
      continue;
    }

    const fallback = resolveUnsupportedColor(targetDocument, property, value);

    if (fallback) {
      style.setProperty(property, fallback, style.getPropertyPriority(property));
      logUnsupportedColor(property, value, metadata, "resolved", fallback);
      continue;
    }

    const sanitized = stripUnsupportedColorFunctions(value);

    if (sanitized !== value) {
      style.setProperty(property, sanitized, style.getPropertyPriority(property));
      logUnsupportedColor(property, value, metadata, "stripped", sanitized);
      continue;
    }

    logUnsupportedColor(property, value, metadata, "unmodified");
  }
};

const applySafeFallback = (rule: CSSRule, targetDocument: Document) => {
  if (rule.type !== CSSRule.STYLE_RULE) {
    return;
  }

  const styleRule = rule as CSSStyleRule;

  sanitizeStyleDeclaration(styleRule.style, targetDocument, {
    type: "rule",
    selectorText: styleRule.selectorText,
    styleSheetHref: styleRule.parentStyleSheet?.href ?? null,
  });
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

const sanitizeInlineStyles = (targetDocument: Document) => {
  const elementsWithStyle = Array.from(
    targetDocument.querySelectorAll<HTMLElement>("[style]"),
  );

  const rootElement = targetDocument.documentElement;

  if (rootElement?.hasAttribute("style") && !elementsWithStyle.includes(rootElement as HTMLElement)) {
    elementsWithStyle.push(rootElement as HTMLElement);
  }

  const bodyElement = targetDocument.body;

  if (bodyElement?.hasAttribute("style") && !elementsWithStyle.includes(bodyElement)) {
    elementsWithStyle.push(bodyElement as HTMLElement);
  }

  for (const element of elementsWithStyle) {
    sanitizeStyleDeclaration(element.style, targetDocument, {
      type: "inline",
      element,
    });
  }
};

const removeUnsupportedColorFunctions = (targetDocument: Document | null) => {
  if (!targetDocument) {
    return;
  }

  const sanitizedSheets = new WeakSet<CSSStyleSheet>();
  let styleSheets: RuleContainer[] = [];

  try {
    styleSheets = Array.from(targetDocument.styleSheets) as RuleContainer[];
  } catch {
    styleSheets = [];
  }

  for (const sheet of styleSheets) {
    sanitizeRuleContainer(sheet, targetDocument);

    if (sheet instanceof CSSStyleSheet) {
      sanitizedSheets.add(sheet);
    }
  }

  const styleElements = Array.from(targetDocument.querySelectorAll("style"));

  for (const element of styleElements) {
    sanitizeStyleElementTextContent(element, sanitizedSheets);
  }

  sanitizeInlineStyles(targetDocument);
};

type AppContentProps = {
  pageRef: MutableRefObject<HTMLDivElement | null>;
  onDownloadCv: (language: Language) => Promise<void>;
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
        <Navbar onDownloadCv={onDownloadCv} className="pdf-hide" />
        <main className="mx-auto max-w-6xl px-4">
          <Hero />
          <Contact />
          <About />
          <Education />
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

  const handleDownloadCv = useCallback(async (language: Language) => {
    if (!pageRef.current || typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const element = pageRef.current;

    removeUnsupportedColorFunctions(document);

    const [html2canvasModule, pdfLibModule] = await Promise.all([
      import("html2canvas"),
      import("pdf-lib"),
    ]);
    const html2canvas = html2canvasModule.default;
    const { PDFDocument } = pdfLibModule;

    if (!PDFDocument) {
      throw new Error("No se pudo cargar el generador de PDF");
    }

    const deviceScale =
      typeof window !== "undefined" ? Math.max(window.devicePixelRatio || 1, 3) : 3;
    const rect = element.getBoundingClientRect();
    const canvas = await html2canvas(
      element,
      {
        backgroundColor: "#0f172a",
        useCORS: true,
        imageTimeout: 0,
        scale: deviceScale,
        width: Math.ceil(rect.width),
        height: Math.ceil(element.scrollHeight),
        windowWidth: Math.ceil(rect.width),
        windowHeight: Math.ceil(element.scrollHeight),
        onclone: (clonedDocument: HTMLDocument) => {
          removeUnsupportedColorFunctions(clonedDocument);
          const root = clonedDocument.querySelector("[data-pdf-root]") as HTMLElement | null;
          if (root) {
            root.classList.add("pdf-export");
            root.style.removeProperty("overflow");
            root.style.setProperty("max-height", "none");
          }
          clonedDocument
            .querySelectorAll("canvas")
            .forEach((canvasElement) => canvasElement.remove());
        },
      } as Parameters<typeof html2canvas>[1] & {
        scale: number;
        width: number;
        height: number;
        windowWidth: number;
        windowHeight: number;
      },
    );

    const pageWidthPt = mmToPoints(A4_WIDTH_MM);
    const pageHeightPt = mmToPoints(A4_HEIGHT_MM);
    const renderRatio = pageWidthPt / canvas.width;
    const sliceHeightPx = Math.max(1, Math.floor(pageHeightPt / renderRatio));
    const imageBlobs = await sliceCanvasIntoBlobs(canvas, sliceHeightPx);

    if (!imageBlobs.length) {
      throw new Error("No se pudo generar la captura del CV");
    }

    const pdfDoc = await PDFDocument.create();

    for (const blob of imageBlobs) {
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const image = await pdfDoc.embedPng(bytes);
      const scale = pageWidthPt / image.width;
      const scaledHeight = image.height * scale;
      const page = pdfDoc.addPage([pageWidthPt, pageHeightPt]);

      page.drawImage(image, {
        x: 0,
        y: pageHeightPt - scaledHeight,
        width: pageWidthPt,
        height: scaledHeight,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = CV_FILENAME_BY_LANGUAGE[language] ?? "cv-gaspar-rambo.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  }, []);

  return (
    <LanguageProvider>
      <AppContent pageRef={pageRef} onDownloadCv={handleDownloadCv} />
    </LanguageProvider>
  );
}

