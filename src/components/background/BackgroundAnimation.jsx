import React, { useEffect, useRef } from "react";
import "./background.css";

export default function BackgroundAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Interactive mouse state with smooth coordinates
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      radius: 160,
    };

    // Scaled particle density: ~75 on 1080p desktop, ~38 on mobile
    const particleCount = Math.floor(Math.min(Math.max((width * height) / 19000, 35), 150));

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 15;
        this.size = Math.random() * 1.7 + 0.7;

        // Zero-gravity upward drift base velocity
        this.baseSpeedY = -(Math.random() * 0.35 + 0.15);
        this.baseSpeedX = (Math.random() - 0.5) * 0.22;

        this.vx = this.baseSpeedX;
        this.vy = this.baseSpeedY;

        this.baseAlpha = Math.random() * 0.45 + 0.25;
        this.alpha = this.baseAlpha;
        this.pulseSpeed = Math.random() * 0.02 + 0.008;
        this.pulseAngle = Math.random() * Math.PI * 2;

        // Color palette: glowing cyan, electric ice blue, and subtle gold/silver
        const rand = Math.random();
        if (rand > 0.35) {
          this.color = "75, 213, 255"; // Cyan glow
        } else if (rand > 0.1) {
          this.color = "220, 240, 255"; // Ice white
        } else {
          this.color = "240, 192, 64"; // Gold accent
        }
      }

      update() {
        // Gravitational mouse interaction
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            // Smooth repulsion with elastic dampening
            const force = (1 - dist / mouse.radius) * 1.6;
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force * 0.7;
            this.vy += Math.sin(angle) * force * 0.7;
          }
        }

        // Apply friction and smoothly restore natural upward drift
        this.vx *= 0.94;
        this.vy = this.vy * 0.94 + this.baseSpeedY * 0.06;

        this.x += this.vx;
        this.y += this.vy;

        this.pulseAngle += this.pulseSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.15;

        // Screen boundary wrapping
        if (this.y < -15) {
          this.reset(false);
        }
        if (this.x < -15) {
          this.x = width + 15;
        } else if (this.x > width + 15) {
          this.x = -15;
        }
      }

      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${this.color}, ${Math.max(0, this.alpha)})`;
        context.fill();
      }
    }

    // Initialize particle pool
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw particle-to-particle connections & mouse constellation filaments
    const drawConnections = () => {
      const maxDistance = 95;

      // Particle-to-particle links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(75, 213, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Mouse-to-particle constellation filaments
        if (mouse.active) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < mouse.radius) {
            const mouseLineAlpha = (1 - mDist / mouse.radius) * 0.22;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.strokeStyle = `rgba(75, 213, 255, ${mouseLineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    // Mouse & touch event listeners
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (isVisible && !prefersReducedMotion) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw(ctx);
        }

        drawConnections();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="antigravity-bg" aria-hidden="true">
      {/* Soft atmospheric gradient orbs */}
      <div className="antigravity-bg__orb antigravity-bg__orb--1" />
      <div className="antigravity-bg__orb antigravity-bg__orb--2" />
      <div className="antigravity-bg__orb antigravity-bg__orb--3" />
      {/* Zero-gravity particle canvas with mouse interaction */}
      <canvas ref={canvasRef} className="antigravity-bg__canvas" />
    </div>
  );
}
