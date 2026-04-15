"use client";

import { useState, useMemo } from "react";
import { calculateTotalScore, scenarios } from "@/lib/data";
import Header from "@/components/Header";
import MacroScorecard from "@/components/MacroScorecard";
import FXChart from "@/components/FXChart";
import InflationChart from "@/components/InflationChart";
import ScenarioAnalysis from "@/components/ScenarioAnalysis";
import RiskMatrix from "@/components/RiskMatrix";
import PeerComparison from "@/components/PeerComparison";
import AIAnalyst from "@/components/AIAnalyst";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const [selectedScenario, setSelectedScenario] = useState<"bull" | "base" | "bear" | null>(null);

  const adjustedScore = useMemo(() => {
    const baseScore = calculateTotalScore();
    if (selectedScenario) {
      return baseScore + scenarios[selectedScenario].scoreAdj;
    }
    return baseScore;
  }, [selectedScenario]);

  return (
    <div className="min-h-screen bg-terminal-bg">
      <Header adjustedScore={adjustedScore} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Section 2: Macro Scorecard */}
        <section className="mb-8">
          <MacroScorecard adjustedScore={adjustedScore} />
        </section>

        {/* Section 3: Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FXChart />
          <InflationChart />
        </section>

        {/* Section 4: Scenario Analysis */}
        <section className="mb-8">
          <ScenarioAnalysis
            selectedScenario={selectedScenario}
            onSelectScenario={setSelectedScenario}
          />
        </section>

        {/* Section 5 & 6: Risk Matrix and Peer Comparison */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RiskMatrix />
          <PeerComparison />
        </section>

        {/* Section 7: AI Analyst */}
        <section className="mb-8">
          <AIAnalyst />
        </section>
      </main>

      {/* Section 8: Footer */}
      <Footer />
    </div>
  );
}
