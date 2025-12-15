export default function FinalCTASection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          {/* Subtle background accents */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-70" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-70" />
          </div>

          <div className="relative px-8 py-20 md:px-16 text-center">
            <h2 className="text-4xl md:text-4xl font-bold tracking-tight mb-6">
              Launch AI-Powered Sizing & Try-On in Minutes
            </h2>

            <p className="text-md text-gray-600 max-w-2xl mx-auto mb-10">
              FitVision installs instantly on your store and starts delivering
              accurate size recommendations, virtual try-ons, and smarter
              product suggestions.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 rounded-xl bg-black text-white font-medium text-lg hover:opacity-90 transition">
                Install Plugin
              </button>

              <button className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium text-lg hover:bg-gray-50 transition">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
