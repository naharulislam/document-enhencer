import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "DocEnhancer | Document Image Enhancement for OCR",
  description:
    "Noise removal, illumination normalization, text sharpening and adaptive binarization for scanned documents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-zinc-950 text-zinc-100 antialiased"
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}