'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui';
import { SectionHeader } from '@/components/ui';
import { StaggerContainer, StaggerItem } from '@/components/animations';
import { Project } from '@/lib/data/projects';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FeaturedProjectsProps {
  title: string;
  eyebrow: string;
  projects: Project[];
}

export function FeaturedProjects({ title, eyebrow, projects }: FeaturedProjectsProps) {
  return (
    <section className="section-padding bg-[var(--color-bg-primary)]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader title={title} eyebrow={eyebrow} />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group"
          >
            Все проекты
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map((project, index) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} size="large" />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {projects.length > 2 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {projects.slice(2, 5).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
