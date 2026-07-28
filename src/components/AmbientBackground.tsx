/**
 * Fondo ambiental estático: grilla técnica, halo del acento y viñeteado.
 * Reemplaza al canvas de partículas (120 nodos con enlaces O(n²) por frame).
 * Al ser CSS puro no consume CPU y se comporta igual en mobile.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient pdf-hide" aria-hidden="true">
      <div className="ambient__halo" />
      <div className="ambient__grid" />
      <div className="ambient__vignette" />
    </div>
  );
}
