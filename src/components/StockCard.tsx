import React from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { SignalBadge } from '@/components/SignalBadge';
import { TrendIndicator } from '@/components/TrendIndicator';
import { StockData } from '@/types/stock';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StockCardProps {
  stock: StockData;
}

export function StockCard({ stock }: StockCardProps) {
  const isPositive = stock.change >= 0;
  const hasSignals = stock.signals.length > 0;
  const latestSignal = hasSignals ? stock.signals[stock.signals.length - 1] : null;

  return (
    <Link href={`/stock/${stock.symbol}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardBody>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
              <p className="text-sm text-gray-500">{stock.name}</p>
              <p className="text-xs text-gray-400 mt-1">{stock.sector}</p>
            </div>
            {hasSignals && latestSignal && (
              <SignalBadge type={latestSignal.type} pattern={latestSignal.pattern} size="sm" />
            )}
          </div>

          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(stock.currentPrice)}
              </span>
              <span
                className={cn(
                  'text-sm font-semibold flex items-center gap-1',
                  isPositive ? 'text-primary' : 'text-danger'
                )}
              >
                {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {formatPercent(stock.changePercent)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <TrendIndicator trend={stock.trend} size="sm" />
            {hasSignals && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <AlertCircle size={14} />
                <span>{stock.signals.length} signal{stock.signals.length > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}