"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function ImageModal({ src, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-zinc-800 p-2 text-white hover:bg-zinc-700"
      >
        <X className="h-5 w-5" />
      </button>
      <p className="mb-2 text-sm text-zinc-300">{title}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        className="max-h-[88vh] max-w-[95vw] rounded bg-white object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}