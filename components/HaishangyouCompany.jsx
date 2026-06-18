import { useState } from 'react';
import { DollarSign, Activity, TrendingUp, Users, UserCheck } from 'lucide-react';

export const HaishangyouCompany = ({ 
  haishangyouData, 
  haishangyouChannelSales, 
  haishangyouRevenueStructure,
  haishangyouBusinessRevenue,
  haishangyouShips,
  userRole,
  setActiveTab,
  dimension = 'day',
  setDimension
}) => {
  const dl = dimension === 'day' ? '本日' : dimension === 'month' ? '本月' : '本年';
  const fm = v => Math.round(v).toLocaleString('en-US');

  // 收入结构筛选状态
  const [revenueFilter, setRevenueFilter] = useState('total');
  
  const getRevenueStructureData = () => {
    if (revenueFilter === 'total') return haishangyouRevenueStructure;
    const shipIndex = revenueFilter === 'ship1' ? 0 : revenueFilter === 'ship2' ? 1 : 2;
    const ship = haishangyouShips[shipIndex];
    return [
      { name: '票务收入', value: ship.revenue * 0.58, ratio: 58, color: '#3b82f6', trend: '+12.5%', isUp: true },
      { name: '二销商品收入', value: ship.revenue * 0.22, ratio: 22, color: '#10b981', trend: '+18.2%', isUp: true },
      { name: '甲板观光收入', value: ship.revenue * 0.12, ratio: 12, color: '#f59e0b', trend: '+15.8%', isUp: true },
      { name: '其他收入', value: ship.revenue * 0.08, ratio: 8, color: '#64748b', trend: '+8.5%', isUp: true },
    ];
  };

  // 计算合计
  const revenueSubtotal = getRevenueStructureData().reduce((s, d) => s + d.value, 0);
  // 每条船的渠道小计
  const shipChannelSubtTotals = haishangyouShips.map(ship => ({
    passengers: ship.channels.reduce((s, c) => s + c.passengers, 0),
    revenue: ship.channels.reduce((s, c) => s + c.revenue, 0),
  }));
  // 每条船的游船分项小计（本身只有一条船的合计 = 该船数据）
  const shipBizSubtotals = haishangyouShips.map(ship => ({
    passengers: ship.passengers,
    revenue: ship.revenue,
  }));

  return (
    <div className="space-y-4">
      {/* KPI 数据网格 - 紧凑排版 */}
      <div className="space-y-3">
        {/* 第一排：营业收入 + 总客流 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">总收入（元）</span>
              <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <DollarSign className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{haishangyouData.revenue}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {haishangyouData.revenueTrend}
              </span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">总客流（人次）</span>
              <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Users className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{haishangyouData.visitors}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {haishangyouData.visitorsTrend}
              </span>
            </div>
          </div>
        </div>

        {/* 第二排：收费客流 + 接待客流（无同比） */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">收费客流（人次）</span>
              <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Activity className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{haishangyouData.paidVisitors}</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">接待客流（人次）</span>
              <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <UserCheck className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{haishangyouData.receptionVisitors}</span>
            </div>
          </div>
        </div>

        {/* 第三排：总航次 + 客单价 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">总航次</span>
              <div className="w-5 h-5 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500">
                <Activity className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{haishangyouData.totalTrips}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-cyan-50 text-cyan-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {haishangyouData.totalTripsTrend}
              </span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">客单价</span>
              <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                <DollarSign className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{haishangyouData.avgPrice}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {haishangyouData.avgPriceTrend}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 月度计划达成 - 参照平台总览 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full"></span>
          <h3 className="text-slate-800 text-xs font-bold tracking-wide">{dimension === 'year' ? '年度计划达成' : '月度计划达成'}</h3>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold">{dimension === 'year' ? '年度创值计划（6月）' : '月度创值计划（6月）'}</span>
            <span className="text-slate-700 font-extrabold font-mono text-sm">{Math.round(haishangyouData.rawRevenue * 1.15).toLocaleString('en-US')}</span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>时间进度比 (当前周期已过)</span>
                <span className="font-bold">70%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full transition-all duration-500" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-slate-700 mb-1">
                <span className="font-semibold">实际收入完成率</span>
                <span className="text-emerald-600 font-bold">{((haishangyouData.rawRevenue / (haishangyouData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${((haishangyouData.rawRevenue / (haishangyouData.rawRevenue * 1.15)) * 100).toFixed(1)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === 主营业态收入（3列）=== */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-purple-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">主营业态收入（{dl}）</h3>
          <span className="text-[10px] text-slate-400 ml-auto">
            {revenueFilter === 'total' ? '全部收入' : haishangyouShips[revenueFilter === 'ship1' ? 0 : revenueFilter === 'ship2' ? 1 : 2].name}
          </span>
        </div>

        {/* 标签页筛选 */}
        <div className="flex gap-2 mb-3 p-1 bg-slate-100 rounded-lg">
          <button onClick={() => setRevenueFilter('total')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${revenueFilter === 'total' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>全部收入</button>
          <button onClick={() => setRevenueFilter('ship1')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${revenueFilter === 'ship1' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>浪淘沙号</button>
          <button onClick={() => setRevenueFilter('ship2')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${revenueFilter === 'ship2' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>寻仙2号</button>
          <button onClick={() => setRevenueFilter('ship3')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${revenueFilter === 'ship3' ? 'bg-purple-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>求仙6号</button>
        </div>

        {/* 表头行 - 顺序：业态(35%) -> 收入金额(40%) -> 同比(25%) */}
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">业态</div>
          <div style={{ width: '40%' }} className="text-right pr-4">收入金额</div>
          <div style={{ width: '25%' }} className="text-center">同比</div>
        </div>
        {/* 数据行 */}
        {getRevenueStructureData().map((d, j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-slate-50 rounded whitespace-nowrap overflow-hidden">
            <div style={{ width: '35%' }} className="text-left flex items-center gap-1 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
              <span className="text-slate-700 font-medium truncate">{d.name}</span>
            </div>
            <div style={{ width: '40%' }} className="text-right font-semibold text-slate-800 font-mono truncate pr-4">{fm(d.value)}</div>
            <div style={{ width: '25%' }} className="flex justify-center items-center min-w-0">
              <span className={`inline-block text-center px-1 py-0.5 rounded text-[10px] font-bold truncate ${d.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
            </div>
          </div>
        ))}
        {/* 小计行 */}
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '40%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(revenueSubtotal)}</div>
          <div style={{ width: '25%' }}></div>
        </div>
      </div>

      {/* === 各游船渠道及收入情况 === */}
      {haishangyouShips && haishangyouShips.map((ship, shipIndex) => {
        const chSub = shipChannelSubtTotals[shipIndex];
        return (
          <div key={shipIndex} className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-3.5 bg-cyan-600 rounded-full shrink-0"></span>
              <h3 className="text-slate-800 text-xs font-bold">{ship.name} - 渠道销售情况（{dl}）</h3>
            </div>

            {/* 游船核心指标：仅保留航次和客单价，文字在左数据在右 */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white/60 p-2.5 rounded-xl border border-cyan-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold">航次</span>
                  <span className="text-sm font-black text-slate-800 font-mono">{ship.trips}次</span>
                </div>
              </div>
              <div className="bg-white/60 p-2.5 rounded-xl border border-amber-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold">客单价</span>
                  <span className="text-sm font-black text-amber-700 font-mono">{ship.avgPrice}</span>
                </div>
              </div>
            </div>

            {/* 渠道表格 */}
            <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
              <div style={{ width: '35%' }} className="text-left">渠道</div>
              <div style={{ width: '18%' }} className="text-right">客流量</div>
              <div style={{ width: '27%' }} className="text-right pr-4">收入</div>
              <div style={{ width: '20%' }} className="text-center">同比</div>
            </div>
            {ship.channels.map((channel, ci) => (
              <div key={ci} className="flex items-center w-full text-[11px] py-1.5 hover:bg-cyan-50/30 rounded whitespace-nowrap overflow-hidden">
                <div style={{ width: '35%' }} className="text-left font-medium text-slate-700 truncate">{channel.name}</div>
                <div style={{ width: '18%' }} className="text-right font-mono text-slate-800 font-semibold">{channel.passengers.toLocaleString('en-US')}</div>
                <div style={{ width: '27%' }} className="text-right font-mono text-cyan-700 font-semibold truncate pr-4">{fm(channel.revenue)}</div>
                <div style={{ width: '20%' }} className="flex justify-center items-center min-w-0">
                  <span className={`inline-block text-center px-1 py-0.5 rounded text-[10px] font-bold truncate ${channel.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{channel.trend}</span>
                </div>
              </div>
            ))}
            {/* 小计行 */}
            <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
              <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
              <div style={{ width: '18%' }} className="text-right font-extrabold text-slate-800 font-mono">{chSub.passengers.toLocaleString('en-US')}</div>
              <div style={{ width: '27%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(chSub.revenue)}</div>
              <div style={{ width: '20%' }}></div>
            </div>
          </div>
        );
      })}

      {/* 备注说明 */}
      <div className="bg-amber-50 p-4 rounded-2xl shadow-sm border border-amber-200">
        <div className="flex items-start gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-3.5 bg-amber-600 rounded-full"></span>
            <h3 className="text-slate-800 text-xs font-bold tracking-wide">备注说明</h3>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <p className="text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-amber-700">• 特殊收入说明：</span>
            2025年端午节滨海总收入包括一次性购买浪淘沙船票2000张11万元，一卡通收入8万元。
          </p>
          <p className="text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-amber-700">• 客流统计说明：</span>
            客流量和船票收入未含一次性购买浪淘沙船票的2000人次和收入。
          </p>
        </div>
      </div>

      {userRole === 'admin' && (
        <button 
          onClick={() => setActiveTab('platform')}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl text-xs font-bold transition-all"
        >
          返回平台总览
        </button>
      )}
    </div>
  );
};