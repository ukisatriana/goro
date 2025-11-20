export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  volume?: number;
}

export interface StockData {
  symbol: string;
  name: string;
  sector: string;
  candles: Candle[];
  currentPrice: number;
  change: number;
  changePercent: number;
  signals: Signal[];
  trend: 'uptrend' | 'downtrend' | 'sideways';
}

export interface Signal {
  type: 'buy' | 'sell';
  pattern: string;
  confidence: 'high' | 'medium' | 'low';
  timestamp: number;
  price: number;
  description: string;
}