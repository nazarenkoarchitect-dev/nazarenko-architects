'use client';

import { FadeIn } from '@/components/animations';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`text-${align} ${className}`}>
      {eyebrow && (
        <FadeIn delay={0.1}>
          <span
            className={`inline-block text-xs tracking-[0.3em] uppercase mb-4 ${
              light ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            {eyebrow}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={eyebrow ? 0.2 : 0.1}>
        <h2
          className={`font-display font-medium leading-tight ${
            light ? 'text-[var(--color-text-inverse)]' : 'text-[var(--color-text-primary)]'
          }`}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {title}
        </h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={eyebrow ? 0.3 : 0.2}>
          <p
            className={`mt-4 text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${
              light ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
