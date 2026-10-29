'use client';

import React, { useState, useEffect } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { 
  Truck, 
  Scale, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Sun, 
  MapPin, 
  Filter, 
  Calendar,
  AlertCircle,
  Lock,
  Key,
  LogOut,
  Users,
  BarChart3,
  Download,
  Trash2,
  Search,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { WASTE_CATEGORIES } from '@/data/constants';

const ADMIN_PASSKEY = 'earthadmin2026';
const SESSION_AUTH_KEY = 'earthsync_admin_auth_v2';

export default function AdminPage() {
  const { 
    pickups, 
    solarEnquiries, 
    activities,
    userProfile,
    updatePickupStatus, 
    updateSolarEnquiryStatus,
    deletePickup,
    deleteSolarEnquiry,
    adjustUserPoints,
    clearUserData,
    showToast
  } = useEarthSync();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Tab: waste | solar | users | analytics
  const [activeTab, setActiveTab] = useState<'waste' | 'solar' | 'users' | 'analytics'>('waste');

  // Filters & Search
  const [wasteStatusFilter, setWasteStatusFilter] = useState<string>('All');
  const [wasteSearchQuery, setWasteSearchQuery] = useState<string>('');
  const [solarStatusFilter, setSolarStatusFilter] = useState<string>('All');
  const [solarSearchQuery, setSolarSearchQuery] = useState<string>('');

  // Weighing & Verification Modal
  const [weighingPickupId, setWeighingPickupId] = useState<string | null>(null);
  const [verifiedWeightInput, setVerifiedWeightInput] = useState<string>('');

  // Dispatch Courier Modal
  const [dispatchPickupId, setDispatchPickupId] = useState<string | null>(null);
  const [driverName, setDriverName] = useState<string>('Vikram Sharma');
  const [vehicleId, setVehicleId] = useState<string>('EV Cargo Van #04');

  // Solar EPC Survey Modal
  const [surveyEnquiryId, setSurveyEnquiryId] = useState<string | null>(null);
  const [epcPartner, setEpcPartner] = useState<string>('SolarSaathi Certified Regional Partner');
  const [surveyDate, setSurveyDate] = useState<string>('');

  // Points Adjustment Modal/Inputs
  const [pointsDeltaInput, setPointsDeltaInput] = useState<string>('50');
  const [pointsReasonInput, setPointsReasonInput] = useState<string>('Recycling drive incentive bonus');

  // Check existing session
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_AUTH_KEY);
      if (stored === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // In restricted environments
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passkeyInput === ADMIN_PASSKEY) {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      showToast('success', 'Admin Access Granted', 'Welcome to the EarthSync Operations Console.');
    } else {
      setAuthError('Invalid Admin Passkey. Please try again.');
    }
  };

  const handleQuickUnlock = () => {
    setPasskeyInput(ADMIN_PASSKEY);
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
    } catch {
      // ignore
    }
    showToast('success', 'Admin Access Granted', 'Authenticated via quick master key.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasskeyInput('');
    try {
      sessionStorage.removeItem(SESSION_AUTH_KEY);
    } catch {
      // ignore
    }
    showToast('info', 'Logged Out', 'Admin console session locked.');
  };

  // KPIs
  const totalCollectedKg = pickups
    .filter((p) => p.status === 'Collected')
    .reduce((acc, p) => acc + p.quantityKg, 0);

  const pendingPickupsCount = pickups.filter(
    (p) => p.status === 'Requested' || p.status === 'Scheduled'
  ).length;

  const totalPointsIssued = pickups
    .filter((p) => p.status === 'Collected')
    .reduce((acc, p) => acc + p.pointsEarned, 0);

  // Waste Filtering
  const filteredPickups = pickups.filter((p) => {
    const matchesFilter = wasteStatusFilter === 'All' || p.status === wasteStatusFilter;
    const q = wasteSearchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      p.id.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.pickupAddress.toLowerCase().includes(q) ||
      (p.notes && p.notes.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  // Solar Filtering
  const filteredEnquiries = solarEnquiries.filter((e) => {
    const matchesFilter = solarStatusFilter === 'All' || e.status === solarStatusFilter;
    const q = solarSearchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      e.id.toLowerCase().includes(q) ||
      e.fullName.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.address.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  // Dispatch Action
  const handleConfirmDispatch = (pickupId: string) => {
    updatePickupStatus(pickupId, 'Scheduled');
    showToast('success', 'Driver Dispatched', `Assigned ${driverName} (${vehicleId}) to pickup ${pickupId}.`);
    setDispatchPickupId(null);
  };

  // Weighing Action
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

  // Solar Survey Action
  const handleConfirmSurvey = (enquiryId: string) => {
    updateSolarEnquiryStatus(enquiryId, 'Site Survey Scheduled');
    showToast(
      'success',
      'Survey Scheduled',
      `Assigned ${epcPartner}${surveyDate ? ` on ${surveyDate}` : ''} for lead ${enquiryId}.`
    );
    setSurveyEnquiryId(null);
  };

  // Adjust Points Action
  const handlePointsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const delta = parseInt(pointsDeltaInput, 10);
    if (isNaN(delta) || delta === 0) {
      alert('Please enter a valid non-zero points adjustment amount.');
      return;
    }
    adjustUserPoints(delta, pointsReasonInput.trim());
    setPointsDeltaInput('0');
  };

  // Reset System Records
  const handlePurgeAllData = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all user pickups, solar enquiries, and reset points balances? This cannot be undone.'
    );
    if (confirmed) {
      clearUserData();
      showToast('info', 'System Purged', 'All operational queues and points reset.');
    }
  };

  // CSV Export for Pickups
  const handleExportPickupsCsv = () => {
    if (pickups.length === 0) {
      alert('No pickup records to export.');
      return;
    }
    const headers = ['Request ID', 'Category', 'Weight (kg)', 'Address', 'Preferred Date', 'Time Slot', 'Status', 'Points Earned', 'Created At'];
    const rows = pickups.map((p) => [
      p.id,
      `"${p.categoryLabel}"`,
      p.quantityKg,
      `"${p.pickupAddress.replace(/"/g, '""')}"`,
      p.preferredDate,
      `"${p.timeSlot}"`,
      p.status,
      p.pointsEarned,
      p.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `earthsync_pickups_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Export for Solar
  const handleExportSolarCsv = () => {
    if (solarEnquiries.length === 0) {
      alert('No solar enquiry records to export.');
      return;
    }
    const headers = ['Lead ID', 'Full Name', 'Phone', 'Email', 'City', 'Address', 'System Type', 'Financing', 'Capacity (kWp)', 'Estimated Cost', 'Monthly Savings', 'Status', 'Submitted At'];
    const rows = solarEnquiries.map((e) => [
      e.id,
      `"${e.fullName}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${e.city}"`,
      `"${e.address.replace(/"/g, '""')}"`,
      `"${e.systemType}"`,
      `"${e.financingPreference}"`,
      e.suggestedCapacityKw || 0,
      e.estimatedCostInr || 0,
      e.monthlySavingsInr || 0,
      e.status,
      e.submittedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `earthsync_solar_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Full JSON Export
  const handleExportJson = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      pickups,
      solarEnquiries,
      userProfile,
      activities
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `earthsync_full_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------
  // Screen 1: Passkey / PIN Authentication Gate
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-[#063D2E] text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8 text-[#00B884]" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Enter your master passkey to access logistics dispatch, calibrated scale verification, solar lead pipeline, and points administration.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter passkey..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00B884] focus:border-transparent text-sm font-mono tracking-widest text-slate-900 bg-slate-50/50"
                  autoFocus
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#063D2E] hover:bg-[#084e3a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick unlock helper */}
          <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
            <span className="text-[11px] text-slate-400">
              Default access passkey: <code className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">earthadmin2026</code>
            </span>
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="text-xs font-semibold text-[#00A86B] hover:text-[#063D2E] hover:underline cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Click Unlock (Default Key)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Screen 2: Authenticated Admin Operations Console
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-in fade-in duration-300">
      
      {/* Top Console Command Header */}
      <div className="bg-[#063D2E] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#00B884]/20 text-[#00B884] border border-[#00B884]/30 font-bold text-[11px] tracking-wide uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00B884] animate-pulse" />
                Live Control Center
              </span>
              <span className="text-emerald-300/60 text-xs">|</span>
              <span className="text-emerald-200/80 text-xs font-medium">Session Authenticated</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              EarthSync Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/70 max-w-2xl leading-relaxed">
              Operational dashboard for recyclable dry waste dispatch, calibrated weight settlement, rooftop solar feasibility pipeline, and GreenPoints ledger auditing.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Lock Admin Console"
            >
              <LogOut className="w-3.5 h-3.5 text-emerald-300" />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Operational KPI summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6 mt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between text-emerald-200/70 text-[11px] font-semibold uppercase tracking-wider">
              <span>Active Logistics</span>
              <Truck className="w-4 h-4 text-[#00B884]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {pendingPickupsCount}
            </div>
            <span className="text-[11px] text-emerald-200/60">Awaiting dispatch or scale weighing</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between text-emerald-200/70 text-[11px] font-semibold uppercase tracking-wider">
              <span>Diverted Recyclables</span>
              <Scale className="w-4 h-4 text-[#00B884]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#00B884] mt-1">
              {totalCollectedKg.toFixed(1)} <span className="text-sm font-bold text-white">kg</span>
            </div>
            <span className="text-[11px] text-emerald-200/60">Verified sent to authorized hubs</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between text-emerald-200/70 text-[11px] font-semibold uppercase tracking-wider">
              <span>GreenPoints Issued</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">
              {totalPointsIssued.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-200/60">Strict 1x credit per verified batch</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between text-emerald-200/70 text-[11px] font-semibold uppercase tracking-wider">
              <span>Solar EPC Pipeline</span>
              <Sun className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {solarEnquiries.length}
            </div>
            <span className="text-[11px] text-emerald-200/60">Qualified rooftop leads</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('waste')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'waste'
              ? 'bg-[#063D2E] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Waste Logistics ({pickups.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('solar')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'solar'
              ? 'bg-[#063D2E] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>Solar EPC Pipeline ({solarEnquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'bg-[#063D2E] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Users & GreenPoints</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-[#063D2E] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Reports & Data Export</span>
        </button>
      </div>

      {/* -------------------------------------------------------------
          TAB 1: Waste Logistics Management
         ------------------------------------------------------------- */}
      {activeTab === 'waste' && (
        <div className="space-y-4">
          {/* Controls Bar: Search & Status Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={wasteSearchQuery}
                onChange={(e) => setWasteSearchQuery(e.target.value)}
                placeholder="Search by ID, category, or address..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00B884]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Status:</span>
              {['All', 'Requested', 'Scheduled', 'Collected', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setWasteStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    wasteStatusFilter === status
                      ? 'bg-[#063D2E] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table of Pickups */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px] tracking-wider">
                    <th className="py-3.5 px-4">Request ID</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Est. Weight</th>
                    <th className="py-3.5 px-4">Pickup Location & Slot</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Logistics Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPickups.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <Truck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="font-semibold text-slate-600">No pickup requests found</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Requests created on the Smart Waste page will appear in this queue.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredPickups.map((p) => {
                      const isWeighing = weighingPickupId === p.id;
                      const isDispatching = dispatchPickupId === p.id;

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                            {p.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{p.categoryLabel}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">{p.category}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 text-sm">{p.quantityKg.toFixed(1)}</span>
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
                            {/* State: Requested */}
                            {p.status === 'Requested' && (
                              <div className="flex items-center justify-end gap-1.5">
                                {isDispatching ? (
                                  <div className="flex flex-col gap-2 p-2 bg-slate-50 border border-slate-300 rounded-xl text-left">
                                    <div className="text-[11px] font-bold text-slate-700">Assign Driver & Vehicle:</div>
                                    <input
                                      type="text"
                                      value={driverName}
                                      onChange={(e) => setDriverName(e.target.value)}
                                      className="px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                                      placeholder="Driver Name"
                                    />
                                    <input
                                      type="text"
                                      value={vehicleId}
                                      onChange={(e) => setVehicleId(e.target.value)}
                                      className="px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                                      placeholder="Vehicle Plate / Unit"
                                    />
                                    <div className="flex items-center gap-1.5 pt-1">
                                      <button
                                        onClick={() => handleConfirmDispatch(p.id)}
                                        className="px-2.5 py-1 rounded bg-[#063D2E] hover:bg-[#084e3a] text-white font-bold text-xs cursor-pointer"
                                      >
                                        Confirm Dispatch
                                      </button>
                                      <button
                                        onClick={() => setDispatchPickupId(null)}
                                        className="px-2 py-1 rounded text-slate-500 hover:bg-slate-200 text-xs cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => setDispatchPickupId(p.id)}
                                      className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                                    >
                                      <Truck className="w-3.5 h-3.5" />
                                      <span>Dispatch</span>
                                    </button>
                                    <button
                                      onClick={() => updatePickupStatus(p.id, 'Cancelled')}
                                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer"
                                      title="Cancel Pickup"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}
                              </div>
                            )}

                            {/* State: Scheduled */}
                            {p.status === 'Scheduled' && (
                              <div className="flex items-center justify-end gap-1.5">
                                {isWeighing ? (
                                  <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-300">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Scale:</span>
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
                                      className="px-2.5 py-1 rounded bg-[#063D2E] hover:bg-[#084e3a] text-white font-bold text-xs cursor-pointer"
                                    >
                                      Certify
                                    </button>
                                    <button
                                      onClick={() => setWeighingPickupId(null)}
                                      className="px-2 py-1 rounded text-slate-500 hover:bg-slate-200 text-xs cursor-pointer"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleOpenWeighModal(p.id, p.quantityKg)}
                                    className="px-3 py-1.5 rounded-lg bg-[#063D2E] hover:bg-[#084e3a] text-white font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                                  >
                                    <Scale className="w-3.5 h-3.5 text-[#00B884]" />
                                    <span>Weigh & Settle</span>
                                  </button>
                                )}
                              </div>
                            )}

                            {/* State: Collected */}
                            {p.status === 'Collected' && (
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{p.pointsEarned} pts credited</span>
                                </span>
                                <button
                                  onClick={() => deletePickup(p.id)}
                                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Archive record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            {/* State: Cancelled */}
                            {p.status === 'Cancelled' && (
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-slate-400 text-[11px]">Cancelled</span>
                                <button
                                  onClick={() => deletePickup(p.id)}
                                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Remove record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
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

      {/* -------------------------------------------------------------
          TAB 2: SolarSaathi EPC Pipeline
         ------------------------------------------------------------- */}
      {activeTab === 'solar' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={solarSearchQuery}
                onChange={(e) => setSolarSearchQuery(e.target.value)}
                placeholder="Search leads by customer name, phone, or city..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00B884]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Stage:</span>
              {['All', 'Enquiry Received', 'Site Survey Scheduled', 'Feasibility Ready'].map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSolarStatusFilter(stage)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    solarStatusFilter === stage
                      ? 'bg-[#063D2E] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Solar Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px] tracking-wider">
                    <th className="py-3.5 px-4">Lead ID</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">System Spec</th>
                    <th className="py-3.5 px-4">Est. Savings</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">EPC Partner Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        <Sun className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="font-semibold text-slate-600">No solar leads registered</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Enquiries submitted via the SolarSaathi page will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((enq) => {
                      const isSurveying = surveyEnquiryId === enq.id;

                      return (
                        <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                            {enq.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{enq.fullName}</span>
                            <span className="text-slate-500 text-[11px] font-mono">{enq.phone}</span>
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
                              <div className="flex items-center justify-end gap-1.5">
                                {isSurveying ? (
                                  <div className="flex flex-col gap-2 p-2 bg-slate-50 border border-slate-300 rounded-xl text-left">
                                    <div className="text-[11px] font-bold text-slate-700">Assign EPC Contractor:</div>
                                    <input
                                      type="text"
                                      value={epcPartner}
                                      onChange={(e) => setEpcPartner(e.target.value)}
                                      className="px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                                      placeholder="EPC Partner"
                                    />
                                    <div className="text-[11px] font-bold text-slate-700">Scheduled Date:</div>
                                    <input
                                      type="date"
                                      value={surveyDate}
                                      onChange={(e) => setSurveyDate(e.target.value)}
                                      className="px-2 py-1 text-xs bg-white border border-slate-300 rounded"
                                    />
                                    <div className="flex items-center gap-1.5 pt-1">
                                      <button
                                        onClick={() => handleConfirmSurvey(enq.id)}
                                        className="px-2.5 py-1 rounded bg-[#063D2E] hover:bg-[#084e3a] text-white font-bold text-xs cursor-pointer"
                                      >
                                        Confirm
                                      </button>
                                      <button
                                        onClick={() => setSurveyEnquiryId(null)}
                                        className="px-2 py-1 rounded text-slate-500 hover:bg-slate-200 text-xs cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => setSurveyEnquiryId(enq.id)}
                                      className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                                    >
                                      Schedule Survey
                                    </button>
                                    <button
                                      onClick={() => deleteSolarEnquiry(enq.id)}
                                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                      title="Archive Lead"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            )}

                            {enq.status === 'Site Survey Scheduled' && (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => updateSolarEnquiryStatus(enq.id, 'Feasibility Ready')}
                                  className="px-3 py-1.5 rounded-lg bg-[#063D2E] hover:bg-[#084e3a] text-white font-semibold text-xs transition-colors cursor-pointer"
                                >
                                  Approve Feasibility
                                </button>
                                <button
                                  onClick={() => deleteSolarEnquiry(enq.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Archive Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            {enq.status === 'Feasibility Ready' && (
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Proposal Ready</span>
                                </span>
                                <button
                                  onClick={() => deleteSolarEnquiry(enq.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Archive Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
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

      {/* -------------------------------------------------------------
          TAB 3: Users & GreenPoints Administration
         ------------------------------------------------------------- */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Account Overview */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#063D2E] text-[#00B884] flex items-center justify-center font-black text-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Active Registered Account</h3>
                <p className="text-xs text-slate-400">Current frontend user profile session</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">User Name:</span>
                <span className="font-bold text-slate-900">{userProfile.name || 'Not configured'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Email:</span>
                <span className="font-mono text-slate-700">{userProfile.email || 'None'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Department / Campus:</span>
                <span className="font-medium text-slate-800">{userProfile.department || userProfile.campusLocation || 'Standard'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Available GreenPoints:</span>
                <span className="font-black text-emerald-700 text-sm">{userProfile.greenPointsBalance.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Lifetime Earned:</span>
                <span className="font-bold text-slate-800">{userProfile.lifetimePointsEarned.toLocaleString()} pts</span>
              </div>
            </div>

            {/* Manual Points Credit / Debit */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#00B884]" />
                <span>Adjust Points Ledger</span>
              </h4>

              <form onSubmit={handlePointsSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Points Delta (+ credit, - debit):
                  </label>
                  <input
                    type="number"
                    value={pointsDeltaInput}
                    onChange={(e) => setPointsDeltaInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold"
                    placeholder="e.g. 50 or -25"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Audit Reason:
                  </label>
                  <input
                    type="text"
                    value={pointsReasonInput}
                    onChange={(e) => setPointsReasonInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="Reason for adjustment"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#063D2E] hover:bg-[#084e3a] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Commit Balance Adjustment
                </button>
              </form>
            </div>
          </div>

          {/* Activity Audit Trail */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Operational Activity Log</h3>
                <p className="text-xs text-slate-400">Chronological ledger of user submissions and administrative events</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs">
                {activities.length} Entries
              </span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {activities.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <span>No activities recorded yet in current session.</span>
                </div>
              ) : (
                activities.map((act) => (
                  <div key={act.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{act.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{act.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 4: Reports & Data Export
         ------------------------------------------------------------- */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Material Diversion Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-black text-slate-900 text-lg tracking-tight">
                Material Diversion & Sustainability Summary
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Summary of physical recyclable waste aggregated across categories and diverted from landfills.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WASTE_CATEGORIES.slice(0, 4).map((cat) => {
                const catPickups = pickups.filter((p) => p.category === cat.id && p.status === 'Collected');
                const catWeight = catPickups.reduce((acc, p) => acc + p.quantityKg, 0);
                const co2Saved = catWeight * cat.co2SavedPerKg;

                return (
                  <div key={cat.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      {cat.name}
                    </span>
                    <div className="text-2xl font-black text-slate-900">
                      {catWeight.toFixed(1)} <span className="text-xs font-semibold text-slate-500">kg</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      ≈ {co2Saved.toFixed(1)} kg CO₂e offset
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export & Data Maintenance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Export Logistics</h4>
              <p className="text-xs text-slate-500">
                Download logistics spreadsheet (.CSV) with timestamps, weights, and addresses.
              </p>
              <button
                onClick={handleExportPickupsCsv}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Logistics (.CSV)</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Export Solar Leads</h4>
              <p className="text-xs text-slate-500">
                Download qualified solar leads (.CSV) including customer contacts and specs.
              </p>
              <button
                onClick={handleExportSolarCsv}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Solar Leads (.CSV)</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#063D2E] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">System JSON</h4>
              <p className="text-xs text-slate-500">
                Export raw backup containing all local state, activity logs, and points ledgers.
              </p>
              <button
                onClick={handleExportJson}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Backup (.JSON)</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Purge Stored Data</h4>
              <p className="text-xs text-slate-500">
                Reset all operational queues, active requests, and GreenPoints balances.
              </p>
              <button
                onClick={handlePurgeAllData}
                className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Purge Records</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Operational Integration Footer Notes */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
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
