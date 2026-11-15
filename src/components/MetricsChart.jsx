"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MetricsChart({ metrics }) {
  if (!metrics) return null;

  const data = [
    { name: "PSNR", Denoised: metrics.denoise.psnr, Final: metrics.final.psnr },
    { name: "MSE", Denoised: metrics.denoise.mse, Final: metrics.final.mse },
    { name: "Contrast", Denoised: metrics.denoise.contrast, Final: metrics.final.contrast },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="mb-3 font-semibold text-white">Quality Comparison</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="name" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" />
            <Tooltip
              contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", color: "#fff" }}
            />
            <Legend />
            <Bar dataKey="Denoised" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Final" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}