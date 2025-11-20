import { create } from 'zustand';
import { StockData } from '@/types/stock';

interface StockStore {
  stocks: Record<string, StockData>;
  isLoading: boolean;
  error: string | null;
  addStock: (symbol: string, data: StockData) => void;
  clearError: () => void;
}

export const useStockStore = create<StockStore>((set) => ({
  stocks: {},
  isLoading: false,
  error: null,

  addStock: (symbol, data) => {
    set((state) => ({
      stocks: {
        ...state.stocks,
        [symbol]: data,
      },
    }));
  },

  clearError: () => {
    set({ error: null });
  },
}));