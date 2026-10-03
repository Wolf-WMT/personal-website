import { useEffect, useRef } from 'react';

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReduced) return;

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Matrix rain columns
    const fontSize = isMobile ? 16 : 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);
    const chars = '01<>/\\[]{}=+*-_|#$%@&';
    const dropSpeeds = drops.map(() => 0.3 + Math.random() * 0.4);

    let lastTime = 0;
    const interval = isMobile ? 120 : 80;

    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw);

      if (time - lastTime < interval) return;
      lastTime = time;

      ctx.fillStyle = 'rgba(5, 8, 7, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;

        // Lead character brighter
        if (Math.random() > 0.975) {
          ctx.fillStyle = 'rgba(74, 222, 128, 0.7)';
        } else {
          ctx.fillStyle = 'rgba(34, 211, 238, 0.08)';
        }
        ctx.fillText(text, i * fontSize, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += dropSpeeds[i];
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
