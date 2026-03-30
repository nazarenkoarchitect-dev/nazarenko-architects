'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui';
import { SectionHeader } from '@/components/ui';
import { StaggerContainer, StaggerItem } from '@/components/animations';
import { projects } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'architecture' | 'interior';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Все проекты' },
    { value: 'architecture', label: 'Архитектура' },
    { value: 'interior', label: 'Интерьеры' },
  ];

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--color-bg-primary)]">
        <div className="container">
          <SectionHeader
            eyebrow="Портфолио"
            title="Проекты"
            subtitle="Частные дома, интерьеры и общественные пространства"
            align="center"
          />

          <div className="mt-12 flex justify-center">
            <div className="inline-flex gap-1 p-1 bg-[var(--color-bg-secondary)]">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    'px-6 py-2 text-sm transition-all duration-300',
                    filter === f.value
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-[var(--color-bg-primary)]">
        <div className="container">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-[var(--color-text-muted)]"
            >
              Проекты в этой категории скоро появятся
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
