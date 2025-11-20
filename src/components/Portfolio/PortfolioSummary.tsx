import React from 'react';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';
import { Portfolio } from '@/types/portfolio';
import { Card, CardBody } from '@/components/ui/Card';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PortfolioSummaryProps {
  portfolio: Portfolio;
}

export function PortfolioSummary({ portfolio }: PortfolioSummaryProps) {
  const isProfit = portfolio.totalGainLoss >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardBody>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Wallet className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Investment</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(portfolio.totalInvestment)}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Current Value</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(portfolio.currentValue)}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'p-3 rounded-lg',
                isProfit ? 'bg-primary-100' : 'bg-danger-100'
              )}
            >
              {isProfit ? (
                <TrendingUp className="text-primary" size={24} />
              ) : (
                <TrendingDown className="text-danger" size={24} />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Gain/Loss</p>
              <p
                className={cn(
                  'text-lg font-bold',
                  isProfit ? 'text-primary' : 'text-danger'
                )}
              >
                {formatCurrency(Math.abs(portfolio.totalGainLoss))}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'p-3 rounded-lg',
                isProfit ? 'bg-primary-100' : 'bg-danger-100'
              )}
            >
              {isProfit ? (
                <TrendingUp className="text-primary" size={24} />
              ) : (
                <TrendingDown className="text-danger" size={24} />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500">Percentage</p>
              <p
                className={cn(
                  'text-lg font-bold',
                  isProfit ? 'text-primary' : 'text-danger'
                )}
              >
                {formatPercent(portfolio.totalGainLossPercent)}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}