"use client";

function Card({ label, value, unit, hint }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">
        {value}
        {unit && <span className="ml-1 text-sm text-zinc-400">{unit}</span>}
      </p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export default function MetricsCards({ metrics }) {
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <Card label="Noise Sigma" value={metrics.noise_sigma} hint="Estimated noise level" />
      <Card label="Skew Angle" value={metrics.skew_angle} unit="°" hint="Tilt corrected" />
      <Card label="PSNR (final)" value={metrics.final.psnr} unit="dB" hint="Original vs enhanced" />
      <Card label="MSE (final)" value={metrics.final.mse} hint="Mean squared error" />
      <Card label="Contrast" value={metrics.final.contrast} hint="Std-dev of enhanced" />
      <Card label="PSNR (denoise)" value={metrics.denoise.psnr} unit="dB" />
      <Card label="MSE (denoise)" value={metrics.denoise.mse} />
      <Card label="Otsu Text %" value={metrics.otsu_text_ratio} unit="%" />
      <Card label="Adaptive Text %" value={metrics.adaptive_text_ratio} unit="%" />
      <Card label="Sauvola Text %" value={metrics.sauvola_text_ratio} unit="%" />
    </div>
  );
}