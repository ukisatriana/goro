'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { SignalBadge } from '@/components/SignalBadge';
import { TrendIndicator } from '@/components/TrendIndicator';
import { fetchStockData, fetchStockQuote } from '@/lib/stockApi';
import { detectPatterns } from '@/lib/patternDetection';
import { detectTrend } from '@/lib/trendAnalysis';
import { StockData, Signal } from '@/types/stock';
import { PATTERN_NAMES } from '@/types/signal';
import { ALL_STOCKS } from '@/constants/stocks';
import { formatCurrency, formatPercent, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function StockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = params.symbol as string;

  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (symbol) {
      loadStockDetail();
    }
  }, [symbol]);

  const loadStockDetail = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stock = ALL_STOCKS.find((s) => s.symbol === symbol);
      if (!stock) {
        throw new Error('Stock not found');
      }

      const [candles, quote] = await Promise.all([
        fetchStockData(symbol, '1d', '6mo'),
        fetchStockQuote(symbol),
      ]);

      if (candles.length === 0) {
        throw new Error('No data available for this stock');
      }

      const patterns = detectPatterns(candles);
      const trend = detectTrend(candles);

      const signals: Signal[] = [];

      Object.entries(patterns).forEach(([patternType, indices]) => {
        indices.forEach((index) => {
          const patternInfo = PATTERN_NAMES[patternType as keyof typeof PATTERN_NAMES];
          signals.push({
            type: patternInfo.type === 'bullish' ? 'buy' : 'sell',
            pattern: patternInfo.name,
            confidence: 'medium',
            timestamp: candles[index].time,
            price: candles[index].close,
            description: patternInfo.description,
          });
        });
      });

      setStockData({
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
        candles,
        currentPrice: quote?.regularMarketPrice || candles[candles.length - 1].close,
        change: quote?.regularMarketChange || 0,
        changePercent: quote?.regularMarketChangePercent || 0,
        signals: signals.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10),
        trend,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stock data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="animate-spin text-primary mb-4" size={48} />
          <p className="text-gray-600">Memuat data saham...</p>
        </div>
      </div>
    );
  }

  if (error || !stockData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardBody className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">{error || 'Stock not found'}</p>
            <Button onClick={() => router.push('/')}>Kembali ke Dashboard</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const isPositive = stockData.change >= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push('/')} className="mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Kembali
      </Button>

      {/* Stock Header */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {stockData.symbol}
              </h1>
              <p className="text-gray-600">{stockData.name}</p>
              <p className="text-sm text-gray-500 mt-1">{stockData.sector}</p>
            </div>
            <TrendIndicator trend={stockData.trend} />
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-900">
              {formatCurrency(stockData.currentPrice)}
            </span>
            <span
              className={cn(
                'text-lg font-semibold flex items-center gap-1',
                isPositive ? 'text-primary' : 'text-danger'
              )}
            >
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              {formatCurrency(Math.abs(stockData.change))} ({formatPercent(stockData.changePercent)})
            </span>
          </div>
        </CardBody>
      </Card>

      {/* Signals */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">
            Detected Patterns & Signals
          </h2>
        </CardHeader>
        <CardBody>
          {stockData.signals.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Tidak ada signal terdeteksi dalam periode ini
            </p>
          ) : (
            <div className="space-y-4">
              {stockData.signals.map((signal, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <SignalBadge type={signal.type} pattern={signal.pattern} />
                    <span className="text-sm text-gray-500">
                      {formatDate(new Date(signal.timestamp))}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{signal.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-500">
                      Price: <span className="font-semibold text-gray-900">{formatCurrency(signal.price)}</span>
                    </span>
                    <span className="text-gray-500">
                      Confidence: <span className="font-semibold text-gray-900 capitalize">{signal.confidence}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}