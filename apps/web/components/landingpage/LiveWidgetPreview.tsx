export default function LiveWidgetPreview() {
  return (
    <section className="py-28 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-6 ">
        {/* Video Placeholder / Demo Space */}
        <div
          className="
          w-full 
          h-[420px] 
          md:h-[500px]
          bg-white 
          rounded-3xl 
          border border-gray-200 
          shadow-lg 
          flex items-center justify-center
        "
        >
          <div className="text-gray-400 text-lg">
            {/* Replace this area with your iframe/video */}
            Video Preview Placeholder
          </div>
        </div>

        <p className="text-lg text-gray-600/80 max-w-2xl  mt-16">
          See how FitVision fits seamlessly into your product pages—delivering
          real-time sizing and smart recommendations.
        </p>
      </div>
    </section>
  );
}
