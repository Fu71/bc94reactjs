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
    <div className="min-h-screen bg-[#0F0A07] text-[#F1F5F9] py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-3">
            <span>👓</span>
            <span>Virtual Try-On Experience</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Phòng Thử Kính Trực Tuyến
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
            Trải nghiệm thử mẫu kính thời trang theo thời gian thực trên người mẫu. Bấm chọn từng mẫu kính bên dưới để xem kết quả tức thì.
          </p>
        </div>

        {/* Model Preview Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 my-8">
          {/* Active Model with Glass Overlay */}
          <div className="relative w-[320px] rounded-3xl bg-[#1A120D] border border-white/10 p-3.5 shadow-2xl">
            <div className="relative overflow-hidden rounded-2xl bg-black">
              <img
                src="./glassesImage/model.jpg"
                alt="Model"
                className="w-full h-[380px] object-cover"
              />

              {/* Glasses Overlay */}
              <img
                src={selectedGlass.url}
                alt="Glasses"
                className="absolute left-1/2 top-[98px] w-[175px] -translate-x-1/2 opacity-90 drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)] transition-all duration-300 pointer-events-none"
              />

              {/* Info Overlay Card */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#160E0A]/95 backdrop-blur-md border-t border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    {selectedGlass.name}
                  </h3>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    ${selectedGlass.price || 30}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {selectedGlass.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Original Clean Model */}
          <div className="relative w-[320px] rounded-3xl bg-[#1A120D] border border-white/5 p-3.5 shadow-xl hidden md:block opacity-75">
            <div className="relative overflow-hidden rounded-2xl bg-black">
              <img
                src="./glassesImage/model.jpg"
                alt="Model Original"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-xs font-semibold text-slate-300 bg-black/75 px-3 py-1 rounded-full border border-white/10">
                  Ảnh người mẫu gốc
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Glasses Selection Tray */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-[#150E0A] p-6 lg:p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">
                Danh sách mẫu kính ({glasses.length})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Nhấp vào từng mẫu để áp dụng trực tiếp lên khuôn mặt
              </p>
            </div>
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
