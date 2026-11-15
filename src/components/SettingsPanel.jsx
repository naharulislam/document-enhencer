"use client";

import { RotateCcw, Play } from "lucide-react";

const CONTROLS = [
  { key: "median_size", label: "Median kernel size", min: 3, max: 15, step: 2 },
  { key: "morph_size", label: "Morphological kernel", min: 1, max: 7, step: 1 },
  { key: "bg_sigma", label: "Background sigma", min: 5, max: 80, step: 1 },
  { key: "clip_limit", label: "CLAHE clip limit", min: 1, max: 8, step: 0.5 },
  { key: "tile_size", label: "CLAHE tile size", min: 2, max: 16, step: 1 },
  { key: "sharpen_amount", label: "Sharpen amount", min: 0, max: 4, step: 0.1 },
  { key: "sharpen_sigma", label: "Sharpen sigma", min: 0.5, max: 5, step: 0.1 },
  { key: "block_size", label: "Adaptive block size", min: 3, max: 61, step: 2 },
  { key: "c_value", label: "Adaptive C value", min: 0, max: 30, step: 1 },
  { key: "upscale", label: "Upscale factor", min: 1, max: 3, step: 0.5 },
  { key: "sauvola_k", label: "Sauvola k", min: 0.1, max: 0.6, step: 0.05 },
];

export default function SettingsPanel({ settings, setSettings, onApply, onReset, loading }) {
  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: Number(value) }));

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h3 className="mb-4 font-semibold text-white">Settings</h3>

      <div className="space-y-4">
        {CONTROLS.map((c) => (
          <div key={c.key}>
            <div className="mb-1 flex justify-between text-sm">
              <label className="text-zinc-300">{c.label}</label>
              <span className="font-mono text-emerald-400">{settings[c.key]}</span>
            </div>
            <input
              type="range"
              min={c.min}
              max={c.max}
              step={c.step}
              value={settings[c.key]}
              onChange={(e) => update(c.key, e.target.value)}
              className="w-full accent-emerald-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={onApply}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400 disabled:opacity-50"
        >
          <Play className="h-4 w-4" />
          {loading ? "Processing..." : "Apply"}
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
}