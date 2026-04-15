"use client";

import { calculateTotalScore, getSignal, scorecardData } from "@/lib/data";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, Activity, DollarSign } from "lucide-react";

interface HeaderProps {
  adjustedScore: number | null;
}

export default function Header({ adjustedScore }: HeaderProps) {
  const [liveRate, setLiveRate] = useState<number | null>(null);
  const [eurRate, setEurRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const baseScore = calculateTotalScore();
  const currentScore = adjustedScore !== null ? adjustedScore : baseScore;
  const { signal, color, bias } = getSignal(currentScore);

  useEffect(() => {
    async function fetchLiveRate() {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();
        const tndRate = data.rates.TND;
        const eurRate = data.rates.EUR;

        setLiveRate(tndRate);
        if (tndRate && eurRate) {
          setEurRate(tndRate / eurRate);
        }
      } catch (error) {
        console.error("Failed to fetch live rate:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveRate();
  }, []);

  const modelRate = 2.884;
  const delta = liveRate ? (liveRate - modelRate).toFixed(3) : null;

  return (
    <header className="bg-terminal-card border-b border-terminal-border p-6 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Tunisian Dinar (TND) Investment Analysis
            </h1>
            <p className="text-gray-400 text-sm">
              Colombus Capital — Technical Assessment | April 2026
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Live FX Rate Badge */}
            <div className="bg-terminal-bg border border-terminal-border rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-fin-blue" />
                <span className="text-xs text-gray-400 uppercase tracking-wider">USD/TND Live</span>
              </div>
              <div className="font-mono text-lg text-white">
                {loading ? (
                  <span className="text-gray-500">Loading...</span>
                ) : liveRate ? (
                  <>
                    {liveRate.toFixed(3)}
                    {delta && (
                      <span className={`text-xs ml-2 ${Number(delta) < 0 ? "text-fin-green" : "text-fin-red"}`}>
                        Δ{delta} from model
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-500">2.884 (cached)</span>
                )}
              </div>
              {eurRate && (
                <div className="font-mono text-xs text-gray-500 mt-1">
                  EUR/TND: {eurRate.toFixed(3)}
                </div>
              )}
            </div>

            {/* Investment Signal Badge */}
            <div className="bg-terminal-bg border-2 rounded-lg px-6 py-4" style={{ borderColor: color }}>
              <div className="flex items-center gap-2 mb-1">
                {signal === "LONG" ? (
                  <TrendingUp className="w-5 h-5" style={{ color }} />
                ) : signal === "SHORT" ? (
                  <TrendingDown className="w-5 h-5" style={{ color }} />
                ) : (
                  <Minus className="w-5 h-5" style={{ color }} />
                )}
                <span className="text-xs uppercase tracking-wider" style={{ color }}>
                  Investment Signal
                </span>
              </div>
              <div className="text-2xl font-bold text-white">
                {signal} — {bias}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Activity className="w-3 h-3 text-gray-400" />
                <span className="font-mono text-sm text-gray-400">
                  Score: {currentScore.toFixed(2)} / 2.0
                </span>
              </div>
              {adjustedScore !== null && (
                <div className="text-xs text-gray-500 mt-1">
                  Adjusted from base: {baseScore.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
