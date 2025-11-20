import { Candle } from '@/types/stock';
import { PatternType } from '@/types/signal';

/**
 * Helper function to check if candle is bullish
 */
function isBullish(candle: Candle): boolean {
  return candle.close > candle.open;
}

/**
 * Helper function to check if candle is bearish
 */
function isBearish(candle: Candle): boolean {
  return candle.close < candle.open;
}

/**
 * Get candle body size
 */
function getBodySize(candle: Candle): number {
  return Math.abs(candle.close - candle.open);
}

/**
 * Get upper shadow size
 */
function getUpperShadow(candle: Candle): number {
  return candle.high - Math.max(candle.open, candle.close);
}

/**
 * Get lower shadow size
 */
function getLowerShadow(candle: Candle): number {
  return Math.min(candle.open, candle.close) - candle.low;
}

/**
 * Detect Hammer pattern
 * Bullish reversal: small body at top, long lower shadow (2x body)
 */
export function detectHammer(candles: Candle[], index: number): boolean {
  if (index < 0 || index >= candles.length) return false;
  
  const candle = candles[index];
  const body = getBodySize(candle);
  const lowerShadow = getLowerShadow(candle);
  const upperShadow = getUpperShadow(candle);
  
  // Lower shadow should be at least 2x body
  // Upper shadow should be small
  return lowerShadow >= body * 2 && upperShadow < body * 0.3;
}

/**
 * Detect Inverted Hammer pattern
 * Bullish reversal: small body at bottom, long upper shadow
 */
export function detectInvertedHammer(candles: Candle[], index: number): boolean {
  if (index < 0 || index >= candles.length) return false;
  
  const candle = candles[index];
  const body = getBodySize(candle);
  const lowerShadow = getLowerShadow(candle);
  const upperShadow = getUpperShadow(candle);
  
  // Upper shadow should be at least 2x body
  // Lower shadow should be small
  return upperShadow >= body * 2 && lowerShadow < body * 0.3;
}

/**
 * Detect Bullish Engulfing pattern
 * 2 candles: bearish followed by larger bullish that engulfs it
 */
export function detectBullishEngulfing(candles: Candle[], index: number): boolean {
  if (index < 1 || index >= candles.length) return false;
  
  const prev = candles[index - 1];
  const curr = candles[index];
  
  return (
    isBearish(prev) &&
    isBullish(curr) &&
    curr.open <= prev.close &&
    curr.close >= prev.open
  );
}

/**
 * Detect Piercing Pattern
 * 2 candles: bearish followed by bullish that closes above 50% of previous body
 */
export function detectPiercingPattern(candles: Candle[], index: number): boolean {
  if (index < 1 || index >= candles.length) return false;
  
  const prev = candles[index - 1];
  const curr = candles[index];
  
  const prevMidpoint = (prev.open + prev.close) / 2;
  
  return (
    isBearish(prev) &&
    isBullish(curr) &&
    curr.open < prev.close &&
    curr.close > prevMidpoint &&
    curr.close < prev.open
  );
}

/**
 * Detect Bullish Harami
 * 2 candles: large bearish followed by small bullish within its body
 */
export function detectBullishHarami(candles: Candle[], index: number): boolean {
  if (index < 1 || index >= candles.length) return false;
  
  const prev = candles[index - 1];
  const curr = candles[index];
  
  return (
    isBearish(prev) &&
    isBullish(curr) &&
    curr.open > prev.close &&
    curr.close < prev.open &&
    getBodySize(curr) < getBodySize(prev) * 0.5
  );
}

/**
 * Detect Morning Star
 * 3 candles: bearish, small body (doji-like), bullish
 */
export function detectMorningStar(candles: Candle[], index: number): boolean {
  if (index < 2 || index >= candles.length) return false;
  
  const first = candles[index - 2];
  const second = candles[index - 1];
  const third = candles[index];
  
  const firstBody = getBodySize(first);
  const secondBody = getBodySize(second);
  const thirdBody = getBodySize(third);
  
  return (
    isBearish(first) &&
    secondBody < firstBody * 0.3 &&
    isBullish(third) &&
    thirdBody > firstBody * 0.5
  );
}

/**
 * Detect Three White Soldiers
 * 3 consecutive bullish candles with higher closes
 */
export function detectThreeWhiteSoldiers(candles: Candle[], index: number): boolean {
  if (index < 2 || index >= candles.length) return false;
  
  const first = candles[index - 2];
  const second = candles[index - 1];
  const third = candles[index];
  
  return (
    isBullish(first) &&
    isBullish(second) &&
    isBullish(third) &&
    second.close > first.close &&
    third.close > second.close &&
    second.open > first.open &&
    second.open < first.close &&
    third.open > second.open &&
    third.open < second.close
  );
}

/**
 * Detect Shooting Star
 * Bearish reversal: small body at bottom, long upper shadow
 */
export function detectShootingStar(candles: Candle[], index: number): boolean {
  if (index < 0 || index >= candles.length) return false;
  
  const candle = candles[index];
  const body = getBodySize(candle);
  const lowerShadow = getLowerShadow(candle);
  const upperShadow = getUpperShadow(candle);
  
  return upperShadow >= body * 2 && lowerShadow < body * 0.3;
}

