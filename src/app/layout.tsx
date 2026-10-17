import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  title: 'EarthSync — CleanTech Platform | Smart Waste & SolarSaathi',
  description:
    'Unified CleanTech solution integrating on-demand segregated waste logistics, GreenPoints circular incentives, and SolarSaathi precision rooftop solar feasibility.',
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

              {/* Minimal platform footer */}
              <footer className="border-t border-slate-200/80 bg-white py-6 px-4 sm:px-8 text-center text-xs text-slate-500">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">EarthSync CleanTech</span>
                    <span>•</span>
                    <span>Essentials of Business Management</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Local prototype with browser persistence • No paid APIs required
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
