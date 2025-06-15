import { useRef, useEffect } from 'react';

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle configuration
    const particleCount = 50;
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      directionX: number;
      directionY: number;
      opacity: number;
    }[] = [];

    const colors = ['#1f528c', '#3e6aa7', '#4d76b2', '#8daad5'];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 4 + 1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.1,
        directionX: Math.random() * 0.6 - 0.3,
        directionY: Math.random() * 0.6 - 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move particles
        p.x += p.directionX;
        p.y += p.directionY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) {
          p.directionX *= -1;
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.directionY *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = '#1f528c';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-transparent -z-10"
    />
  );
};

export default Particles;