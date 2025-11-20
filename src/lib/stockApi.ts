import { Candle } from '@/types/stock';

interface YahooFinanceQuote {
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketVolume: number;
}

interface YahooFinanceChartResult {
  timestamp: number[];
  indicators: {
    quote: Array<{
      open: number[];
      high: number[];
      low: number[];
      close: number[];
      volume: number[];
    }>;
  };
}

/**
 * Fetch stock data from Yahoo Finance
 */
export async function fetchStockData(
  symbol: string,
  interval: string = '1mo',
  range: string = '2y'
): Promise<Candle[]> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.chart?.result?.[0]) {
      throw new Error('No data available');
    }

    const result: YahooFinanceChartResult = data.chart.result[0];
    const timestamps = result.timestamp;
    const quotes = result.indicators.quote[0];

    const candles: Candle[] = timestamps.map((time, index) => ({
      time: time * 1000, // Convert to milliseconds
      open: quotes.open[index] || 0,
      high: quotes.high[index] || 0,
      low: quotes.low[index] || 0,
      close: quotes.close[index] || 0,
      volume: quotes.volume[index] || 0,
    }));

    return candles.filter((c) => c.open > 0 && c.close > 0);
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return [];
  }
}

/**
 * Fetch current quote for a stock
 */
export async function fetchStockQuote(symbol: string): Promise<YahooFinanceQuote | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.chart?.result?.[0]) {
      throw new Error('No data available');
    }

    const result = data.chart.result[0];
    const meta = result.meta;

    return {
      regularMarketPrice: meta.regularMarketPrice || 0,
      regularMarketChange: meta.regularMarketChange || 0,
      regularMarketChangePercent: meta.regularMarketChangePercent || 0,
      regularMarketVolume: meta.regularMarketVolume || 0,
    };
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    return null;
  }
}

/**
 * Search stocks by symbol or name
 */
export function searchStocks(query: string, stocks: any[]): any[] {
  const lowerQuery = query.toLowerCase();
  return stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(lowerQuery) ||
      stock.name.toLowerCase().includes(lowerQuery)
  );
}