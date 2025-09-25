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
  "rgba(236, 72, 153, 0.65)",
  "rgba(99, 102, 241, 0.55)",
  "rgba(34, 211, 238, 0.55)",
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
      const count = Math.min(120, Math.ceil(area / 18000));
      particlesRef.current = new Array(count).fill(null).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.25;
        const baseVx = Math.cos(angle) * speed;
        const baseVy = Math.sin(angle) * speed;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 1.1 + Math.random() * 1.6,
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

      for (let i = 0; i < particlesRef.current.length; i += 1) {
        const particleA = particlesRef.current[i];
        for (let j = i + 1; j < particlesRef.current.length; j += 1) {
          const particleB = particlesRef.current[j];
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MAX_DISTANCE) {
            const opacity = (1 - distance / MAX_DISTANCE) * 0.2;
            context.strokeStyle = `rgba(99, 102, 241, ${opacity.toFixed(3)})`;
            context.lineWidth = 0.65;
            context.beginPath();
            context.moveTo(particleA.x, particleA.y);
            context.lineTo(particleB.x, particleB.y);
            context.stroke();
          }
        }
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full pdf-hide"
      aria-hidden="true"
    />
  );
}
