"use client";

import { useState } from "react";
import { Download, Maximize2 } from "lucide-react";
import { STAGES, downloadDataUrl } from "@/lib/utils";
import ImageModal from "@/components/ImageModal";

export default function PipelineStages({ images, filename = "document" }) {
  const [zoom, setZoom] = useState(null);

  if (!images) return null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STAGES.map((s) => (
          <div key={s.key} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-medium text-zinc-200">{s.label}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setZoom({ src: images[s.key], title: s.label })}
                  className="text-zinc-400 hover:text-emerald-400"
                  title="Zoom"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => downloadDataUrl(images[s.key], `${s.key}_${filename}.png`)}
                  className="text-zinc-400 hover:text-emerald-400"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              className="cursor-zoom-in bg-zinc-950"
              onClick={() => setZoom({ src: images[s.key], title: s.label })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[s.key]} alt={s.label} className="h-80 w-full object-contain" />
            </div>
          </div>
        ))}
      </div>

      {zoom && <ImageModal src={zoom.src} title={zoom.title} onClose={() => setZoom(null)} />}
    </>
  );
}