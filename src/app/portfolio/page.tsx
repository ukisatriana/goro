'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Card, CardBody } from '@/components/ui/Card';
import { PortfolioCard } from '@/components/Portfolio/PortfolioCard';
import { PortfolioSummary } from '@/components/Portfolio/PortfolioSummary';
import { AddPortfolioForm } from '@/components/Portfolio/AddPortfolioForm';
import { usePortfolioStore } from '@/store/portfolioStore';
import { calculatePortfolioStats } from '@/lib/portfolioManager';
import { PortfolioItem } from '@/types/portfolio';

export default function PortfolioPage() {
  const { items, loadItems, addItem, updateItem, deleteItem } = usePortfolioStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const portfolio = calculatePortfolioStats(items);

  const handleAddItem = (newItem: Omit<PortfolioItem, 'id'>) => {
    if (editingItem) {
      updateItem(editingItem.id, newItem);
      setEditingItem(null);
    } else {
      addItem(newItem);
    }
    setIsModalOpen(false);
  };

  const handleEditItem = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      deleteItem(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Saya</h1>
          <p className="text-gray-600">Kelola dan monitor investasi saham Anda</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} className="mr-2" />
          Tambah Saham
        </Button>
      </div>

      {/* Portfolio Summary */}
      {items.length > 0 && (
        <div className="mb-8">
          <PortfolioSummary portfolio={portfolio} />
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Wallet className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Portfolio Anda Masih Kosong
            </h3>
            <p className="text-gray-600 mb-6">
              Mulai tambahkan saham yang Anda miliki untuk melacak kinerja investasi
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus size={20} className="mr-2" />
              Tambah Saham Pertama
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Portfolio Items */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Saham' : 'Tambah Saham'}
      >
        <AddPortfolioForm
          onSubmit={handleAddItem}
          onCancel={handleCloseModal}
          initialData={editingItem || undefined}
        />
      </Modal>
    </div>
  );
}