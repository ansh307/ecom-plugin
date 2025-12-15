"use client";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">FitVision</span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-700">
          <button className="hover:text-black">Features</button>
          <button className="hover:text-black">For Stores</button>
          <button className="hover:text-black">Integrations</button>
          <button className="hover:text-black">Pricing</button>
          <button className="hover:text-black">Docs</button>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-black">Login</button>
          <button className="px-5 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-900">
            Install Plugin
          </button>
        </div>
      </nav>
    </header>
  );
}
