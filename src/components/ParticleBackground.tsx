import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  color: string;
};

const colors = [
  "rgba(244, 63, 94, 0.18)",
  "rgba(139, 92, 246, 0.16)",
  "rgba(16, 185, 129, 0.14)",
  "rgba(250, 204, 21, 0.18)",
];

const MAX_DISTANCE = 140;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      const area = canvas.width * canvas.height;
      const count = Math.min(220, Math.ceil(area / 12000));
      particlesRef.current = new Array(count).fill(null).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.25;
        const baseVx = Math.cos(angle) * speed;
        const baseVy = Math.sin(angle) * speed;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 0.8 + Math.random() * 1.3,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          color: colors[Math.floor(Math.random() * colors.length)],
        } satisfies Particle;
      });
    };

    setSize();
    window.addEventListener("resize", setSize);

    let pointerTimer: number | undefined;

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
      if (pointerTimer) {
        window.clearTimeout(pointerTimer);
      }
      pointerTimer = window.setTimeout(() => {
        pointerRef.current.active = false;
      }, 160);
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particlesRef.current) {
        const { x, y } = particle;
        const dx = pointerRef.current.x - x;
        const dy = pointerRef.current.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (pointerRef.current.active && distance < MAX_DISTANCE && distance > 0) {
          const influence = (MAX_DISTANCE - distance) / MAX_DISTANCE;
          particle.vx += (dx / distance) * influence * 0.12;
          particle.vy += (dy / distance) * influence * 0.12;
        } else {
          particle.vx += (particle.baseVx - particle.vx) * 0.02;
          particle.vy += (particle.baseVy - particle.vy) * 0.02;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        context.beginPath();
        context.fillStyle = particle.color;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      animationRef.current = window.requestAnimationFrame(draw);
    };

    animationRef.current = window.requestAnimationFrame(draw);

    return () => {
      if (pointerTimer) {
        window.clearTimeout(pointerTimer);
      }
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", setSize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
