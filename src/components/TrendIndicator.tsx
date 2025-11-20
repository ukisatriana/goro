import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendIndicatorProps {
  trend: 'uptrend' | 'downtrend' | 'sideways';
  size?: 'sm' | 'md' | 'lg';
}

export function TrendIndicator({ trend, size = 'md' }: TrendIndicatorProps) {
  const icons = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const iconSize = icons[size];

  const config = {
    uptrend: {
      icon: <TrendingUp size={iconSize} />,
      label: 'Uptrend',
      className: 'text-primary bg-primary-50 border-primary-200',
    },
    downtrend: {
      icon: <TrendingDown size={iconSize} />,
      label: 'Downtrend',
      className: 'text-danger bg-danger-50 border-danger-200',
    },
    sideways: {
      icon: <Minus size={iconSize} />,
      label: 'Sideways',
      className: 'text-gray-600 bg-gray-50 border-gray-200',
    },
  };

  const { icon, label, className } = config[trend];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-medium',
        className
      )}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}