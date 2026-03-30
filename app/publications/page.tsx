'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { SectionHeader } from '@/components/ui';
import { publications } from '@/lib/data/content';
import { CTASection } from '@/components/sections';
import { homeContent } from '@/lib/data/content';
import { ExternalLink } from 'lucide-react';

export default function PublicationsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--color-bg-primary)]">
        <div className="container">
          <SectionHeader
            eyebrow="Публикации"
            title="О нас пишут"
            subtitle="Интервью, статьи и упоминания в ведущих изданиях"
            align="center"
          />
        </div>
      </section>

      <section className="pb-24 bg-[var(--color-bg-primary)]">
        <div className="container">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((pub) => (
              <StaggerItem key={pub.id}>
                <motion.article
                  className="group cursor-pointer"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden mb-6">
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-[var(--color-accent-warm)] font-medium">
                      {pub.source}
                    </span>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {pub.date}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-warm)] transition-colors">
                    {pub.title}
                  </h3>
                </motion.article>
              </StaggerItem>
            ))}
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
