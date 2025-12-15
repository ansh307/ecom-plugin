import { howitworksData, HowItWorksStep } from "constants/howitworks";
import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="pt-24 pb-20 bg-white ">
      <div className="max-w-6xl mx-auto px-6 text-center ">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          How FitVision Works
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-20">
          A single AI widget that lets shoppers try products, find the perfect
          size, and discover better outfits — instantly.
        </p>

        {/* Steps */}
        {/* <div className="grid md:grid-cols-3 gap-12 ">
          {howitworksData.map((step: HowItWorksStep, index: number) => (
            <div
              key={index}
              className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition shadow-sm bg-white"
            >
              <div className="text-5xl font-bold text-gray-300 mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div> */}

        <div className="flex flex-col text-left relative">
          <div className="flex justify-end mr-20 z-10">
            <div className="flex flex-col p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition shadow-sm bg-white relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-black/5 to-transparent opacity-0 hover:opacity-100 transition" />

              <span className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-200 text-gray-500 text-sm font-semibold">
                1
              </span>

              <h3 className="text-2xl font-semibold mb-4">
                {howitworksData[0]?.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-80">
                {howitworksData[0]?.desc}
              </p>
            </div>
          </div>
          <div className="flex ml-20 z-10">
            <div className="flex flex-col p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition shadow-sm bg-white relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-black/5 to-transparent opacity-0 hover:opacity-100 transition" />

              <span className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-200 text-gray-500 text-sm font-semibold ">
                2
              </span>

              <h3 className="text-2xl font-semibold mb-4">
                {howitworksData[1]?.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-80">
                {howitworksData[1]?.desc}
              </p>
            </div>
          </div>
          <div className="flex justify-end mr-20 z-10">
            <div className="flex flex-col p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition shadow-sm bg-white relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-black/5 to-transparent opacity-0 hover:opacity-100 transition" />

              <span className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gray-200 text-gray-500 text-sm font-semibold ">
                3
              </span>

              <h3 className="text-2xl font-semibold mb-4">
                {howitworksData[2]?.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-80">
                {howitworksData[2]?.desc}
              </p>
            </div>
          </div>

          <Image
            src="/images/landing/feature.svg"
            alt="Feature"
            width={700}
            height={700}
            className="mx-auto absolute left-1/2 transform top-10 -translate-x-1/2 opacity-10 pointer-events-none select-none"
          />
        </div>
      </div>
    </section>
  );
}
