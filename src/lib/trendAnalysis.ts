import { Candle } from '@/types/stock';

/**
 * Detect trend direction based on recent candles
 */
export function detectTrend(
  candles: Candle[],
  lookbackPeriod: number = 5
): 'uptrend' | 'downtrend' | 'sideways' {
  if (candles.length < lookbackPeriod) return 'sideways';

  const recentCandles = candles.slice(-lookbackPeriod);
  const firstClose = recentCandles[0].close;
  const lastClose = recentCandles[recentCandles.length - 1].close;

  // Calculate average price change
  const priceChange = ((lastClose - firstClose) / firstClose) * 100;

  // Count higher closes and lower closes
  let higherCloses = 0;
  let lowerCloses = 0;

  for (let i = 1; i < recentCandles.length; i++) {
    if (recentCandles[i].close > recentCandles[i - 1].close) {
      higherCloses++;
    } else if (recentCandles[i].close < recentCandles[i - 1].close) {
      lowerCloses++;
    }
  }

  // Determine trend
  if (priceChange > 2 && higherCloses > lowerCloses) {
    return 'uptrend';
  } else if (priceChange < -2 && lowerCloses > higherCloses) {
    return 'downtrend';
  } else {
    return 'sideways';
  }
}

/**
 * Check if stock is in downtrend (for buy signals)
 */
export function isInDowntrend(candles: Candle[], lookbackPeriod: number = 5): boolean {
  return detectTrend(candles, lookbackPeriod) === 'downtrend';
}

/**
 * Check if stock is in uptrend (for sell signals)
 */
export function isInUptrend(candles: Candle[], lookbackPeriod: number = 5): boolean {
  return detectTrend(candles, lookbackPeriod) === 'uptrend';
}

/**
 * Calculate support level
 */
export function calculateSupport(candles: Candle[], period: number = 20): number {
  if (candles.length < period) return 0;

  const recentCandles = candles.slice(-period);
  const lows = recentCandles.map((c) => c.low);

  return Math.min(...lows);
}

/**
 * Calculate resistance level
 */
export function calculateResistance(candles: Candle[], period: number = 20): number {
  if (candles.length < period) return 0;

  const recentCandles = candles.slice(-period);
  const highs = recentCandles.map((c) => c.high);

  return Math.max(...highs);
}

/**
 * Calculate Simple Moving Average
 */
export function calculateSMA(candles: Candle[], period: number): number[] {
  const sma: number[] = [];

  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      sma.push(0);
      continue;
    }

    const slice = candles.slice(i - period + 1, i + 1);
    const sum = slice.reduce((acc, candle) => acc + candle.close, 0);
    sma.push(sum / period);
  }

  return sma;
}