export const scorecardData = [
  { category: "Macro Fundamentals", indicator: "GDP Growth (2025)", value: "2.5%", prev: "1.4%", direction: "improving", score: 1, weight: 0.12 },
  { category: "Macro Fundamentals", indicator: "GDP Forecast 2026", value: "1.6-2.1%", prev: "2.5%", direction: "slowing", score: -1, weight: 0.08 },
  { category: "Macro Fundamentals", indicator: "Inflation (YoY)", value: "4.8%", prev: "7.0%", direction: "declining", score: 2, weight: 0.12 },
  { category: "Macro Fundamentals", indicator: "Core Inflation", value: "4.9%", prev: "4.3%", direction: "rising", score: -1, weight: 0.05 },
  { category: "Macro Fundamentals", indicator: "Budget Deficit (% GDP)", value: "-5.8%", prev: "-6.3%", direction: "improving", score: 1, weight: 0.08 },
  { category: "Macro Fundamentals", indicator: "Public Debt (% GDP)", value: "83%", prev: "84.5%", direction: "stable", score: 0, weight: 0.08 },
  { category: "Currency Dynamics", indicator: "USD/TND Rate", value: "2.884", prev: "2.98", direction: "TND appreciating", score: 2, weight: 0.10 },
  { category: "Currency Dynamics", indicator: "Key Interest Rate", value: "7.00%", prev: "8.00%", direction: "cutting", score: 1, weight: 0.08 },
  { category: "Currency Dynamics", indicator: "FX Reserves (days imports)", value: "107", prev: "102", direction: "growing", score: 1, weight: 0.08 },
  { category: "Currency Dynamics", indicator: "TND/EUR YTD", value: "+1.85%", prev: "flat", direction: "strengthening", score: 1, weight: 0.05 },
  { category: "External Factors", indicator: "Fitch Rating", value: "B- Stable", prev: "CCC+", direction: "upgraded", score: 2, weight: 0.06 },
  { category: "External Factors", indicator: "Moody's Rating", value: "Caa1 Stable", prev: "Caa1", direction: "unchanged", score: 0, weight: 0.02 },
  { category: "External Factors", indicator: "Current Account (% GDP)", value: "-2.5%", prev: "-1.6%", direction: "worsening", score: -1, weight: 0.03 },
  { category: "External Factors", indicator: "FDI Inflows (H1 2025)", value: "+54%", prev: "baseline", direction: "surging", score: 2, weight: 0.03 },
  { category: "External Factors", indicator: "IMF Program", value: "None", prev: "None", direction: "negative", score: -2, weight: 0.02 },
];

export const fxHistory = [
  { date: "Jan 2024", usdtnd: 3.12, eurtnd: 3.42 },
  { date: "Apr 2024", usdtnd: 3.10, eurtnd: 3.36 },
  { date: "Jul 2024", usdtnd: 3.05, eurtnd: 3.32 },
  { date: "Oct 2024", usdtnd: 2.99, eurtnd: 3.28 },
  { date: "Nov 2024", usdtnd: 2.978, eurtnd: 3.25 },
  { date: "Jan 2025", usdtnd: 2.96, eurtnd: 3.22 },
  { date: "Mar 2025", usdtnd: 2.94, eurtnd: 3.20 },
  { date: "Jun 2025", usdtnd: 2.93, eurtnd: 3.18 },
  { date: "Sep 2025", usdtnd: 2.92, eurtnd: 3.16 },
  { date: "Dec 2025", usdtnd: 2.91, eurtnd: 3.15 },
  { date: "Jan 2026", usdtnd: 2.90, eurtnd: 3.14 },
  { date: "Mar 2026", usdtnd: 2.89, eurtnd: 3.13 },
  { date: "Apr 2026", usdtnd: 2.884, eurtnd: 3.12 },
];

export const inflationHistory = [
  { date: "Feb 2023", value: 10.4 },
  { date: "Jun 2023", value: 9.3 },
  { date: "Dec 2023", value: 8.3 },
  { date: "Jun 2024", value: 7.2 },
  { date: "Dec 2024", value: 6.2 },
  { date: "Mar 2025", value: 5.6 },
  { date: "Jun 2025", value: 5.2 },
  { date: "Sep 2025", value: 4.9 },
  { date: "Jan 2026", value: 4.8 },
];

