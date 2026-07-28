import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  /** Numeral editorial ("01", "02", ...). Da jerarquía y sentido de recorrido. */
  index: string;
  title: string;
  subtitle?: string;
  /** Banda de fondo alterna, para dar ritmo al scroll sin usar color. */
  band?: boolean;
  children: ReactNode;
};

/**
 * Sección full-bleed con encabezado editorial y contenedor interno.
 * Centraliza el estilo de los títulos: antes cada sección repetía su propio
 * gradiente inline y el sistema quedaba desalineado.
 */
export default function Section({ id, index, title, subtitle, band = false, children }: SectionProps) {
  return (
    <section id={id} className={`section${band ? " section--band" : ""}`}>
      <div className="section__inner">
        <header>
          <div className="section-head__meta">
            <span className="section-head__index">{index}</span>
            <span className="section-head__rule" />
          </div>
          <h2 className="section-head__title">{title}</h2>
          {subtitle ? <p className="section-head__subtitle">{subtitle}</p> : null}
        </header>
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  );
}
