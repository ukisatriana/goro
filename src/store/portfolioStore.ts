import { create } from 'zustand';
import { PortfolioItem } from '@/types/portfolio';
import {
  loadPortfolio,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  calculatePortfolioStats,
} from '@/lib/portfolioManager';

interface PortfolioStore {
  items: PortfolioItem[];
  isLoading: boolean;
  loadItems: () => void;
  addItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<PortfolioItem>) => void;
  deleteItem: (id: string) => void;
  updatePrices: (prices: Record<string, number>) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  items: [],
  isLoading: false,

  loadItems: () => {
    set({ isLoading: true });
    const items = loadPortfolio();
    set({ items, isLoading: false });
  },

  addItem: (newItem) => {
    const { items } = get();
    const updated = addPortfolioItem(items, newItem);
    set({ items: updated });
  },

  updateItem: (id, updates) => {
    const { items } = get();
    const updated = updatePortfolioItem(items, id, updates);
    set({ items: updated });
  },

  deleteItem: (id) => {
    const { items } = get();
    const updated = deletePortfolioItem(items, id);
    set({ items: updated });
  },

  updatePrices: (prices) => {
    const { items } = get();
    const updated = items.map((item) => ({
      ...item,
      currentPrice: prices[item.symbol] || item.currentPrice || item.buyPrice,
    }));
    set({ items: updated });
  },
}));