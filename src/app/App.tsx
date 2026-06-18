import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HomePage } from "./components/HomePage";
import { OrderHistoryPage } from "./components/OrderHistoryPage";
import { ProfilePage } from "./components/ProfilePage";

type Tab = "home" | "history" | "profile";

const TABS: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    id: "home",
    label: "点餐",
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        stroke={active ? "#07C160" : "#bbb"}>
        <path d="M12 2a7 7 0 0 0-7 7c0 3 1.5 5.5 4 6.7V18h6v-2.3C17.5 14.5 19 12 19 9a7 7 0 0 0-7-7z" />
        <path d="M9 18v2a3 3 0 0 0 6 0v-2" />
        <path d="M12 2v4M8 5.5l2.5 2.5M16 5.5l-2.5 2.5" />
      </svg>
    ),
  },
  {
    id: "history",
    label: "账单",
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        stroke={active ? "#07C160" : "#bbb"}>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8M8 10h8M8 14h5" />
        <circle cx="17" cy="17" r="3" fill={active ? "#07C160" : "#bbb"} stroke="none" />
        <path d="M17 15.5v1.5l1 1" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "我的",
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        stroke={active ? "#07C160" : "#bbb"}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

const PAGE_MAP: Record<Tab, React.ReactNode> = {
  home: <HomePage />,
  history: <OrderHistoryPage />,
  profile: <ProfilePage />,
};

export default function App() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="size-full bg-[#1a1a2e] flex items-center justify-center">
      {/* Phone Frame */}
      <div
        className="relative bg-[#f5f5f5] overflow-hidden flex flex-col"
        style={{
          width: "min(390px, 100vw)",
          height: "min(844px, 100vh)",
          borderRadius: "min(44px, 0px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
        }}
      >
        {/* Status Bar */}
        <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between shrink-0">
          <span className="text-[12px] font-medium text-[#1a1a1a]">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="#1a1a1a">
              <rect x="0" y="4" width="3" height="8" rx="1" />
              <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" />
              <rect x="9" y="1" width="3" height="11" rx="1" />
              <rect x="13.5" y="0" width="2.5" height="12" rx="1" opacity="0.3" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="#1a1a1a">
              <path d="M8 3a7 7 0 0 1 4.95 2.05l1.06-1.06A8.5 8.5 0 0 0 8 1.5a8.5 8.5 0 0 0-6.01 2.49l1.06 1.06A7 7 0 0 1 8 3z" />
              <path d="M8 5.5a4.5 4.5 0 0 1 3.18 1.32l1.06-1.06A6 6 0 0 0 8 4a6 6 0 0 0-4.24 1.76l1.06 1.06A4.5 4.5 0 0 1 8 5.5z" />
              <circle cx="8" cy="9.5" r="1.5" />
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="w-5.5 h-2.5 rounded-sm border border-[#1a1a1a] flex items-center p-0.5">
                <div className="bg-[#1a1a1a] rounded-xs" style={{ width: "70%", height: "100%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-0 overflow-hidden"
            >
              {PAGE_MAP[tab]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Tab Bar */}
        <div className="bg-white border-t border-[#f0f0f0] shrink-0" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}>
          <div className="flex">
            {TABS.map(({ id, label, icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className="flex-1 flex flex-col items-center pt-2 pb-1 gap-0.5 transition-opacity active:opacity-70"
                >
                  <div className="relative">
                    {icon(active)}
                    {id === "history" && !active && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <span
                    className="text-[10px] font-medium transition-colors"
                    style={{ color: active ? "#07C160" : "#bbb" }}
                  >
                    {label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 w-5 h-0.5 bg-[#07C160] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Home Indicator */}
        <div className="bg-white pb-1 flex justify-center shrink-0">
          <div className="w-28 h-1 bg-[#1a1a1a]/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
