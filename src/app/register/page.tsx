'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEarthSync } from '@/context/EarthSyncContext';
import { Leaf, UserPlus, Lock, Mail, User, Building, MapPin, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { updateProfile } = useEarthSync();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [campusLocation, setCampusLocation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setIsSubmitting(true);
    // Explicit user profile registration in localStorage
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      department: department.trim() || 'General Community Member',
      campusLocation: campusLocation.trim() || 'Main Campus',
      greenPointsBalance: 0,
      lifetimePointsEarned: 0,
    });
    setIsSubmitting(false);
    router.push('/profile');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Branding & Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <Leaf className="w-8 h-8 text-[#00A86B] fill-[#00A86B] transition-transform group-hover:scale-105" />
            <span className="text-2xl font-bold tracking-tight text-[#063D2E]">
              Earth<span className="text-[#00A86B]">Sync</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-[#17231E]">
            Create your account
          </h1>
          <p className="text-xs text-[#65736B]">
            Start managing recyclable waste and evaluating rooftop solar energy.
          </p>
        </div>

        {/* Security & Academic Demonstration Notice */}
        <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950 block mb-0.5">Frontend Demonstration Notice</span>
            Registration details are saved client-side in browser storage (LocalStorage). This demonstration does not send credentials to an external server.
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-[#E2E9E3] p-6 sm:p-8 shadow-xs">
          {error && (
            <div className="mb-5 p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#17231E] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#65736B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aditi Sharma"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17231E] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#65736B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17231E] uppercase tracking-wider mb-1.5">
                Department / Organization (Optional)
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#65736B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Civil Engineering / Campus Facility"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17231E] uppercase tracking-wider mb-1.5">
                Campus / Location (Optional)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#65736B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={campusLocation}
                  onChange={(e) => setCampusLocation(e.target.value)}
                  placeholder="e.g. Pune Campus, Sector 4"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17231E] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#65736B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#E2E9E3] focus:outline-none focus:ring-1 focus:ring-[#063D2E] focus:border-[#063D2E] text-sm text-[#17231E] bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#0E4337] hover:bg-[#093229] text-white font-semibold text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E2E9E3] text-center text-xs text-[#65736B]">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#063D2E] hover:underline inline-flex items-center gap-1">
              <span>Sign In</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

