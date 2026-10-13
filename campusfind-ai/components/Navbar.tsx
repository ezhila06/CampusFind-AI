import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>

          <Link href="/search" className="text-gray-700 hover:text-blue-600 transition">
            Search
          </Link>

          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
            Login
          </button>

          <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}