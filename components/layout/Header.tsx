'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { navigation, siteConfig } from '@/lib/data/content';
import { Button } from '@/components/ui';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-[var(--color-bg-primary)]/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="relative z-50">
            <span
              className={cn(
                'font-display text-xl tracking-wide transition-colors duration-300',
                isScrolled ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-inverse)]'
              )}
            >
              {siteConfig.architect}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navigation.slice(0, -1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm tracking-wide transition-colors duration-300 group',
                  isScrolled ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-inverse)]'
                )}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              variant={isScrolled ? 'primary' : 'secondary'}
              size="sm"
              href="/contact"
              className={cn(
                !isScrolled && 'border-white text-white hover:bg-white hover:text-[var(--color-text-primary)]'
              )}
            >
              Обсудить проект
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              'lg:hidden relative z-50 p-2 transition-colors duration-300',
              isScrolled ? 'text-[var(--color-text-primary)]' : 'text-white'
            )}
            aria-label="Открыть меню"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg-primary)]"
          >
            <div className="container flex flex-col h-full pt-24 pb-12">
              <nav className="flex flex-col gap-6">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block font-display text-4xl text-[var(--color-text-primary)] hover:text-[var(--color-accent-warm)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <Button variant="primary" size="lg" href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Обсудить проект
                </Button>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-[var(--color-text-primary)]"
              aria-label="Закрыть меню"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
