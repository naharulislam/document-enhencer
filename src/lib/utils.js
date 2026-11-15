export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const DEFAULT_SETTINGS = {
  median_size: 3,
  morph_size: 2,
  bg_sigma: 25,
  clip_limit: 2.0,
  tile_size: 8,
  sharpen_amount: 2.5,
  sharpen_sigma: 1.5,
  block_size: 41,
  c_value: 15,
  upscale: 2.0,
  sauvola_k: 0.2,
};

export const STAGES = [
  { key: "original", label: "1. Original" },
  { key: "denoised", label: "2. Median + NLM Denoise" },
  { key: "deskewed", label: "3. Deskewed" },
  { key: "normalized", label: "4. Illumination (CLAHE)" },
  { key: "sharpened", label: "5. Unsharp Masking" },
  { key: "otsu", label: "6. Otsu Binarization" },
  { key: "adaptive", label: "7. Adaptive Gaussian" },
  { key: "sauvola", label: "8. Sauvola (best)" },
];