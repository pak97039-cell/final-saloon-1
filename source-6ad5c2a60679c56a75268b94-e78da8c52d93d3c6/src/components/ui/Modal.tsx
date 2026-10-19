import React, { useEffect, useRef, useId, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
  showCloseButton?: boolean;
  className?: string;
  ariaLabel?: string;
}

// Global modal stack to support stacking: ESC key closes only the topmost modal
const activeModalStack: string[] = [];
let initialBodyOverflow = '';

function lockScroll(): void {
  if (typeof document === 'undefined') return;
  if (activeModalStack.length === 1) {
    initialBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
}

function unlockScroll(): void {
  if (typeof document === 'undefined') return;
  if (activeModalStack.length === 0) {
    document.body.style.overflow = initialBodyOverflow;
  }
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
  showCloseButton = true,
  className = '',
  ariaLabel,
}) => {
  const modalId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Manage modal stack, body scroll lock, and focus restoration
  useEffect(() => {
    if (!isOpen) return;

    // Save current active element to restore focus on close
    previousFocusRef.current = (document.activeElement as HTMLElement) || null;

    activeModalStack.push(modalId);
    lockScroll();

    // Trap focus inside modal on mount
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          focusables[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      const index = activeModalStack.lastIndexOf(modalId);
      if (index !== -1) {
        activeModalStack.splice(index, 1);
      }
      unlockScroll();

      // Restore focus to original element
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, modalId]);

  // Handle ESC key (only top-most modal responds)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        const isTopModal =
          activeModalStack[activeModalStack.length - 1] === modalId;
        if (isTopModal) {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }
      }

      // Focus trap cycling
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('aria-hidden') && el.offsetParent !== null);

        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, modalId, onClose]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-[95vw]',
  }[maxWidth];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto overflow-x-hidden"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121212]/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title || 'Dialog Window'}
        tabIndex={-1}
        className={`relative w-full ${maxWidthClasses} bg-[#FAF8F5] text-[#1E1B18] border border-[#E8DCCF] rounded-sm shadow-2xl z-10 my-auto focus:outline-none transition-all duration-300 max-h-[92vh] flex flex-col overflow-hidden ${className}`}
      >
        {/* Header (if title or close button provided) */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[#E8DCCF] bg-[#FFFDF9]">
            <div>
              {title && (
                <h3 className="font-serif text-xl sm:text-2xl text-[#1E1B18] tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-[#5C5248] mt-0.5 tracking-normal">
                  {subtitle}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 -mr-1 -mt-1 rounded-sm flex items-center justify-center text-[#5C5248] hover:text-[#1E1B18] hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8DCCF] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5A059]"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
};
