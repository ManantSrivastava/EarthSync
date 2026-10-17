'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { WasteCategorySelector } from './WasteCategorySelector';
import { WasteCategoryId, TimeSlot } from '@/types';
import { WASTE_CATEGORIES } from '@/data/constants';
import { Calendar, Clock, MapPin, Sparkles, Scale, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  onSuccess?: () => void;
}

export const WastePickupForm: React.FC<Props> = ({ onSuccess }) => {
  const { addPickup } = useEarthSync();

  const [category, setCategory] = useState<WasteCategoryId>('plastic');
  const [quantityKg, setQuantityKg] = useState<number>(5);
  const [address, setAddress] = useState<string>('Campus Science Block C, Ground Floor Reception');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [minDate, setMinDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('Morning (08:00 - 11:00)');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Set date client-side to prevent Next.js prerender timestamp mismatch
  React.useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setMinDate(todayStr);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const selectedCategory = WASTE_CATEGORIES.find((c) => c.id === category);
  const potentialPoints = selectedCategory ? Math.round(selectedCategory.pointsPerKg * quantityKg) : 0;
  const potentialCo2 = selectedCategory ? (selectedCategory.co2SavedPerKg * quantityKg).toFixed(1) : '0';

  const addressPresets = [
    'Campus Science Block C, Ground Floor Reception',
    'North Student Hostel 4, Main Gate',
    'Faculty Quarters, Sector 9, Flat 102',
    'Central Library Archives, Loading Bay 2',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!quantityKg || quantityKg <= 0) {
      setError('Please specify a valid weight greater than 0 kg.');
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setError('Please provide a complete pickup address (at least 5 characters).');
      return;
    }

    setIsSubmitting(true);

    const res = addPickup({
      category,
      quantityKg: Number(quantityKg),
      pickupAddress: address,
      preferredDate,
      timeSlot,
      notes,
    });

    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Failed to schedule pickup');
    } else {
      setNotes('');
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Waste Category */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          1. Select Waste Category <span className="text-rose-500">*</span>
        </label>
        <WasteCategorySelector selectedId={category} onSelect={(id) => setCategory(id)} />
      </div>

      {/* Step 2: Weight & Live Estimate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            2. Estimated Quantity (kg) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Scale className="w-4 h-4" />
            </div>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="500"
              value={quantityKg}
              onChange={(e) => setQuantityKg(parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-semibold text-slate-800"
              placeholder="e.g. 5"
              required
            />
            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-medium text-slate-400">
              KG
            </span>
          </div>

          {/* Quick chips */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[11px] text-slate-500">Quick set:</span>
            {[2, 5, 10, 25, 50].map((kg) => (
              <button
                key={kg}
                type="button"
                onClick={() => setQuantityKg(kg)}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                  quantityKg === kg
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {kg}kg
              </button>
            ))}
          </div>
        </div>

        {/* Live Reward Preview Banner */}
        <div className="rounded-xl p-3.5 bg-gradient-to-br from-emerald-900 to-forest-900 text-white flex flex-col justify-between shadow-sm border border-emerald-800">
          <div className="flex items-center justify-between text-xs text-emerald-300">
            <span className="flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              GreenPoints Incentive
            </span>
            <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-200">
              On Verified Collection
            </span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-300 tracking-tight">
              +{potentialPoints}
            </span>
            <span className="text-xs text-emerald-200">GreenPoints</span>
          </div>
          <p className="text-[11px] text-emerald-300/80 leading-snug">
            Prevents ~{potentialCo2} kg of CO₂e emissions from landfill methane.
          </p>
        </div>
      </div>

      {/* Step 3: Location */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            3. Pickup Address / Campus Location <span className="text-rose-500">*</span>
          </label>
        </div>
        <div className="relative">
          <div className="absolute top-3 left-3 text-slate-400">
            <MapPin className="w-4 h-4" />
          </div>
          <textarea
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-800"
            placeholder="Room number, building, floor or street address"
            required
          />
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className="text-[11px] text-slate-500 self-center">Presets:</span>
          {addressPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setAddress(preset)}
              className="text-[11px] px-2 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 text-slate-600 transition-colors truncate max-w-xs text-left"
            >
              {preset.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Step 4: Schedule Date & Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            4. Preferred Pickup Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              min={minDate}
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-medium text-slate-800"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            5. Time Slot <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Clock className="w-4 h-4" />
            </div>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value as TimeSlot)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-medium text-slate-800 bg-white"
            >
              <option value="Morning (08:00 - 11:00)">Morning (08:00 - 11:00)</option>
              <option value="Afternoon (12:00 - 15:00)">Afternoon (12:00 - 15:00)</option>
              <option value="Evening (16:00 - 19:00)">Evening (16:00 - 19:00)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 5: Notes */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Special Pickup Instructions (Optional)
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Leave with security guard, call upon arrival, items bagged in blue sack"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-800"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Confirm & Schedule Clean Pickup</span>
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2">
          Your request will be recorded locally and assigned to an authorized EarthSync logistics partner.
        </p>
      </div>
    </form>
  );
};
