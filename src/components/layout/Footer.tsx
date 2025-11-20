import React from 'react';
import { Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12 mb-16 md:mb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Made with</span>
            <Heart size={16} className="text-danger fill-danger" />
            <span>by</span>
            <a
              href="https://github.com/ukisatriana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              @ukisatriana
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ukisatriana/goro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} GORO. All rights reserved.</p>
          <p className="mt-1">
            Data provided by Yahoo Finance. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}