"use client";

import { inflationHistory } from "@/lib/data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export default function InflationChart() {
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      let zone = "High";
      let color = "#ef4444";
      if (value < 5) { zone = "Low"; color = "#22c55e"; }
      else if (value < 7) { zone = "Moderate"; color = "#f59e0b"; }

      return (
        <div className="bg-terminal-card border border-terminal-border p-3 rounded shadow-lg">
          <p className="text-gray-300 text-sm mb-1">{label}</p>
          <p className="font-mono text-lg text-white">{value}%</p>
          <p className="text-xs" style={{ color }}>{zone} Zone</p>
        </div>
      );
    }
    return null;
  };

  const getZoneColor = (value: number) => {
    if (value < 5) return "#22c55e";
    if (value < 7) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="bg-terminal-card border border-terminal-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-fin-amber rounded-full"></span>
        Inflation Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={inflationHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              domain={[0, 12]}
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={customTooltip} />
            <ReferenceLine y={5} stroke="#22c55e" strokeDasharray="3 3" label={{ value: "Target (5%)", fill: "#22c55e", fontSize: 10, position: "right" }} />
            <ReferenceLine y={7} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: "Moderate (7%)", fill: "#f59e0b", fontSize: 10, position: "right" }} />
            <Area
              type="monotone"
              dataKey="value"
              name="Inflation %"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-1 bg-fin-green"></span>
          <span className="text-xs text-gray-400">&lt; 5% Target</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-1 bg-fin-amber"></span>
          <span className="text-xs text-gray-400">5-7% Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 h-1 bg-fin-red"></span>
          <span className="text-xs text-gray-400">&gt; 7% High</span>
        </div>
      </div>
    </div>
  );
}
