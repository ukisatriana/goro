export type PatternType = 
  | 'hammer'
  | 'bullish_engulfing'
  | 'morning_star'
  | 'piercing_pattern'
  | 'inverted_hammer'
  | 'bullish_harami'
  | 'three_white_soldiers'
  | 'shooting_star'
  | 'bearish_engulfing'
  | 'evening_star'
  | 'dark_cloud_cover'
  | 'hanging_man'
  | 'bearish_harami'
  | 'three_black_crows';

export interface PatternInfo {
  name: string;
  type: 'bullish' | 'bearish';
  description: string;
  requiredCandles: number;
}

export interface DetectedPattern {
  pattern: PatternType;
  candles: number[];
  confidence: number;
  timestamp: number;
}

export const PATTERN_NAMES: Record<PatternType, PatternInfo> = {
  hammer: {
    name: 'Hammer',
    type: 'bullish',
    description: 'Pola pembalikan bullish dengan body kecil di atas dan shadow panjang di bawah',
    requiredCandles: 1,
  },
  bullish_engulfing: {
    name: 'Bullish Engulfing',
    type: 'bullish',
    description: 'Candle hijau membungkus sepenuhnya candle merah sebelumnya',
    requiredCandles: 2,
  },
  morning_star: {
    name: 'Morning Star',
    type: 'bullish',
    description: 'Pattern 3 candle dengan pembalikan dari bearish ke bullish',
    requiredCandles: 3,
  },
  piercing_pattern: {
    name: 'Piercing Pattern',
    type: 'bullish',
    description: 'Candle bullish menembus lebih dari 50% body bearish sebelumnya',
    requiredCandles: 2,
  },
  inverted_hammer: {
    name: 'Inverted Hammer',
    type: 'bullish',
    description: 'Body kecil di bawah dengan shadow panjang di atas',
    requiredCandles: 1,
  },
  bullish_harami: {
    name: 'Bullish Harami',
    type: 'bullish',
    description: 'Small bearish candle dalam body bullish besar sebelumnya',
    requiredCandles: 2,
  },
  three_white_soldiers: {
    name: 'Three White Soldiers',
    type: 'bullish',
    description: '3 candle bullish berturut-turut dengan penutupan progresif',
    requiredCandles: 3,
  },
  shooting_star: {
    name: 'Shooting Star',
    type: 'bearish',
    description: 'Body kecil di bawah dengan shadow panjang di atas',
    requiredCandles: 1,
  },
  bearish_engulfing: {
    name: 'Bearish Engulfing',
    type: 'bearish',
    description: 'Candle merah membungkus sepenuhnya candle hijau sebelumnya',
    requiredCandles: 2,
  },
  evening_star: {
    name: 'Evening Star',
    type: 'bearish',
    description: 'Pattern 3 candle dengan pembalikan dari bullish ke bearish',
    requiredCandles: 3,
  },
  dark_cloud_cover: {
    name: 'Dark Cloud Cover',
    type: 'bearish',
    description: 'Candle bearish menembus lebih dari 50% body bullish sebelumnya',
    requiredCandles: 2,
  },
  hanging_man: {
    name: 'Hanging Man',
    type: 'bearish',
    description: 'Seperti hammer tetapi muncul di uptrend',
    requiredCandles: 1,
  },
  bearish_harami: {
    name: 'Bearish Harami',
    type: 'bearish',
    description: 'Small bullish candle dalam body bearish besar sebelumnya',
    requiredCandles: 2,
  },
  three_black_crows: {
    name: 'Three Black Crows',
    type: 'bearish',
    description: '3 candle bearish berturut-turut dengan penutupan progresif',
    requiredCandles: 3,
  },
};