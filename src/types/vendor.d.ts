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

