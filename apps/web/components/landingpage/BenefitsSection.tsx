import { benefitsData, BenefitItem } from "constants/benefits";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function BenefitsSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Why Stores Love FitVision
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            FitVision turns fit confidence into higher conversions, fewer
            returns, and increased profit using AI.
          </p>
        </div>

        <div className="flex justify-between">
          <div className="bg-blue-500 relative">
            <Image
              src="/images/landing/benefits.png"
              alt="Benefits"
              width={400}
              height={400}
              className="translate-y-[20%] w-[400px] h-auto object-cover"
            />
          </div>
          {/* Timeline */}
          <div className="relative space-y-8">
            {benefitsData.map((benefit: BenefitItem, index: number) => (
              <div key={index} className="relative">
                {/* Checkmark Icon */}
                <div className="absolute -left-[30px] top-1 flex items-center justify-center w-6 h-6">
                  <CheckCircle className="text-black" size={22} />
                </div>

                {/* Benefit Content */}
                <h3 className="text-base font-semibold mb-1">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
