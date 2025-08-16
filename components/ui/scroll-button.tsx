'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollButtonProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick?: () => void;
}

export default function ScrollButton({
  targetId,
  children,
  className,
  size = 'lg',
  variant = 'default',
  onClick
}: ScrollButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    onClick?.();
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
