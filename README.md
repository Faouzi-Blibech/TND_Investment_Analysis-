# Tunisian Dinar (TND) Investment Analysis Dashboard

**Colombus Capital — Technical Assessment | April 2026**

A professional financial analysis dashboard for the Tunisian Dinar (TND) featuring real-time data visualization, weighted macroeconomic scoring, scenario analysis, and AI-powered scenario modeling via Groq.

![Dashboard Preview](https://img.shields.io/badge/Dashboard-Next.js%2014-black?style=for-the-badge&logo=next.js)
![Theme](https://img.shields.io/badge/Theme-Financial%20Terminal-darkblue?style=for-the-badge)
![Data](https://img.shields.io/badge/Data-April%202026-green?style=for-the-badge)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Data Model](#data-model)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Integrations](#api-integrations)
- [Scoring Methodology](#scoring-methodology)
- [Component Reference](#component-reference)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

This dashboard provides a comprehensive technical assessment of the Tunisian Dinar investment opportunity. It transforms an Excel-based financial model into an interactive web application with real-time data visualization, dynamic scenario analysis, and AI-powered macroeconomic insights.

### Key Capabilities

- **Live FX Rate Tracking**: Real-time USD/TND rates from open.er-api.com
- **Weighted Scorecard**: 15 macroeconomic indicators with directional scoring
- **Interactive Scenarios**: Bull/Base/Bear case modeling with dynamic signal adjustment
- **Risk Visualization**: Probability-Impact matrix with quadrant analysis
- **Peer Comparison**: Radar chart comparing Tunisia vs Morocco vs Egypt
- **AI Analyst**: Groq Llama 70B-powered TND-specific scenario analysis

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14.2.0 (App Router) |
| **Language** | TypeScript 5.4 |
| **Styling** | Tailwind CSS 3.4 |
| **UI Components** | Lucide React Icons |
| **Charts** | Recharts 2.12 |
| **AI Integration** | Groq API (Llama 3.3 70B) |
| **FX Data** | open.er-api.com (free tier) |

### Design System

```css
/* Terminal Theme Colors */
Background:    #0a0a0f  (Deep black)
Card Surface:  #12121a  (Slightly lighter)
Border:        #1e293b  (Slate 800)

/* Financial Indicators */
Positive:      #22c55e  (Green)
Negative:      #ef4444  (Red)
Neutral:       #f59e0b  (Amber)
Info:          #3b82f6  (Blue)

/* Typography */
Headings:      System sans-serif
Numbers:       JetBrains Mono / Consolas / Monaco
```

---

## Architecture

```
app/
├── layout.tsx              # Root layout with JetBrains Mono font
├── page.tsx                # Main dashboard orchestrator
└── globals.css             # Terminal theme styles + animations

components/
├── Header.tsx              # Investment signal + live FX rates
├── MacroScorecard.tsx      # Full scorecard data table
├── FXChart.tsx             # Dual-line FX rate history
├── InflationChart.tsx      # Area chart with color zones
├── ScenarioAnalysis.tsx    # Interactive scenario cards
├── RiskMatrix.tsx          # Scatter chart risk visualization
├── PeerComparison.tsx      # Radar chart peer analysis
├── AIAnalyst.tsx           # Groq-powered AI chat interface
└── Footer.tsx              # Methodology & data sources

lib/
├── data.ts                 # All financial data constants + SYSTEM_PROMPT
└── utils.ts                # Utility functions (formatting, cn)

public/                     # Static assets (if any)
```

### State Management

- **React useState**: Selected scenario (bull/base/bear)
- **React useMemo**: Computed adjusted scores
- **Client-side fetching**: Live FX rates on mount

---

## Features

### 1. Investment Signal Engine

Calculates a weighted score from 15 macroeconomic indicators on page load:

```typescript
// Formula
const totalScore = Σ(indicator.score × indicator.weight)

// Signal Mapping
if (totalScore > 0.5)  → "LONG (Moderate Long Bias)"
if (totalScore < -0.5) → "SHORT (Moderate Short Bias)"
else                    → "NEUTRAL (Wait and See)"
```

### 2. Live FX Rate Display

Fetches from `https://open.er-api.com/v6/latest/USD` on component mount:

- **USD/TND**: Live rate with delta from model (2.884)
- **EUR/TND**: Computed cross rate (TND rate ÷ EUR rate)
- **Fallback**: Shows hardcoded value with "cached" label if API fails

### 3. Scenario Analysis

Three interactive scenario cards (Bull/Base/Bear) that adjust the total score:

| Scenario | Score Adjustment | TND Target | Probability |
|----------|------------------|------------|-------------|
| Bull     | +0.8             | 2.75       | 25%         |
| Base     | 0                | 2.85-2.90  | 50%         |
| Bear     | -0.9             | 3.10       | 25%         |

Clicking a scenario:
- Adds `scoreAdj` to base score
- Updates investment signal in real-time
- Shows adjusted score in card
- Click again to deselect

### 4. Macro Scorecard Table

Full tabular view of all 15 indicators:

- **Grouped by category**: Macro Fundamentals, Currency Dynamics, External Factors
- **Direction arrows**: Color-coded based on score
- **Weighted column**: Score × Weight for each row
- **Total row**: Bold weighted sum at bottom

### 5. Charts

#### FX History (LineChart)
- Time series: Jan 2024 → Apr 2026
- Dual lines: USD/TND (green), EUR/TND (blue)
- Reference lines: Fitch Upgrade (Sep 2025), Rate Cut (Dec 2025)

#### Inflation Trend (AreaChart)
- Time series: Feb 2023 → Jan 2026
- Color zones: Green (< 5%), Amber (5-7%), Red (> 7%)
- Gradient fill with opacity
- Reference lines at 5% and 7%

#### Risk Matrix (ScatterChart)
- X-axis: Probability (1-5)
- Y-axis: Impact (1-5)
- Color coding: Green (upside), Red (downside)
- Quadrant lines at 2.5
- 10 tracked risks

#### Peer Comparison (RadarChart)
- Metrics: GDP Growth, Low Inflation, Reserves, Low Debt, FDI Growth, Credit Rating
- Countries: Tunisia (blue), Morocco (green), Egypt (amber)
- Normalized to 0-100 scale

### 6. AI Analyst (Groq Integration)

TND-specialized AI chat interface:

**System Prompt**: Specialized analyst persona with current Tunisia macro data (April 2026)

**Input Methods**:
- Text input with placeholder
- 4 quick suggestion chips

**Response Rules**:
1. Only answers TND/Tunisia-related questions
2. Rejects unrelated queries with: "I'm specialized in Tunisian Dinar analysis only..."
3. Structure: IMPACT → DIRECTION → MAGNITUDE → KEY WATCH
4. Max 4-5 bullet points
5. Ends with signal shift (Long/Short/Neutral)

**API Configuration**:
```typescript
model: "llama-3.3-70b-versatile"
max_tokens: 400
temperature: 0.3
```

**UI States**:
- Loading: Spinner with pulse animation
- Error: Amber warning message
- Success: Formatted bullet points

---

## Data Model

### Scorecard Data Structure

```typescript
interface ScorecardItem {
  category: string;      // "Macro Fundamentals" | "Currency Dynamics" | "External Factors"
  indicator: string;       // Display name
  value: string;          // Current value
  prev: string;           // Previous value
  direction: string;      // Trend description
  score: number;          // -2 to +2
  weight: number;         // 0.02 to 0.12
}
```

### Historical Data

```typescript
// FX History
interface FXDataPoint {
  date: string;          // "Jan 2024"
  usdtnd: number;        // 3.12
  eurtnd: number;        // 3.42
}

// Inflation History
interface InflationDataPoint {
  date: string;          // "Feb 2023"
  value: number;         // 10.4
}
```

### Scenarios

```typescript
interface Scenario {
  label: string;         // "Bull Case"
  scoreAdj: number;      // +0.8
  tndTarget: string;     // "2.75"
  probability: string;    // "25%"
  triggers: string[];    // ["Oil drops to $60/bbl", ...]
  color: string;         // "#22c55e"
}
```

### Risk Matrix

```typescript
interface Risk {
  name: string;           // "Oil Price Spike"
  probability: number;    // 1-5
  impact: number;         // 1-5
  direction: "upside" | "downside";
}
```

### Peer Comparison

```typescript
interface PeerData {
  country: string;        // "Tunisia" | "Morocco" | "Egypt"
  gdpGrowth: number;      // 2.5
  inflation: number;      // 4.8
  reserves: number;       // 107
  debtGdp: number;        // 83
  fdiGrowth: number;      // 54
  rating: number;         // 4
}
```

---

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup Steps

```bash
# Clone or navigate to project directory
cd "tunisian dinar investemnt"

# Install dependencies (use legacy-peer-deps for version conflicts)
npm install --legacy-peer-deps

# Configure environment variables
cp .env.local.example .env.local
# Edit .env.local and add your GROQ API key

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for AI Analyst feature
NEXT_PUBLIC_GROQ_API_KEY=gsk_your_api_key_here
```

**Note**: The key must start with `NEXT_PUBLIC_` to be accessible in browser components. Never commit this file to version control.

**Getting a GROQ API Key**:
1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up for an account
3. Create an API key
4. Copy to your `.env.local`

---

## Usage

### Dashboard Sections

1. **Header**: Investment signal badge, live FX rates, weighted score
2. **Macro Scorecard**: Full data table with 15 indicators
3. **Charts Row**: FX history + Inflation trend
4. **Scenario Analysis**: Click to adjust score and signal
5. **Risk Matrix**: Visual risk assessment
6. **Peer Comparison**: Regional competitiveness
7. **AI Analyst**: Ask scenario questions
8. **Footer**: Methodology and data sources

### Interactions

- **Hover charts**: Tooltips with precise values
- **Click scenarios**: Adjust investment signal dynamically
- **Ask AI**: Type or click suggestions for scenario analysis
- **Scroll**: Smooth scrollbars styled for dark theme

---

## API Integrations

### 1. Open Exchange Rates (Free Tier)

**Endpoint**: `https://open.er-api.com/v6/latest/USD`

**Response**:
```json
{
  "rates": {
    "TND": 2.884,
    "EUR": 0.85
  }
}
```

**Usage**:
- USD/TND rate displayed live
- EUR/TND cross rate calculated client-side
- No API key required
- Rate limited but suitable for demo purposes

**Error Handling**:
- Network failures caught and logged
- Falls back to hardcoded value (2.884)
- Shows "cached" indicator when using fallback

### 2. Groq API

**Endpoint**: `https://api.groq.com/openai/v1/chat/completions`

**Headers**:
```
Authorization: Bearer {NEXT_PUBLIC_GROQ_API_KEY}
Content-Type: application/json
```

**Request Body**:
```json
{
  "model": "llama-3.3-70b-versatile",
  "messages": [
    { "role": "system", "content": "SYSTEM_PROMPT" },
    { "role": "user", "content": "user question" }
  ],
  "max_tokens": 400,
  "temperature": 0.3
}
```

**Error Handling**:
- Validates API key presence
- Shows configuration warning if missing
- Displays error message on API failure

---

## Scoring Methodology

### Indicator Scoring (-2 to +2)

| Score | Meaning | Color |
|-------|---------|-------|
| +2    | Strongly positive | Dark green |
| +1    | Positive | Green |
| 0     | Neutral | Amber |
| -1    | Negative | Red |
| -2    | Strongly negative | Dark red |

### Weight Distribution

Total weights sum to 1.0 (100%):

- GDP Growth (2025): 12%
- Inflation (YoY): 12%
- USD/TND Rate: 10%
- FX Reserves: 8%
- Key Interest Rate: 8%
- Budget Deficit: 8%
- Public Debt: 8%
- GDP Forecast 2026: 8%
- Core Inflation: 5%
- TND/EUR YTD: 5%
- Fitch Rating: 6%
- Moody's Rating: 2%
- Current Account: 3%
- FDI Inflows: 3%
- IMF Program: 2%

### Signal Thresholds

```
Score > 0.5   → LONG (Moderate Long Bias)
Score < -0.5  → SHORT (Moderate Short Bias)
-0.5 to 0.5  → NEUTRAL (Wait and See)
```

---

## Component Reference

### Header.tsx

**Props**:
```typescript
interface HeaderProps {
  adjustedScore: number | null;  // null = base case
}
```

**Features**:
- Live FX rate fetching on mount
- Signal badge with color coding
- Score display with adjustment indicator

### MacroScorecard.tsx

**Props**:
```typescript
interface MacroScorecardProps {
  adjustedScore: number | null;
}
```

**Features**:
- Grouped table by category
- Direction icons (arrows)
- Score color coding
- Total weighted score row

### ScenarioAnalysis.tsx

**Props**:
```typescript
interface ScenarioAnalysisProps {
  selectedScenario: "bull" | "base" | "bear" | null;
  onSelectScenario: (scenario: "bull" | "base" | "bear" | null) => void;
}
```

**Features**:
- Three clickable cards
- Selection toggle (click to deselect)
- Shows adjusted score when active

### AIAnalyst.tsx

**State**:
```typescript
const [input, setInput] = useState("");
const [response, setResponse] = useState("<no analysis yet>");
const [loading, setLoading] = useState(false);
```

**Features**:
- Text input with submit
- 4 suggestion chips
- Loading spinner with pulse
- Formatted response display
- API error handling

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add NEXT_PUBLIC_GROQ_API_KEY
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  distDir: 'dist',
}
```

Then run:
```bash
npm run build
# Static files in /dist
```

**Note**: Static export has limitations (no API routes, no SSR). For full functionality including live FX fetching, use SSR deployment.

---

## Performance Considerations

1. **Client-side fetching**: FX rates fetched after hydration to avoid SSR delays
2. **Memoization**: Adjusted score calculated with useMemo to prevent recalculation
3. **Lazy loading**: Charts render after mount with ResponsiveContainer
4. **Bundle size**: Recharts tree-shaking keeps bundle minimal

---

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Requires:
- JavaScript enabled
- CSS Grid support
- Fetch API support

---

## Known Issues

1. **Next.js 14.2.0 security warning**: Upgrade to patched version for production
2. **Groq API requires client-side env**: NEXT_PUBLIC_ prefix required
3. **Open Exchange Rates**: Free tier has rate limits; may fallback to cached

---

## Future Enhancements

- [ ] WebSocket for real-time FX updates
- [ ] Historical scenario comparison
- [ ] PDF export of analysis
- [ ] Dark/light theme toggle
- [ ] Multi-language support (Arabic, French)
- [ ] Mobile app (React Native)
- [ ] Additional peer countries (Algeria, Libya)

---

## Credits

- **Data Sources**: Central Bank of Tunisia, World Bank, IMF, Fitch Ratings
- **AI**: Groq (Llama 3.3 70B)
- **UI Framework**: Next.js, Tailwind CSS, Recharts
- **Design**: Financial Terminal Theme (Bloomberg-style)

---

## License

Proprietary - Colombus Capital Internal Use Only

---

**Last Updated**: April 2026  
**Version**: 1.0.0  
**Maintainer**: Colombus Capital Technical Team
