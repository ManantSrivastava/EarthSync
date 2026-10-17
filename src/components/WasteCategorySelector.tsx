'use client';

import React from 'react';
import { WASTE_CATEGORIES } from '@/data/constants';
import { WasteCategoryId } from '@/types';
import { Package, FileText, Shield, Wine, Cpu, Leaf, Sparkles } from 'lucide-react';

interface Props {
  selectedId: WasteCategoryId | null;
  onSelect: (id: WasteCategoryId) => void;
}

export const WasteCategorySelector: React.FC<Props> = ({ selectedId, onSelect }) => {
  const getIcon = (id: WasteCategoryId) => {
    switch (id) {
      case 'plastic':
        return <Package className="w-5 h-5 text-emerald-600" />;
      case 'paper':
        return <FileText className="w-5 h-5 text-amber-600" />;
      case 'metal':
        return <Shield className="w-5 h-5 text-slate-600" />;
      case 'glass':
        return <Wine className="w-5 h-5 text-teal-600" />;
      case 'ewaste':
        return <Cpu className="w-5 h-5 text-indigo-600" />;
      case 'organic':
        return <Leaf className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {WASTE_CATEGORIES.map((cat) => {
        const isSelected = selectedId === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={`group relative text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              isSelected
                ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-500/30 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-2 rounded-lg transition-transform group-hover:scale-105 ${
                    isSelected ? 'bg-emerald-100' : 'bg-slate-100'
                  }`}
                >
                  {getIcon(cat.id)}
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300/40">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  {cat.pointsPerKg} pts/kg
                </span>
              </div>
              <h4 className="font-semibold text-sm text-slate-800 leading-tight">{cat.name}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="truncate">e.g. {cat.examples.split(',')[0]}</span>
              <span className="font-semibold text-emerald-700">~{cat.co2SavedPerKg}kg CO₂e</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
