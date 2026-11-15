"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UploadDropzone({ onSelect, disabled }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files) => {
    const f = files?.[0];
    if (f && f.type.startsWith("image/")) onSelect(f);
  };

  return (
    <div
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition",
        dragging
          ? "border-emerald-400 bg-emerald-500/10"
          : "border-zinc-700 bg-zinc-900 hover:border-zinc-500",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <UploadCloud className="mb-3 h-10 w-10 text-emerald-400" />
      <p className="font-medium text-white">Drag & drop your scanned document</p>
      <p className="mt-1 text-sm text-zinc-400">
        ba click kore select korun (PNG, JPG, BMP, TIFF)
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}