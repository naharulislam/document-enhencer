"use client";

import { useState } from "react";
import { ScanText } from "lucide-react";

export default function OCRPreview({ before, after }) {
  const [loading, setLoading] = useState(false);
  const [texts, setTexts] = useState(null);
  const [progress, setProgress] = useState("");

  if (!before || !after) return null;

  const runOCR = async () => {
    setLoading(true);
    setTexts(null);
    try {
      // Tesseract.js browser e e load hobe (dynamic import)
      const Tesseract = (await import("tesseract.js")).default;

      setProgress("Original image er OCR cholche...");
      const r1 = await Tesseract.recognize(before, "eng");

      setProgress("Enhanced image er OCR cholche...");
      const r2 = await Tesseract.recognize(after, "eng");

      setTexts({
        before: r1.data.text.trim(),
        after: r2.data.text.trim(),
        beforeConf: Math.round(r1.data.confidence),
        afterConf: Math.round(r2.data.confidence),
      });
    } catch (e) {
      setTexts({ error: e.message || "OCR failed" });
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-white">OCR Comparison (Tesseract.js)</h3>
        <button
          onClick={runOCR}
          disabled={loading}
          className="flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-medium text-zinc-950 hover:bg-emerald-400 disabled:opacity-50"
        >
          <ScanText className="h-4 w-4" />
          {loading ? "Running..." : "Run OCR"}
        </button>
      </div>

      {loading && <p className="text-sm text-zinc-400">{progress}</p>}

      {texts?.error && <p className="text-sm text-red-400">{texts.error}</p>}

      {texts && !texts.error && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-1 text-sm text-zinc-400">
              Before — confidence: <span className="font-mono text-red-400">{texts.beforeConf}%</span>
            </p>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-3 text-xs text-zinc-300">
              {texts.before || "(no text detected)"}
            </pre>
          </div>
          <div>
            <p className="mb-1 text-sm text-zinc-400">
              After — confidence: <span className="font-mono text-emerald-400">{texts.afterConf}%</span>
            </p>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-3 text-xs text-zinc-300">
              {texts.after || "(no text detected)"}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}