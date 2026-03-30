'use client';

import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/animations';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="section-padding bg-[var(--color-bg-dark)]">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
              Отзывы клиентов
            </span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium text-white">
              Что говорят о нашей работе
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <motion.article
                className="group p-8 border border-white/10 hover:border-white/30 transition-colors duration-500"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Quote
                  size={32}
                  className="text-[var(--color-accent-warm)] mb-6 opacity-50"
                />

                <blockquote className="text-lg text-white/90 leading-relaxed mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="border-t border-white/10 pt-6">
                  <div className="font-medium text-white">{testimonial.author}</div>
                  <div className="text-sm text-white/50 mt-1">{testimonial.role}</div>
                  <div className="text-xs text-[var(--color-accent-warm)] mt-2 tracking-wide">
                    Проект: {testimonial.project}
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
