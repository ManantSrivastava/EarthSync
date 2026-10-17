'use client';

import React from 'react';
import { PickupRequest } from '@/types';
import { useEarthSync } from '@/context/EarthSyncContext';
import { WASTE_CATEGORIES } from '@/data/constants';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle, 
  Clock3, 
  Ban, 
  Truck 
} from 'lucide-react';

interface Props {
  pickup: PickupRequest;
}

export const PickupCard: React.FC<Props> = ({ pickup }) => {
  const { cancelPickup, updatePickupStatus } = useEarthSync();

  const categoryDef = WASTE_CATEGORIES.find((c) => c.id === pickup.category);
  const pointsRate = categoryDef ? categoryDef.pointsPerKg : 5;
  const potentialPoints = Math.round(pickup.quantityKg * pointsRate);

  const getStatusBadge = () => {
    switch (pickup.status) {
      case 'Requested':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <Clock3 className="w-3 h-3 text-amber-600" />
            Requested
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-300">
            <Truck className="w-3 h-3 text-sky-600" />
            Scheduled
          </span>
        );
      case 'Collected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Collected
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-300">
            <Ban className="w-3 h-3 text-slate-500" />
            Cancelled
          </span>
        );
    }
  };

  const isPending = pickup.status === 'Requested' || pickup.status === 'Scheduled';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 transition-all hover:border-slate-300 hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge()}
            {pickup.isSample && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">
                Sample
              </span>
            )}
            <span className="text-xs text-slate-400 font-mono">#{pickup.id.slice(-6)}</span>
          </div>

          {/* Points Pill */}
          <div className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {pickup.status === 'Collected' ? `+${pickup.pointsEarned} pts` : `Est. +${potentialPoints} pts`}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-baseline justify-between mb-2">
          <h4 className="text-base font-bold text-slate-900">{pickup.categoryLabel}</h4>
          <span className="text-base font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
            {pickup.quantityKg} kg
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{pickup.pickupAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Date: {pickup.preferredDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Slot: {pickup.timeSlot}</span>
          </div>
          {pickup.notes && (
            <div className="mt-2 p-2 rounded-lg bg-slate-50 text-[11px] text-slate-500 italic border border-slate-100">
              &ldquo;{pickup.notes}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* Action / Simulation Controls */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
        {/* Presentation Simulation Row */}
        <div className="flex items-center justify-between gap-2">
          {pickup.status === 'Requested' && (
            <button
              onClick={() => updatePickupStatus(pickup.id, 'Scheduled')}
              className="text-[11px] font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-2.5 py-1.5 rounded-lg border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Simulate vendor booking this pickup"
            >
              <Truck className="w-3 h-3" />
              <span>Simulate: Dispatch Driver</span>
            </button>
          )}

          {pickup.status === 'Scheduled' && (
            <button
              onClick={() => updatePickupStatus(pickup.id, 'Collected')}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Simulate physical collection & award points"
            >
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Simulate: Mark Collected (+Points)</span>
            </button>
          )}

          {pickup.status === 'Collected' && (
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 py-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Points Credited to Wallet
            </span>
          )}

          {isPending && (
            <button
              onClick={() => cancelPickup(pickup.id)}
              className="text-[11px] font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors ml-auto cursor-pointer"
            >
              Cancel Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
