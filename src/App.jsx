import { useState } from "react";
import ShoppingPhone from "./shopping-phone";
import TryGlasses from "./glasses";

function App() {
  const [activeTab, setActiveTab] = useState("phone");

  return (
    <div className="min-h-screen bg-[#0F0A07] text-[#F1F5F9]">
      {/* Top Portfolio Tab Switcher */}
      <nav className="border-b border-white/5 bg-[#080503] px-4 py-2 text-xs sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-300">
              TechZone E-Commerce Portfolio
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              React 19 & Tailwind CSS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("phone")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "phone"
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              📱 Cửa Hàng Điện Thoại
            </button>
            <button
              onClick={() => setActiveTab("glasses")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "glasses"
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              👓 Thử Kính Trực Tuyến
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
