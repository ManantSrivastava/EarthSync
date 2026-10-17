import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { EarthSyncProvider } from '@/context/EarthSyncContext';
import { Navigation } from '@/components/Navigation';
import { ToastContainer } from '@/components/ToastContainer';

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
    'Integrated CleanTech web application for recyclable waste collection scheduling, circular GreenPoints incentives, and SolarSaathi precision rooftop solar feasibility.',
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
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <EarthSyncProvider>
          <div className="flex min-h-screen">
            {/* Sidebar navigation */}
            <Navigation />

            {/* Main scrollable body */}
            <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
              <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                {children}
              </div>

              {/* Comprehensive platform footer with clear boundary disclaimers and legal links */}
              <footer className="border-t border-slate-200/90 bg-white py-8 px-4 sm:px-8 text-xs text-slate-500">
                <div className="max-w-7xl mx-auto space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">EarthSync CleanTech</span>
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Academic MVP
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-xl">
                        Essentials of Business Management project. EarthSync complements existing municipal waste collection by coordinating specialized recyclable sorting and rooftop solar feasibility. Not affiliated with or replacing local municipal sanitation authorities.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                      <Link href="/privacy" className="hover:text-emerald-700 transition-colors">
                        Privacy Policy
                      </Link>
                      <span>•</span>
                      <Link href="/terms" className="hover:text-emerald-700 transition-colors">
                        Terms of Service
                      </Link>
                      <span>•</span>
                      <Link href="/admin" className="hover:text-emerald-700 transition-colors">
                        Partner / Admin Console
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
                    <span>Client-side storage prototype. Calculations are estimates for academic feasibility planning.</span>
                    <span>Version 1.0.0 (October 2026)</span>
                  </div>
                </div>
              </footer>
            </main>
          </div>

          <ToastContainer />
        </EarthSyncProvider>
      </body>
    </html>
  );
}
