export default function PricingSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Simple, Transparent Pricing
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Choose a plan that fits your store. Upgrade or downgrade anytime.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="rounded-2xl border border-gray-200 p-8 text-left bg-white">
            <h3 className="text-lg font-medium mb-1">Starter</h3>
            <p className="text-sm text-gray-500 mb-6">For small stores</p>

            <div className="text-3xl font-semibold mb-6">
              $29
              <span className="text-sm font-normal text-gray-500">
                {" "}
                / month
              </span>
            </div>

            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li>AI size recommendations</li>
              <li>Basic AI try-on</li>
              <li>5,000 interactions / month</li>
              <li>Analytics dashboard</li>
              <li>Email support</li>
            </ul>

            <button className="w-full py-2.5 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition">
              Get started
            </button>
          </div>

          {/* Growth (Featured) */}
          <div className="relative rounded-2xl border border-black p-8 text-left bg-white shadow-md">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
              Most popular
            </span>

            <h3 className="text-lg font-medium mb-1">Growth</h3>
            <p className="text-sm text-gray-500 mb-6">For growing brands</p>

            <div className="text-3xl font-semibold mb-6">
              $99
              <span className="text-sm font-normal text-gray-500">
                {" "}
                / month
              </span>
            </div>

            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li>AI size & fit engine</li>
              <li>Full AI try-on</li>
              <li>Outfit & product recommendations</li>
              <li>50,000 interactions / month</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
            </ul>

            <button className="w-full py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:opacity-90 transition">
              Start free trial
            </button>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl border border-gray-200 p-8 text-left bg-white">
            <h3 className="text-lg font-medium mb-1">Enterprise</h3>
            <p className="text-sm text-gray-500 mb-6">
              For large teams & marketplaces
            </p>

            <div className="text-3xl font-semibold mb-6">Custom</div>

            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li>Unlimited interactions</li>
              <li>Custom AI sizing & models</li>
              <li>White-labeled widget</li>
              <li>Dedicated support & SLA</li>
              <li>Custom integrations</li>
            </ul>

            <button className="w-full py-2.5 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition">
              Contact sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
