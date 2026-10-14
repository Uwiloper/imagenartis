import { useEffect, useRef } from 'react';

interface InteractiveDotCanvasProps {
  className?: string;
  dotColor?: string;
  gap?: number;
  radius?: number;
  repelRadius?: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  amplitude: number;
  waveWidth: number;
  decay: number;
}

export default function InteractiveDotCanvas({
  className = '',
  dotColor = 'rgba(255, 255, 255, 0.45)',
  gap = 26,
  radius = 1.8,
  repelRadius = 85,
}: InteractiveDotCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Dot {
      ox: number;
      oy: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      phase: number;
      baseRadius: number;
    }

    let dots: Dot[] = [];
    const ripples: Ripple[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const initDots = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      dots = [];
      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);
      const offsetX = (width - cols * gap) / 2;
      const offsetY = (height - rows * gap) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = offsetX + i * gap;
          const y = offsetY + j * gap;
          dots.push({
            ox: x,
            oy: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            phase: Math.random() * Math.PI * 2,
            baseRadius: radius,
          });
        }
      }
    };

    initDots();

    const resizeObserver = new ResizeObserver(() => {
      initDots();
    });
    resizeObserver.observe(canvas);

    // Seguimiento suave del cursor
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left - 40 &&
        e.clientX <= rect.right + 40 &&
        e.clientY >= rect.top - 40 &&
        e.clientY <= rect.bottom + 40
      ) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        if (
          touch.clientX >= rect.left - 40 &&
          touch.clientX <= rect.right + 40 &&
          touch.clientY >= rect.top - 40 &&
          touch.clientY <= rect.bottom + 40
        ) {
          mouse.x = touch.clientX - rect.left;
          mouse.y = touch.clientY - rect.top;
          mouse.active = true;
        } else {
          mouse.active = false;
        }
      }
    };

    // Efecto sutil y suave de gota de agua al hacer CLICK / TAP
    const triggerWaterRipple = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;
        ripples.push({
          x: clickX,
          y: clickY,
          radius: 0,
          maxRadius: Math.max(rect.width, rect.height) * 1.0,
          speed: 380, // Expansión suave y fluida
          amplitude: 8, // Amplitud ligera y delicada
          waveWidth: 42,
          decay: 1.0,
        });
      }
    };

    const handlePointerDown = (e: PointerEvent | MouseEvent) => {
      triggerWaterRipple(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        triggerWaterRipple(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    document.addEventListener('mouseleave', handlePointerLeave);

    let lastTime = performance.now();
    let startTime = performance.now();

    const render = (currentTime: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const dt = Math.min((currentTime - lastTime) * 0.001, 0.033);
      lastTime = currentTime;
      const elapsed = (currentTime - startTime) * 0.001;

      // Actualizar ondas de gota de agua activas
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed * dt;
        const progress = rip.radius / rip.maxRadius;
        rip.decay = Math.max(0, 1 - progress);

        if (rip.decay <= 0.005 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Dibujar anillos delicados de la onda de gota de agua
      for (let r = 0; r < ripples.length; r++) {
        const rip = ripples[r];
        if (rip.decay > 0.02) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${rip.decay * 0.22})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();

          // Segunda onda concéntrica eco (reflejo suave)
          if (rip.radius > 28) {
            ctx.beginPath();
            ctx.arc(rip.x, rip.y, Math.max(0, rip.radius - 28), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${rip.decay * 0.10})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Actualizar y dibujar puntos con física sutil, suave y ligera
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Sutil flotación de descanso (micro-movimiento suave)
        const floatX = Math.sin(elapsed + dot.phase) * 0.5;
        const floatY = Math.cos(elapsed * 1.1 + dot.phase) * 0.5;
        const targetX = dot.ox + floatX;
        const targetY = dot.oy + floatY;

        // Movimiento suave y ligero al mover el ratón ("evitando el mouse")
        if (mouse.active) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < repelRadius && dist > 0) {
            // Empuje delicado y gradual
            const force = Math.pow((repelRadius - dist) / repelRadius, 2.2);
            const angle = Math.atan2(dy, dx);
            const push = force * 2.8; // Suave y ligero
            dot.vx += Math.cos(angle) * push;
            dot.vy += Math.sin(angle) * push;
          }
        }

        // Efecto físico sutil de la onda de gota de agua sobre cada punto
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const rdx = dot.x - rip.x;
          const rdy = dot.y - rip.y;
          const rdist = Math.hypot(rdx, rdy);
          const distFromCrest = rdist - rip.radius;

          if (Math.abs(distFromCrest) < rip.waveWidth) {
            const wavePos = distFromCrest / rip.waveWidth;
            const waveFactor = Math.sin(wavePos * Math.PI) * rip.amplitude * rip.decay;
            const angle = Math.atan2(rdy, rdx);
            dot.vx += Math.cos(angle) * waveFactor * 0.16;
            dot.vy += Math.sin(angle) * waveFactor * 0.16;
          }
        }

        // Retorno elástico suave y aterciopelado
        const springK = 0.038;
        const damping = 0.91;
        dot.vx += (targetX - dot.x) * springK;
        dot.vy += (targetY - dot.y) * springK;
        dot.vx *= damping;
        dot.vy *= damping;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Renderizar punto con escala y brillo discretos
        const displacement = Math.hypot(dot.x - dot.ox, dot.y - dot.oy);
        const dynamicRadius = Math.min(dot.baseRadius + displacement * 0.02, dot.baseRadius * 1.3);
        const dynamicAlpha = Math.min(0.42 + displacement * 0.02, 0.85);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dynamicRadius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor.replace(/[\d.]+\)$/, `${dynamicAlpha})`);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [gap, radius, repelRadius, dotColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
    />
  );
}