export const scenarios = {
  bull: { label: "Bull Case", scoreAdj: 0.8, tndTarget: "2.75", probability: "25%", triggers: ["Oil drops to $60/bbl", "Tourism receipts +15%", "EUR strengthens to 1.20", "Fitch upgrades to B"], color: "#22c55e" },
  base: { label: "Base Case", scoreAdj: 0, tndTarget: "2.85-2.90", probability: "50%", triggers: ["Status quo maintained", "Gradual inflation decline", "Stable reserves", "No external shock"], color: "#f59e0b" },
  bear: { label: "Bear Case", scoreAdj: -0.9, tndTarget: "3.10", probability: "25%", triggers: ["Oil spikes to $90/bbl", "Severe drought", "EUR/USD falls to 1.05", "Debt rollover stress"], color: "#ef4444" },
};

export const risks = [
  { name: "Oil Price Spike", probability: 3, impact: 4, direction: "downside" },
  { name: "Political Instability", probability: 2, impact: 5, direction: "downside" },
  { name: "Drought", probability: 3, impact: 3, direction: "downside" },
  { name: "Tourism Recovery", probability: 3, impact: 3, direction: "upside" },
  { name: "Fitch Upgrade", probability: 2, impact: 3, direction: "upside" },
  { name: "Debt Rollover Failure", probability: 2, impact: 5, direction: "downside" },
  { name: "EUR Appreciation", probability: 3, impact: 2, direction: "upside" },
  { name: "US Tariff Escalation", probability: 3, impact: 3, direction: "downside" },
  { name: "Remittance Surge", probability: 3, impact: 2, direction: "upside" },
  { name: "CB Policy Error", probability: 2, impact: 4, direction: "downside" },
];

export const peerComparison = [
  { country: "Tunisia", gdpGrowth: 2.5, inflation: 4.8, reserves: 107, debtGdp: 83, fdiGrowth: 54, rating: 4 },
  { country: "Morocco", gdpGrowth: 3.1, inflation: 2.5, reserves: 150, debtGdp: 70, fdiGrowth: 12, rating: 6 },
  { country: "Egypt", gdpGrowth: 4.2, inflation: 28.0, reserves: 130, debtGdp: 92, fdiGrowth: 8, rating: 3 },
];

export function calculateTotalScore(): number {
  return scorecardData.reduce((sum, item) => sum + item.score * item.weight, 0);
}

export function getSignal(score: number): { signal: string; color: string; bias: string } {
  if (score > 0.5) return { signal: "LONG", color: "#22c55e", bias: "Moderate Long Bias" };
  if (score < -0.5) return { signal: "SHORT", color: "#ef4444", bias: "Moderate Short Bias" };
  return { signal: "NEUTRAL", color: "#f59e0b", bias: "Wait and See" };
}

export const SYSTEM_PROMPT = `You are a senior FX analyst at Colombus Capital specializing exclusively in the Tunisian Dinar (TND) and Tunisia's macroeconomy.

Current Tunisia data (April 2026):
- USD/TND: 2.884 (TND appreciated 3.2% over 12 months)
- EUR/TND: 3.12
- GDP Growth: 2.5% (2025), forecast 1.6-2.1% (2026)
- Inflation: 4.8% YoY (Jan 2026), down from 10.4% peak in Feb 2023
- Key Interest Rate: 7.00% (50bps cut in Dec 2025)
- FX Reserves: 25.4B TND / 107 days of imports (up from 102 days YoY)
- Current Account: -2.5% of GDP (widened from -1.6%)
- Public Debt: 83% of GDP
- Fitch Rating: B- Stable (upgraded from CCC+ in Sep 2025)
- Moody's: Caa1 Stable
- FDI: +54% in H1 2025
- IMF: No program (severed ties in 2025)
- Key exports: olive oil, textiles, mechanical/electrical goods, phosphates
- Key risks: oil import dependency, drought, EUR/USD movements, limited external financing

RULES:
1. ONLY answer questions related to Tunisia, the Tunisian Dinar, or factors that directly impact TND (oil prices, EUR/USD, Mediterranean trade, North Africa geopolitics, etc.)
2. If the question is unrelated to TND/Tunisia, respond: "I'm specialized in Tunisian Dinar analysis only. Please ask about TND, Tunisia's economy, or factors affecting the dinar."
3. Structure your response as: IMPACT → DIRECTION → MAGNITUDE → KEY WATCH
4. Be concise: 4-5 bullet points maximum
5. Always end with whether this shifts the TND signal toward Long, Short, or keeps it Neutral`;
