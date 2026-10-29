'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { WasteCategorySelector } from './WasteCategorySelector';
import { WasteCategoryId, TimeSlot } from '@/types';
import { WASTE_CATEGORIES } from '@/data/constants';
import { Calendar, Clock, MapPin, Sparkles, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  onSuccess?: () => void;
}

export const WastePickupForm: React.FC<Props> = ({ onSuccess }) => {
  const { addPickup } = useEarthSync();

  const [category, setCategory] = useState<WasteCategoryId>('paper');
  const [quantityKg, setQuantityKg] = useState<number>(5);
  const [address, setAddress] = useState<string>('');
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
      setError('Please specify a valid quantity greater than 0 kg.');
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setError('Please provide a complete pickup address (at least 5 characters).');
      return;
    }

    if (!preferredDate) {
      setError('Please select a preferred pickup date.');
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
      setError(res.error || 'Failed to schedule waste pickup.');
    } else {
      setNotes('');
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Waste Category */}
      <div>
        <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-2">
          Waste Category <span className="text-rose-500">*</span>
        </label>
        <WasteCategorySelector selectedId={category} onSelect={(id) => setCategory(id)} />
      </div>

      {/* Step 2: Estimated Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div>
          <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-2">
            Estimated Quantity (kg) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#65736B]">
              <Scale className="w-4 h-4" />
            </div>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="500"
              value={quantityKg}
              onChange={(e) => setQuantityKg(parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-12 py-2.5 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm font-semibold text-[#17231E] bg-white"
              placeholder="e.g. 5"
              required
            />
            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-medium text-[#65736B]">
              KG
            </span>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[11px] text-[#65736B]">Quick select:</span>
            {[2, 5, 10, 20, 50].map((kg) => (
              <button
                key={kg}
                type="button"
                onClick={() => setQuantityKg(kg)}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                  quantityKg === kg
                    ? 'bg-[#063D2E] text-white border-[#063D2E]'
                    : 'bg-[#F8FAF7] hover:bg-white text-[#17231E] border-[#E2E9E3]'
                }`}
              >
                {kg}kg
              </button>
            ))}
          </div>
        </div>

        {/* Live Reward Preview Banner */}
        <div className="rounded-md p-4 bg-[#F8FAF7] border border-[#E2E9E3] text-[#17231E] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 font-semibold text-[#063D2E]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              Estimated Reward
            </span>
            <span className="text-[10px] bg-white border border-[#E2E9E3] px-2 py-0.5 rounded text-[#65736B]">
              Credited on Completed Pickup
            </span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#063D2E] tracking-tight">
              +{potentialPoints}
            </span>
            <span className="text-xs text-[#65736B] font-medium">GreenPoints</span>
          </div>
          <p className="text-[11px] text-[#65736B] leading-snug">
            Recovers recyclable material and prevents ~{potentialCo2} kg of landfill emissions.
          </p>
        </div>
      </div>

      {/* Step 3: Pickup Address */}
      <div>
        <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
          Pickup Address <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 text-[#65736B]">
            <MapPin className="w-4 h-4" />
          </div>
          <textarea
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white"
            placeholder="Room number, building, floor or street address"
            required
          />
        </div>

        {/* Address Presets */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className="text-[11px] text-[#65736B] self-center">Presets:</span>
          {addressPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setAddress(preset)}
              className="text-[11px] px-2 py-1 rounded-md bg-[#F8FAF7] hover:bg-white hover:text-[#063D2E] border border-[#E2E9E3] text-[#65736B] transition-colors truncate max-w-xs text-left cursor-pointer"
            >
              {preset.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Step 4: Preferred Date & Time Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
            Preferred Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#65736B]">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              min={minDate}
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm font-medium text-[#17231E] bg-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
            Preferred Time Slot <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#65736B]">
              <Clock className="w-4 h-4" />
            </div>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value as TimeSlot)}
              className="w-full pl-9 pr-3 py-2.5 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm font-medium text-[#17231E] bg-white cursor-pointer"
            >
              <option value="Morning (08:00 - 11:00)">Morning (08:00 - 11:00)</option>
              <option value="Afternoon (12:00 - 15:00)">Afternoon (12:00 - 15:00)</option>
              <option value="Evening (16:00 - 19:00)">Evening (16:00 - 19:00)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 5: Optional Notes */}
      <div>
        <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
          Optional Notes
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Leave with reception, call on arrival, segregated in marked boxes"
          className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white font-semibold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Schedule Waste Pickup</span>
        </button>
        <p className="text-center text-[11px] text-[#65736B] mt-2">
          Your segregated waste collection request will be routed to localized recycling partners.
        </p>
      </div>
    </form>
  );
};
