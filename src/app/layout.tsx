import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { EarthSyncProvider } from '@/context/EarthSyncContext';
import { Navigation } from '@/components/Navigation';
import { ToastContainer } from '@/components/ToastContainer';
import { Leaf, ShieldCheck, ArrowUpRight } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EarthSync: CleanTech Platform | Smart Waste & SolarSaathi',
  description:
    'EarthSync brings smarter recyclable waste management and rooftop solar estimation together in one simple platform.',
  keywords: [
    'CleanTech',
    'Smart Waste Management',
    'Rooftop Solar Calculator',
    'SolarSaathi',
    'GreenPoints',
    'Circular Economy',
    'Business Management Project',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <EarthSyncProvider>
          {/* Top Horizontal Navbar */}
          <Navigation />

          {/* Main scrollable content */}
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>

          {/* Professional Editorial Footer */}
          <footer className="border-t border-stone-200 bg-white text-stone-600 text-xs mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-stone-100">
                {/* Brand & Purpose */}
                <div className="lg:col-span-2 space-y-4">
                  <Link href="/" className="inline-flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-emerald-800 flex items-center justify-center text-white">
                      <Leaf className="w-4 h-4 text-emerald-200" />
                    </div>
                    <span className="font-bold text-lg text-emerald-950 tracking-tight">
                      Earth<span className="text-emerald-700">Sync</span>
                    </span>
                  </Link>

                  <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
                    An integrated CleanTech web platform bringing scheduled recyclable dry waste collection and precision rooftop solar feasibility together in one unified interface.
                  </p>

                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-[11px] text-stone-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Academic Project | Essentials of Business Management</span>
                  </div>
                </div>

                {/* Column 1: Core Navigation */}
                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                    Platform
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <Link href="/" className="hover:text-emerald-800 transition-colors">
                        Home Overview
                      </Link>
                    </li>
                    <li>
                      <Link href="/waste" className="hover:text-emerald-800 transition-colors">
                        Smart Waste Booking
                      </Link>
                    </li>
                    <li>
                      <Link href="/solar" className="hover:text-emerald-800 transition-colors">
                        SolarSaathi Calculator
                      </Link>
                    </li>
                    <li>
                      <Link href="/impact" className="hover:text-emerald-800 transition-colors">
                        Impact & LCA Analytics
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="hover:text-emerald-800 transition-colors">
                        Resource Dashboard
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Ecosystem & Rewards */}
                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                    Ecosystem
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <Link href="/profile" className="hover:text-emerald-800 transition-colors">
                        GreenPoints Rewards
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile" className="hover:text-emerald-800 transition-colors">
                        Business Model Canvas
                      </Link>
                    </li>
                    <li>
                      <Link href="/solar" className="hover:text-emerald-800 transition-colors">
                        PM Surya Ghar Subsidy Guide
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin" className="hover:text-emerald-800 transition-colors flex items-center gap-1">
                        <span>Partner Console</span>
                        <ArrowUpRight className="w-3 h-3 text-stone-400" />
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Legal & Privacy */}
                <div className="space-y-3">
                  <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                    Transparency
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <Link href="/privacy" className="hover:text-emerald-800 transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-emerald-800 transition-colors">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <span className="text-stone-400">LocalStorage MVP</span>
                    </li>
                    <li>
                      <span className="text-stone-400">v1.0 (October 2026)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Copyright & Disclaimer */}
              <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
                <p>
                  © 2026 EarthSync CleanTech. Academic demonstration prototype. Not affiliated with or replacing local municipal daily sanitation authorities.
                </p>
                <div className="flex items-center gap-4 text-stone-500">
                  <Link href="/privacy" className="hover:text-emerald-800">Privacy</Link>
                  <span>•</span>
                  <Link href="/terms" className="hover:text-emerald-800">Terms</Link>
                  <span>•</span>
                  <Link href="/admin" className="hover:text-emerald-800">Operations Demo</Link>
                </div>
              </div>
            </div>
          </footer>

          <ToastContainer />
        </EarthSyncProvider>
      </body>
    </html>
  );
}
