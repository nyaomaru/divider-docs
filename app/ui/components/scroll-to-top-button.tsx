'use client';

import clsx from 'clsx';
import { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

const SCROLL_THRESHOLD = 300;
const ICON_SIZE = 24;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type='button'
      aria-label='Scroll to top'
      onClick={scrollToTop}
      className={clsx(
        'fixed bottom-5 right-5 p-3 bg-gray-800 text-white rounded-full shadow-lg transition-opacity cursor-pointer hover:text-primary',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <ArrowUp size={ICON_SIZE} />
    </button>
  );
}
