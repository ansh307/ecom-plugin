import BenefitsSection from "components/landingpage/BenefitsSection";
import FAQSection from "components/landingpage/FAQSection";
import FeatureSection from "components/landingpage/FeatureSection";
import FinalCTASection from "components/landingpage/FinalCTASection";
import Footer from "components/landingpage/Footer";
import Hero from "components/landingpage/Hero";
import HowItWorks from "components/landingpage/HowItWorks";
import ImageSection from "components/landingpage/ImageSection";
import IntegrationSection from "components/landingpage/IntegrationSection";
import LiveWidgetPreview from "components/landingpage/LiveWidgetPreview";
import Navbar from "components/landingpage/Navbar";
import PricingSection from "components/landingpage/PricingSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ImageSection />
      <HowItWorks />
      <FeatureSection />
      <LiveWidgetPreview />
      <BenefitsSection />
      <IntegrationSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
