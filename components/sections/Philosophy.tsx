'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

interface PhilosophyProps {
  eyebrow: string;
  title: string;
  text: string;
}

export function Philosophy({ eyebrow, title, text }: PhilosophyProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="section-padding bg-[var(--color-bg-secondary)] overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div style={{ y: imageY }} className="relative aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
              alt="Philosophy"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          <div className="lg:pl-8">
            <FadeIn>
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-[var(--color-text-secondary)] mb-4">
                {eyebrow}
              </span>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight text-[var(--color-text-primary)]">
                {title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {text}
              </p>
            </FadeIn>

            <StaggerContainer className="mt-12 grid grid-cols-2 gap-8">
              <StaggerItem>
                <div className="text-4xl font-display font-medium text-[var(--color-accent)]">12+</div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">лет опыта</div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-4xl font-display font-medium text-[var(--color-accent)]">85+</div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">проектов</div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-4xl font-display font-medium text-[var(--color-accent)]">15</div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">наград</div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-4xl font-display font-medium text-[var(--color-accent)]">∞</div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">внимание к деталям</div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
