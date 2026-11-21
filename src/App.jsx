import { useState } from "react";
import ShoppingPhone from "./shopping-phone";
import TryGlasses from "./glasses";

function App() {
  const [activeTab, setActiveTab] = useState("phone");

  return (
    <div className="min-h-screen bg-[#1A0F0A] text-[#F5E6D3]">
      {/* Top Universal Realm Switcher Bar */}
      <nav className="border-b border-[#5C3D2E] bg-[#140B07] px-4 py-2.5 text-xs font-cinzel sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[#CA8A04] text-sm">✦</span>
            <span className="font-bold tracking-wider text-[#CA8A04]">
              QUESTUI PORTFOLIO
            </span>
            <span className="text-[#5C3D2E]">|</span>
            <span className="text-[#BFA98A] font-spectral italic hidden sm:inline">
              ReactJS + Tailwind CSS • QuestUI Design Tokens
            </span>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("phone")}
              className={`px-3.5 py-1.5 rounded-[2px] text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "phone"
                  ? "bg-[#CA8A04] text-[#1A0F0A] font-bold shadow-sm"
                  : "bg-[#2C1A10] text-[#BFA98A] border border-[#5C3D2E] hover:border-[#CA8A04]/50 hover:text-[#F5E6D3]"
              }`}
            >
              📱 Cửa Hàng Điện Thoại
            </button>
            <button
              onClick={() => setActiveTab("glasses")}
              className={`px-3.5 py-1.5 rounded-[2px] text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "glasses"
                  ? "bg-[#CA8A04] text-[#1A0F0A] font-bold shadow-sm"
                  : "bg-[#2C1A10] text-[#BFA98A] border border-[#5C3D2E] hover:border-[#CA8A04]/50 hover:text-[#F5E6D3]"
              }`}
            >
              👓 Phòng Thử Kính Online
            </button>
          </div>
        </div>
      </nav>

      {/* Main View */}
      {activeTab === "phone" ? <ShoppingPhone /> : <TryGlasses />}
    </div>
  );
}

export default App;
