"use client";

import { fxHistory } from "@/lib/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export default function FXChart() {
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-terminal-card border border-terminal-border p-3 rounded shadow-lg">
          <p className="text-gray-300 text-sm mb-2">{label}</p>
          {payload.map((entry: any, idx: number) => (
            <p key={idx} className="font-mono text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(3)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-terminal-card border border-terminal-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-fin-green rounded-full"></span>
        FX History
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={fxHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              domain={[2.8, 3.5]}
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 11 }}
            />
            <Tooltip content={customTooltip} />
            <ReferenceLine x="Sep 2025" stroke="#22c55e" strokeDasharray="5 5" label={{ value: "Fitch Upgrade", fill: "#22c55e", fontSize: 10 }} />
            <ReferenceLine x="Dec 2025" stroke="#3b82f6" strokeDasharray="5 5" label={{ value: "Rate Cut", fill: "#3b82f6", fontSize: 10 }} />
            <Line
              type="monotone"
              dataKey="usdtnd"
              name="USD/TND"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e", strokeWidth: 0, r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="eurtnd"
              name="EUR/TND"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 0, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-fin-green"></span>
          <span className="text-sm text-gray-400">USD/TND</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-fin-blue"></span>
          <span className="text-sm text-gray-400">EUR/TND</span>
        </div>
      </div>
    </div>
  );
}
