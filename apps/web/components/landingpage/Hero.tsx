export default function Hero() {
  return (
    <section className="pt-40 pb-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white shadow-xl border border-gray-200 px-4 py-2 rounded-full mb-6">
          <span className="text-sm font-medium flex items-center gap-1">
            ✨ New
          </span>
          <span className="text-sm text-gray-600">
            AI Try-On + Fit Intelligence
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900">
          AI Try-On, Perfect Fit & Smart Recommendations — in One Widget
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-md text-gray-600 max-w-2xl mx-auto">
          Boost conversions and reduce returns with AI-powered virtual try-on,
          accurate size guidance, and personalized outfit recommendations — all
          embedded seamlessly into your store.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="px-8 py-3 bg-black text-white rounded-lg text-lg font-medium hover:bg-gray-900 transition">
            Install Plugin →
          </button>

          <button className="px-8 py-3 bg-white border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-50 transition">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
