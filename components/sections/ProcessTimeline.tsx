'use client';

import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/animations';
import { Clock } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration?: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <StaggerContainer className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[var(--color-border)] hidden md:block" />
      
      {steps.map((step, index) => (
        <StaggerItem key={step.number}>
          <motion.div
            className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
              <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                <motion.div
                  className="relative z-10 w-12 h-12 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-display text-lg">{step.number}</span>
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-medium text-[var(--color-text-primary)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">
                    {step.description}
                  </p>
                  {step.duration && (
                    <div className="inline-flex items-center gap-2 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-3 py-1.5">
                      <Clock size={12} />
                      {step.duration}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden md:block w-8 shrink-0" />

            <div className="hidden md:block flex-1" />
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
