export default function FAQSection() {
  const faqs = [
    {
      q: "How does FitVision work?",
      a: "FitVision uses AI to analyze product data, size charts, and shopper input to deliver accurate size recommendations, virtual try-ons, and personalized outfit suggestions in real time.",
    },
    {
      q: "Will FitVision slow down my website?",
      a: "No. FitVision is delivered via a lightweight script that loads asynchronously and has zero impact on page speed or Core Web Vitals.",
    },
    {
      q: "Which platforms does FitVision support?",
      a: "FitVision works seamlessly with Shopify, WooCommerce, WordPress, and any custom or headless eCommerce website.",
    },
    {
      q: "How accurate are the size recommendations?",
      a: "Our AI continuously improves using real shopper interactions, brand sizing data, and fit feedback to deliver highly accurate size predictions.",
    },
    {
      q: "Is customer data safe and compliant?",
      a: "Yes. FitVision is built with privacy-first principles and complies with GDPR and modern data protection standards.",
    },
    {
      q: "How long does it take to install?",
      a: "Installation takes less than 5 minutes. Simply add one script tag to your store and the widget goes live instantly.",
    },
    {
      q: "Can I customize the widget to match my brand?",
      a: "Absolutely. You can customize colors, text, and appearance directly from the dashboard to match your brand identity.",
    },
    {
      q: "Do you offer a free trial?",
      a: "Yes. You can start with a free trial on the Growth plan to experience the full power of FitVision before upgrading.",
    },
  ];

  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-gray-200">
          {faqs.map((item, idx) => (
            <details key={idx} className="group py-5 cursor-pointer">
              <summary className="flex justify-between items-center list-none text-base font-medium text-gray-900">
                {item.q}
                <span className="ml-4 text-gray-400 transition-transform group-open:rotate-180">
                  +
                </span>
              </summary>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
