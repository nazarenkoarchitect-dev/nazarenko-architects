import { Hero, FeaturedProjects, Philosophy, Services, Testimonials, CTASection } from '@/components/sections';
import { heroContent, homeContent, testimonials } from '@/lib/data/content';
import { getFeaturedProjects } from '@/lib/data/projects';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Hero
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        cta={heroContent.cta}
        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
      />
      <FeaturedProjects
        title={homeContent.featured.title}
        eyebrow={homeContent.featured.eyebrow}
        projects={featuredProjects}
      />
      <Philosophy
        eyebrow={homeContent.philosophy.eyebrow}
        title={homeContent.philosophy.title}
        text={homeContent.philosophy.text}
      />
      <Services eyebrow={homeContent.services.eyebrow} items={homeContent.services.items} />
      <Testimonials testimonials={testimonials} />
      <CTASection title={homeContent.cta.title} text={homeContent.cta.text} />
    </>
  );
}
