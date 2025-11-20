'use client';

import React, { useEffect, useState } from 'react';
import { Search, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { StockCard } from '@/components/StockCard';
import { Input } from '@/components/ui/Input';
import { Card, CardBody } from '@/components/ui/Card';
import { LQ45_STOCKS, ALL_STOCKS } from '@/constants/stocks';
import { fetchStockData, fetchStockQuote } from '@/lib/stockApi';
import { detectPatterns } from '@/lib/patternDetection';
import { detectTrend } from '@/lib/trendAnalysis';
import { StockData, Signal } from '@/types/stock';
import { PATTERN_NAMES } from '@/types/signal';

export default function Dashboard() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [stocksToShow, setStocksToShow] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Get unique sectors
  const sectors = ['all', ...Array.from(new Set(ALL_STOCKS.map(s => s.sector))).sort()];

  useEffect(() => {
    loadStocks();
  }, [stocksToShow]);

  useEffect(() => {
    filterStocks();
  }, [searchQuery, stocks, filter, sectorFilter]);

  const loadMoreStocks = () => {
    setStocksToShow((prev) => Math.min(prev + 20, ALL_STOCKS.length));
  };

  const loadStocks = async () => {
    setIsLoading(true);
    const stocksData: StockData[] = [];

    // Load stocks from ALL_STOCKS instead of just LQ45
    const stocksToLoad = ALL_STOCKS.slice(0, stocksToShow);

    for (const stock of stocksToLoad) {
      try {
        const [candles, quote] = await Promise.all([
          fetchStockData(stock.symbol, '1d', '3mo'),
          fetchStockQuote(stock.symbol),
        ]);

        if (candles.length > 0) {
          const patterns = detectPatterns(candles);
          const trend = detectTrend(candles);

          const signals: Signal[] = [];

          // Check for buy signals (last 5 candles)
          Object.entries(patterns).forEach(([patternType, indices]) => {
            const recentIndices = indices.filter((i) => i >= candles.length - 5);
            recentIndices.forEach((index) => {
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

          stocksData.push({
            symbol: stock.symbol,
            name: stock.name,
            sector: stock.sector,
            candles,
            currentPrice: quote?.regularMarketPrice || candles[candles.length - 1].close,
            change: quote?.regularMarketChange || 0,
            changePercent: quote?.regularMarketChangePercent || 0,
            signals: signals.sort((a, b) => b.timestamp - a.timestamp),
            trend,
          });
        }
      } catch (error) {
        console.error(`Error loading ${stock.symbol}:`, error);
      }
    }

    setStocks(stocksData);
    setIsLoading(false);
  };

  const filterStocks = () => {
    let filtered = stocks;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(query) ||
          stock.name.toLowerCase().includes(query) ||
          stock.sector.toLowerCase().includes(query)
      );
    }

    // Filter by sector
    if (sectorFilter !== 'all') {
      filtered = filtered.filter((stock) => stock.sector === sectorFilter);
    }

    // Filter by signal type
    if (filter !== 'all') {
      filtered = filtered.filter((stock) =>
        stock.signals.some((signal) => signal.type === filter)
      );
    }

    setFilteredStocks(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Monitoring Saham Indonesia
        </h1>
        <p className="text-gray-600">
          Monitor pergerakan saham dari berbagai sektor di Indonesia dengan deteksi pola candlestick
        </p>
        {!isLoading && stocks.length > 0 && (
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-gray-600">
              <strong className="text-gray-900">{stocks.length}</strong> saham dimuat
            </span>
            <span className="text-gray-600">
              <strong className="text-gray-900">{filteredStocks.length}</strong> saham ditampilkan
            </span>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Cari saham berdasarkan simbol, nama, atau sektor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('buy')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'buy'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TrendingUp size={16} className="inline mr-1" />
              Buy Signal
            </button>
            <button
              onClick={() => setFilter('sell')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'sell'
                  ? 'bg-danger text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <AlertCircle size={16} className="inline mr-1" />
              Sell Signal
            </button>
          </div>
        </div>
        
        {/* Sector Filter */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Sektor:</label>
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector === 'all' ? 'Semua Sektor' : sector}
              </option>
            ))}
          </select>
          {sectorFilter !== 'all' && (
            <button
              onClick={() => setSectorFilter('all')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="animate-spin text-primary mb-4" size={48} />
          <p className="text-gray-600">Memuat data saham...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredStocks.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tidak ada saham ditemukan
            </h3>
            <p className="text-gray-600">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </CardBody>
        </Card>
      )}

      {/* Stocks Grid */}
      {!isLoading && filteredStocks.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
          
          {/* Load More Button */}
          {stocksToShow < ALL_STOCKS.length && searchQuery === '' && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMoreStocks}
                disabled={isLoadingMore}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="inline animate-spin mr-2" size={16} />
                    Memuat...
                  </>
                ) : (
                  `Muat Lebih Banyak (${stocksToShow} dari ${ALL_STOCKS.length})`
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Info Card */}
      {!isLoading && (
        <Card className="mt-8">
          <CardBody>
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-900 mb-1">
                  Informasi Penting
                </p>
                <p>
                  Data saham diambil dari Yahoo Finance. Aplikasi ini mencakup {ALL_STOCKS.length}+ saham 
                  dari berbagai sektor di Indonesia termasuk LQ45, perbankan, properti, manufaktur, 
                  teknologi, dan lainnya. Signal buy/sell adalah hasil deteksi pola candlestick dan 
                  bukan merupakan rekomendasi investasi. Selalu lakukan riset mandiri sebelum berinvestasi.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}