import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';
import { useStarfield } from '../../hooks/useStarfield';
import { StatItem } from '../../types/hero.types';
import heroImg from '../../assets/ai-brain.png';

gsap.registerPlugin(ScrollTrigger);

const STATS: StatItem[] = [
  { target: 5, unit: '+', label: 'Enterprises Served' },
  { target: 98, unit: '%', label: 'Client Retention' },
  { target: 85, unit: 'x', label: 'Avg. Efficiency Gain' },
  { target: 24, unit: '/7', label: 'Expert Support' },
];

type HeroProps = {
  onOpenChatbot?: () => void;
  onBookConsultation?: () => void;
};

const Hero: React.FC<HeroProps> = ({ onOpenChatbot, onBookConsultation }) => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const statValRefs = useRef<(HTMLDivElement | null)[]>([]);

  useStarfield(bgCanvasRef);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 45; i++) {
      const p = document.createElement('div');
      p.classList.add(styles.particle);
      const sz = Math.random() * 2.5 + 0.8;
      Object.assign(p.style, {
        width: `${sz}px`,
        height: `${sz}px`,
        background: Math.random() > 0.5 ? '#00aaff' : '#0044ff',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        '--dx': `${(Math.random() - 0.5) * 180}px`,
        animationDuration: `${Math.random() * 10 + 9}s`,
        animationDelay: `${Math.random() * 12}s`,
        opacity: '0',
      } as React.CSSProperties & { '--dx': string });
      container.appendChild(p);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
      .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.65 }, '-=0.3')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.65 }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const wrapEl = imageWrapRef.current;
    const imgEl = imageRef.current;
    if (!heroEl || !wrapEl || !imgEl) return;

    const ctx = gsap.context(() => {
      gsap.set([wrapEl, imgEl], { force3D: true });

      gsap.fromTo(
        wrapEl,
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapEl,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.to(wrapEl, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        imgEl,
        { scale: 1.06 },
        {
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      STATS.forEach((stat, i) => {
        const el = statValRefs.current[i];
        if (!el) return;

        gsap.to(
          { v: 0 },
          {
            v: stat.target,
            duration: 2,
            ease: 'power2.out',
            onUpdate(this: gsap.core.Tween) {
              const val = Math.round((this.targets()[0] as { v: number }).v);
              el.innerHTML = `${val}<span class="${styles.statUnit}">${stat.unit}</span>`;
            },
          }
        );
      });
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const handleBookConsultation = () => {
    if (onBookConsultation) {
      onBookConsultation();
      return;
    }

    const pricingSection = document.getElementById('pricing');
    if (!pricingSection) {
      console.warn('Pricing section not found');
      return;
    }

    pricingSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <canvas ref={bgCanvasRef} className={styles.bgCanvas} />

      <section ref={heroRef} className={styles.hero}>
        <div className={styles.gridFloor} />
        <div ref={particlesRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

        <div className={styles.heroText}>
          <h1 ref={titleRef} className={styles.heroTitle}>
            Transform Your Business
            <br />
            with Enterprise <span className={styles.aiWord}>AI</span> Solutions
          </h1>
          <p ref={subtextRef} className={styles.heroSubtext}>
            Deploy intelligent automation, predictive analytics, and AI-driven insights that deliver measurable ROI.
            Purpose-built for enterprise scale, security, and compliance.
          </p>
        </div>

        <div ref={imageWrapRef} className={styles.brainImageWrap}>
          <img ref={imageRef} src={heroImg} alt="AI Brain Visualization" className={styles.brainImage} />
        </div>

        <div ref={ctaRef} className={styles.heroCta}>
          <button type="button" className={`${styles.ctaBtn} ${styles.ctaChat}`} onClick={() => onOpenChatbot?.()}>
            Chat with AI
          </button>
          <button
            type="button"
            className={`${styles.ctaBtn} ${styles.ctaBook}`}
            onClick={handleBookConsultation}
          >
            Book a Consultation
          </button>
        </div>

        <div ref={statsRef} className={styles.statsBar}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className={styles.stat}>
              <div
                ref={(el) => {
                  statValRefs.current[i] = el;
                }}
                className={styles.statVal}
              >
                0<span className={styles.statUnit}>{stat.unit}</span>
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
