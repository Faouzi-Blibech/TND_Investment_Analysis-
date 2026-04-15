"use client";

import { risks } from "@/lib/data";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";

export default function RiskMatrix() {
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-terminal-card border border-terminal-border p-3 rounded shadow-lg">
          <p className="text-white font-semibold text-sm mb-2">{data.name}</p>
          <div className="space-y-1">
            <p className="text-xs text-gray-400">Probability: {data.probability}/5</p>
            <p className="text-xs text-gray-400">Impact: {data.impact}/5</p>
            <p className={`text-xs font-semibold ${data.direction === "upside" ? "text-fin-green" : "text-fin-red"}`}>
              {data.direction === "upside" ? "↑ Upside" : "↓ Downside"}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-terminal-card border border-terminal-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-fin-red rounded-full"></span>
        Risk Matrix
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              type="number"
              dataKey="probability"
              domain={[0.5, 5.5]}
              tick={{ fill: "#64748b", fontSize: 11 }}
              stroke="#64748b"
              label={{ value: "Probability", position: "bottom", fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="impact"
              domain={[0.5, 5.5]}
              tick={{ fill: "#64748b", fontSize: 11 }}
              stroke="#64748b"
              label={{ value: "Impact", angle: -90, position: "left", fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip content={customTooltip} cursor={{ strokeDasharray: "3 3" }} />
            <ReferenceLine x={2.5} stroke="#475569" strokeDasharray="3 3" />
            <ReferenceLine y={2.5} stroke="#475569" strokeDasharray="3 3" />

            <Scatter data={risks} shape="circle">
              {risks.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.direction === "upside" ? "#22c55e" : "#ef4444"}
                  fillOpacity={0.7}
                  stroke={entry.direction === "upside" ? "#22c55e" : "#ef4444"}
                  strokeWidth={2}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center">
          <span className="text-xs text-gray-500">Critical Risks (High P × High I)</span>
        </div>
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-fin-green"></span>
            <span className="text-xs text-gray-400">Upside</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-fin-red"></span>
            <span className="text-xs text-gray-400">Downside</span>
          </div>
        </div>
      </div>
    </div>
  );
}
