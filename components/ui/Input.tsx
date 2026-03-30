'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
}

export function Input({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  className = '',
  rows = 4,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    setIsFocused(false);
  };

  const isActive = isFocused || hasValue;

  return (
    <div className={cn('relative', className)}>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full bg-transparent border-b-2 border-[var(--color-border)] py-4 text-base text-[var(--color-text-primary)] placeholder-transparent focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-300 resize-none"
          placeholder={label}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full bg-transparent border-b-2 border-[var(--color-border)] py-4 text-base text-[var(--color-text-primary)] placeholder-transparent focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
          placeholder={label}
        />
      )}
      <label
        htmlFor={name}
        className={cn(
          'absolute left-0 transition-all duration-300 pointer-events-none text-[var(--color-text-secondary)]',
          isActive ? '-top-2 text-xs' : 'top-4 text-base',
          isFocused && 'text-[var(--color-accent)]'
        )}
      >
        {label}
        {required && <span className="text-[var(--color-accent-warm)] ml-1">*</span>}
      </label>
    </div>
  );
}

interface SelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export function Select({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
  className = '',
}: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn('relative', className)}>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          'w-full bg-transparent border-b-2 border-[var(--color-border)] py-4 text-base text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-300 appearance-none cursor-pointer',
          !value && 'text-[var(--color-text-muted)]'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[var(--color-bg-primary)]">
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={cn(
          'absolute left-0 transition-all duration-300 pointer-events-none text-[var(--color-text-secondary)]',
          isFocused || value ? '-top-2 text-xs' : 'top-4 text-base',
          isFocused && 'text-[var(--color-accent)]'
        )}
      >
        {label}
        {required && <span className="text-[var(--color-accent-warm)] ml-1">*</span>}
      </label>
      <svg
        className="absolute right-0 top-5 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
