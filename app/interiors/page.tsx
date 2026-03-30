'use client';

import { ProjectCard } from '@/components/ui';
import { SectionHeader } from '@/components/ui';
import { StaggerContainer, StaggerItem } from '@/components/animations';
import { CTASection } from '@/components/sections';
import { getProjectsByCategory } from '@/lib/data/projects';
import { homeContent } from '@/lib/data/content';

export default function InteriorsPage() {
  const projects = getProjectsByCategory('interior');

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--color-bg-primary)]">
        <div className="container">
          <SectionHeader
            eyebrow="Интерьеры"
            title="Дизайн пространств"
            subtitle="Интерьеры, где каждая деталь создаёт атмосферу и характер места"
            align="center"
          />
        </div>
      </section>

      <section className="pb-24 bg-[var(--color-bg-primary)]">
        <div className="container">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
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
