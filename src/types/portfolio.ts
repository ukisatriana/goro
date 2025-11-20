export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  buyDate: string;
  notes?: string;
  currentPrice?: number;
  totalValue?: number;
  gainLoss?: number;
  gainLossPercent?: number;
}

export interface Portfolio {
  items: PortfolioItem[];
  totalInvestment: number;
  currentValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}