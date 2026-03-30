import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { getProjectBySlug, projects } from '@/lib/data/projects';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { Button } from '@/components/ui';
import { CTASection } from '@/components/sections';
import { homeContent } from '@/lib/data/content';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return { title: 'Проект не найден' };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="relative h-[70vh] flex items-end">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="relative container pb-16">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Все проекты
            </Link>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-white/60 mb-4">
              {project.category === 'architecture' ? 'Архитектура' : 'Интерьер'}
            </span>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="font-display text-5xl md:text-6xl text-white font-medium max-w-3xl">
              {project.title}
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="mt-4 text-lg text-white/70 max-w-xl">
              {project.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg-primary)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FadeIn>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Год</div>
                <div className="font-display text-2xl">{project.year}</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Локация</div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[var(--color-accent-warm)]" />
                  <span className="font-display text-2xl">{project.location}</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Площадь</div>
                <div className="flex items-center gap-2">
                  <Maximize2 size={18} className="text-[var(--color-accent-warm)]" />
                  <span className="font-display text-2xl">{project.area}</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Тип</div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-[var(--color-accent-warm)]" />
                  <span className="font-display text-2xl">
                    {project.category === 'architecture' ? 'Архитектура' : 'Интерьер'}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="prose prose-lg">
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg-primary)]">
        <div className="container">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.slice(1).map((image, index) => (
              <StaggerItem key={index}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} - изображение ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {project.materials && project.materials.length > 0 && (
        <section className="py-16 bg-[var(--color-bg-secondary)]">
          <div className="container">
            <FadeIn>
              <h2 className="font-display text-2xl font-medium mb-8">Материалы</h2>
            </FadeIn>
            <StaggerContainer className="flex flex-wrap gap-3">
              {project.materials.map((material) => (
                <StaggerItem key={material}>
                  <span className="inline-block px-4 py-2 bg-white border border-[var(--color-border)] text-sm">
                    {material}
                  </span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <CTASection
        title={homeContent.cta.title}
        text={homeContent.cta.text}
      />
    </>
  );
}
