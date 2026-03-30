'use client';

import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/animations';
import { SectionHeader } from '@/components/ui';
import { PenTool, Layers, Eye } from 'lucide-react';

interface Service {
  title: string;
  description: string;
}

interface ServicesProps {
  eyebrow: string;
  items: Service[];
}

const icons = {
  'Архитектура': PenTool,
  'Дизайн интерьеров': Layers,
  'Авторский надзор': Eye,
};

export function Services({ eyebrow, items }: ServicesProps) {
  return (
    <section className="section-padding bg-[var(--color-bg-primary)]">
      <div className="container">
        <SectionHeader
          title="Услуги"
          eyebrow={eyebrow}
          subtitle="Полный цикл создания пространства — от идеи до реализации"
        />

        <StaggerContainer className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((service, index) => {
            const Icon = icons[service.title as keyof typeof icons] || PenTool;
            return (
              <StaggerItem key={service.title}>
                <motion.article
                  className="group relative p-8 bg-[var(--color-bg-secondary)] hover:bg-white transition-colors duration-500 cursor-pointer"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <Icon
                    size={32}
                    className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-6"
                  />
                  
                  <h3 className="font-display text-2xl font-medium text-[var(--color-text-primary)] mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Узнать больше</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
