'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { SectionHeader } from '@/components/ui';
import { aboutContent } from '@/lib/data/content';
import { CTASection } from '@/components/sections';
import { homeContent } from '@/lib/data/content';

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--color-bg-primary)]">
        <div className="container">
          <SectionHeader
            eyebrow={aboutContent.hero.eyebrow}
            title={aboutContent.hero.title}
            subtitle={aboutContent.hero.subtitle}
          />
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg-secondary)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80"
                  alt="Евгений Назаренко"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                {aboutContent.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="container">
          <FadeIn>
            <h2 className="font-display text-3xl font-medium mb-16 text-center">
              Принципы работы
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.principles.map((principle) => (
              <StaggerItem key={principle.title}>
                <motion.article
                  className="text-center p-8"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-xl font-medium text-[var(--color-text-primary)] mb-4">
                    {principle.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-[var(--color-bg-dark)]">
        <div className="container">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <StaggerItem>
              <motion.div
                className="text-6xl md:text-7xl font-display font-medium text-white mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                12+
              </motion.div>
              <div className="text-white/60">лет опыта</div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="text-6xl md:text-7xl font-display font-medium text-white mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                85+
              </motion.div>
              <div className="text-white/60">реализованных проектов</div>
            </StaggerItem>
            <StaggerItem>
              <motion.div
                className="text-6xl md:text-7xl font-display font-medium text-white mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                15
              </motion.div>
              <div className="text-white/60">международных наград</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <CTASection
        title={homeContent.cta.title}
        text={homeContent.cta.text}
      />
    </>
  );
}
