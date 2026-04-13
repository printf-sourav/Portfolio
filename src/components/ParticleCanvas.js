/**
 * ParticleCanvas Component - Animated Background
 */

import React, { useEffect, useRef } from 'react';

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const whiteSpotsRef = useRef([]);
  const trailRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const trailLength = 10;

    const initializeTrail = (x, y) => {
      trailRef.current = Array.from({ length: trailLength }, () => ({ x, y }));
    };

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
      createWhiteSpots();
      if (mouseRef.current.active) {
        initializeTrail(mouseRef.current.x, mouseRef.current.y);
      }
    };

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 204, ${this.opacity})`;
        ctx.fill();
      }
    }

    class WhiteSpot {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1.5;
        this.speedX = (Math.random() - 0.5) * 0.18;
        this.speedY = (Math.random() - 0.5) * 0.12;
        this.opacity = Math.random() * 0.35 + 0.18;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;

        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = canvas.height + 20;
        if (this.y > canvas.height + 20) this.y = -20;
      }

      draw() {
        const pulseOpacity = this.opacity + Math.sin(this.pulse) * 0.08;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.08, pulseOpacity)})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowBlur = 16;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      particlesRef.current = [];

      for (let i = 0; i < Math.min(particleCount, 150); i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const createWhiteSpots = () => {
      const spotCount = Math.floor((canvas.width * canvas.height) / 90000);
      whiteSpotsRef.current = [];

      for (let i = 0; i < Math.min(spotCount, 30); i++) {
        whiteSpotsRef.current.push(new WhiteSpot());
      }
    };

    // Draw connections
    const drawConnections = () => {
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 204, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      whiteSpotsRef.current.forEach(spot => {
        spot.update();
        spot.draw();
      });

      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();

      const trail = trailRef.current;
      if (trail.length > 0) {
        if (mouseRef.current.active) {
          trail[0].x += (mouseRef.current.x - trail[0].x) * 0.35;
          trail[0].y += (mouseRef.current.y - trail[0].y) * 0.35;

          for (let i = 1; i < trail.length; i++) {
            trail[i].x += (trail[i - 1].x - trail[i].x) * 0.3;
            trail[i].y += (trail[i - 1].y - trail[i].y) * 0.3;
          }
        }

        for (let i = trail.length - 1; i >= 0; i--) {
          const point = trail[i];
          const scale = (trail.length - i) / trail.length;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.45 * scale})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
          ctx.shadowBlur = 28;
          ctx.arc(point.x, point.y, 2.5 * scale + 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    // Handle resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };

    const handleMouseMove = event => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      mouseRef.current.active = true;

      if (trailRef.current.length === 0) {
        initializeTrail(event.clientX, event.clientY);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Pause when hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationIdRef.current);
      } else {
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

export default ParticleCanvas;
