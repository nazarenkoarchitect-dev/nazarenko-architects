'use client';

import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { SectionHeader } from '@/components/ui';
import { ContactForm } from '@/components/sections';
import { contactContent, siteConfig } from '@/lib/data/content';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--color-bg-primary)]">
        <div className="container">
          <SectionHeader
            eyebrow={contactContent.hero.eyebrow}
            title={contactContent.hero.title}
            subtitle={contactContent.hero.subtitle}
          />
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg-secondary)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn>
              <ContactForm form={contactContent.form} />
            </FadeIn>

            <StaggerContainer>
              <StaggerItem>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-xl font-medium mb-4">
                      Контактная информация
                    </h3>
                    <div className="space-y-4">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="flex items-center gap-4 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <Mail size={20} className="text-[var(--color-accent-warm)]" />
                        {siteConfig.email}
                      </a>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="flex items-center gap-4 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <Phone size={20} className="text-[var(--color-accent-warm)]" />
                        {siteConfig.phone}
                      </a>
                      <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
                        <MapPin size={20} className="text-[var(--color-accent-warm)]" />
                        {siteConfig.address}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-[var(--color-border)]">
                    <h3 className="font-display text-xl font-medium mb-4">
                      Социальные сети
                    </h3>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      <Instagram size={20} />
                      Instagram
                    </a>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section className="h-[400px] relative">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
          alt="Contact"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>
    </>
  );
}
