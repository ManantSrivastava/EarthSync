import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Database, Lock, Eye, AlertTriangle, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | EarthSync CleanTech',
  description: 'Data handling, browser storage practices, and academic prototype privacy disclosures for EarthSync.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Transparency and Data Ethics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Effective date: October 2026. This privacy statement explains how EarthSync handles user data, client-side persistence, and operational requests.
        </p>
      </div>

      {/* Context Alert */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 sm:p-5 text-emerald-950">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <span className="font-bold text-emerald-950 uppercase tracking-wider text-xs block">
              Privacy First Architecture
            </span>
            <p className="text-emerald-900/80 leading-relaxed">
              EarthSync prioritizes user privacy. Operational records and profile preferences are persisted client-side in browser storage. No sensitive financial credentials or government identity records are collected.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        {/* Section 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>1. Client-Side Data Storage (Local Storage)</span>
          </h2>
          <p>
            Operational records (including recyclable waste pickup requests, solar feasibility inputs, SolarSaathi enquiries, and GreenPoints balances) are persisted locally within your web browser using HTML5 LocalStorage.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>Your submitted requests remain in your individual browser instance.</li>
            <li>No data is transmitted to centralized commercial ad-tracking servers.</li>
            <li>You can clear your stored data at any time from the Profile page via the Clear Stored Browser Data control or through your browser settings.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>2. Information We Collect</span>
          </h2>
          <p>
            When utilizing interactive forms on EarthSync, you may voluntarily submit the following operational parameters:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-slate-900 text-xs mb-1">Smart Waste Pickup Details</h3>
              <p className="text-slate-500 text-xs">
                Waste stream category, estimated batch weight (kg), campus or household pickup address, preferred pickup date, and preferred operating time slot.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-slate-900 text-xs mb-1">SolarSaathi Feasibility Enquiries</h3>
              <p className="text-slate-500 text-xs">
                Monthly electricity expenditure, applicable DISCOM tariff, available unobstructed rooftop area (sq ft), prospect full name, contact phone, and locality/city.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>3. Third-Party Trackers and Analytics</span>
          </h2>
          <p>
            EarthSync does not use behavioral advertising trackers, third-party remarketing pixels, or third-party cookie syndication networks. 
            All SVG chart visualizers, solar calculations, and GreenPoints reward logic execute natively in client-side TypeScript code.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            4. Transition to Production
          </h2>
          <p>
            Prior to full commercial deployment and public onboarding, EarthSync will implement:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>End-to-end TLS 1.3 encryption across all network calls.</li>
            <li>Role-Based Access Control (RBAC) separating household users, logistics drivers, and solar EPC vendors.</li>
            <li>SOC 2 and Indian Digital Personal Data Protection (DPDP) Act compliance procedures.</li>
            <li>Explicit opt-in consent flows for SMS and WhatsApp dispatch notifications.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-xs text-slate-500">
          <h3 className="font-semibold text-slate-800 text-sm mb-1">Inquiries and Contact</h3>
          <p>
            For questions regarding this policy or academic evaluation of the project, contact the EarthSync project team at{' '}
            <span className="font-mono text-emerald-800 font-medium">project-earthsync@college.edu</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
