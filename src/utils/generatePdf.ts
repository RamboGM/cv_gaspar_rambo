import { pdf } from "@react-pdf/renderer";
import { createElement } from "react";
import { CvPdfDocument } from "../components/pdf/CvPdfDocument";
import type { Translation } from "../i18n/translations";
import type { Job } from "../data/experience";
import type { Project } from "../data/projects";
import type { WordpressSite } from "../data/wordpress";

export const generateAndDownloadPdf = async (
  data: Translation,
  experience: Job[],
  projects: Project[],
  wordpressSites: WordpressSite[],
  filename: string,
  avatarUrl?: string | null
) => {
  try {
    const doc = createElement(CvPdfDocument, {
      data,
      experience,
      projects,
      wordpressSites,
      avatarUrl
    });

    const blob = await pdf(doc as any).toBlob();
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
