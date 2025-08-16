'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollButtonProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function ScrollButton({ targetId, children, className, size = 'lg' }: ScrollButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button
      size={size}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
