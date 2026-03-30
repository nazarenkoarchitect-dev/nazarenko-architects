'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  size?: 'normal' | 'large';
  className?: string;
}

export function ProjectCard({ project, size = 'normal', className = '' }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <motion.article
        className={cn('group relative overflow-hidden', className)}
        whileHover="hover"
        initial="initial"
      >
        <div className={cn('relative overflow-hidden', size === 'large' ? 'aspect-[4/3]' : 'aspect-[3/4]')}>
          <motion.div
            className="absolute inset-0"
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05 },
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500"
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 1 },
            }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            variants={{
              initial: { y: 20 },
              hover: { y: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-xs tracking-[0.2em] uppercase mb-2 text-white/70">
              {project.category === 'architecture' ? 'Архитектура' : 'Интерьер'}
            </span>
            <h3 className="font-display text-2xl font-medium mb-1">{project.title}</h3>
            <p className="text-sm text-white/80">{project.location}</p>
          </motion.div>
        </div>

        <motion.div
          className="mt-4 md:hidden"
          variants={{
            initial: { opacity: 1 },
            hover: { opacity: 0 },
          }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
            {project.category === 'architecture' ? 'Архитектура' : 'Интерьер'}
          </span>
          <h3 className="font-display text-xl font-medium mt-1 text-[var(--color-text-primary)]">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{project.location}</p>
        </motion.div>
      </motion.article>
    </Link>
  );
}
