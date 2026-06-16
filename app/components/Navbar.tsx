import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
      <Link
        href="/"
        className="text-xl font-bold"
      >
        Urban Pulse
      </Link>

      <div className="flex gap-6">
        <Link href="/analytics">Analytics</Link>
        <Link href="/map">Map</Link>
        <Link href="/districts">Districts</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
}