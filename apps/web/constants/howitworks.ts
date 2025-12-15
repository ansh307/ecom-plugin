// constants/howitworks.ts

export type HowItWorksStep = {
  number: string;
  title: string;
  desc: string;
};

export const howitworksData: HowItWorksStep[] = [
  {
    number: "01",
    title: "Install the Widget",
    desc: "Add FitVision to your store in minutes using a lightweight script. No redesigns or complex setup required.",
  },
  {
    number: "02",
    title: "AI Understands Fit & Style",
    desc: "Our AI analyzes brand sizing, customer inputs, and product images to power virtual try-on and accurate size guidance.",
  },
  {
    number: "03",
    title: "Boost Confidence & Conversions",
    desc: "Shoppers see how products look, get the right size, and receive smart outfit recommendations — leading to fewer returns and more sales.",
  },
];
