"use client";

import { useRef, useState } from "react";
import { STAGES } from "@/lib/utils";

export default function CompareSlider({ images }) {
  const [pos, setPos] = useState(50);
  const [afterKey, setAfterKey] = useState("sauvola");
  const ref = useRef(null);

  if (!images) return null;

  const move = (clientX) => {
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  };

  const after = images[afterKey];
  const before = images.original;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-zinc-400">Before (Original)</span>
        <select
          value={afterKey}
          onChange={(e) => setAfterKey(e.target.value)}
          className="rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-emerald-400"
        >
          {STAGES.filter((s) => s.key !== "original").map((s) => (
            <option key={s.key} value={s.key}>
              After: {s.label}
            </option>
          ))}
        </select>
      </div>

      <div
        ref={ref}
        className="relative mx-auto w-fit max-w-full cursor-ew-resize select-none overflow-hidden rounded-lg bg-zinc-950"
        onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
        onMouseDown={(e) => move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
      >
        {/* After (niche, image er size nirdharon kore) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt="After" className="block max-h-[80vh] w-auto max-w-full" draggable={false} />

        {/* Before (upore, clip kora) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before} alt="Before" className="h-full w-full" draggable={false} />
        </div>

        <div className="absolute bottom-0 top-0 w-0.5 bg-emerald-400" style={{ left: `${pos}%` }}>
          <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-zinc-950">
            ⇄
          </div>
        </div>
      </div>
    </div>
  );
}