'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { navigation, siteConfig } from '@/lib/data/content';
import { Instagram, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-2xl text-white">{siteConfig.architect}</span>
            </Link>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-xs">
              Архитектура и дизайн пространств, созданных для жизни. Москва, Россия.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-6">
              Навигация
            </h4>
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-6">
              Контакты
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Mail size={16} />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Phone size={16} />
                {siteConfig.phone}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-6">
              Социальные сети
            </h4>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-[var(--color-text-muted)]">
            © {currentYear} {siteConfig.architect}. Все права защищены.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Создание сайта — важная часть архитектурного бренда
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
