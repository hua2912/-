import { useState } from "react";
import {
  ChevronRight, Wallet, Star, Gift, Bell, HelpCircle, LogOut, Shield,
  CreditCard, Award, Settings
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MenuRow {
  icon: React.ReactNode;
  label: string;
  value?: string;
  accent?: boolean;
}

const MENU_GROUPS: { title?: string; rows: MenuRow[] }[] = [
  {
    rows: [
      { icon: <Wallet size={18} className="text-[#07C160]" />, label: "钱包余额", value: "¥68.50" },
      { icon: <CreditCard size={18} className="text-[#1677ff]" />, label: "充值记录" },
      { icon: <Star size={18} className="text-[#fa8c16]" />, label: "积分", value: "1,280 pts" },
    ],
  },
  {
    title: "优惠",
    rows: [
      { icon: <Gift size={18} className="text-[#f5222d]" />, label: "我的优惠券", value: "3张可用" },
      { icon: <Award size={18} className="text-[#722ed1]" />, label: "会员特权" },
    ],
  },
  {
    title: "设置",
    rows: [
      { icon: <Bell size={18} className="text-[#fa8c16]" />, label: "消息通知" },
      { icon: <Shield size={18} className="text-[#1677ff]" />, label: "隐私设置" },
      { icon: <HelpCircle size={18} className="text-[#07C160]" />, label: "帮助与反馈" },
      { icon: <Settings size={18} className="text-[#999]" />, label: "关于我们" },
    ],
  },
];

const LEVELS = [
  { label: "普通会员", min: 0, max: 500, color: "#999" },
  { label: "银卡会员", min: 500, max: 2000, color: "#8c8c8c" },
  { label: "金卡会员", min: 2000, max: 5000, color: "#fa8c16" },
  { label: "铂金会员", min: 5000, max: 10000, color: "#722ed1" },
];

const currentPoints = 1280;
const currentLevel = LEVELS[1];
const progress = ((currentPoints - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;

export function ProfilePage() {
  const [walletVisible, setWalletVisible] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f5f5f5] overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-[#07C160] px-4 pt-6 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-14 -translate-x-8" />

        {/* User Info */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0">
            <span className="text-3xl">🧑‍🎓</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white text-lg font-medium">张同学</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full text-white border border-white/40"
                style={{ color: currentLevel.color === "#999" ? "white" : currentLevel.color }}
              >
                {currentLevel.label}
              </span>
            </div>
            <p className="text-white/70 text-sm mt-0.5">学号 · 20221234567</p>
            <p className="text-white/70 text-xs mt-0.5">计算机科学与技术学院 · 2022级</p>
          </div>
        </div>
      </div>

      {/* Wallet Card (floating) */}
      <div className="mx-3 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#666]">账户余额</span>
            <button
              onClick={() => setWalletVisible(!walletVisible)}
              className="text-xs text-[#07C160]"
            >
              {walletVisible ? "隐藏" : "查看"}
            </button>
          </div>

          <div className="flex items-end gap-1 mb-3">
            <span className="text-[#1a1a1a] text-sm">¥</span>
            <span className="text-[#1a1a1a] text-3xl font-medium">
              {walletVisible ? "68.50" : "••••"}
            </span>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-[#07C160] text-white py-2 rounded-xl text-sm font-medium">
              充值
            </button>
            <button className="flex-1 border border-[#07C160] text-[#07C160] py-2 rounded-xl text-sm font-medium">
              明细
            </button>
          </div>
        </div>
      </div>

      {/* Points & Level */}
      <div className="mx-3 mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#fa8c16] fill-[#fa8c16]" />
              <span className="text-sm font-medium text-[#1a1a1a]">我的积分</span>
            </div>
            <span className="text-[#07C160] font-medium">{currentPoints.toLocaleString()} pts</span>
          </div>
          <div className="w-full bg-[#f0f0f0] rounded-full h-1.5 mb-1.5">
            <div
              className="bg-gradient-to-r from-[#07C160] to-[#05a050] h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#999]">
            <span>{currentLevel.label}（{currentPoints.toLocaleString()}）</span>
            <span>距{LEVELS[2].label}还差 {(currentLevel.max - currentPoints).toLocaleString()} pts</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mx-3 mt-3">
        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-[#f0f0f0]">
            {[
              { label: "累计消费", value: "¥1,286" },
              { label: "消费次数", value: "87次" },
              { label: "收藏菜品", value: "12个" },
            ].map((stat) => (
              <div key={stat.label} className="px-2 text-center">
                <p className="text-[#1a1a1a] font-medium">{stat.value}</p>
                <p className="text-xs text-[#999] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Groups */}
      <div className="px-3 mt-3 space-y-3 pb-8">
        {MENU_GROUPS.map((group, gi) => (
          <div key={gi} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {group.title && (
              <div className="px-4 pt-3 pb-0">
                <p className="text-xs text-[#999] font-medium">{group.title}</p>
              </div>
            )}
            {group.rows.map((row, ri) => (
              <button
                key={ri}
                className="w-full flex items-center px-4 py-3.5 gap-3 active:bg-[#f8f8f8] transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-[#f5f5f5] flex items-center justify-center shrink-0">
                  {row.icon}
                </div>
                <span className="flex-1 text-sm text-[#1a1a1a] text-left">{row.label}</span>
                {row.value && (
                  <span className="text-sm text-[#07C160] mr-1">{row.value}</span>
                )}
                <ChevronRight size={16} className="text-[#ccc]" />
              </button>
            ))}
          </div>
        ))}

        {/* Logout */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <button className="w-full flex items-center justify-center px-4 py-3.5 gap-2 text-[#f5222d]">
            <LogOut size={16} />
            <span className="text-sm font-medium">退出登录</span>
          </button>
        </div>
      </div>
    </div>
  );
}
