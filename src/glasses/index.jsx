import { useState } from "react";
import data from "./data.json";
import Glasses from "./glasses";

export default function TryGlasses() {
  const [glasses] = useState(data);
  const [selectedGlass, setSelectedGlass] = useState(data[0]);

  const handleChangeGlass = (glass) => {
    setSelectedGlass(glass);
  };

  return (
    <div className="min-h-screen bg-[#1A0F0A] text-[#F5E6D3] py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#CA8A04]/20 border border-[#CA8A04]/30 text-xs font-cinzel text-[#CA8A04] uppercase tracking-wider mb-2">
            ✦ ARCANE SPECTACLES ✦
          </div>
          <h1 className="font-cinzel text-3xl lg:text-4xl font-bold tracking-wider text-[#F5E6D3]">
            Phòng Thử Kính Thần Thoại Online
          </h1>
          <p className="font-spectral text-[#BFA98A] text-sm mt-2 max-w-xl mx-auto italic">
            Trải nghiệm thử các mẫu kính ma thuật theo thời gian thực. Hãy bấm chọn từng mẫu kính bên dưới để chiêm ngưỡng hiệu ứng hiển thị.
          </p>
        </div>

        {/* Preview Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 my-8">
          {/* Left Model: With active glasses and spec card */}
          <div className="relative w-[300px] rounded-[4px] border border-[#5C3D2E] bg-[#2C1A10] p-3 quest-glow-md">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#CA8A04]" />
            <div className="relative overflow-hidden rounded-[2px] bg-[#1A0F0A]">
              <img
                src="./glassesImage/model.jpg"
                alt="model"
                className="w-full h-[360px] object-cover"
              />

              {/* Glasses Overlay */}
              <img
                src={selectedGlass.url}
                alt="glasses"
                className="absolute left-1/2 top-[92px] w-[175px] -translate-x-1/2 opacity-85 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] transition-all duration-300 pointer-events-none"
              />

              {/* Info Overlay Card */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#2C1A10]/95 backdrop-blur-md border-t border-[#CA8A04]/60 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel text-base font-bold text-[#CA8A04]">
                    {selectedGlass.name}
                  </h3>
                  <span className="font-fira text-xs font-semibold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-1.5 py-0.5 rounded-[2px]">
                    ${selectedGlass.price || 30}
                  </span>
                </div>
                <p className="font-spectral text-xs text-[#F5E6D3] mt-1.5 line-clamp-2 leading-relaxed">
                  {selectedGlass.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Model: Original clean comparison */}
          <div className="relative w-[300px] rounded-[4px] border border-[#5C3D2E] bg-[#2C1A10] p-3 quest-glow-sm hidden md:block">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#5C3D2E]" />
            <div className="relative overflow-hidden rounded-[2px] bg-[#1A0F0A]">
              <img
                src="./glassesImage/model.jpg"
                alt="model original"
                className="w-full h-[360px] object-cover opacity-80"
              />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="font-cinzel text-xs text-[#BFA98A] uppercase tracking-wider bg-[#1A0F0A]/90 px-3 py-1 rounded-[2px] border border-[#5C3D2E]">
                  Ảnh Mẫu Gốc (Original)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Glasses Selection Tray */}
        <div className="mt-12 rounded-[4px] border border-[#5C3D2E] bg-[#2C1A10] p-6 lg:p-8 quest-glow relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#CA8A04]" />
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-cinzel text-lg font-bold text-[#F5E6D3] flex items-center gap-2">
              <span>👓</span> Khay Trưng Bày Kính ({glasses.length} Mẫu)
            </h3>
            <span className="text-xs font-spectral text-[#BFA98A] italic">
              Click vào mẫu kính để thử ngay
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {glasses.map((glass) => (
              <Glasses
                key={glass.id}
                glassProps={glass}
                onHandleChangeGlass={handleChangeGlass}
                isSelected={selectedGlass.id === glass.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
