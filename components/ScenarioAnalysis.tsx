"use client";

import { scenarios, calculateTotalScore } from "@/lib/data";
import { TrendingUp, TrendingDown, Minus, Check } from "lucide-react";

interface ScenarioAnalysisProps {
  selectedScenario: "bull" | "base" | "bear" | null;
  onSelectScenario: (scenario: "bull" | "base" | "bear" | null) => void;
}

export default function ScenarioAnalysis({ selectedScenario, onSelectScenario }: ScenarioAnalysisProps) {
  const baseScore = calculateTotalScore();

  const handleSelect = (scenarioKey: "bull" | "base" | "bear") => {
    if (selectedScenario === scenarioKey) {
      onSelectScenario(null);
    } else {
      onSelectScenario(scenarioKey);
    }
  };

  const getAdjustedScore = (scenarioKey: "bull" | "base" | "bear") => {
    return baseScore + scenarios[scenarioKey].scoreAdj;
  };

  return (
    <div className="bg-terminal-card border border-terminal-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-fin-amber rounded-full"></span>
        Scenario Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(scenarios) as Array<"bull" | "base" | "bear">).map((key) => {
          const scenario = scenarios[key];
          const isSelected = selectedScenario === key;
          const adjustedScore = getAdjustedScore(key);

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`relative p-5 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? "border-opacity-100"
                  : "border-terminal-border border-opacity-50 hover:border-opacity-100"
              }`}
              style={{ borderColor: isSelected ? scenario.color : undefined }}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <Check className="w-5 h-5" style={{ color: scenario.color }} />
                </div>
              )}

              <div className="flex items-center gap-2 mb-2">
                {key === "bull" && <TrendingUp className="w-5 h-5 text-fin-green" />}
                {key === "base" && <Minus className="w-5 h-5 text-fin-amber" />}
                {key === "bear" && <TrendingDown className="w-5 h-5 text-fin-red" />}
                <span className="font-bold text-lg" style={{ color: scenario.color }}>
                  {scenario.label}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">TND Target</span>
                  <span className="font-mono text-white">{scenario.tndTarget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Probability</span>
                  <span className="font-mono text-white">{scenario.probability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Score Adj.</span>
                  <span className="font-mono" style={{ color: scenario.scoreAdj > 0 ? "#22c55e" : scenario.scoreAdj < 0 ? "#ef4444" : "#f59e0b" }}>
                    {scenario.scoreAdj > 0 ? `+${scenario.scoreAdj}` : scenario.scoreAdj}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-terminal-border">
                <p className="text-xs text-gray-500 mb-2">Key Triggers:</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  {scenario.triggers.map((trigger, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-gray-600">•</span>
                      {trigger}
                    </li>
                  ))}
                </ul>
              </div>

              {isSelected && (
                <div className="mt-4 p-3 rounded" style={{ backgroundColor: `${scenario.color}15` }}>
                  <p className="text-sm">
                    <span className="text-gray-400">Adjusted Score: </span>
                    <span className="font-mono font-bold" style={{ color: scenario.color }}>
                      {adjustedScore.toFixed(2)}
                    </span>
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
