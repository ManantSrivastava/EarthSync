'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { PickupCard } from './PickupCard';
import { PickupStatus } from '@/types';
import { PackageOpen, Filter, Plus } from 'lucide-react';

interface Props {
  onOpenSchedule?: () => void;
}

export const PickupList: React.FC<Props> = ({ onOpenSchedule }) => {
  const { pickups } = useEarthSync();
  const [filter, setFilter] = useState<PickupStatus | 'All' | 'Active'>('All');

  const filteredPickups = pickups.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return p.status === 'Requested' || p.status === 'Scheduled';
    return p.status === filter;
  });

  const counts = {
    all: pickups.length,
    active: pickups.filter((p) => p.status === 'Requested' || p.status === 'Scheduled').length,
    collected: pickups.filter((p) => p.status === 'Collected').length,
    cancelled: pickups.filter((p) => p.status === 'Cancelled').length,
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 pl-2 pr-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>

          <button
            onClick={() => setFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'All'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({counts.all})
          </button>

          <button
            onClick={() => setFilter('Active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'Active'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Active ({counts.active})
          </button>

          <button
            onClick={() => setFilter('Collected')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'Collected'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Collected ({counts.collected})
          </button>

          <button
            onClick={() => setFilter('Cancelled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === 'Cancelled'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Cancelled ({counts.cancelled})
          </button>
        </div>

        {onOpenSchedule && (
          <button
            onClick={onOpenSchedule}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Pickup</span>
          </button>
        )}
      </div>

      {/* List */}
      {filteredPickups.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <PackageOpen className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 text-base">No Pickups Found</h4>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            {filter === 'All'
              ? 'You have not scheduled any waste pickups yet. Schedule one to start earning GreenPoints!'
              : `No pickups matching the status "${filter}".`}
          </p>
          {onOpenSchedule && (
            <button
              onClick={onOpenSchedule}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
            >
              Schedule Your First Pickup
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPickups.map((pickup) => (
            <PickupCard key={pickup.id} pickup={pickup} />
          ))}
        </div>
      )}
    </div>
  );
};
