"use client";

import { Info, Database, Cpu, FileSpreadsheet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-terminal-card border-t border-terminal-border p-6 mt-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-fin-blue" />
              <h3 className="text-white font-semibold">Methodology</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Weighted scoring model across 15 macroeconomic indicators. Each indicator
              scored -2 to +2 based on direction and magnitude, weighted by analytical
              importance. Scores aggregate to an investment signal.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-4 h-4 text-fin-green" />
              <h3 className="text-white font-semibold">Data Sources</h3>
            </div>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Central Bank of Tunisia (Feb 2026)</li>
              <li>World Bank (May 2025, Nov 2025)</li>
              <li>IMF WEO (Apr 2025)</li>
              <li>Fitch Ratings (Sep 2025)</li>
              <li>Trading Economics, FRED</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-fin-amber" />
              <h3 className="text-white font-semibold">Tools</h3>
            </div>
            <ul className="text-sm text-gray-400 space-y-1">
              <li className="flex items-center gap-1">
                <span>Claude AI (research)</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Groq Llama 70B (scenario AI)</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Next.js, Recharts, Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3" />
                <span>Excel Model</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-terminal-border mt-6 pt-6 text-center">
          <p className="text-xs text-gray-500">
            Colombus Capital — Tunisian Dinar Investment Analysis Dashboard © 2026
          </p>
          <p className="text-xs text-gray-600 mt-1">
            This dashboard is for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
