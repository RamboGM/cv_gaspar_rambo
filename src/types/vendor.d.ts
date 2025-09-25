declare module "html2canvas" {
  export interface Html2CanvasOptions {
    background?: string;
    scale?: number;
    [key: string]: unknown;
  }

  export default function html2canvas(
    element: HTMLElement,
    options?: Html2CanvasOptions,
  ): Promise<HTMLCanvasElement>;
}

declare module "jspdf" {
  interface PageSize {
    getWidth(): number;
    getHeight(): number;
  }

  interface Internal {
    pageSize: PageSize;
  }

  export default class JsPDF {
    constructor(orientation?: string, unit?: string, format?: string | number[]);
    addImage(
      imageData: string | HTMLImageElement | HTMLCanvasElement,
      format: string,
      x: number,
      y: number,
      width: number,
      height: number,
    ): void;
    addPage(): void;
    save(filename?: string): void;
    internal: Internal;
  }
}
