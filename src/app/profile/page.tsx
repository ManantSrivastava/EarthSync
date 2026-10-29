'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEarthSync } from '@/context/EarthSyncContext';
import { GreenPointsStore } from '@/components/GreenPointsStore';
import { 
  User, 
  Gift, 
  Settings, 
  LogOut, 
  Trash2, 
  ShieldAlert, 
  ArrowRight,
  UserCheck,
  Sparkles
} from 'lucide-react';

export default function ProfilePage() {
  const { userProfile, isHydrated, updateProfile, logout, clearUserData } = useEarthSync();
  const [activeTab, setActiveTab] = useState<'rewards' | 'settings'>('rewards');

  // Edit form state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [department, setDepartment] = useState(userProfile.department);
  const [campusLocation, setCampusLocation] = useState(userProfile.campusLocation);

  const hasProfile = Boolean(userProfile.name || userProfile.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || userProfile.name,
      email: email.trim() || userProfile.email,
      department: department.trim() || userProfile.department,
      campusLocation: campusLocation.trim() || userProfile.campusLocation,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-in fade-in duration-300">
      
      {/* Profile Empty State or Active Profile Card */}
      {!hasProfile && isHydrated ? (
        <div className="bg-white rounded-xl border border-stone-200 p-8 sm:p-10 shadow-xs text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <User className="w-6 h-6 text-emerald-700" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Complete your profile to personalize your EarthSync experience.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
            Create an account or sign in to track recyclable waste collections, log rooftop solar estimates, and earn GreenPoints.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-lg bg-[#0E4337] hover:bg-[#093229] text-white text-xs font-semibold tracking-wide transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold tracking-wide transition-colors inline-flex items-center gap-2"
            >
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Active User Profile Card */
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                    {userProfile.name || 'EarthSync Member'}
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {userProfile.greenPointsBalance > 0 ? 'Eco Champion' : 'Active Member'}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-2">
                  <span>{userProfile.email || 'No email registered'}</span>
                  {userProfile.collegeId && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-[11px]">{userProfile.collegeId}</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">
                  {userProfile.department || 'CleanTech Advocate'}{' '}
                  {userProfile.campusLocation ? `• ${userProfile.campusLocation}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch sm:self-auto">
              <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-lg text-center flex-1 sm:flex-initial">
                <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider block">
                  GreenPoints
                </span>
                <span className="text-xl font-bold text-amber-700">
                  {userProfile.greenPointsBalance.toLocaleString()}
                </span>
              </div>

              <div className="bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-lg text-center flex-1 sm:flex-initial">
                <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">
                  Lifetime Pts
                </span>
                <span className="text-xl font-bold text-stone-800">
                  {userProfile.lifetimePointsEarned.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {userProfile.greenPointsBalance === 0 && (
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Your GreenPoints balance will appear here once you complete eligible activities.</span>
            </div>
          )}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'rewards'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>GreenPoints Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Account & Profile</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'rewards' && <GreenPointsStore />}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Account & Profile Settings
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Manage your personal information and browser data persistence.
            </p>
          </div>

          {/* Academic Demonstration Disclaimer */}
          <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-950 block mb-0.5">Frontend Demonstration Notice</span>
              All profile entries and operational records are stored strictly within client-side browser storage (LocalStorage). This demonstration does not persist data to a remote production database and is not secured for enterprise authentication.
            </div>
          </div>

          {/* Profile Form */}
          <div className="border border-stone-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-800" />
                <span>Profile Details</span>
              </h3>
              {!isEditing && (
                <button
                  onClick={() => {
                    setName(userProfile.name);
                    setEmail(userProfile.email);
                    setDepartment(userProfile.department);
                    setCampusLocation(userProfile.campusLocation);
                    setIsEditing(true);
                  }}
                  className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
                >
                  Edit Information
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 rounded-md border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 rounded-md border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Department / Organization</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Environmental Science"
                      className="w-full px-3 py-2 rounded-md border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Campus / Location</label>
                    <input
                      type="text"
                      value={campusLocation}
                      onChange={(e) => setCampusLocation(e.target.value)}
                      placeholder="e.g. Pune Campus"
                      className="w-full px-3 py-2 rounded-md border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="py-2 px-4 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                <div>
                  <span className="font-semibold text-stone-800 block">Name:</span>
                  <span>{userProfile.name || 'Not set'}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block">Email:</span>
                  <span>{userProfile.email || 'Not set'}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block">Department:</span>
                  <span>{userProfile.department || 'Not set'}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block">Location:</span>
                  <span>{userProfile.campusLocation || 'Not set'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            {hasProfile && (
              <button
                onClick={logout}
                className="py-2 px-4 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}

            <button
              onClick={clearUserData}
              className="py-2 px-4 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Stored Browser Data</span>
            </button>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>EarthSync CleanTech Platform</span>
            <span className="font-mono text-emerald-800 font-semibold">v1.0</span>
          </div>
        </div>
      )}
    </div>
  );
}
