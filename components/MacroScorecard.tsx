"use client";

import { scorecardData } from "@/lib/data";
import { ArrowUp, ArrowDown, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface MacroScorecardProps {
  adjustedScore: number | null;
}

export default function MacroScorecard({ adjustedScore }: MacroScorecardProps) {
  const categories = Array.from(new Set(scorecardData.map(item => item.category)));

  const getDirectionIcon = (direction: string, score: number) => {
    if (score > 0) return <ArrowUp className="w-4 h-4 text-fin-green" />;
    if (score < 0) return <ArrowDown className="w-4 h-4 text-fin-red" />;
    return <Minus className="w-4 h-4 text-fin-amber" />;
  };

  const getScoreColor = (score: number) => {
    if (score > 0) return "text-fin-green bg-fin-green/10";
    if (score < 0) return "text-fin-red bg-fin-red/10";
    return "text-fin-amber bg-fin-amber/10";
  };

  const totalScore = scorecardData.reduce((sum, item) => sum + item.score * item.weight, 0);
  const adjustedTotal = adjustedScore !== null ? adjustedScore : totalScore;

  return (
    <div className="bg-terminal-card border border-terminal-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-fin-blue rounded-full"></span>
        Macro Scorecard
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-terminal-border">
              <th className="text-left py-3 px-2 text-xs uppercase tracking-wider text-gray-500">Indicator</th>
              <th className="text-center py-3 px-2 text-xs uppercase tracking-wider text-gray-500">Current</th>
              <th className="text-center py-3 px-2 text-xs uppercase tracking-wider text-gray-500">Previous</th>
              <th className="text-center py-3 px-2 text-xs uppercase tracking-wider text-gray-500">Direction</th>
              <th className="text-center py-3 px-2 text-xs uppercase tracking-wider text-gray-500">Score</th>
              <th className="text-center py-3 px-2 text-xs uppercase tracking-wider text-gray-500">Weight</th>
              <th className="text-right py-3 px-2 text-xs uppercase tracking-wider text-gray-500">Weighted</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <>
                <tr key={category} className="bg-terminal-bg/50">
                  <td colSpan={7} className="py-2 px-2 text-sm font-semibold text-fin-blue">
                    {category}
                  </td>
                </tr>
                {scorecardData
                  .filter(item => item.category === category)
                  .map((item, idx) => (
                    <tr key={`${category}-${idx}`} className="border-b border-terminal-border/50 hover:bg-terminal-bg/30">
                      <td className="py-3 px-2 text-sm text-gray-300">{item.indicator}</td>
                      <td className="py-3 px-2 text-center font-mono text-sm text-white">{item.value}</td>
                      <td className="py-3 px-2 text-center font-mono text-sm text-gray-500">{item.prev}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-center gap-1 text-xs">
                          {getDirectionIcon(item.direction, item.score)}
                          <span className={
                            item.score > 0 ? "text-fin-green" :
                            item.score < 0 ? "text-fin-red" : "text-fin-amber"
                          }>
                            {item.direction}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-6 rounded text-xs font-bold ${getScoreColor(item.score)}`}>
                          {item.score > 0 ? `+${item.score}` : item.score}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-sm text-gray-400">{(item.weight * 100).toFixed(0)}%</td>
                      <td className="py-3 px-2 text-right font-mono text-sm text-white">
                        {(item.score * item.weight).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </>
            ))}
            <tr className="bg-terminal-bg border-t-2 border-terminal-border font-bold">
              <td colSpan={6} className="py-4 px-2 text-sm text-white">TOTAL WEIGHTED SCORE</td>
              <td className={`py-4 px-2 text-right font-mono text-lg ${
                adjustedTotal > 0 ? "text-fin-green" :
                adjustedTotal < 0 ? "text-fin-red" : "text-fin-amber"
              }`}>
                {adjustedTotal.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
