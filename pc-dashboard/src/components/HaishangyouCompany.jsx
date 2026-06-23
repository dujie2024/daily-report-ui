import { useState } from 'react';
import { DollarSign, Activity, TrendingUp, Users, UserCheck, Ship, Waves } from 'lucide-react';

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

  const revenueSubtotal = getRevenueStructureData().reduce((s, d) => s + d.value, 0);
  const shipChannelSubtTotals = haishangyouShips.map(ship => ({
    passengers: ship.channels.reduce((s, c) => s + c.passengers, 0),
    revenue: ship.channels.reduce((s, c) => s + c.revenue, 0),
  }));

  return (
    <div className="space-y-6 text-slate-800">
      {/* 顶部标题 */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-cyan-600 rounded-full"></span>
            海上游船 运营决策中心
          </h2>
          <p className="text-xs text-slate-500 mt-1">全局监控主要观光客轮航次、各分销渠道销售额及二销业态（甲板观光、商超）明细</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {[['day', '日报'], ['month', '月报'], ['year', '年报']].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setDimension(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${dimension === v ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI 数据网格 - 6列 PC 排版 */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/20 p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
          <span className="text-emerald-800 text-xs font-bold">总票收 (元)</span>
          <div className="text-xl font-black text-slate-800 font-mono mt-2">{haishangyouData.revenue}</div>
          <span className="text-[9px] text-emerald-600 font-bold mt-1">同比 {haishangyouData.revenueTrend}</span>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/20 p-4 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
          <span className="text-blue-800 text-xs font-bold">客运量 (人次)</span>
          <div className="text-xl font-black text-slate-800 font-mono mt-2">{haishangyouData.visitors}</div>
          <span className="text-[9px] text-emerald-600 font-bold mt-1">同比 {haishangyouData.visitorsTrend}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-slate-500 text-xs font-bold">收费客流 (人)</span>
          <div className="text-xl font-black text-slate-800 font-mono mt-2">{haishangyouData.paidVisitors}</div>
          <span className="text-[9px] text-slate-400 font-bold mt-1">购票登船客流</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-slate-500 text-xs font-bold">接待客流 (人)</span>
          <div className="text-xl font-black text-slate-800 font-mono mt-2">{haishangyouData.receptionVisitors}</div>
          <span className="text-[9px] text-slate-400 font-bold mt-1">免签/协议客流</span>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-blue-50/20 p-4 rounded-2xl border border-cyan-100 shadow-sm flex flex-col justify-between">
          <span className="text-cyan-800 text-xs font-bold">发船航次 (次)</span>
          <div className="text-xl font-black text-slate-800 font-mono mt-2">{haishangyouData.totalTrips}</div>
          <span className="text-[9px] text-cyan-600 font-bold mt-1">同比 {haishangyouData.totalTripsTrend}</span>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50/20 p-4 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
          <span className="text-amber-800 text-xs font-bold">客单均价 (元)</span>
          <div className="text-xl font-black text-slate-800 font-mono mt-2">{haishangyouData.avgPrice}</div>
          <span className="text-[9px] text-amber-600 font-bold mt-1">同比 {haishangyouData.avgPriceTrend}</span>
        </div>
      </div>

      {/* 计划达成 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
          <h3 className="text-sm font-black text-slate-800">{dimension === 'year' ? '年度计划完成' : '月度计划完成'}</h3>
        </div>
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex justify-between items-center">
            <span className="text-slate-500 text-xs font-bold">{dimension === 'year' ? '年度计划创值额' : '月度计划创值额'}</span>
            <span className="text-slate-800 font-black font-mono text-sm">{Math.round(haishangyouData.rawRevenue * 1.15).toLocaleString('en-US')} 元</span>
          </div>
          <div className="col-span-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>时间进度</span>
              <span className="font-bold">70%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-slate-400 h-full rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex justify-between text-xs text-slate-700 mb-1">
              <span className="font-semibold">实际完成率</span>
              <span className="text-emerald-600 font-bold">{((haishangyouData.rawRevenue / (haishangyouData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${((haishangyouData.rawRevenue / (haishangyouData.rawRevenue * 1.15)) * 100).toFixed(1)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* PC 双栏：业态组成 (5/12) + 游轮多表明细 (7/12) */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* 业态组成卡片 */}
        <div className="col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm self-start">
          <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
              <h3 className="text-sm font-black text-slate-800">收入组成分析（{dl}）</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">
              {revenueFilter === 'total' ? '海上游合并口径' : haishangyouShips[revenueFilter === 'ship1' ? 0 : revenueFilter === 'ship2' ? 1 : 2].name}
            </span>
          </div>

          <div className="flex gap-1 p-1 bg-slate-100 rounded-lg text-[10px] font-bold mb-4">
            <button onClick={() => setRevenueFilter('total')}
              className={`flex-1 py-1 px-1.5 rounded transition-all ${revenueFilter === 'total' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}>全部</button>
            <button onClick={() => setRevenueFilter('ship1')}
              className={`flex-1 py-1 px-1.5 rounded transition-all ${revenueFilter === 'ship1' ? 'bg-cyan-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}>浪淘沙号</button>
            <button onClick={() => setRevenueFilter('ship2')}
              className={`flex-1 py-1 px-1.5 rounded transition-all ${revenueFilter === 'ship2' ? 'bg-blue-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}>寻仙2号</button>
            <button onClick={() => setRevenueFilter('ship3')}
              className={`flex-1 py-1 px-1.5 rounded transition-all ${revenueFilter === 'ship3' ? 'bg-purple-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}>求仙6号</button>
          </div>

          <div className="grid grid-cols-12 gap-1 text-[11px] font-bold text-slate-400 border-b border-slate-100 pb-2 mb-2 px-1">
            <div className="col-span-5">细分项目</div>
            <div className="col-span-4 text-right pr-4">收入金额</div>
            <div className="col-span-3 text-center">占比</div>
          </div>

          <div className="space-y-1">
            {getRevenueStructureData().map((d, j) => (
              <div key={j} className="grid grid-cols-12 gap-1 text-xs py-2 hover:bg-slate-50 rounded-lg px-1 items-center transition-all">
                <div className="col-span-5 flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                  <span className="text-slate-700 font-semibold truncate">{d.name}</span>
                </div>
                <div className="col-span-4 text-right font-bold text-slate-800 font-mono pr-4">{fm(d.value)}</div>
                <div className="col-span-3 text-center font-bold text-slate-500 font-mono">{d.ratio}%</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-1 text-xs font-black text-slate-900 mt-4 pt-3 border-t border-slate-100 bg-slate-50 p-2 rounded-lg">
            <div className="col-span-5 pl-2">小计</div>
            <div className="col-span-4 text-right font-mono pr-4">{fm(revenueSubtotal)}</div>
            <div className="col-span-3"></div>
          </div>
        </div>

        {/* 游船多表明细 */}
        <div className="col-span-7 space-y-6">
          {haishangyouShips && haishangyouShips.map((ship, shipIndex) => {
            const chSub = shipChannelSubtTotals[shipIndex];
            return (
              <div key={shipIndex} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4 text-cyan-600" />
                    <h3 className="text-sm font-black text-slate-800">{ship.name}（本日运行 {ship.trips} 航次）</h3>
                  </div>
                  <div className="text-xs text-slate-500 font-semibold">
                    客单均价: <span className="font-mono text-amber-600 font-black">{ship.avgPrice}</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-1 text-xs font-bold text-slate-400 border-b border-slate-100 pb-2 mb-2 px-2">
                  <div className="col-span-5">分销渠道</div>
                  <div className="col-span-3 text-right">客流量 (人次)</div>
                  <div className="col-span-4 text-right pr-4">渠道费收 (元)</div>
                </div>

                <div className="space-y-1">
                  {ship.channels.map((channel, ci) => (
                    <div key={ci} className="grid grid-cols-12 gap-1 text-xs py-2 hover:bg-cyan-50/10 rounded-lg px-2 items-center transition-all">
                      <div className="col-span-5 text-slate-700 font-semibold truncate">{channel.name}</div>
                      <div className="col-span-3 text-right font-semibold font-mono text-slate-600">{channel.passengers.toLocaleString('en-US')}</div>
                      <div className="col-span-4 text-right font-extrabold font-mono text-cyan-700 pr-4">{fm(channel.revenue)}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-12 gap-1 text-xs font-black text-slate-900 border-t border-slate-100 mt-3 pt-3 px-2 bg-slate-50 p-2 rounded-lg">
                  <div className="col-span-5">游船数据总计</div>
                  <div className="col-span-3 text-right font-mono">{chSub.passengers.toLocaleString('en-US')}</div>
                  <div className="col-span-4 text-right font-mono pr-4">{fm(chSub.revenue)}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
