"use client";

import { peerComparison } from "@/lib/data";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function PeerComparison() {
  // Normalize data to 0-100 scale for radar chart
  const normalize = (value: number, max: number, min: number = 0) => {
    return ((value - min) / (max - min)) * 100;
  };

  const radarData = [
    {
      metric: "GDP Growth",
      Tunisia: normalize(2.5, 5),
      Morocco: normalize(3.1, 5),
      Egypt: normalize(4.2, 5),
    },
    {
      metric: "Low Inflation",
      Tunisia: normalize(100 - 4.8 * 3, 100, 0),
      Morocco: normalize(100 - 2.5 * 3, 100, 0),
      Egypt: normalize(100 - 28.0 * 3, 100, 0),
    },
    {
      metric: "Reserves",
      Tunisia: normalize(107, 200),
      Morocco: normalize(150, 200),
      Egypt: normalize(130, 200),
    },
    {
      metric: "Low Debt",
      Tunisia: normalize(100 - 83, 100, 0),
      Morocco: normalize(100 - 70, 100, 0),
      Egypt: normalize(100 - 92, 100, 0),
    },
    {
      metric: "FDI Growth",
      Tunisia: normalize(54, 100),
      Morocco: normalize(12, 100),
      Egypt: normalize(8, 100),
    },
    {
      metric: "Credit Rating",
      Tunisia: normalize(4, 10),
      Morocco: normalize(6, 10),
      Egypt: normalize(3, 10),
    },
  ];

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-terminal-card border border-terminal-border p-3 rounded shadow-lg">
          <p className="text-white font-semibold text-sm mb-2">{label}</p>
          {payload.map((entry: any, idx: number) => (
            <p key={idx} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(0)}/100
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
        <span className="w-2 h-8 bg-fin-blue rounded-full"></span>
        Peer Comparison
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#94a3b8", fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />

            <Radar
              name="Tunisia"
              dataKey="Tunisia"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name="Morocco"
              dataKey="Morocco"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name="Egypt"
              dataKey="Egypt"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.2}
              strokeWidth={2}
            />

            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
            />
            <Tooltip content={customTooltip} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        All metrics normalized to 0-100 scale (higher is better)
      </div>
    </div>
  );
}
