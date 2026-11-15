import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <Logo className="h-8 w-8" />
          DocEnhancer
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link
            href="/enhance"
            className="rounded-md bg-emerald-500 px-3 py-1.5 font-medium text-zinc-950 hover:bg-emerald-400"
          >
            Open Workspace
          </Link>
        </nav>
      </div>
    </header>
  );
}