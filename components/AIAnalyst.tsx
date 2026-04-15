"use client";

import { useState } from "react";
import { SYSTEM_PROMPT } from "@/lib/data";
import { Send, Sparkles, Loader2 } from "lucide-react";

const SUGGESTIONS = [
  "Oil price spike to $100",
  "Tunisia secures IMF deal",
  "European recession scenario",
  "Drought destroys olive harvest",
];

export default function AIAnalyst() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("<no analysis yet>");
  const [loading, setLoading] = useState(false);

  const analyze = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      if (!apiKey || apiKey === "YOUR_GROQ_API_KEY") {
        setResponse("⚠️ Please configure NEXT_PUBLIC_GROQ_API_KEY in your .env.local file to use the AI analyst feature.");
        setLoading(false);
        return;
      }

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: query },
          ],
          max_tokens: 400,
          temperature: 0.3,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error calling Groq API:", error);
      setResponse("Error: Failed to get analysis. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyze(input);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    analyze(suggestion);
  };

  return (
    <div className="bg-terminal-card border border-terminal-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
        <h2 className="text-xl font-bold text-white">AI Scenario Analyzer</h2>
        <span className="ml-auto text-xs text-gray-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Powered by Llama 70B via Groq
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about TND: e.g., What if oil hits $100?"
            className="flex-1 bg-terminal-bg border border-terminal-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-fin-blue transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-fin-blue hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mb-6">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestion(suggestion)}
            disabled={loading}
            className="text-xs bg-terminal-bg border border-terminal-border hover:border-fin-blue text-gray-400 hover:text-white px-3 py-1.5 rounded-full transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="bg-terminal-bg border border-terminal-border rounded-lg p-5 min-h-[150px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <div className="relative">
              <div className="w-10 h-10 border-2 border-fin-blue border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-fin-blue animate-pulse" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">Analyzing scenario...</p>
          </div>
        ) : response.startsWith("⚠️") || response.startsWith("Error") ? (
          <div className="text-fin-amber text-sm">{response}</div>
        ) : response === "<no analysis yet>" ? (
          <div className="text-gray-500 text-sm">
            Enter a question or click a suggestion to get AI analysis on TND scenarios.
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            {response.split("\n").map((line, idx) => {
              if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
                return (
                  <div key={idx} className="flex items-start gap-2 mb-2">
                    <span className="text-fin-blue mt-1">•</span>
                    <span className="text-gray-300">{line.replace(/^[•\-]\s*/, "")}</span>
                  </div>
                );
              }
              if (line.toLowerCase().includes("long")) {
                return (
                  <div key={idx} className="text-fin-green font-semibold mt-4">
                    {line}
                  </div>
                );
              }
              if (line.toLowerCase().includes("short")) {
                return (
                  <div key={idx} className="text-fin-red font-semibold mt-4">
                    {line}
                  </div>
                );
              }
              if (line.toLowerCase().includes("neutral")) {
                return (
                  <div key={idx} className="text-fin-amber font-semibold mt-4">
                    {line}
                  </div>
                );
              }
              return line.trim() ? (
                <p key={idx} className="text-gray-300 mb-2">{line}</p>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
