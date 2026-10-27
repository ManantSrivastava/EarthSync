'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { SolarSystemType, SolarFinancingPreference } from '@/types';
import { Sun, CheckCircle2, ShieldAlert, Phone, Mail, User, MapPin, AlertCircle, X } from 'lucide-react';

interface Props {
  initialCapacityKw?: number;
  initialEstimatedCost?: number;
  initialMonthlySavings?: number;
  onSuccess?: () => void;
  onClose?: () => void;
}

export const SolarEnquiryForm: React.FC<Props> = ({
  initialCapacityKw = 3.5,
  initialEstimatedCost = 189000,
  initialMonthlySavings = 4200,
  onSuccess,
  onClose,
}) => {
  const { submitSolarEnquiry } = useEarthSync();

  const [fullName, setFullName] = useState('Dr. Ramesh Kulkarni');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('ramesh.k@univ-campus.edu');
  const [city, setCity] = useState('Pune, Maharashtra');
  const [address, setAddress] = useState('Faculty Residential Complex, Sector 9');
  const [systemType, setSystemType] = useState<SolarSystemType>('On-Grid (Net Metered)');
  const [financingPreference, setFinancingPreference] = useState<SolarFinancingPreference>('Direct Outright Purchase');
  const capacityKw = initialCapacityKw;
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || fullName.trim().length < 3) {
      setError('Please provide your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setError('Please provide a valid contact number.');
      return;
    }
    if (!city.trim() || city.trim().length < 2) {
      setError('Please provide your city / region.');
      return;
    }

    setIsSubmitting(true);

    const res = submitSolarEnquiry({
      fullName,
      phone,
      email,
      city,
      address,
      systemType,
      financingPreference,
      suggestedCapacityKw: capacityKw,
      estimatedCostInr: initialEstimatedCost,
      monthlySavingsInr: initialMonthlySavings,
      notes,
    });

    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Failed to submit enquiry');
    } else {
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#E2E9E3] shadow-lg overflow-hidden max-w-2xl w-full">
      {/* Header */}
      <div className="bg-[#063D2E] p-6 text-white flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-white/10 text-[#FFB800]">
              <Sun className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-lg text-white">SolarSaathi Installer Demo Enquiry</h3>
          </div>
          <p className="text-xs text-white/80">
            Log your technical specifications into local storage for presentation review.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Notice Banner */}
      <div className="bg-[#F8FAF7] border-b border-[#E2E9E3] px-6 py-2.5 flex items-center gap-2 text-[11px] text-[#65736B]">
        <ShieldAlert className="w-4 h-4 text-[#FFB800] shrink-0" />
        <span>
          Academic demonstration prototype: Enquiries are stored locally in your browser. No commercial contract is initiated.
        </span>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
              Contact Person / Organization <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#65736B] absolute left-3 top-3" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm font-medium text-[#17231E] bg-white"
                placeholder="Name or College Department"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#65736B] absolute left-3 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm font-medium text-[#17231E] bg-white"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#65736B] absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
              City / State <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#65736B] absolute left-3 top-3" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white"
                placeholder="e.g. Pune, Maharashtra"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
            Installation Site Address / Campus Location
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3.5 py-2 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white"
            placeholder="Plot / building / floor details"
          />
        </div>

        {/* Technical specs pre-filled from calculator */}
        <div className="p-3.5 rounded-md bg-[#F8FAF7] border border-[#E2E9E3] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-[#65736B] block">Attached Sizing</span>
            <span className="font-bold text-[#063D2E] text-sm">{capacityKw} kWp System</span>
          </div>
          <div>
            <span className="text-[#65736B] block">Est. Turnkey Cost</span>
            <span className="font-bold text-[#17231E] text-sm">₹{initialEstimatedCost.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-[#65736B] block">Est. Bill Offset</span>
            <span className="font-bold text-[#063D2E] text-sm">~₹{initialMonthlySavings.toLocaleString('en-IN')}/mo</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
              System Architecture
            </label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value as SolarSystemType)}
              className="w-full px-3 py-2 rounded-md border border-[#E2E9E3] text-xs font-semibold text-[#17231E] bg-white cursor-pointer"
            >
              <option value="On-Grid (Net Metered)">On-Grid (Net Metered)</option>
              <option value="Off-Grid (Battery Backup)">Off-Grid (Battery Backup)</option>
              <option value="Hybrid Solar">Hybrid Solar (Grid + Battery)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
              Financing Preference
            </label>
            <select
              value={financingPreference}
              onChange={(e) => setFinancingPreference(e.target.value as SolarFinancingPreference)}
              className="w-full px-3 py-2 rounded-md border border-[#E2E9E3] text-xs font-semibold text-[#17231E] bg-white cursor-pointer"
            >
              <option value="Direct Outright Purchase">Direct Outright Purchase (CAPEX)</option>
              <option value="Solar Loan / EMI">Green Energy Loan / Low EMI</option>
              <option value="Zero-Investment Rooftop Lease">Zero-Investment Rooftop Lease</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17231E] uppercase tracking-wider mb-1.5">
            Specific Roof Details or Queries (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 rounded-md border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white"
            placeholder="e.g. RCC flat roof with water tank, shadow on east side until 9 AM, 3-phase grid connection"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-6 rounded-md bg-[#063D2E] hover:bg-[#042E24] text-white font-semibold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Demo Enquiry</span>
          </button>
        </div>
      </form>
    </div>
  );
};