/**
 * Detect Hanging Man
 * Same as hammer but appears in uptrend
 */
export function detectHangingMan(candles: Candle[], index: number): boolean {
  // Same technical pattern as hammer
  return detectHammer(candles, index);
}

/**
 * Detect Bearish Engulfing
 * 2 candles: bullish followed by larger bearish that engulfs it
 */
export function detectBearishEngulfing(candles: Candle[], index: number): boolean {
  if (index < 1 || index >= candles.length) return false;
  
  const prev = candles[index - 1];
  const curr = candles[index];
  
  return (
    isBullish(prev) &&
    isBearish(curr) &&
    curr.open >= prev.close &&
    curr.close <= prev.open
  );
}

/**
 * Detect Dark Cloud Cover
 * 2 candles: bullish followed by bearish that closes below 50% of previous body
 */
export function detectDarkCloudCover(candles: Candle[], index: number): boolean {
  if (index < 1 || index >= candles.length) return false;
  
  const prev = candles[index - 1];
  const curr = candles[index];
  
  const prevMidpoint = (prev.open + prev.close) / 2;
  
  return (
    isBullish(prev) &&
    isBearish(curr) &&
    curr.open > prev.close &&
    curr.close < prevMidpoint &&
    curr.close > prev.open
  );
}

/**
 * Detect Bearish Harami
 * 2 candles: large bullish followed by small bearish within its body
 */
export function detectBearishHarami(candles: Candle[], index: number): boolean {
  if (index < 1 || index >= candles.length) return false;
  
  const prev = candles[index - 1];
  const curr = candles[index];
  
  return (
    isBullish(prev) &&
    isBearish(curr) &&
    curr.open < prev.close &&
    curr.close > prev.open &&
    getBodySize(curr) < getBodySize(prev) * 0.5
  );
}

/**
 * Detect Evening Star
 * 3 candles: bullish, small body (doji-like), bearish
 */
export function detectEveningStar(candles: Candle[], index: number): boolean {
  if (index < 2 || index >= candles.length) return false;
  
  const first = candles[index - 2];
  const second = candles[index - 1];
  const third = candles[index];
  
  const firstBody = getBodySize(first);
  const secondBody = getBodySize(second);
  const thirdBody = getBodySize(third);
  
  return (
    isBullish(first) &&
    secondBody < firstBody * 0.3 &&
    isBearish(third) &&
    thirdBody > firstBody * 0.5
  );
}

/**
 * Detect Three Black Crows
 * 3 consecutive bearish candles with lower closes
 */
export function detectThreeBlackCrows(candles: Candle[], index: number): boolean {
  if (index < 2 || index >= candles.length) return false;
  
  const first = candles[index - 2];
  const second = candles[index - 1];
  const third = candles[index];
  
  return (
    isBearish(first) &&
    isBearish(second) &&
    isBearish(third) &&
    second.close < first.close &&
    third.close < second.close &&
    second.open < first.open &&
    second.open > first.close &&
    third.open < second.open &&
    third.open > second.close
  );
}

/**
 * Main pattern detection function
 */
export function detectPatterns(candles: Candle[]): Record<PatternType, number[]> {
  const patterns: Record<PatternType, number[]> = {
    hammer: [],
    bullish_engulfing: [],
    morning_star: [],
    piercing_pattern: [],
    inverted_hammer: [],
    bullish_harami: [],
    three_white_soldiers: [],
    shooting_star: [],
    bearish_engulfing: [],
    evening_star: [],
    dark_cloud_cover: [],
    hanging_man: [],
    bearish_harami: [],
    three_black_crows: [],
  };

  for (let i = 0; i < candles.length; i++) {
    if (detectHammer(candles, i)) patterns.hammer.push(i);
    if (detectBullishEngulfing(candles, i)) patterns.bullish_engulfing.push(i);
    if (detectMorningStar(candles, i)) patterns.morning_star.push(i);
    if (detectPiercingPattern(candles, i)) patterns.piercing_pattern.push(i);
    if (detectInvertedHammer(candles, i)) patterns.inverted_hammer.push(i);
    if (detectBullishHarami(candles, i)) patterns.bullish_harami.push(i);
    if (detectThreeWhiteSoldiers(candles, i)) patterns.three_white_soldiers.push(i);
    
    if (detectShootingStar(candles, i)) patterns.shooting_star.push(i);
    if (detectBearishEngulfing(candles, i)) patterns.bearish_engulfing.push(i);
    if (detectEveningStar(candles, i)) patterns.evening_star.push(i);
    if (detectDarkCloudCover(candles, i)) patterns.dark_cloud_cover.push(i);
    if (detectHangingMan(candles, i)) patterns.hanging_man.push(i);
    if (detectBearishHarami(candles, i)) patterns.bearish_harami.push(i);
    if (detectThreeBlackCrows(candles, i)) patterns.three_black_crows.push(i);
  }

  return patterns;
}