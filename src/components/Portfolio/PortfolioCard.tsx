import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatPercent, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PortfolioCardProps {
  item: PortfolioItem;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (id: string) => void;
}

export function PortfolioCard({ item, onEdit, onDelete }: PortfolioCardProps) {
  const currentPrice = item.currentPrice || item.buyPrice;
  const totalValue = currentPrice * item.quantity;
  const totalInvestment = item.buyPrice * item.quantity;
  const gainLoss = totalValue - totalInvestment;
  const gainLossPercent = (gainLoss / totalInvestment) * 100;

  const isProfit = gainLoss >= 0;

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900">{item.symbol}</h3>
              <span className="text-sm text-gray-500">{item.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="text-sm font-semibold text-gray-900">
                  {item.quantity.toLocaleString()} lot
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Buy Price</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.buyPrice)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Current Price</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(currentPrice)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Buy Date</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(item.buyDate)}
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Total Investment</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(totalInvestment)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Current Value</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(totalValue)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-xs font-medium text-gray-700">Gain/Loss</span>
                <div className="text-right">
                  <p
                    className={cn(
                      'text-sm font-bold',
                      isProfit ? 'text-primary' : 'text-danger'
                    )}
                  >
                    {formatCurrency(Math.abs(gainLoss))}
                  </p>
                  <p
                    className={cn(
                      'text-xs font-semibold',
                      isProfit ? 'text-primary' : 'text-danger'
                    )}
                  >
                    {formatPercent(gainLossPercent)}
                  </p>
                </div>
              </div>
            </div>

            {item.notes && (
              <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                <p className="text-xs text-gray-600">{item.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(item)}
            className="flex-1"
          >
            <Edit2 size={16} className="mr-1" />
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="flex-1"
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}