'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2">
              <TrendingUp className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">GORO</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Portfolio
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}