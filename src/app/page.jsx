import Link from "next/link";
import { Eraser, Sun, Sparkles, ScanText, BarChart3, Download } from "lucide-react";

const FEATURES = [
  { icon: Eraser, title: "Noise Removal", text: "Median + morphological filter diye salt-and-pepper noise muche fele." },
  { icon: Sun, title: "Illumination Normalization", text: "Background estimate kore divide kore, CLAHE diye contrast barhay." },
  { icon: Sparkles, title: "Text Edge Sharpening", text: "Unsharp masking diye character er edge sharp kore." },
  { icon: ScanText, title: "Adaptive Binarization", text: "Otsu ar Adaptive Gaussian threshold er tulona." },
  { icon: BarChart3, title: "Quality Metrics", text: "PSNR, MSE, Contrast, Noise sigma, Text pixel ratio." },
  { icon: Download, title: "OCR + Download", text: "Tesseract.js diye before/after OCR, sob stage download." },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <section className="py-20 text-center">
        <p className="mb-3 text-sm font-medium text-emerald-400">
          Digital Image Processing Sessional · Project 7
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Document Image Enhancement for OCR
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          Scanned document er noise remove, illumination normalize, text edge sharpen ar
          binarize kore OCR accuracy barhan.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/enhance"
            className="rounded-md bg-emerald-500 px-6 py-3 font-medium text-zinc-950 hover:bg-emerald-400"
          >
            Start Enhancing
          </Link>
          <a
            href="#features"
            className="rounded-md border border-zinc-700 px-6 py-3 font-medium text-zinc-200 hover:bg-zinc-800"
          >
            Features
          </a>
        </div>
      </section>

      <section id="features" className="grid gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <Icon className="mb-3 h-6 w-6 text-emerald-400" />
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-zinc-400">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}