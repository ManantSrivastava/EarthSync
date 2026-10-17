'use client';

import React, { useState } from 'react';
import { useEarthSync } from '@/context/EarthSyncContext';
import { GreenPointsStore } from '@/components/GreenPointsStore';
import { BusinessModelView } from '@/components/BusinessModelView';
import { DemoDataNotice } from '@/components/DemoDataNotice';
import { 
  User, 
  Briefcase, 
  Gift, 
  RotateCcw 
} from 'lucide-react';

export default function ProfilePage() {
  const { userProfile, pickups, solarEnquiries, loadSampleData, resetAllData } = useEarthSync();
  const [activeTab, setActiveTab] = useState<'rewards' | 'business' | 'profile'>('rewards');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Demo Notice */}
      <DemoDataNotice
        hasUserEntries={
          pickups.some((p) => !p.isSample) || solarEnquiries.some((e) => !e.isSample)
        }
      />

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-forest-900 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-900/30">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{userProfile.name}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Tier 1 Eco Champion
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <span>{userProfile.email}</span>
                <span>•</span>
                <span className="font-mono text-[11px]">{userProfile.collegeId}</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {userProfile.department} • {userProfile.campusLocation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto">
            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl text-center flex-1 sm:flex-initial">
              <span className="text-[10px] text-emerald-700 font-semibold uppercase block">
                GreenPoints
              </span>
              <span className="text-xl font-black text-amber-600">
                {userProfile.greenPointsBalance.toLocaleString()}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center flex-1 sm:flex-initial">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                Lifetime Pts
              </span>
              <span className="text-xl font-black text-slate-800">
                {userProfile.lifetimePointsEarned.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'rewards'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>GreenPoints Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'business'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Business Model Canvas</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Demo Settings & Controls</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'rewards' && <GreenPointsStore />}

      {activeTab === 'business' && <BusinessModelView />}

      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Presentation & Demonstration Controls
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Reset the local state or reload the baseline demonstration records for academic grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-700" />
                  Load Baseline Demonstration Data
                </h4>
                <p className="text-xs text-emerald-800/80 mt-1 leading-relaxed">
                  Populates the dashboard with realistic sample pickups (e-waste, paper, plastic) and pre-calculated SolarSaathi enquiries to showcase all platform features.
                </p>
              </div>
              <button
                onClick={loadSampleData}
                className="mt-4 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-sm self-start cursor-pointer"
              >
                Reload Sample Baseline
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-rose-950 text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-700" />
                  Reset to Pure Empty User State
                </h4>
                <p className="text-xs text-rose-800/80 mt-1 leading-relaxed">
                  Clears all mock pickups, solar enquiries, and point balances. Starts with a blank slate so you can enter your own real pickup and solar calculation.
                </p>
              </div>
              <button
                onClick={resetAllData}
                className="mt-4 py-2.5 px-4 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors shadow-sm self-start cursor-pointer"
              >
                Clear All Local Data
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Course: Essentials of Business Management (CleanTech Innovation Project)</span>
            <span className="font-mono text-emerald-700 font-semibold">EarthSync v1.0 MVP</span>
          </div>
        </div>
      )}
    </div>
  );
}
