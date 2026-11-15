"use client";

import useEnhance from "@/hooks/useEnhance";
import UploadDropzone from "@/components/UploadDropzone";
import SettingsPanel from "@/components/SettingsPanel";
import PipelineStages from "@/components/PipelineStages";
import CompareSlider from "@/components/CompareSlider";
import MetricsCards from "@/components/MetricsCards";
import MetricsChart from "@/components/MetricsChart";
import DownloadButtons from "@/components/DownloadButtons";
import OCRPreview from "@/components/OCRPreview";

export default function EnhancePage() {
  const {
    file,
    settings,
    setSettings,
    result,
    loading,
    error,
    selectFile,
    reprocess,
    reset,
  } = useEnhance();

  const images = result?.images;
  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "document";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-white">Enhancement Workspace</h1>
      <p className="mb-6 text-sm text-zinc-400">
        Scanned document upload korun, pipeline er proti step er result dekhun.
      </p>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left: settings */}
        <aside className="space-y-4">
          <SettingsPanel
            settings={settings}
            setSettings={setSettings}
            onApply={reprocess}
            onReset={reset}
            loading={loading}
          />
        </aside>

        {/* Right: upload + results */}
        <section className="space-y-6">
          <UploadDropzone onSelect={selectFile} disabled={loading} />

          {file && (
            <p className="text-sm text-zinc-400">
              Selected: <span className="text-zinc-200">{file.name}</span>
            </p>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {error}. Backend server (port 8000) chalu ache kina check korun.
            </div>
          )}

          {loading && (
            <div className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
              Processing image...
            </div>
          )}

          {images && !loading && (
            <>
              <div className="flex justify-end">
                <DownloadButtons images={images} filename={baseName} />
              </div>

              <CompareSlider before={images.original} after={images.otsu} />

              <MetricsCards metrics={result.metrics} />
              <MetricsChart metrics={result.metrics} />

              <div>
                <h2 className="mb-3 text-lg font-semibold text-white">Pipeline Stages</h2>
                <PipelineStages images={images} filename={baseName} />
              </div>

<OCRPreview before={images.original} after={images.sauvola} />
            </>
          )}
        </section>
      </div>
    </div>
  );
}