'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PortfolioItem } from '@/types/portfolio';
import { ALL_STOCKS } from '@/constants/stocks';

interface AddPortfolioFormProps {
  onSubmit: (item: Omit<PortfolioItem, 'id'>) => void;
  onCancel: () => void;
  initialData?: PortfolioItem;
}

export function AddPortfolioForm({ onSubmit, onCancel, initialData }: AddPortfolioFormProps) {
  const [formData, setFormData] = useState({
    symbol: initialData?.symbol || '',
    name: initialData?.name || '',
    quantity: initialData?.quantity || 0,
    buyPrice: initialData?.buyPrice || 0,
    buyDate: initialData?.buyDate || new Date().toISOString().split('T')[0],
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSymbolChange = (symbol: string) => {
    const stock = ALL_STOCKS.find((s) => s.symbol === symbol);
    setFormData({
      ...formData,
      symbol,
      name: stock?.name || '',
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.symbol) newErrors.symbol = 'Symbol is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (formData.buyPrice <= 0) newErrors.buyPrice = 'Buy price must be greater than 0';
    if (!formData.buyDate) newErrors.buyDate = 'Buy date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock Symbol
        </label>
        <select
          value={formData.symbol}
          onChange={(e) => handleSymbolChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select a stock</option>
          {ALL_STOCKS.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol} - {stock.name}
            </option>
          ))}
        </select>
        {errors.symbol && <p className="mt-1 text-sm text-danger">{errors.symbol}</p>}
      </div>

      <Input
        label="Stock Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        disabled
      />

      <Input
        label="Quantity (lot)"
        type="number"
        value={formData.quantity || ''}
        onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
        error={errors.quantity}
        placeholder="e.g., 10"
      />

      <Input
        label="Buy Price (IDR)"
        type="number"
        value={formData.buyPrice || ''}
        onChange={(e) => setFormData({ ...formData, buyPrice: Number(e.target.value) })}
        error={errors.buyPrice}
        placeholder="e.g., 5000"
      />

      <Input
        label="Buy Date"
        type="date"
        value={formData.buyDate}
        onChange={(e) => setFormData({ ...formData, buyDate: e.target.value })}
        error={errors.buyDate}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={3}
          placeholder="Add any notes about this investment..."
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="flex-1">
          {initialData ? 'Update' : 'Add'} Stock
        </Button>
      </div>
    </form>
  );
}