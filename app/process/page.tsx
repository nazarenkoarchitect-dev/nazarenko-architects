'use client';

import { FadeIn } from '@/components/animations';
import { SectionHeader } from '@/components/ui';
import { ProcessTimeline } from '@/components/sections';
import { processContent } from '@/lib/data/content';
import { CTASection } from '@/components/sections';
import { homeContent } from '@/lib/data/content';

export default function ProcessPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--color-bg-primary)]">
        <div className="container">
          <SectionHeader
            eyebrow={processContent.hero.eyebrow}
            title={processContent.hero.title}
            subtitle="Прозрачный и структурированный подход к каждому проекту"
          />
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg-secondary)]">
        <div className="container max-w-5xl">
          <ProcessTimeline steps={processContent.steps} />
        </div>
      </section>

      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl font-medium mb-6">
                Почему выбирают нас
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Мы не берём много проектов одновременно — это позволяет уделить 
                максимальное внимание каждому. Результат — пространства, которые 
                превосходят ожидания.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title={homeContent.cta.title}
        text={homeContent.cta.text}
      />
    </>
  );
}
