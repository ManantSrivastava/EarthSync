'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { 
  Truck, 
  Scale, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Sun, 
  ShieldAlert, 
  MapPin, 
  Filter, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function AdminPage() {
  const { 
    pickups, 
    solarEnquiries, 
    updatePickupStatus, 
    updateSolarEnquiryStatus 
  } = useEarthSync();

  const [activeTab, setActiveTab] = useState<'waste' | 'solar'>('waste');
  const [wasteStatusFilter, setWasteStatusFilter] = useState<string>('All');
  
  // Weight verification modal state
  const [weighingPickupId, setWeighingPickupId] = useState<string | null>(null);
  const [verifiedWeightInput, setVerifiedWeightInput] = useState<string>('');

  const filteredPickups = pickups.filter((p) => {
    if (wasteStatusFilter === 'All') return true;
    return p.status === wasteStatusFilter;
  });

  const totalCollectedKg = pickups
    .filter((p) => p.status === 'Collected')
    .reduce((acc, p) => acc + p.quantityKg, 0);

  const pendingPickupsCount = pickups.filter(
    (p) => p.status === 'Requested' || p.status === 'Scheduled'
  ).length;

  const totalPointsIssued = pickups
    .filter((p) => p.status === 'Collected')
    .reduce((acc, p) => acc + p.pointsEarned, 0);

  const handleOpenWeighModal = (pickupId: string, currentWeight: number) => {
    setWeighingPickupId(pickupId);
    setVerifiedWeightInput(currentWeight.toString());
  };

  const handleConfirmWeighing = (pickupId: string) => {
    const weightNum = parseFloat(verifiedWeightInput);
    if (isNaN(weightNum) || weightNum <= 0) {
      alert('Please enter a valid scale weight in kg (> 0).');
      return;
    }
    updatePickupStatus(pickupId, 'Collected', weightNum);
    setWeighingPickupId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Demo Mode / RBAC Disclaimer */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 sm:p-5 text-amber-900">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-950 uppercase tracking-wider text-xs">
                Partner and Operations Console
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-200/80 text-amber-900 font-semibold text-[10px]">
                Demo Mode Active
              </span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              This interface simulates operational tools used by verified recycling logistics partners and solar EPC providers. 
              In production, this console requires role-based access control (RBAC), multi-factor authentication (MFA), and TLS-encrypted API session tokens.
            </p>
          </div>
        </div>
      </div>

      {/* Header and Quick Stats */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Logistics and Partner Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Dispatch drivers, verify calibrated scale weights upon physical collection, credit GreenPoints, and advance solar installation feasibility surveys.
          </p>
        </div>

        {/* Operational KPI summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Active Pickups
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {pendingPickupsCount}
            </div>
            <span className="text-[10px] text-slate-400">Awaiting dispatch or weighing</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
              Verified Collected
            </span>
            <div className="text-2xl font-black text-emerald-700 mt-1">
              {totalCollectedKg.toFixed(1)} <span className="text-sm font-bold text-emerald-600">kg</span>
            </div>
            <span className="text-[10px] text-emerald-600">Diverted to recycling hubs</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
              GreenPoints Issued
            </span>
            <div className="text-2xl font-black text-amber-700 mt-1">
              {totalPointsIssued.toLocaleString()}
            </div>
            <span className="text-[10px] text-amber-600">Strictly 1x credit per batch</span>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
            <span className="text-[11px] font-semibold text-sky-800 uppercase tracking-wider block">
              Solar Inquiries
            </span>
            <div className="text-2xl font-black text-sky-800 mt-1">
              {solarEnquiries.length}
            </div>
            <span className="text-[10px] text-sky-600">EPC partner pipeline</span>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('waste')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'waste'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Waste Logistics Operations ({pickups.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('solar')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'solar'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>Solar EPC Pipeline ({solarEnquiries.length})</span>
        </button>
      </div>

      {/* Tab 1: Waste Logistics Table */}
      {activeTab === 'waste' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>Status Filter:</span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Requested', 'Scheduled', 'Collected', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setWasteStatusFilter(status)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      wasteStatusFilter === status
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-slate-400">
              Showing {filteredPickups.length} of {pickups.length} requests
            </span>
          </div>

          {/* Pickups Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px] tracking-wider">
                    <th className="py-3 px-4">Request ID</th>
                    <th className="py-3 px-4">Waste Category</th>
                    <th className="py-3 px-4">Weight (kg)</th>
                    <th className="py-3 px-4">Address and Slot</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4 text-right">Partner Dispatch Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPickups.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No pickup requests match the selected status filter.
                      </td>
                    </tr>
                  ) : (
                    filteredPickups.map((p) => {
                      const isWeighing = weighingPickupId === p.id;

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                            {p.id}
                            {p.isSample && (
                              <span className="block text-[10px] font-sans text-slate-400 font-normal">
                                Sample Record
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-900 block">
                              {p.categoryLabel}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 text-sm">
                              {p.quantityKg.toFixed(1)}
                            </span>
                            <span className="text-slate-400 text-[11px] ml-1">kg</span>
                          </td>
                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="flex items-start gap-1 text-slate-700">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                              <span className="truncate">{p.pickupAddress}</span>
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3" />
                              <span>{p.preferredDate} ({p.timeSlot})</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                p.status === 'Collected'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : p.status === 'Scheduled'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : p.status === 'Cancelled'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {p.status === 'Collected' && <CheckCircle2 className="w-3 h-3" />}
                              {p.status === 'Scheduled' && <Truck className="w-3 h-3" />}
                              {p.status === 'Requested' && <Clock className="w-3 h-3" />}
                              {p.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                              <span>{p.status}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {/* Actions per state */}
                            {p.status === 'Requested' && (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => updatePickupStatus(p.id, 'Scheduled')}
                                  className="px-3 py-1.5 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <Truck className="w-3.5 h-3.5" />
                                  <span>Dispatch Driver</span>
                                </button>
                                <button
                                  onClick={() => updatePickupStatus(p.id, 'Cancelled')}
                                  className="px-2.5 py-1.5 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer"
                                  title="Cancel pickup"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}

                            {p.status === 'Scheduled' && (
                              <div className="flex items-center justify-end gap-1.5">
                                {isWeighing ? (
                                  <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-lg border border-slate-300">
                                    <input
                                      type="number"
                                      step="0.1"
                                      value={verifiedWeightInput}
                                      onChange={(e) => setVerifiedWeightInput(e.target.value)}
                                      className="w-16 px-2 py-1 text-xs bg-white border border-slate-300 rounded font-bold text-slate-800"
                                      placeholder="kg"
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => handleConfirmWeighing(p.id)}
                                      className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() => setWeighingPickupId(null)}
                                      className="px-2 py-1 rounded text-slate-500 hover:bg-slate-200 text-xs cursor-pointer"
                                    >
                                      Close
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleOpenWeighModal(p.id, p.quantityKg)}
                                    className="px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                                  >
                                    <Scale className="w-3.5 h-3.5" />
                                    <span>Weigh and Complete</span>
                                  </button>
                                )}
                              </div>
                            )}

                            {p.status === 'Collected' && (
                              <span className="text-emerald-700 font-semibold text-[11px] flex items-center justify-end gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Verified ({p.pointsEarned} pts credited)
                              </span>
                            )}

                            {p.status === 'Cancelled' && (
                              <span className="text-slate-400 text-[11px]">No active actions</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Solar EPC Pipeline Table */}
      {activeTab === 'solar' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px] tracking-wider">
                    <th className="py-3 px-4">Lead ID</th>
                    <th className="py-3 px-4">Prospect</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">System Spec</th>
                    <th className="py-3 px-4">Estimated Savings</th>
                    <th className="py-3 px-4">Lead Status</th>
                    <th className="py-3 px-4 text-right">EPC Partner Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {solarEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No solar enquiries logged yet.
                      </td>
                    </tr>
                  ) : (
                    solarEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                          {enq.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{enq.fullName}</span>
                          <span className="text-slate-500 text-[11px]">{enq.phone}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-800 block">{enq.city}</span>
                          <span className="text-slate-400 text-[10px] truncate max-w-[150px] block">
                            {enq.address}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 text-sm">
                            {enq.suggestedCapacityKw || 3} kWp
                          </span>
                          <span className="text-slate-400 text-[10px] block">{enq.systemType}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-emerald-700">
                            ₹{(enq.monthlySavingsInr || 2400).toLocaleString('en-IN')}/mo
                          </span>
                          <span className="text-slate-400 text-[10px] block">
                            Capex: ₹{(enq.estimatedCostInr || 180000).toLocaleString('en-IN')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                              enq.status === 'Feasibility Ready'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : enq.status === 'Site Survey Scheduled'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            <span>{enq.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {enq.status === 'Enquiry Received' && (
                            <button
                              onClick={() =>
                                updateSolarEnquiryStatus(enq.id, 'Site Survey Scheduled')
                              }
                              className="px-3 py-1.5 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                            >
                              Schedule Survey
                            </button>
                          )}

                          {enq.status === 'Site Survey Scheduled' && (
                            <button
                              onClick={() =>
                                updateSolarEnquiryStatus(enq.id, 'Feasibility Ready')
                              }
                              className="px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                            >
                              Approve Feasibility
                            </button>
                          )}

                          {enq.status === 'Feasibility Ready' && (
                            <span className="text-emerald-700 font-semibold text-[11px] flex items-center justify-end gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Proposal Dispatched
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Municipal and Operational Disclaimers */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <AlertCircle className="w-4 h-4 text-slate-500" />
          <span>Operational Integration Notes</span>
        </div>
        <p className="leading-relaxed">
          Recycling aggregation is handled through authorized private scrap aggregators and authorized CPCB recycling facilities. 
          EarthSync does not replace local municipal daily solid waste collection and operates independently for separated dry recyclables and rooftop solar installations.
        </p>
      </div>
    </div>
  );
}
