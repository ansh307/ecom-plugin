import { featuresData } from "constants/features";

export default function FeatureSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Powerful Features Built for Growth
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything your store needs to deliver accurate sizing, personalized
            recommendations, and seamless integration.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] ">
          {/* Card 1 - Large */}
          <div className="md:col-span-2 row-span-2 p-10 border border-gray-200 rounded-3xl  hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">
              AI-Powered Size Recommendations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Precision sizing tailored to each customer using machine learning
              and product attributes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 border border-gray-200 rounded-3xl bg-white hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              Smart Product Suggestions
            </h3>
            <p className="text-gray-600">{featuresData[1]?.desc}</p>
          </div>

          {/* Card 3 */}
          <div className="p-8 row-span-2 border border-gray-200 rounded-3xl bg-white hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              Customizable Widget UI
            </h3>
            <p className="text-gray-600">{featuresData[4]?.desc}</p>
          </div>

          {/* Card 4 - Wide */}
          <div className="md:col-span-2 p-10 border border-gray-200 rounded-3xl hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">
              Insightful Analytics Dashboard
            </h3>
            <p className="text-gray-600">{featuresData[3]?.desc}</p>
          </div>

          {/* Card 5 */}
          <div className=" p-8 border border-gray-200 rounded-3xl bg-white hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">1-Line Installation</h3>
            <p className="text-gray-600">{featuresData[2]?.desc}</p>
          </div>

          {/* Card 6 */}
          <div className="col-span-2 p-8 border border-gray-200 rounded-3xl bg-white hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              Blazing-Fast Performance
            </h3>
            <p className="text-gray-600">{featuresData[5]?.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
