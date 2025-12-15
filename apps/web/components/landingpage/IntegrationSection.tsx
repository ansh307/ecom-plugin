export default function IntegrationSection() {
  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Works with any store
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          FitVision integrates seamlessly with Shopify, WordPress, and custom
          websites using a single lightweight script.
        </p>

        {/* Platforms */}
        {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Shopify", "WooCommerce", "WordPress", "Custom website"].map(
            (platform) => (
              <span
                key={platform}
                className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 bg-gray-50"
              >
                {platform}
              </span>
            )
          )}
        </div> */}

        <div className="h-56"></div>

        {/* Code Snippet */}
        <div className="max-w-3xl mx-auto rounded-xl border border-gray-200 bg-gray-50 px-6 py-4 text-left">
          <pre className="text-sm text-gray-800 overflow-x-auto">
            {`<script
  src="https://cdn.FitVision.ai/widget.js"
  data-store="your-store-id"
></script>`}
          </pre>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          One-line install · No platform lock-in · Zero performance impact
        </p>
      </div>
    </section>
  );
}
