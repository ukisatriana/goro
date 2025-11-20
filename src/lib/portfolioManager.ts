import { Portfolio, PortfolioItem } from '@/types/portfolio';
import { generateId } from './utils';

const STORAGE_KEY = 'goro_portfolio';

/**
 * Load portfolio from localStorage
 */
export function loadPortfolio(): PortfolioItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading portfolio:', error);
    return [];
  }
}

/**
 * Save portfolio to localStorage
 */
export function savePortfolio(items: PortfolioItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving portfolio:', error);
  }
}

/**
 * Add item to portfolio
 */
export function addPortfolioItem(
  items: PortfolioItem[],
  newItem: Omit<PortfolioItem, 'id'>
): PortfolioItem[] {
  const item: PortfolioItem = {
    ...newItem,
    id: generateId(),
  };

  const updated = [...items, item];
  savePortfolio(updated);
  return updated;
}

/**
 * Update portfolio item
 */
export function updatePortfolioItem(
  items: PortfolioItem[],
  id: string,
  updates: Partial<PortfolioItem>
): PortfolioItem[] {
  const updated = items.map((item) =>
    item.id === id ? { ...item, ...updates } : item
  );

  savePortfolio(updated);
  return updated;
}

/**
 * Delete portfolio item
 */
export function deletePortfolioItem(items: PortfolioItem[], id: string): PortfolioItem[] {
  const updated = items.filter((item) => item.id !== id);
  savePortfolio(updated);
  return updated;
}

/**
 * Calculate portfolio statistics
 */
export function calculatePortfolioStats(items: PortfolioItem[]): Portfolio {
  const totalInvestment = items.reduce(
    (sum, item) => sum + item.buyPrice * item.quantity,
    0
  );

  const currentValue = items.reduce(
    (sum, item) => sum + (item.currentPrice || item.buyPrice) * item.quantity,
    0
  );

  const totalGainLoss = currentValue - totalInvestment;
  const totalGainLossPercent =
    totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

  return {
    items,
    totalInvestment,
    currentValue,
    totalGainLoss,
    totalGainLossPercent,
  };
}