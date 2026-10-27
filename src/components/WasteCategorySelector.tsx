'use client';

import React from 'react';
import { WASTE_CATEGORIES } from '@/data/constants';
import { WasteCategoryId } from '@/types';
import { Package, FileText, Shield, Wine, Cpu, Leaf, Sparkles, Box } from 'lucide-react';

interface Props {
  selectedId: WasteCategoryId | null;
  onSelect: (id: WasteCategoryId) => void;
}

export const WasteCategorySelector: React.FC<Props> = ({ selectedId, onSelect }) => {
  const getIcon = (id: WasteCategoryId) => {
    switch (id) {
      case 'paper':
        return <FileText className="w-5 h-5 text-[#063D2E]" />;
      case 'cardboard':
        return <Box className="w-5 h-5 text-[#063D2E]" />;
      case 'plastic':
        return <Package className="w-5 h-5 text-[#063D2E]" />;
      case 'metal':
        return <Shield className="w-5 h-5 text-[#063D2E]" />;
      case 'ewaste':
        return <Cpu className="w-5 h-5 text-[#063D2E]" />;
      case 'glass':
        return <Wine className="w-5 h-5 text-[#063D2E]" />;
      case 'organic':
        return <Leaf className="w-5 h-5 text-[#063D2E]" />;
      default:
        return <Package className="w-5 h-5 text-[#063D2E]" />;
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
            className={`group relative text-left p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
              isSelected
                ? 'bg-[#00B884]/10 border-[#063D2E] ring-1 ring-[#063D2E]'
                : 'bg-white border-[#E2E9E3] hover:border-[#65736B]/40 hover:bg-[#F8FAF7]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-2 rounded-md ${
                    isSelected ? 'bg-white text-[#063D2E]' : 'bg-[#F8FAF7] text-[#17231E]'
                  }`}
                >
                  {getIcon(cat.id)}
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#063D2E] bg-white px-2 py-0.5 rounded border border-[#E2E9E3]">
                  <Sparkles className="w-3 h-3 text-[#FFB800]" />
                  +{cat.pointsPerKg} pts/kg
                </span>
              </div>
              <h4 className="font-semibold text-sm text-[#17231E] leading-tight">{cat.name}</h4>
              <p className="text-[11px] text-[#65736B] mt-1 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#E2E9E3] flex items-center justify-between text-[10px] text-[#65736B]">
              <span className="truncate">e.g. {cat.examples.split(',')[0]}</span>
              <span className="font-medium text-[#063D2E]">~{cat.co2SavedPerKg}kg CO₂e</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
