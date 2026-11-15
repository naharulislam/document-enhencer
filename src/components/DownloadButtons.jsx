"use client";

import { useState } from "react";
import JSZip from "jszip";
import { Archive } from "lucide-react";
import { STAGES } from "@/lib/utils";

export default function DownloadButtons({ images, filename = "document" }) {
  const [busy, setBusy] = useState(false);

  if (!images) return null;

  const downloadZip = async () => {
    setBusy(true);
    try {
      const zip = new JSZip();
      STAGES.forEach((s, i) => {
        const base64 = images[s.key].split(",")[1];
        zip.file(`${i + 1}_${s.key}.png`, base64, { base64: true });
      });
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}_enhanced.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={downloadZip}
      disabled={busy}
      className="flex items-center gap-2 rounded-md border border-emerald-500 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-50"
    >
      <Archive className="h-4 w-4" />
      {busy ? "Zipping..." : "Download all (ZIP)"}
    </button>
  );
}