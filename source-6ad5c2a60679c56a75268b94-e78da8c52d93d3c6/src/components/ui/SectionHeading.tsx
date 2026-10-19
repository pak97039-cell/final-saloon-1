import React from 'react';

export interface GoldDividerProps {
  dark?: boolean;
  className?: string;
  width?: string;
}

/**
 * Hairline 1px gold line with a centered 1.5px diamond emblem
 */
export const GoldDivider: React.FC<GoldDividerProps> = ({
  dark = false,
  className = '',
  width = 'w-20 sm:w-28',
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2 ${width} ${className}`}
      aria-hidden="true"
    >
      <span
        className={`h-px flex-1 ${
          dark
            ? 'bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-[#D4AF37]/80'
            : 'bg-gradient-to-r from-transparent via-[#C5A880]/50 to-[#8A6A2F]'
        }`}
      />
      <span
        className={`w-1.5 h-1.5 rotate-45 shrink-0 ${
          dark
            ? 'border border-[#D4AF37] bg-[#D4AF37]/25 shadow-xs'
            : 'border border-[#8A6A2F] bg-[#FAF8F5] shadow-xs'
        }`}
      />
      <span
        className={`h-px flex-1 ${
          dark
            ? 'bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-[#D4AF37]/80'
            : 'bg-gradient-to-l from-transparent via-[#C5A880]/50 to-[#8A6A2F]'
        }`}
      />
    </div>
  );
};

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * SectionHeading Component adhering to "Soft Gold Atelier" art direction:
 * - Eyebrow: uppercase, tracking 0.2em, 12px
 * - Title: H2 clamp(2rem, 4vw, 3.25rem) with Cormorant italic accent word
 * - Hairline Gold Divider with centered diamond
 * - Body subtitle with leading-relaxed
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  accent,
  subtitle,
  align = 'left',
  dark = false,
  className = '',
  children,
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`space-y-3 ${
        isCenter ? 'text-center mx-auto max-w-3xl flex flex-col items-center' : 'max-w-2xl'
      } ${className}`}
    >
      {/* Eyebrow Label */}
      {eyebrow && (
        <div
          className={`eyebrow-text inline-flex items-center gap-2 ${
            dark ? 'text-[#D4AF37]' : 'text-[#8A6A2F]'
          }`}
        >
          <span>{eyebrow}</span>
        </div>
      )}

      {/* Primary Section Title with Cormorant Italic Accent Word */}
      <h2
        className={`heading-h2 ${
          dark ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
        }`}
      >
        {title}{' '}
        {accent && (
          <span
            className={`font-editorial ${
              dark ? 'text-[#D4AF37]' : 'text-[#8A6A2F]'
            }`}
          >
            {accent}
          </span>
        )}
      </h2>

      {/* Hairline Gold Divider */}
      <div>
        <GoldDivider dark={dark} />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed font-sans ${
            dark ? 'text-[#FAF8F5]/75' : 'text-[#1A1A1A]/75'
          } ${isCenter ? 'max-w-xl' : 'max-w-2xl'}`}
        >
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
};
