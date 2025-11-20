import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SignalBadgeProps {
  type: 'buy' | 'sell';
  pattern: string;
  size?: 'sm' | 'md';
}

export function SignalBadge({ type, pattern, size = 'md' }: SignalBadgeProps) {
  const isBuy = type === 'buy';

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        isBuy
          ? 'bg-primary-50 text-primary-700 border border-primary-200'
          : 'bg-danger-50 text-danger-700 border border-danger-200',
        sizes[size]
      )}
    >
      {isBuy ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
      <span>{pattern}</span>
    </div>
  );
}