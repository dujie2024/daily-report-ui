import { useState } from 'react';
import { DollarSign, Activity, TrendingUp, ThumbsUp } from 'lucide-react';

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
      {/* 海上游头部信息卡 - 标题与日期切换同行 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800">海上游经营看板</h2>
          <div className="bg-slate-100 p-0.5 rounded-xl flex shadow-inner">
            {['day','month','year'].map(d => (
              <button key={d} onClick={() => setDimension?.(d)}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${dimension === d ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                {d === 'day' ? '本日' : d === 'month' ? '本月' : '本年'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI 数据网格 - 紧凑排版 */}
      <div className="space-y-3">
        {/* 营业收入 (元) - 独占一行 */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-400 text-[10px] font-bold">营业收入（元）</span>
            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <DollarSign className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{fm(haishangyouData.revenue)}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {haishangyouData.revenueTrend}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* 总航次 */}
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

          {/* 客单价 */}
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

        {/* 航次客员 + 好评率 - 同一行 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">航次客员</span>
              <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Activity className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{fm(haishangyouData.rawVisitors)}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 +6.5%
              </span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">好评率</span>
              <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <ThumbsUp className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">98.5%</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 +1.2%
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
            <span className="text-slate-700 font-extrabold font-mono text-sm">¥{(haishangyouData.rawRevenue * 1.15).toFixed(0)}</span>
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

        <div className="grid grid-cols-[1fr_100px_70px] text-[10px] text-slate-500 font-bold mb-1 pb-1.5 border-b border-slate-200">
          <div>业态</div>
          <div className="text-right">收入金额</div>
          <div className="text-center">同比</div>
        </div>
        {getRevenueStructureData().map((d, j) => (
          <div key={j} className="grid grid-cols-[1fr_100px_70px] items-center py-1.5 hover:bg-slate-50 rounded">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
              <span className="text-[11px] font-bold text-slate-700 truncate">{d.name}</span>
            </div>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{fm(d.value)}</span>
            <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${d.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_100px_70px] items-center py-1.5 mt-1 border-t border-slate-200 bg-slate-50 rounded">
          <span className="text-[11px] font-bold text-slate-800">小计</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{fm(revenueSubtotal)}</span>
          <span></span>
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
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-bold ml-auto">{ship.type}</span>
            </div>

            {/* 游船核心指标：紧凑一排 */}
            <div className="flex items-center gap-2 mb-3 p-2 bg-gradient-to-r from-cyan-50/50 to-transparent rounded-lg border-l-3 border-cyan-500">
              <div className="flex-1 text-center">
                <div className="text-[9px] text-slate-500 font-bold">载客量</div>
                <div className="text-sm font-black text-slate-800 font-mono">{ship.capacity}人</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-[9px] text-slate-500 font-bold">航次</div>
                <div className="text-sm font-black text-slate-800 font-mono">{ship.trips}次</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-[9px] text-slate-500 font-bold">客流量</div>
                <div className="text-sm font-black text-slate-800 font-mono">{ship.passengers.toLocaleString('en-US')}</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-[9px] text-slate-500 font-bold">总收入</div>
                <div className="text-sm font-black text-cyan-700 font-mono">{fm(ship.revenue)}</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-[9px] text-slate-500 font-bold">客单价</div>
                <div className="text-sm font-black text-amber-700 font-mono">{ship.avgPrice}</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-[9px] text-slate-500 font-bold">增长</div>
                <div className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-600">
                  <TrendingUp className="w-2 h-2 mr-0.5" />{ship.trend}
                </div>
              </div>
            </div>

            {/* 渠道表格 */}
            <div className="grid grid-cols-[1fr_70px_90px_70px] text-[10px] text-slate-500 font-bold mb-1 pb-1 border-b border-slate-200">
              <div>渠道</div><div className="text-right">客流量</div><div className="text-right">收入</div><div className="text-center">同比</div>
            </div>
            {ship.channels.map((channel, ci) => (
              <div key={ci} className="grid grid-cols-[1fr_70px_90px_70px] items-center py-1 hover:bg-cyan-50/30 rounded">
                <span className="text-[11px] font-bold text-slate-700">{channel.name}</span>
                <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{channel.passengers.toLocaleString('en-US')}</span>
                <span className="text-right text-[11px] font-mono text-cyan-700 font-semibold">{fm(channel.revenue)}</span>
                <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${channel.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{channel.trend}</span>
              </div>
            ))}
            {/* 小计行 */}
            <div className="grid grid-cols-[1fr_70px_90px_70px] items-center py-1 mt-1 border-t border-slate-200 bg-slate-50 rounded">
              <span className="text-[11px] font-bold text-slate-800">小计</span>
              <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{chSub.passengers.toLocaleString('en-US')}</span>
              <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{fm(chSub.revenue)}</span>
              <span></span>
            </div>
          </div>
        );
      })}

      {/* === 游船分项收入情况 === */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">游船分项收入情况（{dl}）</h3>
        </div>
        <div className="grid grid-cols-[1fr_70px_100px_70px] text-[10px] text-slate-500 font-bold mb-1 pb-1.5 border-b border-slate-200">
          <div>游船名称</div><div className="text-right">客流量</div><div className="text-right">收入金额</div><div className="text-center">同比</div>
        </div>
        {haishangyouShips.map((ship, j) => (
          <div key={j} className="grid grid-cols-[1fr_70px_100px_70px] items-center py-1.5 hover:bg-blue-50/30 border-l-2 border-blue-500 pl-2 rounded">
            <span className="text-[11px] font-bold text-slate-700 truncate">{ship.name}</span>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{ship.passengers.toLocaleString('en-US')}</span>
            <span className="text-right text-[11px] font-mono text-blue-700 font-semibold">{fm(ship.revenue)}</span>
            <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${ship.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{ship.trend}</span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_70px_100px_70px] items-center py-1.5 mt-1 border-t border-slate-200 bg-slate-50 rounded">
          <span className="text-[11px] font-bold text-slate-800">小计</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{haishangyouShips.reduce((s, ship) => s + ship.passengers, 0).toLocaleString('en-US')}</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{fm(haishangyouShips.reduce((s, ship) => s + ship.revenue, 0))}</span>
          <span></span>
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