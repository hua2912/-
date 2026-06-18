import { useState } from "react";
import { ChevronRight, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";

type OrderStatus = "completed" | "pending" | "cancelled";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  time: string;
  mode: "堂食" | "打包";
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  tableNo?: string;
  canteen: string;
}

const ORDERS: Order[] = [
  {
    id: "NO20241201001",
    date: "今天",
    time: "12:03",
    mode: "堂食",
    status: "completed",
    canteen: "东区学生食堂",
    tableNo: "A-12",
    items: [
      { name: "扬州炒饭", qty: 1, price: 12 },
      { name: "鲜肉小笼包", qty: 1, price: 10 },
    ],
    total: 22,
  },
  {
    id: "NO20241130002",
    date: "昨天",
    time: "18:45",
    mode: "打包",
    status: "completed",
    canteen: "东区学生食堂",
    items: [
      { name: "牛肉拉面", qty: 1, price: 16 },
      { name: "猪肉水饺", qty: 1, price: 11 },
    ],
    total: 27.5,
  },
  {
    id: "NO20241129003",
    date: "11月29日",
    time: "11:30",
    mode: "堂食",
    status: "completed",
    canteen: "西区学生食堂",
    tableNo: "B-05",
    items: [
      { name: "红烧肉盖饭", qty: 1, price: 15 },
      { name: "骨汤细面", qty: 1, price: 13 },
    ],
    total: 28,
  },
  {
    id: "NO20241128004",
    date: "11月28日",
    time: "19:10",
    mode: "堂食",
    status: "cancelled",
    canteen: "东区学生食堂",
    tableNo: "C-08",
    items: [
      { name: "番茄鸡蛋面", qty: 2, price: 12 },
    ],
    total: 24,
  },
  {
    id: "NO20241127005",
    date: "11月27日",
    time: "12:22",
    mode: "打包",
    status: "completed",
    canteen: "南区学生食堂",
    items: [
      { name: "虾仁炒饭", qty: 1, price: 18 },
      { name: "鲜肉小笼包", qty: 2, price: 10 },
    ],
    total: 38.5,
  },
];

const STATUS_MAP: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  completed: { label: "已完成", color: "#07C160", icon: <CheckCircle size={13} /> },
  pending: { label: "进行中", color: "#fa8c16", icon: <Clock size={13} /> },
  cancelled: { label: "已取消", color: "#999", icon: <XCircle size={13} /> },
};

type FilterTab = "全部" | "堂食" | "打包";
const TABS: FilterTab[] = ["全部", "堂食", "打包"];

export function OrderHistoryPage() {
  const [tab, setTab] = useState<FilterTab>("全部");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = ORDERS.filter(
    (o) => tab === "全部" || o.mode === tab
  );

  const totalSpent = ORDERS.filter((o) => o.status === "completed")
    .reduce((s, o) => s + o.total, 0);

  return (
    <div className="flex flex-col h-full bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-0 shadow-sm">
        <h2 className="text-[17px] font-medium text-[#1a1a1a] mb-3">历史账单</h2>

        {/* Stats */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-[#f0faf5] rounded-2xl p-3 text-center">
            <p className="text-[#07C160] text-xl font-medium">¥{totalSpent.toFixed(2)}</p>
            <p className="text-xs text-[#999] mt-0.5">本月消费</p>
          </div>
          <div className="flex-1 bg-[#f5f5f5] rounded-2xl p-3 text-center">
            <p className="text-[#1a1a1a] text-xl font-medium">{ORDERS.filter(o => o.status === "completed").length}</p>
            <p className="text-xs text-[#999] mt-0.5">完成订单</p>
          </div>
          <div className="flex-1 bg-[#f5f5f5] rounded-2xl p-3 text-center">
            <p className="text-[#1a1a1a] text-xl font-medium">{(totalSpent / Math.max(1, ORDERS.filter(o => o.status === "completed").length)).toFixed(1)}</p>
            <p className="text-xs text-[#999] mt-0.5">人均消费</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 border-b border-[#f0f0f0]">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2.5 text-sm transition-all ${
                tab === t
                  ? "text-[#07C160] border-b-2 border-[#07C160] font-medium"
                  : "text-[#666]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-6 space-y-2.5">
        {filtered.map((order) => {
          const status = STATUS_MAP[order.status];
          const isExpanded = expandedId === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Order Header */}
              <button
                className="w-full px-4 pt-3.5 pb-3 flex items-start justify-between"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-medium text-[#1a1a1a]">{order.canteen}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.mode === "堂食" ? "bg-[#e8f9f0] text-[#07C160]" : "bg-[#fff7e6] text-[#fa8c16]"
                    }`}>
                      {order.mode}
                      {order.tableNo && ` · ${order.tableNo}`}
                    </span>
                  </div>
                  <p className="text-xs text-[#999]">{order.date} {order.time} · {order.id}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span style={{ color: status.color }} className="flex items-center gap-0.5 text-xs">
                    {status.icon}
                    {status.label}
                  </span>
                  <ChevronRight
                    size={15}
                    className={`text-[#ccc] transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                  />
                </div>
              </button>

              {/* Items Preview */}
              <div className="px-4 pb-3 flex items-center justify-between">
                <p className="text-sm text-[#666]">
                  {order.items.map((i) => `${i.name}×${i.qty}`).join("、")}
                </p>
                <p className="text-[15px] font-medium text-[#1a1a1a] shrink-0 ml-2">
                  ¥{order.total.toFixed(2)}
                </p>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="border-t border-[#f5f5f5] px-4 py-3 space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-[#666]">{item.name} × {item.qty}</span>
                      <span className="text-[#1a1a1a]">¥{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm pt-1 border-t border-[#f0f0f0]">
                    <span className="text-[#999]">打包费</span>
                    <span className="text-[#999]">{order.mode === "打包" ? `¥${(order.items.length * 0.5).toFixed(2)}` : "¥0.00"}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-[#1a1a1a]">合计</span>
                    <span className="text-[#07C160]">¥{order.total.toFixed(2)}</span>
                  </div>

                  {order.status === "completed" && (
                    <button className="mt-2 w-full border border-[#07C160] text-[#07C160] py-2 rounded-xl text-sm flex items-center justify-center gap-1.5">
                      <RefreshCw size={14} />
                      再来一单
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
