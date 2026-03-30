'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { FadeIn } from '@/components/animations';

interface CTASectionProps {
  title: string;
  text: string;
}

export function CTASection({ title, text }: CTASectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80"
          alt="CTA Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      <div className="relative container py-24">
        <div className="max-w-3xl">
          <FadeIn>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-medium text-white leading-tight">
              {title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              {text}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-accent-warm)] hover:text-white border-white"
              >
                Обсудить проект
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
