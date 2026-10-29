'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { SolarSystemType, SolarFinancingPreference } from '@/types';
import { 
  Sun, 
  CheckCircle2, 
  ShieldAlert, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  AlertCircle, 
  X,
  Sliders,
  Sparkles
} from 'lucide-react';

interface Props {
  initialCapacityKw?: number;
  initialEstimatedCost?: number;
  initialMonthlySavings?: number;
  initialLocationState?: string;
  initialMonthlyBill?: number;
  initialRoofAreaSqFt?: number;
  onSuccess?: () => void;
  onClose?: () => void;
}

export const SolarEnquiryForm: React.FC<Props> = ({
  initialCapacityKw = 3.5,
  initialEstimatedCost = 189000,
  initialMonthlySavings = 4200,
  initialLocationState = 'Maharashtra',
  initialMonthlyBill = 4500,
  initialRoofAreaSqFt = 450,
  onSuccess,
  onClose,
}) => {
  const { userProfile, submitSolarEnquiry } = useEarthSync();

  // User personal details initialized from user profile (or empty, no hardcoded fake demo data)
  const [fullName, setFullName] = useState(userProfile.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(userProfile.email || '');
  const [city, setCity] = useState(initialLocationState || userProfile.campusLocation || '');
  const [address, setAddress] = useState(userProfile.campusLocation || '');
  const [systemType, setSystemType] = useState<SolarSystemType>('On-Grid (Net Metered)');
  const [financingPreference, setFinancingPreference] = useState<SolarFinancingPreference>('Direct Outright Purchase');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || fullName.trim().length < 3) {
      setError('Please provide your full name or organization name (at least 3 characters).');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setError('Please provide a valid contact phone number.');
      return;
    }
    if (!city.trim() || city.trim().length < 2) {
      setError('Please provide your city / state region.');
      return;
    }

    setIsSubmitting(true);

    const consultationNotes = notes.trim()
      ? `${notes.trim()} | Modeled for ${initialRoofAreaSqFt} sq ft roof, ₹${initialMonthlyBill}/mo bill benchmark.`
      : `Modeled for ${initialRoofAreaSqFt} sq ft roof, ₹${initialMonthlyBill}/mo bill benchmark.`;

    const res = submitSolarEnquiry({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      address: address.trim(),
      systemType,
      financingPreference,
      suggestedCapacityKw: initialCapacityKw,
      estimatedCostInr: initialEstimatedCost,
      monthlySavingsInr: initialMonthlySavings,
      notes: consultationNotes,
    });

    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Failed to submit enquiry');
    } else {
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E9E3] shadow-2xl overflow-hidden max-w-2xl w-full animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="bg-[#063D2E] p-6 text-white flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-white/10 text-[#FFB800]">
              <Sun className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-lg text-white">SolarSaathi Solar Consultation Request</h3>
          </div>
          <p className="text-xs text-white/80">
            Submit your modeled specifications to connect with verified solar EPC installers.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Notice Banner */}
      <div className="bg-[#F8FAF7] border-b border-[#E2E9E3] px-6 py-2.5 flex items-center justify-between gap-2 text-[11px] text-[#65736B]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#FFB800] shrink-0" />
          <span>Your modeled specifications will be forwarded to certified solar partners in your region.</span>
        </div>
        <span className="text-[#063D2E] font-semibold hidden sm:inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#00B884]" />
          <span>Live Calculator Sync</span>
        </span>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Predefined Benchmark Data from Solar Calculator */}
        <div className="p-4 rounded-xl bg-[#F8FAF7] border border-[#E2E9E3] space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#063D2E] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#00B884]" />
              <span>Predefined Calculator Benchmark</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
              {initialLocationState || 'Regional Average'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs pt-1">
            <div className="p-2.5 bg-white rounded-lg border border-[#E2E9E3]">
              <span className="text-[10px] text-[#65736B] block uppercase tracking-wider">Modeled Sizing</span>
              <span className="font-black text-[#063D2E] text-sm">{initialCapacityKw} kWp</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#E2E9E3]">
              <span className="text-[10px] text-[#65736B] block uppercase tracking-wider">Benchmark Outlay</span>
              <span className="font-black text-[#17231E] text-sm">₹{initialEstimatedCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#E2E9E3]">
              <span className="text-[10px] text-[#65736B] block uppercase tracking-wider">Est. Bill Offset</span>
              <span className="font-black text-[#00B884] text-sm">~₹{initialMonthlySavings.toLocaleString('en-IN')}/mo</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#E2E9E3]">
              <span className="text-[10px] text-[#65736B] block uppercase tracking-wider">Roof Space</span>
              <span className="font-bold text-[#17231E] text-sm">{initialRoofAreaSqFt} sq ft</span>
            </div>
          </div>
        </div>

        {/* Section 2: Personal Details (Empty by default / filled by user) */}
        <div className="pt-1 space-y-4">
          <div className="text-xs font-bold text-[#17231E] uppercase tracking-wider flex items-center justify-between">
            <span>Personal & Installation Details</span>
            <span className="text-[10px] font-normal text-[#65736B] lowercase">customize for your site</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#17231E] mb-1.5">
                Contact Person / Organization <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#65736B] absolute left-3 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2E9E3] focus:outline-none focus:ring-2 focus:ring-[#00B884] focus:border-transparent text-sm font-medium text-[#17231E] bg-white"
                  placeholder="Enter your full name or organization"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17231E] mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#65736B] absolute left-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2E9E3] focus:outline-none focus:ring-2 focus:ring-[#00B884] focus:border-transparent text-sm font-medium text-[#17231E] bg-white"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#17231E] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#65736B] absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2E9E3] focus:outline-none focus:ring-2 focus:ring-[#00B884] focus:border-transparent text-sm text-[#17231E] bg-white"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17231E] mb-1.5">
                City / Region <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#65736B] absolute left-3 top-3" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2E9E3] focus:outline-none focus:ring-2 focus:ring-[#00B884] focus:border-transparent text-sm text-[#17231E] bg-white"
                  placeholder="e.g. Pune, Maharashtra"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17231E] mb-1.5">
              Installation Site Address / Campus Location
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#E2E9E3] focus:outline-none focus:ring-2 focus:ring-[#00B884] focus:border-transparent text-sm text-[#17231E] bg-white"
              placeholder="e.g. Sector 9, Flat/Plot No. 42, Campus Residency"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#17231E] mb-1.5">
                System Architecture
              </label>
              <select
                value={systemType}
                onChange={(e) => setSystemType(e.target.value as SolarSystemType)}
                className="w-full px-3 py-2 rounded-xl border border-[#E2E9E3] text-xs font-semibold text-[#17231E] bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B884]"
              >
                <option value="On-Grid (Net Metered)">On-Grid (Net Metered)</option>
                <option value="Off-Grid (Battery Backup)">Off-Grid (Battery Backup)</option>
                <option value="Hybrid Solar">Hybrid Solar (Grid + Battery)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17231E] mb-1.5">
                Financing Preference
              </label>
              <select
                value={financingPreference}
                onChange={(e) => setFinancingPreference(e.target.value as SolarFinancingPreference)}
                className="w-full px-3 py-2 rounded-xl border border-[#E2E9E3] text-xs font-semibold text-[#17231E] bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B884]"
              >
                <option value="Direct Outright Purchase">Direct Outright Purchase (CAPEX)</option>
                <option value="Solar Loan / EMI">Green Energy Loan / Low EMI</option>
                <option value="Zero-Investment Rooftop Lease">Zero-Investment Rooftop Lease</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17231E] mb-1.5">
              Specific Roof Details or Queries (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#E2E9E3] focus:outline-none focus:ring-2 focus:ring-[#00B884] focus:border-transparent text-sm text-[#17231E] bg-white"
              placeholder="e.g. RCC flat roof with water tank, shadow on east side until 9 AM, 3-phase grid connection"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-xl bg-[#063D2E] hover:bg-[#084e3a] text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4 text-[#00B884]" />
            <span>Submit Solar Consultation Request</span>
          </button>
        </div>
      </form>
    </div>
  );
};
