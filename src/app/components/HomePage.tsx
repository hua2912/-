import { useState } from "react";
import { ShoppingCart, Plus, Minus, Search, ChevronDown, MapPin, Clock, Check } from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

type DineMode = "dine-in" | "takeout";

interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  category: string;
  sales: number;
}

interface CartItem extends MenuItem {
  qty: number;
}

interface Canteen {
  id: string;
  name: string;
  floors: string;
  hours: string;
  tag: string;
  tagColor: string;
}

const CANTEENS: Canteen[] = [
  { id: "n1", name: "北1楼食堂", floors: "1-3层", hours: "07:00 - 20:30", tag: "人气最旺", tagColor: "#f5222d" },
  { id: "n2", name: "北2楼食堂", floors: "1-2层", hours: "07:30 - 20:00", tag: "特色面食", tagColor: "#fa8c16" },
  { id: "s1", name: "南1楼食堂", floors: "1-4层", hours: "06:30 - 21:00", tag: "品类最全", tagColor: "#07C160" },
  { id: "s2", name: "南2楼食堂", floors: "1-2层", hours: "08:00 - 19:30", tag: "实惠优选", tagColor: "#1677ff" },
];

const ALL_MENUS: Record<string, MenuItem[]> = {
  n1: [
    { id: 1, name: "扬州炒饭", desc: "精选东北大米，配料丰富香气四溢", price: 12, img: "https://images.unsplash.com/photo-1578160112054-954a67602b88?w=200&h=200&fit=crop&auto=format", category: "主食", sales: 328 },
    { id: 2, name: "红烧肉盖饭", desc: "软烂入味，五花肉配米饭，经典搭配", price: 15, img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop&auto=format", category: "主食", sales: 256 },
    { id: 3, name: "虾仁炒饭", desc: "新鲜虾仁，蛋炒饭打底，鲜香弹牙", price: 18, img: "https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?w=200&h=200&fit=crop&auto=format", category: "主食", sales: 189 },
    { id: 4, name: "牛肉拉面", desc: "手工拉面，汤底浓郁，牛肉片厚实", price: 16, img: "https://images.unsplash.com/flagged/photo-1556742524-750f2ab99913?w=200&h=200&fit=crop&auto=format", category: "面食", sales: 412 },
    { id: 5, name: "番茄鸡蛋面", desc: "经典搭配，酸甜开胃，汤汁鲜美", price: 12, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop&auto=format", category: "面食", sales: 298 },
    { id: 7, name: "鲜肉小笼包", desc: "现蒸现卖，皮薄汁多，肉馅鲜美", price: 10, img: "https://images.unsplash.com/photo-1545809278-56c8739d74e1?w=200&h=200&fit=crop&auto=format", category: "点心", sales: 521 },
    { id: 8, name: "猪肉水饺", desc: "手工现包，猪肉大葱馅，正宗口味", price: 11, img: "https://images.unsplash.com/photo-1518983546435-91f8b87fe561?w=200&h=200&fit=crop&auto=format", category: "点心", sales: 389 },
  ],
  n2: [
    { id: 11, name: "兰州拉面", desc: "正宗兰州风味，汤清肉嫩，面条劲道", price: 14, img: "https://images.unsplash.com/photo-1631709497146-a239ef373cf1?w=200&h=200&fit=crop&auto=format", category: "面食", sales: 501 },
    { id: 12, name: "骨汤细面", desc: "熬制6小时骨汤，面条柔滑爽口", price: 13, img: "https://images.unsplash.com/photo-1600490036275-35f5f1656861?w=200&h=200&fit=crop&auto=format", category: "面食", sales: 275 },
    { id: 13, name: "刀削面", desc: "现削现煮，口感筋道，浇头丰富", price: 14, img: "https://images.unsplash.com/photo-1627900440398-5db32dba8db1?w=200&h=200&fit=crop&auto=format", category: "面食", sales: 330 },
    { id: 14, name: "扬州炒饭", desc: "精选东北大米，配料丰富香气四溢", price: 11, img: "https://images.unsplash.com/photo-1578160112054-954a67602b88?w=200&h=200&fit=crop&auto=format", category: "主食", sales: 180 },
    { id: 15, name: "猪肉水饺", desc: "手工现包，猪肉大葱馅，正宗口味", price: 10, img: "https://images.unsplash.com/photo-1518983546435-91f8b87fe561?w=200&h=200&fit=crop&auto=format", category: "点心", sales: 290 },
    { id: 16, name: "小笼包", desc: "现蒸现卖，皮薄汁多，肉馅鲜美", price: 9, img: "https://images.unsplash.com/photo-1545809278-56c8739d74e1?w=200&h=200&fit=crop&auto=format", category: "点心", sales: 445 },
  ],
  s1: [
    { id: 21, name: "红烧肉盖饭", desc: "软烂入味，五花肉配米饭，经典搭配", price: 14, img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop&auto=format", category: "主食", sales: 390 },
    { id: 22, name: "虾仁炒饭", desc: "新鲜虾仁，蛋炒饭打底，鲜香弹牙", price: 17, img: "https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?w=200&h=200&fit=crop&auto=format", category: "主食", sales: 215 },
    { id: 23, name: "宫保鸡丁饭", desc: "花生米搭配嫩滑鸡丁，微辣鲜香", price: 16, img: "https://images.unsplash.com/photo-1612755637313-9517f17d84b5?w=200&h=200&fit=crop&auto=format", category: "主食", sales: 460 },
    { id: 24, name: "牛肉拉面", desc: "手工拉面，汤底浓郁，牛肉片厚实", price: 15, img: "https://images.unsplash.com/flagged/photo-1556742524-750f2ab99913?w=200&h=200&fit=crop&auto=format", category: "面食", sales: 380 },
    { id: 25, name: "番茄鸡蛋面", desc: "经典搭配，酸甜开胃，汤汁鲜美", price: 11, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop&auto=format", category: "面食", sales: 310 },
    { id: 26, name: "鲜肉小笼包", desc: "现蒸现卖，皮薄汁多，肉馅鲜美", price: 10, img: "https://images.unsplash.com/photo-1545809278-56c8739d74e1?w=200&h=200&fit=crop&auto=format", category: "点心", sales: 498 },
    { id: 27, name: "水饺", desc: "手工现包，猪肉大葱馅，正宗口味", price: 10, img: "https://images.unsplash.com/photo-1518983546435-91f8b87fe561?w=200&h=200&fit=crop&auto=format", category: "点心", sales: 340 },
  ],
  s2: [
    { id: 31, name: "扬州炒饭", desc: "精选东北大米，配料丰富香气四溢", price: 10, img: "https://images.unsplash.com/photo-1578160112054-954a67602b88?w=200&h=200&fit=crop&auto=format", category: "主食", sales: 280 },
    { id: 32, name: "红烧肉盖饭", desc: "软烂入味，五花肉配米饭，经典搭配", price: 12, img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop&auto=format", category: "主食", sales: 210 },
    { id: 33, name: "骨汤细面", desc: "熬制6小时骨汤，面条柔滑爽口", price: 11, img: "https://images.unsplash.com/photo-1631709497146-a239ef373cf1?w=200&h=200&fit=crop&auto=format", category: "面食", sales: 195 },
    { id: 34, name: "番茄鸡蛋面", desc: "经典搭配，酸甜开胃，汤汁鲜美", price: 10, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop&auto=format", category: "面食", sales: 240 },
    { id: 35, name: "猪肉水饺", desc: "手工现包，猪肉大葱馅，正宗口味", price: 9, img: "https://images.unsplash.com/photo-1518983546435-91f8b87fe561?w=200&h=200&fit=crop&auto=format", category: "点心", sales: 350 },
  ],
};

const CATEGORIES = ["全部", "主食", "面食", "点心"];

export function HomePage() {
  const [canteenId, setCanteenId] = useState("n1");
  const [canteenPickerOpen, setCanteenPickerOpen] = useState(false);
  const [mode, setMode] = useState<DineMode>("dine-in");
  const [category, setCategory] = useState("全部");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const currentCanteen = CANTEENS.find((c) => c.id === canteenId)!;
  const MENU = ALL_MENUS[canteenId] ?? [];

  const filtered = MENU.filter(
    (m) =>
      (category === "全部" || m.category === category) &&
      (searchText === "" || m.name.includes(searchText) || m.desc.includes(searchText))
  );

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

  function selectCanteen(id: string) {
    if (id !== canteenId) {
      setCanteenId(id);
      setCart([]);
      setCategory("全部");
      setSearchText("");
    }
    setCanteenPickerOpen(false);
  }

  function addToCart(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });
  }

  function getQty(id: number) {
    return cart.find((c) => c.id === id)?.qty ?? 0;
  }

  return (
    <div className="flex flex-col h-full bg-[#f5f5f5] relative">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-0 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          {/* Canteen Selector */}
          <button
            onClick={() => setCanteenPickerOpen(true)}
            className="flex items-center gap-1 active:opacity-70 transition-opacity"
          >
            <div>
              <p className="text-xs text-[#999] text-left">当前食堂</p>
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-medium text-[#1a1a1a]">{currentCanteen.name}</span>
                <motion.div
                  animate={{ rotate: canteenPickerOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={15} className="text-[#07C160]" />
                </motion.div>
              </div>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: currentCanteen.tagColor + "18", color: currentCanteen.tagColor }}
            >
              {currentCanteen.tag}
            </span>
            <div className="w-8 h-8 rounded-full bg-[#f0faf5] flex items-center justify-center">
              <span className="text-sm">🔔</span>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-[#f5f5f5] rounded-full p-1 mb-3">
          {(["dine-in", "takeout"] as DineMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-1.5 rounded-full text-sm transition-all duration-200 ${
                mode === m ? "bg-[#07C160] text-white shadow-sm" : "text-[#666]"
              }`}
            >
              {m === "dine-in" ? "堂食" : "打包"}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-[#f5f5f5] rounded-full px-3 py-2 mb-3 gap-2">
          <Search size={15} className="text-[#999] shrink-0" />
          <input
            type="text"
            placeholder={`搜索${currentCanteen.name}菜品...`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent flex-1 text-sm outline-none text-[#333] placeholder:text-[#bbb]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 text-sm pb-1 transition-all ${
                category === cat
                  ? "text-[#07C160] border-b-2 border-[#07C160] font-medium"
                  : "text-[#666]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mode / Info Banner */}
      {mode === "takeout" ? (
        <div className="bg-[#fff7e6] px-4 py-2 flex items-center gap-2">
          <span className="text-sm">📦</span>
          <span className="text-xs text-[#fa8c16]">打包模式：另收打包费 ¥0.5/份</span>
        </div>
      ) : (
        <div className="bg-[#f0faf5] px-4 py-2 flex items-center gap-1 text-xs text-[#07C160]">
          <Clock size={12} />
          <span>{currentCanteen.hours}</span>
        </div>
      )}

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto pb-24 px-3 pt-3 space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#bbb]">
            <span className="text-4xl mb-2">🍽️</span>
            <p className="text-sm">暂无相关菜品</p>
          </div>
        ) : (
          filtered.map((item) => {
            const qty = getQty(item.id);
            return (
              <div key={item.id} className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover bg-[#f5f5f5] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-[#1a1a1a] truncate">{item.name}</p>
                  <p className="text-xs text-[#999] mt-0.5 line-clamp-2">{item.desc}</p>
                  <p className="text-xs text-[#bbb] mt-1">月售 {item.sales} 份</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[#07C160] font-medium">
                      <span className="text-xs">¥</span>
                      <span className="text-lg">{item.price}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <AnimatePresence>
                        {qty > 0 && (
                          <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => removeFromCart(item.id)}
                            className="w-7 h-7 rounded-full border-2 border-[#07C160] flex items-center justify-center text-[#07C160]"
                          >
                            <Minus size={14} />
                          </motion.button>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {qty > 0 && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-sm font-medium text-[#1a1a1a] min-w-[16px] text-center"
                          >
                            {qty}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 rounded-full bg-[#07C160] flex items-center justify-center text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Bar */}
      <AnimatePresence>
        {totalQty > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 pb-safe"
          >
            <div className="mx-3 mb-3 bg-[#1a1a1a] rounded-2xl flex items-center px-3 py-2.5 shadow-lg">
              <button
                onClick={() => setCartOpen(true)}
                className="relative w-12 h-12 bg-[#07C160] rounded-xl flex items-center justify-center mr-3"
              >
                <ShoppingCart size={22} className="text-white" />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-medium">
                  {totalQty}
                </span>
              </button>
              <div className="flex-1">
                <p className="text-white font-medium">
                  <span className="text-xs">¥</span>
                  <span className="text-xl">{totalPrice.toFixed(2)}</span>
                </p>
                <p className="text-[#666] text-xs">{currentCanteen.name}</p>
              </div>
              <button className="bg-[#07C160] text-white px-5 py-2.5 rounded-xl text-sm font-medium">
                去结算
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canteen Picker Sheet */}
      <AnimatePresence>
        {canteenPickerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCanteenPickerOpen(false)}
              className="absolute inset-0 bg-black/50 z-10"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-20"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-[#e0e0e0] rounded-full" />
              </div>

              <div className="px-4 pb-2 pt-1">
                <h3 className="text-[16px] font-medium text-[#1a1a1a] mb-4">选择食堂</h3>
                <div className="space-y-2.5 pb-6">
                  {CANTEENS.map((c) => {
                    const isActive = c.id === canteenId;
                    return (
                      <button
                        key={c.id}
                        onClick={() => selectCanteen(c.id)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
                          isActive ? "bg-[#f0faf5] border border-[#07C160]/30" : "bg-[#f8f8f8]"
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                          style={{ backgroundColor: c.tagColor + "18" }}
                        >
                          🏫
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className={`text-[15px] font-medium ${isActive ? "text-[#07C160]" : "text-[#1a1a1a]"}`}>
                              {c.name}
                            </span>
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-full"
                              style={{ backgroundColor: c.tagColor + "18", color: c.tagColor }}
                            >
                              {c.tag}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-[#999] flex items-center gap-0.5">
                              <MapPin size={11} />
                              {c.floors}
                            </span>
                            <span className="text-xs text-[#999] flex items-center gap-0.5">
                              <Clock size={11} />
                              {c.hours}
                            </span>
                          </div>
                        </div>

                        {isActive && (
                          <Check size={18} className="text-[#07C160] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black/50 z-10"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-20 max-h-[70%] flex flex-col"
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#f0f0f0]">
                <div>
                  <span className="font-medium text-[#1a1a1a]">购物车</span>
                  <span className="text-xs text-[#999] ml-2">{currentCanteen.name}</span>
                </div>
                <button onClick={() => { setCart([]); setCartOpen(false); }} className="text-xs text-[#999]">清空</button>
              </div>
              <div className="overflow-y-auto flex-1 px-4 py-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center py-3 border-b border-[#f8f8f8] gap-3">
                    <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1a1a1a]">{item.name}</p>
                      <p className="text-[#07C160] text-sm mt-0.5">¥{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-full border border-[#07C160] flex items-center justify-center text-[#07C160]">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                      <button onClick={() => addToCart(item)} className="w-6 h-6 rounded-full bg-[#07C160] flex items-center justify-center text-white">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-4 border-t border-[#f0f0f0]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-[#666]">合计</span>
                  <span className="text-[#07C160] font-medium text-lg">¥{totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-[#07C160] text-white py-3 rounded-xl font-medium">
                  去结算（{totalQty}件）
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
