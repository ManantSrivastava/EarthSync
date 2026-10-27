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
  CheckCircle2, 
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

  // Map internal status to clear display status
  const getStatusDisplay = () => {
    switch (pickup.status) {
      case 'Requested':
        return {
          label: 'Pending',
          badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
          icon: <Clock3 className="w-3.5 h-3.5 text-amber-700" />,
        };
      case 'Scheduled':
        return {
          label: 'Scheduled',
          badgeClass: 'bg-sky-50 text-sky-900 border-sky-200',
          icon: <Truck className="w-3.5 h-3.5 text-sky-700" />,
        };
      case 'Collected':
        return {
          label: 'Completed',
          badgeClass: 'bg-[#00B884]/10 text-[#063D2E] border-[#00B884]/30',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884]" />,
        };
      case 'Cancelled':
        return {
          label: 'Cancelled',
          badgeClass: 'bg-[#F8FAF7] text-[#65736B] border-[#E2E9E3]',
          icon: <Ban className="w-3.5 h-3.5 text-[#65736B]" />,
        };
      default:
        return {
          label: pickup.status,
          badgeClass: 'bg-[#F8FAF7] text-[#17231E] border-[#E2E9E3]',
          icon: <Clock3 className="w-3.5 h-3.5 text-[#65736B]" />,
        };
    }
  };

  const statusInfo = getStatusDisplay();
  const isPending = pickup.status === 'Requested' || pickup.status === 'Scheduled';

  return (
    <div className="bg-white rounded-lg border border-[#E2E9E3] p-5 transition-all hover:border-[#65736B]/30 flex flex-col justify-between">
      <div>
        {/* Header row: Status, Request ID, Sample Tag, Points */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${statusInfo.badgeClass}`}>
              {statusInfo.icon}
              {statusInfo.label}
            </span>

            {pickup.isSample && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F8FAF7] text-[#65736B] border border-[#E2E9E3] uppercase tracking-wider">
                Demo
              </span>
            )}
            <span className="text-xs text-[#65736B] font-mono">#{pickup.id.slice(-6)}</span>
          </div>

          {/* Points Badge */}
          <div className="flex items-center gap-1 text-xs font-semibold text-[#063D2E] bg-[#F8FAF7] px-2.5 py-0.5 rounded-md border border-[#E2E9E3]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>
              {pickup.status === 'Collected' ? `+${pickup.pointsEarned} pts` : `Est. +${potentialPoints} pts`}
            </span>
          </div>
        </div>

        {/* Category & Quantity */}
        <div className="flex items-baseline justify-between mb-2">
          <h4 className="text-base font-bold text-[#17231E]">
            {categoryDef ? categoryDef.name : pickup.categoryLabel}
          </h4>
          <span className="text-sm font-bold text-[#063D2E] bg-[#00B884]/10 px-2.5 py-0.5 rounded border border-[#00B884]/20">
            {pickup.quantityKg} kg
          </span>
        </div>

        {/* Request Details */}
        <div className="space-y-1.5 text-xs text-[#65736B] mt-3 pt-3 border-t border-[#E2E9E3]">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#65736B] shrink-0 mt-0.5" />
            <span className="line-clamp-2">{pickup.pickupAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#65736B] shrink-0" />
            <span>Date: {pickup.preferredDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#65736B] shrink-0" />
            <span>Slot: {pickup.timeSlot}</span>
          </div>
          {pickup.notes && (
            <div className="mt-2 p-2 rounded-md bg-[#F8FAF7] text-[11px] text-[#65736B] italic border border-[#E2E9E3]">
              &ldquo;{pickup.notes}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* Action / Simulation Controls */}
      <div className="mt-4 pt-3 border-t border-[#E2E9E3] flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          {pickup.status === 'Requested' && (
            <button
              onClick={() => updatePickupStatus(pickup.id, 'Scheduled')}
              className="text-[11px] font-medium text-sky-800 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2.5 py-1.5 rounded-md border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Simulate dispatching demo driver"
            >
              <Truck className="w-3 h-3" />
              <span>Simulate: Schedule</span>
            </button>
          )}

          {pickup.status === 'Scheduled' && (
            <button
              onClick={() => updatePickupStatus(pickup.id, 'Collected')}
              className="text-[11px] font-medium text-[#063D2E] hover:text-[#042E24] bg-[#00B884]/15 hover:bg-[#00B884]/25 px-2.5 py-1.5 rounded-md border border-[#00B884]/30 transition-colors flex items-center gap-1 cursor-pointer"
              title="Simulate physical collection & award points"
            >
              <CheckCircle2 className="w-3 h-3 text-[#00B884]" />
              <span>Simulate: Complete (+Points)</span>
            </button>
          )}

          {pickup.status === 'Collected' && (
            <span className="text-[11px] text-[#063D2E] font-medium flex items-center gap-1 py-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00B884]" />
              Points Credited
            </span>
          )}

          {/* Cancel Option for pending requests */}
          {isPending && (
            <button
              onClick={() => cancelPickup(pickup.id)}
              className="text-[11px] font-medium text-rose-700 hover:text-rose-800 hover:bg-rose-50 px-2.5 py-1.5 rounded-md transition-colors ml-auto border border-rose-200 cursor-pointer"
            >
              Cancel Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
