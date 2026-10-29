'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { PickupCard } from './PickupCard';
import { PackageOpen, Filter, Plus } from 'lucide-react';

interface Props {
  onOpenSchedule?: () => void;
}

type FilterType = 'All' | 'Pending' | 'Scheduled' | 'Completed' | 'Cancelled';

export const PickupList: React.FC<Props> = ({ onOpenSchedule }) => {
  const { pickups } = useEarthSync();
  const [filter, setFilter] = useState<FilterType>('All');

  const filteredPickups = pickups.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return p.status === 'Requested';
    if (filter === 'Scheduled') return p.status === 'Scheduled';
    if (filter === 'Completed') return p.status === 'Collected';
    if (filter === 'Cancelled') return p.status === 'Cancelled';
    return true;
  });

  const counts = {
    all: pickups.length,
    pending: pickups.filter((p) => p.status === 'Requested').length,
    scheduled: pickups.filter((p) => p.status === 'Scheduled').length,
    completed: pickups.filter((p) => p.status === 'Collected').length,
    cancelled: pickups.filter((p) => p.status === 'Cancelled').length,
  };

  const filterTabs: { id: FilterType; label: string; count: number }[] = [
    { id: 'All', label: 'All Requests', count: counts.all },
    { id: 'Pending', label: 'Pending', count: counts.pending },
    { id: 'Scheduled', label: 'Scheduled', count: counts.scheduled },
    { id: 'Completed', label: 'Completed', count: counts.completed },
    { id: 'Cancelled', label: 'Cancelled', count: counts.cancelled },
  ];

  return (
    <div className="space-y-4">
      {/* Filter Tabs Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-lg border border-[#E2E9E3]">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-[#65736B] flex items-center gap-1.5 pl-1 pr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </span>

          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#063D2E] text-white'
                  : 'bg-[#F8FAF7] text-[#17231E] hover:bg-[#E2E9E3]/70 border border-[#E2E9E3]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {onOpenSchedule && (
          <button
            onClick={onOpenSchedule}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#063D2E] hover:bg-[#042E24] px-3.5 py-1.5 rounded-md transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Pickup</span>
          </button>
        )}
      </div>

      {/* Requests Grid */}
      {filteredPickups.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#E2E9E3] p-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] text-[#063D2E] flex items-center justify-center mb-3">
            <PackageOpen className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-[#17231E] text-base">
            {filter === 'All'
              ? "You haven't submitted any waste requests yet."
              : `No requests matching "${filter}"`}
          </h4>
          <p className="text-xs text-[#65736B] max-w-sm mt-1">
            {filter === 'All'
              ? 'Schedule a segregated collection for paper, plastic, metal, glass, or e-waste to earn GreenPoints.'
              : `No waste collection requests currently found with status "${filter}".`}
          </p>
          {onOpenSchedule && (
            <button
              onClick={onOpenSchedule}
              className="mt-4 px-4 py-2 rounded-md bg-[#063D2E] text-white text-xs font-semibold hover:bg-[#042E24] transition-colors cursor-pointer"
            >
              Explore Smart Waste
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
